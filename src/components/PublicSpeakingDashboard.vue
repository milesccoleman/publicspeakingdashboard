<template>
  <div class="dashboard">
    <h1 >{{ msg }}</h1>
		<p>
			{{ msg2 }} 
		</p>
		<p>
			{{ msg3 }} 
		</p>
    <p v-if="!showWPM" id="timer">
		{{ time }} <br>
		<b>Time</b>
    </p>
    <p v-if="!showWPM" id="totalWords"> 
		{{ totalWords }} <br>
		<b>Total Words Detected</b>
    </p>
     <p v-if="!showWPM" id="wpm">
		{{ wpm }} <br>
		<b>Overall Average Words Per Minute</b>
    </p>
    <p  v-if="!showTextEmotion" id="emotion">
		Anger: {{ this.anger }} <br>
		Fear: {{ this.fear}} <br>
		Excitement: {{ this.excitement }} <br>
		Boredom: {{ this.boredom}} <br>
		Sadness: {{ this.sadness}} <br>
		Happiness: {{ this.happiness }}<br>
		<b>Text Emotion (out of 100)</b>
    </p>
    <p  v-if="!showVoiceEmotion" id="voiceEmotion">
		<b>Voice Analysis Placeholder</b>
    </p>
    <p  v-if="!showFaceEmotion" id="voiceEmotion">
		<b>Face Analysis Placeholder</b>
    </p>
    <span><button v-if="show3" v-on:click="begin">Begin</button><button v-if="!show4" v-on:click="initiateVoiceControl">Start</button><button v-if="!show2" v-on:click="stopVoiceControl">Stop</button><button v-if="!show2" v-on:click="reset">Reset</button></span><br>
    <span><button  v-bind:style="{ backgroundColor: WPMColor}" v-if="!show" v-on:click="selectWPM" class="optionsButton" id="optionWPM">Track Words Per Minute</button><button v-bind:style="{ backgroundColor: textEmotionColor}" v-if="!show" v-on:click="selectTextEmotion" class="optionsButton" id="optionTrackEmotionsText">Track Emotions in Text</button></span><br>
	<span><button v-bind:style="{ backgroundColor: voiceEmotionColor}" v-if="!show" v-on:click="selectVoiceEmotion" class="optionsButton" id="optionTrackEmotionVoice">Track Emotions in Voice</button><button v-bind:style="{ backgroundColor: faceEmotionColor}" v-if="!show" v-on:click="selectFaceEmotion" class="optionsButton" id="optionTrackEmotionsFace">Track Emotions in Face</button></span>
	<br><button v-if="!show" v-on:click="next">Next</button>
    <p v-if="!show2" id="output">
      {{ output }}
    </p>

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
			WPMColor: 'lightgray',  
			showTextEmotion: true, 
			textEmotionSelected: false, 
			textEmotionColor: 'lightgray', 
			showVoiceEmotion: true, 
			voiceEmotionSelected: false, 
			voiceEmotionColor: 'lightgray', 
			showFaceEmotion: true, 
			faceEmotionSelected: false, 
			faceEmotionColor: 'lightgray'
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
			this.WPMSelected = true
			this.WPMColor = 'lightgreen'
		},
		
		selectTextEmotion: function () {
			this.textEmotionSelected = true
			this.textEmotionColor = 'lightgreen'
		},
		
		selectVoiceEmotion: function () {
			this.voiceEmotionSelected = true
			this.voiceEmotionColor = 'lightgreen'
		},
		
		selectFaceEmotion: function () {
			this.faceEmotionSelected = true
			this.faceEmotionColor = 'lightgreen'
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
.optionsButton {
height: 150px;
width: 150px; 
padding: 12px; 
font-size: 25px; 
margin: 20px

}

#optionWPM {

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
</style>
