<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <p id="timer">
		{{ time }} <br>
		Time
    </p>
    <p id="totalWords">
		{{ totalWords }} <br>
		Total Words Detected
    </p>
     <p id="wpm">
		{{ wpm }} <br>
		Overall Average Words Per Minute
    </p>
    <span><button v-on:click="initiateVoiceControl">Start</button><button v-on:click="stopVoiceControl">Stop</button><button v-on:click="reset">Reset</button></span>
    
    <p id="output">
      {{ output }}
    </p>

  </div>
</template>

<script>
export default {
  name: 'publicSpeakingDashboard',
  props: {
  }, 
  data () {
		return {
			msg: 'Public Speaking Dashboard', 
			wordsSpoken: '', 
			output: 'Recognized Text',
			grabTimeInterval: '', 
			registerWPMInterval: '', 
			initialTime: 0,  
			time: 0,
			timeElapsed: 0, 
			timeDifference: 0, 
			wordCount: 0,
			totalWords: 0, 
			wordCountDividedByTime: 0,
			stop: false, 
			wpm: 0, 
			coninuous: true
		}
	},
	
	created: function () {
		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		let recognition = new window.SpeechRecognition();
		recognition.start()
	}, 

	methods: {
	
		initiateVoiceControl: function () {
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
				console.log("transcript: " + interimTranscript)
				this.wordsSpoken = finalTranscript
				this.output =  this.wordsSpoken += interimTranscript
				this.wordCount = this.countWords(this.output)
				this.totalWords = this.wordCount
				}
		
				if (this.stop == false) {
					this.initialTime = Date.now();
					recognition.start()
					this.grabTimeInterval = window.setInterval(this.grabTime, 1000)
					this.registerWPMInterval = window.setInterval(this.registerWPM, 1000)
				} 
				if (this.stop == true) {
					recognition.abort()
					this.stop = false
					console.log("stopped?")
					this.continuous = true
		
				}
		},
	
		grabTime: function () {
			this.timeDifference = Date.now() - this.initialTime;
			var formatted = convertTime(this.timeDifference);
			document.getElementById('timer').innerHTML = '' + formatted;
			this.timeElapsed = this.timeDifference
			console.log("og time elapsed " + this.timeElapsed)
			return this.timeElapsed
			function convertTime(miliseconds) {
				var totalSeconds = Math.floor(miliseconds/1000);
				var minutes = Math.floor(totalSeconds/60);
				var seconds = totalSeconds - minutes * 60;
				return minutes + ':' + seconds;
			}
		},
		
		
		
		countWords: function (str){
			const arr = str.split(' ');
			return arr.filter(word => word !== '').length;
		}, 
		
		registerWPM: function () {
			this.wpm = Math.round(this.wordCount/(this.timeElapsed/1000) * 60) 
			console.log("time elapsed " + this.timeElapsed)	
			console.log("word count " + this.wordCount)
		}, 
		
		stopVoiceControl: function () {
			this.continuous = false
			this.stop = true
			this.initiateVoiceControl()
			clearInterval(this.grabTimeInterval)
			clearInterval(this.registerWPMInterval)
		}, 
	
		reset: function () {
			location.reload()
		}
	
	
	
	
	}//
}//	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
