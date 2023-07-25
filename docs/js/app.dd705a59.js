(function(t){function e(e){for(var i,a,r=e[0],c=e[1],l=e[2],m=0,d=[];m<r.length;m++)a=r[m],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&d.push(n[a][0]),n[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);h&&h(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),o()}function o(){for(var t,e=0;e<s.length;e++){for(var o=s[e],i=!0,r=1;r<o.length;r++){var c=o[r];0!==n[c]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=o[0]))}return t}var i={},n={app:0},s=[];function a(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=i,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(o,i,function(e){return t[e]}.bind(null,i));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/publicspeakingdashboard/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var h=c;s.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},15:function(t,e){},2:function(t,e){},3:function(t,e){},3732:function(t,e,o){"use strict";o("5871")},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,o){"use strict";o.r(e);var i=o("2b0e"),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("PublicSpeakingDashboard")],1)},s=[],a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"dashboard"},[e("h1",{attrs:{id:"mainTitle"}},[e("img",{attrs:{id:"talking",alt:"image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'",src:"talking.png"}}),t._v(" "+t._s(t.msg)+" ")]),e("p",{attrs:{id:"messageTwo"}},[t._v(" "+t._s(t.msg2)+" ")]),e("p",{attrs:{id:"messageThree"}},[t._v(" "+t._s(t.msg3)+" ")]),e("span",{attrs:{id:"timeHolder"}},[t._v("Time: ")]),e("span",[t.show3?e("button",{attrs:{id:"begin"},on:{click:function(e){t.begin(),t.selectWPM(),t.selectTextEmotion(),t.selectVoiceEmotion(),t.selectFaceEmotion()}}},[t._v("Begin")]):t._e(),t.show3?t._e():e("button",{attrs:{id:"start"},on:{click:t.initiateVoiceControl}},[t._v("Start")]),t.show3?t._e():e("button",{attrs:{id:"stop"},on:{click:t.stopVoiceControl}},[t._v("Stop")]),t.show3?t._e():e("button",{attrs:{id:"reset"},on:{click:t.reset}},[t._v("Reset")])]),e("br"),e("span",{attrs:{id:"rawData"}}),t.showTime?t._e():e("button",{staticClass:"title",attrs:{id:"timer"}},[t._v(t._s(t.time))]),t.show3?t._e():e("ul",{attrs:{id:"output"}}),e("span",[t.show3?t._e():e("button",{attrs:{id:"dataShowButton"},on:{click:t.unhideData}},[t._v("View Raw Data")]),t.show3?t._e():e("button",{attrs:{id:"dataHideButton"},on:{click:t.hideData}},[t._v("Hide Raw Data")])]),t.showWPM?t._e():e("span",{attrs:{id:"wpmChart"}}),t.showTextEmotion?t._e():e("span",{attrs:{id:"textEmotionChart"}}),e("span",{attrs:{id:"voiceAndFace"}},[t.showVoiceEmotion?t._e():e("p",{staticClass:"title",attrs:{id:"voiceEmotion"}},[e("img",{staticClass:"chartWindow",attrs:{id:"voiceEmotion",src:"faceEmotions.png"}}),e("br"),e("b",[t._v("Voice Analysis Placeholder")])]),t.showFaceEmotion?t._e():e("p",{staticClass:"title",attrs:{id:"faceEmotion"}},[e("img",{staticClass:"chartWindow",attrs:{id:"faceEmotion",src:"faceEmotions.png"}}),e("br"),e("b",[t._v("Face Analysis Placeholder")])])])])},r=[],c=(o("14d9"),o("1da6"),o("61cc")),l=o.n(c),h={name:"publicSpeakingDashboard",props:{},data(){return{msg:"Public Speaking Dashboard",msg2:"An AI-powered tool to help you hone your public speaking skills.",msg3:"",wordsSpoken:"START",output:"Recognized Text",workingOutpu:"",workingTime:0,grabTimeInterval:"",registerWPMInterval:"",getEmotionStatsInterval:"",initialTime:0,time:"00:00",timeElapsed:0,timeDifference:0,wordCount:0,totalWords:0,wordCountDividedByTime:0,stop:!1,wpm:0,anger:0,fear:0,excitement:0,boredom:0,sadness:0,happiness:0,continuous:!0,show:!0,show2:!0,show3:!0,show4:!0,showWPM:!0,showTEXTEMOTION:!0,showTime:!0,showData:!0,WPMSelected:!1,WPMColor:"#CBC3E3",showTextEmotion:!0,textEmotionSelected:!1,textEmotionColor:"#CBC3E3",showVoiceEmotion:!0,voiceEmotionSelected:!1,voiceEmotionColor:"#CBC3E3",showFaceEmotion:!0,faceEmotionSelected:!1,faceEmotionColor:"#CBC3E3",textEmotionData:"",overallDataObject:"",currentDataObject:"",dataNamer:0,time1:!0,time2:!1}},created:function(){window.SpeechRecognition=window.webkitSpeechRecognition||window.SpeechRecognition;let t=new window.SpeechRecognition;t.start()},methods:{begin:function(){this.show=!1,this.show3=!1,this.msg2="",this.msg3="Select the data you would like to track, click start, and begin speaking."},selectWPM:function(){0==this.WPMSelected?(this.msg2="",this.msg3="",this.WPMSelected=!0,this.WPMColor="#f48d79",1==this.WPMSelected&&(this.showWPM=!1)):(this.WPMSelected=!1,this.WPMColor="#CBC3E3",0==this.WPMSelected&&(this.showWPM=!0))},selectTextEmotion:function(){0==this.textEmotionSelected?(this.msg2="",this.msg3="",this.textEmotionSelected=!0,this.textEmotionColor="#f48d79",1==this.textEmotionSelected&&(this.showTextEmotion=!1)):(this.textEmotionSelected=!1,this.textEmotionColor="#CBC3E3",0==this.textEmotionSelected&&(this.showTextEmotion=!0))},selectVoiceEmotion:function(){0==this.voiceEmotionSelected?(this.msg2="",this.msg3="",this.voiceEmotionSelected=!0,this.voiceEmotionColor="#f48d79",1==this.voiceEmotionSelected&&(this.showVoiceEmotion=!1)):(this.voiceEmotionSelected=!1,this.voiceEmotionColor="#CBC3E3",0==this.voiceEmotionSelected&&(this.showVoiceEmotion=!0))},selectFaceEmotion:function(){0==this.faceEmotionSelected?(this.msg2="",this.msg3="",this.faceEmotionSelected=!0,this.faceEmotionColor="#f48d79",1==this.faceEmotionSelected&&(this.showFaceEmotion=!1)):(this.faceEmotionSelected=!1,this.faceEmotionColor="#CBC3E3",0==this.faceEmotionSelected&&(this.showFaceEmotion=!0))},initiateVoiceControl:function(){console.log("voice recognition initiated"),window.SpeechRecognition=window.webkitSpeechRecognition||window.SpeechRecognition;let t="",e=new window.SpeechRecognition;e.interimResults=!0,e.maxAlternatives=10,e.continuous=this.continuous,e.onresult=e=>{let o="";for(let a=e.resultIndex,r=e.results.length;a<r;a++){let r=e.results[a][0].transcript;if(e.results[a].isFinal){if(t+=r,this.workingTime){this.workingOutput=r,1==this.textEmotionSelected&&this.getEmotionStats(),1==this.WPMSelected&&this.registerWPM();var i=document.createElement("li");if(i.appendChild(document.createTextNode(" "+this.workingTime+": "+this.workingOutput)),this.textEmotionData){this.currentDataObject='{"time":"'+this.workingTime+'","wpm":"'+this.wpm+'","content":"'+this.workingOutput+'","Angry":'+this.anger+',"Fear":'+this.fear+',"Excited":'+this.excitement+',"Bored":'+this.boredom+',"Sad":'+this.sadness+',"Happy":'+this.happiness+"},";var n=document.getElementById("rawData");n.innerHTML+=this.currentDataObject}console.log(this.overallDataObject),document.querySelector("ul").appendChild(i),this.workingOutput="";var s=document.getElementById("output");s.scrollTop=s.scrollHeight}}else o+=r}this.wordsSpoken=t,this.output=this.wordsSpoken+=o,this.wordCount=this.countWords(this.output),this.totalWords=this.wordCount},e.start(),1==this.textEmotionSelected||1==this.WPMSelected||1==this.voiceEmotionSelected||1==this.faceEmotionSelected?(0==this.stop&&(this.showTime=!1,console.log("app started"),this.initialTime=Date.now(),this.grabTimeInterval=window.setInterval(this.grabTime,1e3)),1==this.stop&&(clearInterval(this.grabTimeInterval),this.showTime=!1,this.continuous=!0,console.log("app stopped"),e.stop(),this.stop=!1)):this.msg2="No input data selected. Try selecting words per minute or another parameter."},grabTime:function(){if(1==this.time1){this.timeDifference=Date.now()-this.initialTime,this.dataNamer=this.timeDifference;var t=document.getElementById("timeHolder");t.innerHTML=this.dataNamer,console.log(this.dataNamer)}if(0==this.time1){this.timeDifference=Date.now()-this.initialTime;var e=parseInt(document.getElementById("timeHolder").innerHTML);console.log(e),this.timeDifference=this.timeDifference+e,this.time2=!0}var o=i(this.timeDifference);function i(t){var e=Math.floor(t/1e3),o=Math.floor(e/60),i=e-60*o;return i<10&&(i="0"+i),o<10&&(o="0"+o),o+":"+i}document.getElementById("timer").innerHTML=""+o,this.workingTime=o,console.log(o),this.timeElapsed=this.timeDifference},countWords:function(t){const e=t.split(" ");return e.filter(t=>""!==t).length},registerWPM:function(){this.wpm=Math.round(this.wordCount/(this.timeElapsed/1e3)*60)},getEmotionStats:function(){const t=o("1da6");t.apiKey="hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw",t.emotion(this.wordsSpoken,"en").then(t=>{let e=JSON.parse(t);this.textEmotionData=t.slice(1),this.anger=Math.round(100*e.emotion.Angry),this.fear=Math.round(100*e.emotion.Fear),this.excitement=Math.round(100*e.emotion.Excited),this.boredom=Math.round(100*e.emotion.Bored),this.sadness=Math.round(100*e.emotion.Sad),this.happiness=Math.round(100*e.emotion.Happy),console.log("emotion data retrieved"+t)}).catch(t=>{console.log(t)})},stopVoiceControl:function(){if(this.continuous=!1,this.stop=!0,this.time1=!1,1==this.time2){this.dataNamer=this.timeDifference;var t=document.getElementById("timeHolder");t.innerHTML=this.dataNamer,console.log(this.dataNamer)}this.visualizeData(),this.initiateVoiceControl(),clearInterval(this.grabTimeInterval)},reset:function(){location.reload()},unhideData:function(){document.getElementById("rawData").style.display="inline-block"},hideData:function(){document.getElementById("rawData").style.display="none"},visualizeData:function(){var t=document.getElementById("rawData").innerHTML,e="["+t.slice(0,-1)+"]",o=JSON.parse(e);if(console.log("raw data:"+o[0].Angry),0==this.showWPM){let t={x:[],y:[],mode:"lines",line:{color:"#f48d79",width:2}};o.forEach((function(e){t.x.push(e["time"]),t.y.push(e["wpm"])}));var i={paper_bgcolor:"#222831",plot_bgcolor:"#222831",title:{text:"Rate of Speech",font:{family:"Arial, sans-serif",size:20,color:"#71c68b"},xref:"paper",automargin:!0,x:.5,xanchor:"center",y:.88,yanchor:"top"},autosize:!0,xaxis:{tickfont:{size:18,color:"#71c68b"},tickcolor:"#36454f",title:{text:"Time",font:{family:"Arial, sans-serif",size:18,color:"#71c68b"}}},yaxis:{margin:{autoexpand:!0},automargin:!0,tickfont:{size:18,color:"#71c68b"},tickcolor:"#36454f",title:{text:"Words Per Minute",font:{family:"Arial, sans-serif",size:18,color:"#71c68b"}}}},n=document.getElementById("wpmChart");l.a.newPlot(n,[t],i)}if(1==this.textEmotionSelected){let t={x:[],y:[],mode:"lines",name:"Anger",line:{color:"#ff6961",width:2}},e={x:[],y:[],mode:"lines",name:"Fear",line:{color:"#fdfd96",width:2}},i={x:[],y:[],mode:"lines",name:"Excitement",line:{color:"#ffb347",width:2}},n={x:[],y:[],mode:"lines",name:"Boredom",line:{color:"#cfcfc4",width:2}},r={x:[],y:[],mode:"lines",name:"Sadness",line:{color:"#FF5733",width:2}},c={x:[],y:[],mode:"lines",name:"Happiness",line:{color:"#77dd77",width:2}};o.forEach((function(o){t.x.push(o["time"]),t.y.push(o["Angry"]),e.x.push(o["time"]),e.y.push(o["Fear"]),i.x.push(o["time"]),i.y.push(o["Excited"]),n.x.push(o["time"]),n.y.push(o["Bored"]),r.x.push(o["time"]),r.y.push(o["Sad"]),c.x.push(o["time"]),c.y.push(o["Happy"])}));var s={paper_bgcolor:"#222831",plot_bgcolor:"#222831",title:{text:"Emotions in Words Spoken",font:{family:"Arial, sans-serif",size:20,color:"#FFC300"},xref:"paper",automargin:!0,x:.8,xanchor:"center",y:.88,yanchor:"top"},autosize:!0,xaxis:{tickfont:{size:16,color:"#FFC300"},tickcolor:"#36454f",title:{text:"Time",font:{family:"Arial, sans-serif",size:18,color:"#FFC300"}}},yaxis:{margin:{autoexpand:!0},automargin:!0,tickfont:{size:16,color:"#FFC300"},tickcolor:"#36454f",title:{text:"Emotions",font:{family:"Arial, sans-serif",size:18,color:"#FFC300"}}}},a=document.getElementById("textEmotionChart");l.a.newPlot(a,[t,e,i,n,r,c],s)}}}},m=h,d=(o("3732"),o("2877")),u=Object(d["a"])(m,a,r,!1,null,"edae8454",null),p=u.exports,f={name:"App",components:{PublicSpeakingDashboard:p}},g=f,w=(o("9452"),Object(d["a"])(g,n,s,!1,null,null,null)),E=w.exports;i["a"].config.productionTip=!1,new i["a"]({render:t=>t(E)}).$mount("#app")},5871:function(t,e,o){},6:function(t,e){},7:function(t,e){},8:function(t,e){},9:function(t,e){},9452:function(t,e,o){"use strict";o("c3e9")},c3e9:function(t,e,o){}});
//# sourceMappingURL=app.dd705a59.js.map