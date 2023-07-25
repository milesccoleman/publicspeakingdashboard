<template>
  <div class="dashboard">
    <h1 id="mainTitle"> <img id="talking" alt="image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'" src="talking.png"> {{ msg }} </h1>
		<p id="messageTwo">
			{{ msg2 }} 
		</p>
		<p id="messageThree"> 
			{{ msg3 }} 
		</p>
		<span id="timeHolder">Time: </span>
		<!--<span><button  v-bind:style="{ backgroundColor: WPMColor}" v-if="!show" v-on:click="selectWPM" class="optionsButton" id="optionWPM"> Words Per Minute</button><button v-bind:style="{ backgroundColor: textEmotionColor}" v-if="!show" v-on:click="selectTextEmotion" class="optionsButton" id="optionEmotionsText"> Emotions in Text</button></span>
		<span><button v-bind:style="{ backgroundColor: voiceEmotionColor}" v-if="!show" v-on:click="selectVoiceEmotion" class="optionsButton" id="optionEmotionVoice"> Emotions in Voice</button><button v-bind:style="{ backgroundColor: faceEmotionColor}" v-if="!show" v-on:click="selectFaceEmotion" class="optionsButton" id="optionEmotionsFace"> Emotions in Face</button></span><br>-->
		<span><button id="begin" v-if="show3" v-on:click="begin(); selectWPM(); selectTextEmotion(); selectVoiceEmotion(); selectFaceEmotion()">Begin</button><button id="start"  v-if="!show3" v-on:click="initiateVoiceControl">Start</button><button id="stop" v-if="!show3" v-on:click="stopVoiceControl">Stop</button><button id="reset"  v-if="!show3" v-on:click="reset">Reset</button></span>
		<!--<br><button id="next" v-if="!show" v-on:click="next">Next</button>--><br>
		<span id="rawData"></span>
		<button v-if="!showTime" class="title" id="timer">{{ time }}</button>
		<ul v-if="!show3" id="output"></ul>
		<span><button v-if="!show3" id="dataShowButton" v-on:click="unhideData">View Raw Data</button><button v-if="!show3" id="dataHideButton" v-on:click="hideData">Hide Raw Data</button></span>
		
		<!--FEEDBACK SECTION-->
		
		<!--WPM-->
		<span v-if="!showWPM" id="wpmChart" ></span>
		<span v-if="!showTextEmotion" id="textEmotionChart" ></span>
		<!--<p v-if="!showWPM" id="wpm">{{ wpm }} <br><b>Overall Average Words Per Minute</b></p><br>-->
		<span id="voiceAndFace">
			
			<!--<p  v-if="!showTextEmotion" class="title" id="textEmotion">
				Anger: {{ this.anger }} <br>
				Fear: {{ this.fear}} <br>
				Excitement: {{ this.excitement }} <br>
				Boredom: {{ this.boredom}} <br>
				Sadness: {{ this.sadness}} <br>
				Happiness: {{ this.happiness }}<br>
				<img class="chartWindow" src="textEmotions.png"><br>
				<b>Text Emotion (out of 100)</b>
			</p>-->	
			<p v-if="!showVoiceEmotion" class="title" id="voiceEmotion">
				<img class="chartWindow" id="voiceEmotion" src="faceEmotions.png"><br>
				<b>Voice Analysis Placeholder</b>
				<!--add waveform-->
			</p>
			<p v-if="!showFaceEmotion" class="title" id="faceEmotion">
				<img class="chartWindow" id="faceEmotion" src="faceEmotions.png"><br>
				<b>Face Analysis Placeholder</b>
				<!--add video feedback-->
			</p>
				<!--Words Per Minute, Filler Words, and Volume SECTION-->
				<!--TODO: Filler Words-->
				<!--TODO: Dynamics - attack - decay - volume-->		
		</span>

  </div>
</template>

<script>
import paralleldots from 'paralleldots'
import Plotly from 'plotly.js-dist'
export default {
  name: 'publicSpeakingDashboard',
  props: {
  }, 
  data () {
		return {
			msg: 'Public Speaking Dashboard',
			msg2: "An AI-powered tool to help you hone your public speaking skills.",
			msg3: "",
			wordsSpoken: '', 
			output: 'Recognized Text',
			workingOutpu: '',
			workingTime: 0, 
			grabTimeInterval: '', 
			registerWPMInterval: '',
			getEmotionStatsInterval: '',  
			initialTime: 0,  
			time: "00:00",
			timeElapsed: 0, 
			timeDifference: 0, 
			wordCount: 0,
			totalWords: 0, 
			wordCountDividedByTime: 0,
			stop: false, 
			wpm: 0,
			anger: '', 
			fear: '', 
			excitement: '', 
			boredom: '', 
			sadness: '', 
			happiness: '', 
			continuous: true, 
			show: true, 
			show2: true, 
			show3: true, 
			show4: true,
			showWPM: true,
			showTEXTEMOTION: true, 
			showTime: true,
			showData: true,   
			WPMSelected: false,
			WPMColor: '#CBC3E3',  
			showTextEmotion: true, 
			textEmotionSelected: false, 
			textEmotionColor: '#CBC3E3', 
			showVoiceEmotion: true, 
			voiceEmotionSelected: false, 
			voiceEmotionColor: '#CBC3E3', 
			showFaceEmotion: true, 
			faceEmotionSelected: false, 
			faceEmotionColor: '#CBC3E3', 
			textEmotionData: '', 
			overallDataObject: '', 
			currentDataObject: '', 
			dataNamer: 0,
			time1: true,
			time2: false 
		}
	},
	
	created: function () {
	//initiate speech recognition and ask for microphone permission
		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		let recognition = new window.SpeechRecognition();
		recognition.start()
	}, 

	methods: {
	
		begin: function () {
			this.show = false
			this.show3 = false
			this.msg2 = ''
			this.msg3 = 'Select the data you would like to track, click start, and begin speaking.'
		},
		
// 		next: function () {
// 			this.show2 = false
// 			this.show4 = false
// 			this.show = true
// 			this.msg3 = ''
// 			},
		
		selectWPM: function () {
			
			if (this.WPMSelected == false) {
				this.msg2 = ""
				this.msg3 = ""
				this.WPMSelected = true
				this.WPMColor = '#f48d79'
				if (this.WPMSelected == true)	 {
				this.showWPM = false
			}
			}
			
			else {
				this.WPMSelected = false
				this.WPMColor = '#CBC3E3'
				if (this.WPMSelected == false)	 {
				this.showWPM = true
			}
			}
		},
		
		selectTextEmotion: function () {
		
			if (this.textEmotionSelected == false) {
				this.msg2 = ""
				this.msg3 = ""
				this.textEmotionSelected = true
				this.textEmotionColor = '#f48d79'
				if (this.textEmotionSelected == true)	 {
				this.showTextEmotion = false
			}	
			}
			
			else {
				this.textEmotionSelected = false
				this.textEmotionColor = '#CBC3E3'
				if (this.textEmotionSelected == false)	 {
				this.showTextEmotion = true
			}	
			}
		},
		
		selectVoiceEmotion: function () {
		
			if (this.voiceEmotionSelected == false) {
				this.msg2 = ""
				this.msg3 = ""
				this.voiceEmotionSelected = true
				this.voiceEmotionColor = '#f48d79'
				if (this.voiceEmotionSelected == true)	 {
				this.showVoiceEmotion = false
			}	
			}
			
			else {
				this.voiceEmotionSelected = false
				this.voiceEmotionColor = '#CBC3E3'
				if (this.voiceEmotionSelected == false)	 {
				this.showVoiceEmotion = true
			}	
			}
		},
		
		selectFaceEmotion: function () {
		
			if (this.faceEmotionSelected == false) {
				this.msg2 = ""
				this.msg3 = ""
				this.faceEmotionSelected = true
				this.faceEmotionColor = '#f48d79'
				if (this.faceEmotionSelected == true)	 {
				this.showFaceEmotion = false
			}
			}
			
			else {
				this.faceEmotionSelected = false
				this.faceEmotionColor = '#CBC3E3'
				if (this.faceEmotionSelected == false)	 {
				this.showFaceEmotion = true
			}
			}
		},
	
		initiateVoiceControl: function () {
		//start listening for words and making a transcript of detected words
			console.log('voice recognition initiated')
			window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
			let finalTranscript = '';
			let recognition = new window.SpeechRecognition();
			recognition.interimResults = true; 
			recognition.maxAlternatives = 10;
			recognition.continuous = this.continuous;
			recognition.onresult = (event) => {
				let interimTranscript = '';
				for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
					let transcript = event.results[i][0].transcript;
					if (event.results[i].isFinal) {
						finalTranscript += transcript;
						if (this.workingTime) {
						this.workingOutput = transcript
						if (this.textEmotionSelected == true) {
							this.getEmotionStats()
						}
						if (this.WPMSelected == true) {
							this.registerWPM()
						}
						var node = document.createElement('li');
						node.appendChild(document.createTextNode(" " + this.workingTime + ': ' + this.workingOutput));
						if (this.textEmotionData) {
						this.currentDataObject = '{"time":' + '"' + this.workingTime + '"' + "," + '"wpm":' + '"' + this.wpm + '"' + "," + '"content":' + '"' + this.workingOutput + '"' + "," + '"Angry":' + this.anger + "," + '"Fear":' + this.fear + "," + '"Excited":' + this.excitement + "," + '"Bored":' + this.boredom + "," + '"Sad":' + this.sadness + "," + '"Happy":' + this.happiness + "},"
						var div = document.getElementById('rawData');
						div.innerHTML += this.currentDataObject;
						}
						console.log(this.overallDataObject)
						document.querySelector('ul').appendChild(node);
						this.workingOutput = ""
						var elem = document.getElementById('output');
						elem.scrollTop = elem.scrollHeight;
						
			}
					} else {
						interimTranscript += transcript;
					}
				}
				this.wordsSpoken = finalTranscript
				this.output =  this.wordsSpoken += interimTranscript
				this.wordCount = this.countWords(this.output)
				this.totalWords = this.wordCount
				
				
				
				
			}
			recognition.start()
			
				if ((this.textEmotionSelected == true || this.WPMSelected == true) || (this.voiceEmotionSelected == true || this.faceEmotionSelected == true))	 {
					
					if (this.stop == false) {
						this.showTime = false
						console.log("app started")
						this.initialTime = Date.now();
						this.grabTimeInterval = window.setInterval(this.grabTime, 1000)
					} 
					if (this.stop == true) {
						clearInterval(this.grabTimeInterval)
						this.showTime = false
						this.continuous = true
						console.log("app stopped")
						recognition.stop()
						this.stop = false
					}
					}
					else {
						this.msg2 = 'No input data selected. Try selecting words per minute or another parameter.'
					}

		},
	
		grabTime: function () {
		//keep  of time in both milliseconds as well as minutes and seconds
			
			if (this.time1 == true) {
			this.timeDifference = Date.now() - this.initialTime;
			this.dataNamer = this.timeDifference
			var div = document.getElementById('timeHolder');
			div.innerHTML = this.dataNamer 
			console.log(this.dataNamer)
			}
			
			if (this.time1 == false){
				this.timeDifference = Date.now() - this.initialTime;
				var middleTime = parseInt(document.getElementById("timeHolder").innerHTML);
				console.log(middleTime)
				this.timeDifference = this.timeDifference + middleTime 
				this.time2 = true
			}
			
			var formatted = convertTime(this.timeDifference);
			document.getElementById('timer').innerHTML = '' + formatted;
			this.workingTime = formatted; 
			console.log(formatted)
			
			
			
			this.timeElapsed = this.timeDifference
			function convertTime(miliseconds) {
				var totalSeconds = Math.floor(miliseconds/1000);
				var minutes = Math.floor(totalSeconds/60);
				var seconds = totalSeconds - minutes * 60;
				if (seconds < 10) {
				seconds = "0" + seconds 
				}
				if (minutes < 10) {
				minutes = "0" + minutes 
				}
				return minutes + ':' + seconds;

			}
		},
		
		countWords: function (str){
		//count how many words are in the transcript of detected words
			const arr = str.split(' ');
			return arr.filter(word => word !== '').length;
		}, 
		
		registerWPM: function () {
		//calculate number of words per minute--at one second intervals
			this.wpm = Math.round(this.wordCount/(this.timeElapsed/1000) * 60) 
		},
		
		getEmotionStats: function () {
		//send transcript data to be evaluated as per emotional content
			const pd = require('paralleldots' || paralleldots)
			pd.apiKey = "hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw";
			pd.emotion(this.wordsSpoken,"en")
			.then((response) => {
				let obj = JSON.parse(response)
				this.textEmotionData = response.slice(1)
				this.anger = Math.round(obj.emotion.Angry * 100) 
				this.fear = Math.round(obj.emotion.Fear * 100) 
				this.excitement = Math.round(obj.emotion.Excited * 100)
				this.boredom = Math.round(obj.emotion.Bored * 100)
				this.sadness = Math.round(obj.emotion.Sad * 100)
				this.happiness = Math.round(obj.emotion.Happy * 100)
				console.log("emotion data retrieved" + response)
			})
				.catch((error) => {
				console.log(error);
			})
		
		},  
		
		stopVoiceControl: function () {
		//reset speech recognition so it can stop and clear original timers
			this.continuous = false
			this.stop = true
			this.time1 = false
			if (this.time2 == true) {
					this.dataNamer = this.timeDifference
					var div2 = document.getElementById('timeHolder');
					div2.innerHTML = this.dataNamer 
					console.log(this.dataNamer)
			}
			this.visualizeData()
			this.initiateVoiceControl()
			clearInterval(this.grabTimeInterval)
			
		}, 
	
		reset: function () {
			location.reload()
		}, 
		
		unhideData: function () {
			document.getElementById("rawData").style.display="inline-block"
		}, 
		
		hideData: function () {
			document.getElementById("rawData").style.display="none"
		}, 
		
		visualizeData: function () {
				var overallRawData = document.getElementById("rawData").innerHTML
				var overallSlicedDataArray = "[" + overallRawData.slice(0, -1) + "]"
				var data = JSON.parse(overallSlicedDataArray)
				console.log("raw data:" + data[0].Angry)
			
			
			//Words Per Minute
			if (this.showWPM == false) {
				
				let trace1 = {
					x: [],
					y: [],
					mode: "lines", 
					line: {
						color: '#f48d79',
						width: 2
					}
				};
				
				data.forEach(function(val) {
				trace1.x.push(val["time"]);
				trace1.y.push(val["wpm"]);
				});
				
				var layout = {
				paper_bgcolor: "#222831",
				plot_bgcolor: "#222831",
				title: {
					text:'Rate of Speech',
					font: {
					family: 'Arial, sans-serif',
					size: 25, 
					color: '#71c68b', 
				},
					xref: 'paper',
					automargin: true,
					x: 0.5,
					xanchor: 'center', 
					y: 0.88, 
					yanchor: 'top'
				},
				autosize: true,
					xaxis: {
						tickfont : {
							size : 18,
							color : '#71c68b'
						},
						tickcolor: '#36454f',
						title: {
							text: 'Time',
							font: {
							family: 'Arial, sans-serif',
							size: 18,
							color: '#71c68b',
							}
						},
					},
					yaxis: {
						margin: {
							autoexpand: true,
						},
						automargin: true,
						tickfont : {
							size : 18,
							color : '#71c68b'
						},
						tickcolor: '#36454f',
						title: {
						text: 'Words Per Minute',
							font: {
							family: 'Arial, sans-serif',
							size: 18,
							color: '#71c68b' 
							}
						}
					}
				};

				var WPMChart = document.getElementById('wpmChart');
				Plotly.newPlot(WPMChart, [trace1], layout);
			}
			
			
			//Emotions in Text
			if (this.textEmotionSelected == true) {
				
				let Anger = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Anger', 
					line: {
						color: '#ff6961',
						width: 2
					}
				};
				
				let Fear = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Fear', 
					line: {
						color: '#fdfd96',
						width: 2
					}
				};
				
				let Excitement = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Excitement', 
					line: {
						color: '#ffb347',
						width: 2
					}
				};
				
				let Boredom = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Boredom', 
					line: {
						color: '#cfcfc4',
						width: 2
					}
				};
				
				let Sadness = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Sadness', 
					line: {
						color: '#FF5733',
						width: 2
					}
				};
				
				let Happiness = {
					x: [],
					y: [],
					mode: "lines",
					name: 'Happiness', 
					line: {
						color: '#77dd77',
						width: 2
					}
				};

				data.forEach(function(val) {
				Anger.x.push(val["time"]);
				Anger.y.push(val["Angry"]);
				Fear.x.push(val["time"]);
				Fear.y.push(val["Fear"]);
				Excitement.x.push(val["time"]);
				Excitement.y.push(val["Excited"]);
				Boredom.x.push(val["time"]);
				Boredom.y.push(val["Bored"]);
				Sadness.x.push(val["time"]);
				Sadness.y.push(val["Sad"]);
				Happiness.x.push(val["time"]);
				Happiness.y.push(val["Happy"]);
				});
				
				var layout2 = {
				paper_bgcolor: "#222831",
				plot_bgcolor: "#222831",
				title: {
					text:'Emotions in Words Spoken',
					font: {
					family: 'Arial, sans-serif',
					size: 25, 
					color: '#FFC300', 
				},
					xref: 'paper',
					automargin: true,
					x: 0.5,
					xanchor: 'center', 
					y: 0.88, 
					yanchor: 'top'
				},
				autosize: true,
					xaxis: {
						tickfont : {
							size : 16,
							color : '#FFC300'
						},
						tickcolor: '#36454f',
						title: {
							text: 'Time',
							font: {
							family: 'Arial, sans-serif',
							size: 18,
							color: '#FFC300',
							}
						},
					},
					yaxis: {
						margin: {
							autoexpand: true,
						},
						automargin: true,
						tickfont : {
							size : 16,
							color : '#FFC300'
						},
						tickcolor: '#36454f',
						title: {
						text: 'Emotions',
							font: {
							family: 'Arial, sans-serif',
							size: 18,
							color: '#FFC300' 
							}
						}
					}
				};

				var TEXTEMOTIONChart = document.getElementById('textEmotionChart');
				Plotly.newPlot(TEXTEMOTIONChart, [Anger, Fear, Excitement, Boredom, Sadness, Happiness], layout2);
			}
		
		}
		
	}//
}//	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.cdnfonts.com/css/lcd');
#textEmotion, #faceEmotion, #voiceEmotion, #wpm {
display: inline-block; 
}
div {
background-color: none; 
color: #71c68b; 

}
.chartWindow {
position: relative;
display: inline-block;
width: 80%;  

}
.optionsButton  {
height: 50px;
width: 75px; 
padding: 12px; 
font-size: 10px; 
margin: 5px;
border: none; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
}

.title {
color: white; 
}

#messageTwo {
color: #f48d79; 
font-size: 25px; 
}

#messageThree {
color: white; 
font-size: 25px; 
}

#begin {
background-color: #7766c6; 
border: none; 
height: 50px; 
width: 100px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 20px; 
margin-top: 40px; 
margin-bottom: -20px; 
}

#begin:hover {
background-color: #FFC300; 
}

#start {
background-color: #CBC3E3; 
border: none; 
height: 50px; 
width: 100px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 20px; 
margin: 10px; 
}

#start:hover {
background-color: lightgreen; 
}

#stop {
background-color: #CBC3E3; 
border: none; 
height: 50px; 
width: 100px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 20px; 
margin: 10px; 
}

#stop:hover {
background-color: #ff726f; 
}

#reset {
background-color: #CBC3E3; 
border: none; 
height: 50px; 
width: 100px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 20px; 
margin: 10px; 
}

#reset:hover {
background-color: lightyellow; 
}

#next {
background-color: #7766c6; 
border: none; 
height: 50px; 
width: 100px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 20px; 
margin-top: 40px; 
margin-bottom: -20px; 
}

#next:hover {
background-color: #FFC300; 
}

#output {
margin: auto; 
color: #f48d79; 
background-color: #222831; 
width: 80%;  
text-align: left; 
overflow: scroll; 
height: 170px; 
font-size: 25px;
margin-top: 0px;
margin-bottom: 0px
}

#wpmChart {
overflow: auto; 
width: 80%; 
display: inline-block;
margin-top: 3px;
margin-bottom: 0px; 
}

#textEmotionChart {
overflow: auto; 
width: 80%; 
display: inline-block;
margin-top: -3px; 
}

#rawData {
display: none; 
margin: auto; 
color: lawngreen; 
background-color: #222831; 
width: 80%;  
text-align: left; 
overflow: scroll; 
height: 100px; 
font-size: 25px;
margin: 0px;
}

#dataHideButton {
margin: auto; 
color:  #222831; 
background-color: #222831; 
width: 40%;  
text-align: center; 
height: 30px; 
font-size: 10px;
margin: 0px;
border: none; 
}

#dataShowButton {
margin: auto; 
color:  #222831; 
background-color: #222831; 
width: 40%;  
text-align: center; 
height: 30px; 
font-size: 10px;
margin: 0px;
border: none; 
}

h1 {
font-size: 50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#talking {
height: 100px; 
margin-bottom: -20px; 
-webkit-filter: invert(1);
   filter: invert(1);
}
#timer {
background: #222831; 
color: white; 
font-size: 50px; 
font-family: 'LCD', sans-serif;
height: 100px; 
width: 80%; 
border: none; 
margin: 10px; 
font-weight: bold; 
text-align: center; 
padding: 20px;
margin-bottom: 0px;
}

#timeHolder {
background-color: #123b52; 
color: white; 
display: none; 
}
</style>