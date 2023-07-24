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
		<span><button  v-bind:style="{ backgroundColor: WPMColor}" v-if="!show" v-on:click="selectWPM" class="optionsButton" id="optionWPM"> Words Per Minute</button><button v-bind:style="{ backgroundColor: textEmotionColor}" v-if="!show" v-on:click="selectTextEmotion" class="optionsButton" id="optionEmotionsText"> Emotions in Text</button></span>
		<span><button v-bind:style="{ backgroundColor: voiceEmotionColor}" v-if="!show" v-on:click="selectVoiceEmotion" class="optionsButton" id="optionEmotionVoice"> Emotions in Voice</button><button v-bind:style="{ backgroundColor: faceEmotionColor}" v-if="!show" v-on:click="selectFaceEmotion" class="optionsButton" id="optionEmotionsFace"> Emotions in Face</button></span><br>
		<span><button id="begin" v-if="show3" v-on:click="begin">Begin</button><button id="start"  v-if="!show3" v-on:click="initiateVoiceControl">Start</button><button id="stop" v-if="!show3" v-on:click="stopVoiceControl">Stop</button><button id="reset"  v-if="!show3" v-on:click="reset">Reset</button></span>
		<!--<br><button id="next" v-if="!show" v-on:click="next">Next</button>--><br>
		<span id="rawData"></span>
		<button v-if="!showTime" class="title" id="timer">{{ time }}</button>
		<ul v-if="!show3" id="output"></ul>
		<span><button v-if="!show3" id="dataShowButton" v-on:click="unhideData">View Raw Data</button><button v-if="!show3" id="dataHideButton" v-on:click="hideData">Hide Raw Data</button></span>
		<!--EMOTION FEEDBACK SECTION-->
		
		<!--TODO: explore gridding in vue-->
		
		<span id="voiceAndFace">
		<p  v-if="!showTextEmotion" class="title" id="textEmotion">
		Anger: {{ this.anger }} <br>
		Fear: {{ this.fear}} <br>
		Excitement: {{ this.excitement }} <br>
		Boredom: {{ this.boredom}} <br>
		Sadness: {{ this.sadness}} <br>
		Happiness: {{ this.happiness }}<br>
		<img class="chartWindow" src="textEmotions.png"><br>
		<b>Text Emotion (out of 100)</b>
		</p>
		<p  v-if="!showVoiceEmotion" class="title" id="voiceEmotion">
			<img class="chartWindow" id="voiceEmotion" src="faceEmotions.png"><br>
		<b>Voice Analysis Placeholder</b>
		<!--add waveform-->
		</p>
		<p  v-if="!showFaceEmotion" class="title" id="faceEmotion">
			<img class="chartWindow" id="faceEmotion" src="faceEmotions.png"><br>
		<b>Face Analysis Placeholder</b>
		<!--add video feedback-->
		</p>		
    </span>
<!-- 
    <p v-if="!showWPM" class="title" id="totalWords"> 
		{{ totalWords }} <br>
		<b>Total Words Detected</b>
    </p>
 -->
 
 
 <!--Words Per Minute, Filler Words, and Volume SECTION-->
 
 
    <p class="title" v-if="!showWPM" id="wpm">
     <img class="chartWindow" id="WPM" src="WPM.png"><br>
		{{ wpm }} <br>
		<b>Overall Average Words Per Minute</b>
    </p>

	<!--TODO: Filler Words-->
	<!--TODO: Dynamics - attack - decay - volume-->


  </div>
</template>

<script>
import paralleldots from 'paralleldots'
//import Plotly from 'plotly.js-dist'
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
						this.currentDataObject = '{"time":' + '"' + this.workingTime + '"' + "," + '"wpm":' + '"' + this.wpm + '"' + "," + '"content":' + '"' + this.workingOutput + '"' + "," + this.textEmotionData + ","
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
			}
			
			if (this.time1 == false){
			this.timeDifference = Date.now() - this.initialTime;
			var middleTime = parseInt(document.getElementById("timeHolder").innerHTML);
			this.timeDifference = this.timeDifference + middleTime
			}
			
			var formatted = convertTime(this.timeDifference);
			document.getElementById('timer').innerHTML = '' + formatted;
			this.workingTime = formatted; 
			console.log(formatted)
			this.dataNamer = this.timeDifference
			var div = document.getElementById('timeHolder');
			div.innerHTML = this.dataNamer
			
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
width: 80%;
display: inline-block; 

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
height: 300px; 
font-size: 25px;
margin-top: 0px;
margin-bottom: 0px
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
color:  lawngreen; 
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
color:  lawngreen; 
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