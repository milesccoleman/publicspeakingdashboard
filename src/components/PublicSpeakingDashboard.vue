<template>
  <div class="dashboard">
    <h1 id="mainTitle"> <img id="talking" alt="image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'" src="talking.png"> {{ msg }} </h1>
		<p id="messageTwo">
			{{ msg2 }} 
		</p>
		<p id="messageThree"> 
			{{ msg3 }} 
		</p>
		<p v-if="!showWPM" class="title" id="timer">
		{{ time }} <br>
		<b>Time</b>
		</p>
		<br><span><button id="begin" v-if="show3" v-on:click="begin">Begin</button><button id="start"  v-if="!show4" v-on:click="initiateVoiceControl">Start</button><button id="stop" v-if="!show2" v-on:click="stopVoiceControl">Stop</button><br><button id="reset"  v-if="!show2" v-on:click="reset">Reset</button></span><br>
		<span><button  v-bind:style="{ backgroundColor: WPMColor}" v-if="!show" v-on:click="selectWPM" class="optionsButton" id="optionWPM">Track Words Per Minute</button><button v-bind:style="{ backgroundColor: textEmotionColor}" v-if="!show" v-on:click="selectTextEmotion" class="optionsButton" id="optionTrackEmotionsText">Track Emotions in Text</button></span><br>
		<span><button v-bind:style="{ backgroundColor: voiceEmotionColor}" v-if="!show" v-on:click="selectVoiceEmotion" class="optionsButton" id="optionTrackEmotionVoice">Track Emotions in Voice</button><button v-bind:style="{ backgroundColor: faceEmotionColor}" v-if="!show" v-on:click="selectFaceEmotion" class="optionsButton" id="optionTrackEmotionsFace">Track Emotions in Face</button></span>
		<br><button id="next" v-if="!show" v-on:click="next">Next</button>
		<ul v-if="!show2" id="output">
		</ul>
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
export default {
  name: 'publicSpeakingDashboard',
  props: {
  }, 
  data () {
		return {
			msg: 'Public Speaking Dashboard',
			msg2: "An AI-powered tool to help you reflect on your own public speaking and hone your public speaking skills.",
			msg3: "",
			wordsSpoken: '', 
			output: 'Recognized Text',
			workingOutpu: '',
			workingTime: 0, 
			grabTimeInterval: '', 
			registerWPMInterval: '',
			getEmotionStatsInterval: '',  
			initialTime: 0,  
			time: 0,
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
			faceEmotionColor: '#CBC3E3'
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
			this.msg3 = 'Select the data you would like to track.'
		},
		
		next: function () {
			this.show2 = false
			this.show4 = false
			this.show = true
			this.msg3 = ''
			
			if (this.WPMSelected == true)	 {
				this.showWPM = false
			}	
			
			if (this.textEmotionSelected == true)	 {
				this.showTextEmotion = false
			}	
			
			if (this.voiceEmotionSelected == true)	 {
				this.showVoiceEmotion = false
			}	
			
			if (this.faceEmotionSelected == true)	 {
				this.showFaceEmotion = false
			}
			
			if (this.textEmotionSelected == false && this.WPMSelected == false)	 {
				this.msg2 = 'No input data selected. Please click "reset"and start over.'
			}	
		},
		
		selectWPM: function () {
		
			if (this.WPMSelected == false) {
				this.WPMSelected = true
				this.WPMColor = 'lightgreen'
			}
			
			else {
				this.WPMSelected = false
				this.WPMColor = '#CBC3E3'
			}
		},
		
		selectTextEmotion: function () {
		
			if (this.textEmotionSelected == false) {
				this.textEmotionSelected = true
				this.textEmotionColor = 'lightgreen'
			}
			
			else {
				this.textEmotionSelected = false
				this.textEmotionColor = '#CBC3E3'
			}
		},
		
		selectVoiceEmotion: function () {
		
			if (this.voiceEmotionSelected == false) {
				this.voiceEmotionSelected = true
				this.voiceEmotionColor = 'lightgreen'
			}
			
			else {
				this.voiceEmotionSelected = false
				this.voiceEmotionColor = '#CBC3E3'
			}
		},
		
		selectFaceEmotion: function () {
		
			if (this.faceEmotionSelected == false) {
				this.faceEmotionSelected = true
				this.faceEmotionColor = 'lightgreen'
			}
			
			else {
				this.faceEmotionSelected = false
				this.faceEmotionColor = '#CBC3E3'
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
						var node = document.createElement('li');
						node.appendChild(document.createTextNode(this.workingTime + ": " + "" + this.workingOutput));
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
					if (this.stop == false) {
						console.log("app started")
						this.initialTime = Date.now();
						this.grabTimeInterval = window.setInterval(this.grabTime, 1000)
						this.registerWPMInterval = window.setInterval(this.registerWPM, 1000)
						this.getEmotionStatsInterval = window.setInterval(this.getEmotionStats, 5000)
					} 
					if (this.stop == true) {
						recognition.stop()
						this.stop = false
						this.continuous = true
						console.log("app stopped")
	
					}
		},
	
		grabTime: function () {
		//keep track of time in both milliseconds as well as minutes and seconds
			
			this.timeDifference = Date.now() - this.initialTime;
			var formatted = convertTime(this.timeDifference);
			document.getElementById('timer').innerHTML = '' + formatted;
			this.workingTime = formatted; 
			console.log(formatted)
			
			this.timeElapsed = this.timeDifference
			return this.timeElapsed
			function convertTime(miliseconds) {
				var totalSeconds = Math.floor(miliseconds/1000);
				var minutes = Math.floor(totalSeconds/60);
				var seconds = totalSeconds - minutes * 60;
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
			this.initiateVoiceControl()
			clearInterval(this.grabTimeInterval)
			clearInterval(this.registerWPMInterval)
			clearInterval(this.getEmotionStatsInterval)
		}, 
	
		reset: function () {
			location.reload()
		}
	
	
	
	
	}//
}//	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#textEmotion, #faceEmotion, #voiceEmotion, #wpm {
display: inline-block; 
}
div {
background-color: none; 
color: #71c68b; 

}
.chartWindow {
height: 250px; 
position: relative;

}
.optionsButton  {
height: 150px;
width: 150px; 
padding: 12px; 
font-size: 25px; 
margin: 20px;
border: none; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
}

.title {
color: white; 
}
#optionWPM {
background-color: #CBC3E3; 
}
#messageTwo {
color: #f48d79
}
#messageThree {
color: white
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

#reset {
background-color: #CBC3E3; 
border: none; 
height: 25px; 
width: 50px; 
font-weight: bold; 
color: black; 
font-family: Arial, sans-serif;
font-size: 12px; 
margin: 10px; 
}

#next {
background-color: #CBC3E3; 
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

#output {
margin: auto; 
color: hotpink; 
background-color: black; 
width: 50%;  
text-align: left; 
overflow: scroll; 
height: 200px; 
}

#begin:hover {
background-color: lightgray; 
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
</style>
