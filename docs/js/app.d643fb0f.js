(function(t){function e(e){for(var i,a,r=e[0],c=e[1],l=e[2],d=0,u=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&u.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);h&&h(e);while(u.length)u.shift()();return s.push.apply(s,l||[]),o()}function o(){for(var t,e=0;e<s.length;e++){for(var o=s[e],i=!0,r=1;r<o.length;r++){var c=o[r];0!==n[c]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=o[0]))}return t}var i={},n={app:0},s=[];function a(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=i,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(o,i,function(e){return t[e]}.bind(null,i));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/publicspeakingdashboard/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var h=c;s.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},15:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,o){"use strict";o.r(e);var i=o("2b0e"),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("PublicSpeakingDashboard")],1)},s=[],a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"dashboard"},[e("h1",{attrs:{id:"mainTitle"}},[e("img",{attrs:{id:"talking",alt:"image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'",src:"talking.png"}}),t._v(" "+t._s(t.msg)+" ")]),e("p",{attrs:{id:"messageTwo"}},[t._v(" "+t._s(t.msg2)+" ")]),e("p",{attrs:{id:"messageThree"}},[t._v(" "+t._s(t.msg3)+" ")]),e("span",[t.show?t._e():e("button",{staticClass:"optionsButton",style:{backgroundColor:t.WPMColor},attrs:{id:"optionWPM"},on:{click:t.selectWPM}},[t._v(" Words Per Minute")]),t.show?t._e():e("button",{staticClass:"optionsButton",style:{backgroundColor:t.textEmotionColor},attrs:{id:"optionEmotionsText"},on:{click:t.selectTextEmotion}},[t._v(" Emotions in Text")])]),e("span",[t.show?t._e():e("button",{staticClass:"optionsButton",style:{backgroundColor:t.voiceEmotionColor},attrs:{id:"optionEmotionVoice"},on:{click:t.selectVoiceEmotion}},[t._v(" Emotions in Voice")]),t.show?t._e():e("button",{staticClass:"optionsButton",style:{backgroundColor:t.faceEmotionColor},attrs:{id:"optionEmotionsFace"},on:{click:t.selectFaceEmotion}},[t._v(" Emotions in Face")])]),e("br"),e("span",[t.show3?e("button",{attrs:{id:"begin"},on:{click:t.begin}},[t._v("Begin")]):t._e(),t.show3?t._e():e("button",{attrs:{id:"start"},on:{click:t.initiateVoiceControl}},[t._v("Start")]),t.show3?t._e():e("button",{attrs:{id:"stop"},on:{click:t.stopVoiceControl}},[t._v("Stop")]),t.show3?t._e():e("button",{attrs:{id:"reset"},on:{click:t.reset}},[t._v("Reset")])]),e("br"),e("span",{attrs:{id:"rawData"}}),t.showTime?t._e():e("button",{staticClass:"title",attrs:{id:"timer"}},[t._v(t._s(t.time))]),t.show3?t._e():e("ul",{attrs:{id:"output"}}),e("span",[t.show3?t._e():e("button",{attrs:{id:"dataShowButton"},on:{click:t.unhideData}},[t._v("View Raw Data")]),t.show3?t._e():e("button",{attrs:{id:"dataHideButton"},on:{click:t.hideData}},[t._v("Hide Raw Data")])]),e("span",{attrs:{id:"voiceAndFace"}},[t.showTextEmotion?t._e():e("p",{staticClass:"title",attrs:{id:"textEmotion"}},[t._v(" Anger: "+t._s(this.anger)+" "),e("br"),t._v(" Fear: "+t._s(this.fear)+" "),e("br"),t._v(" Excitement: "+t._s(this.excitement)+" "),e("br"),t._v(" Boredom: "+t._s(this.boredom)+" "),e("br"),t._v(" Sadness: "+t._s(this.sadness)+" "),e("br"),t._v(" Happiness: "+t._s(this.happiness)),e("br"),e("img",{staticClass:"chartWindow",attrs:{src:"textEmotions.png"}}),e("br"),e("b",[t._v("Text Emotion (out of 100)")])]),t.showVoiceEmotion?t._e():e("p",{staticClass:"title",attrs:{id:"voiceEmotion"}},[e("img",{staticClass:"chartWindow",attrs:{id:"voiceEmotion",src:"faceEmotions.png"}}),e("br"),e("b",[t._v("Voice Analysis Placeholder")])]),t.showFaceEmotion?t._e():e("p",{staticClass:"title",attrs:{id:"faceEmotion"}},[e("img",{staticClass:"chartWindow",attrs:{id:"faceEmotion",src:"faceEmotions.png"}}),e("br"),e("b",[t._v("Face Analysis Placeholder")])])]),t.showWPM?t._e():e("p",{staticClass:"title",attrs:{id:"wpm"}},[e("img",{staticClass:"chartWindow",attrs:{id:"WPM",src:"WPM.png"}}),e("br"),t._v(" "+t._s(t.wpm)+" "),e("br"),e("b",[t._v("Overall Average Words Per Minute")])])])},r=[],c=(o("1da6"),{name:"publicSpeakingDashboard",props:{},data(){return{msg:"Public Speaking Dashboard",msg2:"An AI-powered tool to help you hone your public speaking skills.",msg3:"",wordsSpoken:"",output:"Recognized Text",workingOutpu:"",workingTime:0,grabTimeInterval:"",registerWPMInterval:"",getEmotionStatsInterval:"",initialTime:0,time:"00:00",timeElapsed:0,timeDifference:0,wordCount:0,totalWords:0,wordCountDividedByTime:0,stop:!1,wpm:0,anger:"",fear:"",excitement:"",boredom:"",sadness:"",happiness:"",continuous:!0,show:!0,show2:!0,show3:!0,show4:!0,showWPM:!0,showTime:!0,showData:!0,WPMSelected:!1,WPMColor:"#CBC3E3",showTextEmotion:!0,textEmotionSelected:!1,textEmotionColor:"#CBC3E3",showVoiceEmotion:!0,voiceEmotionSelected:!1,voiceEmotionColor:"#CBC3E3",showFaceEmotion:!0,faceEmotionSelected:!1,faceEmotionColor:"#CBC3E3",textEmotionData:"",overallDataObject:"",currentDataObject:"",dataNamer:-1}},created:function(){window.SpeechRecognition=window.webkitSpeechRecognition||window.SpeechRecognition;let t=new window.SpeechRecognition;t.start()},methods:{begin:function(){this.show=!1,this.show3=!1,this.msg2="",this.msg3="Select the data you would like to track, click start, and begin speaking."},selectWPM:function(){0==this.WPMSelected?(this.msg2="",this.msg3="",this.WPMSelected=!0,this.WPMColor="#f48d79",1==this.WPMSelected&&(this.showWPM=!1)):(this.WPMSelected=!1,this.WPMColor="#CBC3E3",0==this.WPMSelected&&(this.showWPM=!0))},selectTextEmotion:function(){0==this.textEmotionSelected?(this.msg2="",this.msg3="",this.textEmotionSelected=!0,this.textEmotionColor="#f48d79",1==this.textEmotionSelected&&(this.showTextEmotion=!1)):(this.textEmotionSelected=!1,this.textEmotionColor="#CBC3E3",0==this.textEmotionSelected&&(this.showTextEmotion=!0))},selectVoiceEmotion:function(){0==this.voiceEmotionSelected?(this.msg2="",this.msg3="",this.voiceEmotionSelected=!0,this.voiceEmotionColor="#f48d79",1==this.voiceEmotionSelected&&(this.showVoiceEmotion=!1)):(this.voiceEmotionSelected=!1,this.voiceEmotionColor="#CBC3E3",0==this.voiceEmotionSelected&&(this.showVoiceEmotion=!0))},selectFaceEmotion:function(){0==this.faceEmotionSelected?(this.msg2="",this.msg3="",this.faceEmotionSelected=!0,this.faceEmotionColor="#f48d79",1==this.faceEmotionSelected&&(this.showFaceEmotion=!1)):(this.faceEmotionSelected=!1,this.faceEmotionColor="#CBC3E3",0==this.faceEmotionSelected&&(this.showFaceEmotion=!0))},initiateVoiceControl:function(){console.log("voice recognition initiated"),window.SpeechRecognition=window.webkitSpeechRecognition||window.SpeechRecognition;let t="",e=new window.SpeechRecognition;e.interimResults=!0,e.maxAlternatives=10,e.continuous=this.continuous,e.onresult=e=>{let o="";for(let a=e.resultIndex,r=e.results.length;a<r;a++){let r=e.results[a][0].transcript;if(e.results[a].isFinal){if(t+=r,this.workingTime){this.workingOutput=r,1==this.textEmotionSelected&&this.getEmotionStats(),1==this.WPMSelected&&this.registerWPM();var i=document.createElement("li");if(i.appendChild(document.createTextNode(" "+this.workingTime+": "+this.workingOutput)),this.textEmotionData){this.dataNamer=this.dataNamer+1,this.currentDataObject='{"time":"'+this.workingTime+'","wpm":"'+this.wpm+'","content":"'+this.workingOutput+'",'+this.textEmotionData+",";var n=document.getElementById("rawData");n.innerHTML+=this.currentDataObject}console.log(this.overallDataObject),document.querySelector("ul").appendChild(i),this.workingOutput="";var s=document.getElementById("output");s.scrollTop=s.scrollHeight}}else o+=r}this.wordsSpoken=t,this.output=this.wordsSpoken+=o,this.wordCount=this.countWords(this.output),this.totalWords=this.wordCount},e.start(),1==this.textEmotionSelected||1==this.WPMSelected||1==this.voiceEmotionSelected||1==this.faceEmotionSelected?(0==this.stop&&(this.showTime=!1,console.log("app started"),this.initialTime=Date.now(),this.grabTimeInterval=window.setInterval(this.grabTime,1e3)),1==this.stop&&(clearInterval(this.grabTimeInterval),this.showTime=!1,this.continuous=!0,console.log("app stopped"),e.stop(),this.stop=!1)):this.msg2="No input data selected. Try selecting words per minute or another parameter."},grabTime:function(){this.timeDifference=Date.now()-this.initialTime;var t=e(this.timeDifference);return document.getElementById("timer").innerHTML=""+t,this.workingTime=t,console.log(t),this.timeElapsed=this.timeDifference,this.timeElapsed;function e(t){var e=Math.floor(t/1e3),o=Math.floor(e/60),i=e-60*o;return i<10&&(i="0"+i),o<10&&(o="0"+o),o+":"+i}},countWords:function(t){const e=t.split(" ");return e.filter(t=>""!==t).length},registerWPM:function(){this.wpm=Math.round(this.wordCount/(this.timeElapsed/1e3)*60)},getEmotionStats:function(){const t=o("1da6");t.apiKey="hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw",t.emotion(this.wordsSpoken,"en").then(t=>{let e=JSON.parse(t);this.textEmotionData=t.slice(1),this.anger=Math.round(100*e.emotion.Angry),this.fear=Math.round(100*e.emotion.Fear),this.excitement=Math.round(100*e.emotion.Excited),this.boredom=Math.round(100*e.emotion.Bored),this.sadness=Math.round(100*e.emotion.Sad),this.happiness=Math.round(100*e.emotion.Happy),console.log("emotion data retrieved"+t)}).catch(t=>{console.log(t)})},stopVoiceControl:function(){this.continuous=!1,this.stop=!0,this.initiateVoiceControl(),clearInterval(this.grabTimeInterval)},reset:function(){location.reload()},unhideData:function(){document.getElementById("rawData").style.display="inline-block"},hideData:function(){document.getElementById("rawData").style.display="none"}}}),l=c,h=(o("68e3"),o("2877")),d=Object(h["a"])(l,a,r,!1,null,"3e191e7e",null),u=d.exports,m={name:"App",components:{PublicSpeakingDashboard:u}},p=m,w=(o("9452"),Object(h["a"])(p,n,s,!1,null,null,null)),f=w.exports;i["a"].config.productionTip=!1,new i["a"]({render:t=>t(f)}).$mount("#app")},6:function(t,e){},"68e3":function(t,e,o){"use strict";o("f375")},7:function(t,e){},8:function(t,e){},9:function(t,e){},9452:function(t,e,o){"use strict";o("c3e9")},c3e9:function(t,e,o){},f375:function(t,e,o){}});
//# sourceMappingURL=app.d643fb0f.js.map