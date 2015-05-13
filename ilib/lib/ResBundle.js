var ilib=require("./ilib.js");var Utils=require("./Utils.js");var JSUtils=require("./JSUtils.js");var Locale=require("./Locale.js");var LocaleInfo=require("./LocaleInfo.js");var IString=require("./IString.js");var ResBundle=function(e){var t,i;this.locale=new Locale;this.baseName="strings";this.type="text";this.loadParams={};this.missing="source";this.sync=true;if(e){if(e.locale){this.locale=typeof e.locale==="string"?new Locale(e.locale):e.locale}if(e.name){this.baseName=e.name}if(e.type){this.type=e.type}this.lengthen=e.lengthen||false;if(typeof e.sync!=="undefined"){this.sync=e.sync==true}if(typeof e.loadParams!=="undefined"){this.loadParams=e.loadParams}if(typeof e.missing!=="undefined"){if(e.missing==="pseudo"||e.missing==="empty"){this.missing=e.missing}}}this.map={};if(!ResBundle[this.baseName]){ResBundle[this.baseName]={}}t=this.locale.isPseudo()?new Locale("en-US"):this.locale;Utils.loadData({object:ResBundle[this.baseName],locale:t,name:this.baseName+".json",sync:this.sync,loadParams:this.loadParams,callback:ilib.bind(this,function(s){if(!s){s=ilib.data[this.baseName]||{};i=t.getSpec().replace(/-/g,"_");ResBundle[this.baseName].cache[i]=s}this.map=s;if(this.locale.isPseudo()){if(!ResBundle.pseudomap){ResBundle.pseudomap={}}this._loadPseudo(this.locale,e.onLoad)}else if(this.missing==="pseudo"){if(!ResBundle.pseudomap){ResBundle.pseudomap={}}new LocaleInfo(this.locale,{sync:this.sync,loadParams:this.loadParams,onLoad:ilib.bind(this,function(t){var i=new Locale("zxx","XX",undefined,t.getDefaultScript());this._loadPseudo(i,e.onLoad)})})}else{if(e&&typeof e.onLoad==="function"){e.onLoad(this)}}})})};ResBundle.defaultPseudo=ilib.data.pseudomap||{a:"à",e:"ë",i:"í",o:"õ",u:"ü",y:"ÿ",A:"Ã",E:"Ë",I:"Ï",O:"Ø",U:"Ú",Y:"Ŷ"};ResBundle.prototype={_loadPseudo:function(e,t){Utils.loadData({object:ResBundle.pseudomap,locale:e,name:"pseudomap.json",sync:this.sync,loadParams:this.loadParams,callback:ilib.bind(this,function(i){if(!i||JSUtils.isEmpty(i)){i=ResBundle.defaultPseudo;var s=e.getSpec().replace(/-/g,"_");ResBundle.pseudomap.cache[s]=i}this.pseudomap=i;if(typeof t==="function"){t(this)}})})},getLocale:function(){return this.locale},getName:function(){return this.baseName},getType:function(){return this.type},pseudo:function(e){if(!e){return undefined}var t="",i;for(i=0;i<e.length;i++){if(this.type!=="raw"){if(this.type==="html"||this.type==="xml"){if(e.charAt(i)==="<"){t+=e.charAt(i++);while(i<e.length&&e.charAt(i)!==">"){t+=e.charAt(i++)}if(i<e.length){t+=e.charAt(i++)}}else if(e.charAt(i)==="&"){t+=e.charAt(i++);while(i<e.length&&e.charAt(i)!==";"&&e.charAt(i)!==" "){t+=e.charAt(i++)}if(i<e.length){t+=e.charAt(i++)}}}if(i<e.length){if(e.charAt(i)==="{"){t+=e.charAt(i++);while(i<e.length&&e.charAt(i)!=="}"){t+=e.charAt(i++)}if(i<e.length){t+=e.charAt(i)}}else{t+=this.pseudomap[e.charAt(i)]||e.charAt(i)}}}else{t+=this.pseudomap[e.charAt(i)]||e.charAt(i)}}if(this.lengthen){var s;if(t.length<=20){s=Math.round(t.length/2)}else if(t.length>20&&t.length<=40){s=Math.round(t.length/3)}else{s=Math.round(t.length/5)}for(i=s-1;i>=0;i--){t+=i%10}}if(this.locale.getScript()==="Hans"||this.locale.getScript()==="Hant"||this.locale.getScript()==="Hani"||this.locale.getScript()==="Hrkt"||this.locale.getScript()==="Jpan"||this.locale.getScript()==="Hira"||this.locale.getScript()==="Kana"){t=t.replace(/ /g,"")}return t},escapeXml:function(e){e=e.replace(/&/g,"&amp;");e=e.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;");return e},unescapeXml:function(e){e=e.replace(/&amp;/g,"&");e=e.replace(/&lt;/g,"<");e=e.replace(/&gt;/g,">");return e},makeKey:function(e){var t=e.replace(/\s+/gm," ");return this.type==="xml"||this.type==="html"?this.unescapeXml(t):t},getString:function(e,t,i){if(!e&&!t)return new IString("");var s;if(this.locale.isPseudo()){var a=e?e:this.map[t];s=this.pseudo(a||t)}else{var n=t||this.makeKey(e);if(typeof this.map[n]!=="undefined"){s=this.map[n]}else if(this.missing==="pseudo"){s=this.pseudo(e||t)}else if(this.missing==="empty"){s=""}else{s=e}}if(i&&i!=="none"){if(i=="default"){i=this.type}if(i==="xml"||i==="html"){s=this.escapeXml(s)}else if(i=="js"||i==="attribute"){s=s.replace(/'/g,"\\'").replace(/"/g,'\\"')}}if(s===undefined){return undefined}else{var l=new IString(s);l.setLocale(this.locale.getSpec(),true,this.loadParams);return l}},getStringJS:function(e,t,i){return this.getString(e,t,i).toString()},containsKey:function(e,t){if(typeof e==="undefined"&&typeof t==="undefined"){return false}var i=t||this.makeKey(e);return typeof this.map[i]!=="undefined"},getResObj:function(){return this.map}};module.exports=ResBundle;