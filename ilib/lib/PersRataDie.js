var ilib=require("./ilib.js");var MathUtils=require("./MathUtils.js");var Astro=require("./Astro.js");var RataDie=require("./RataDie.js");var GregorianDate=require("./GregorianDate.js");var PersRataDie=function(e){this.rd=undefined;Astro.initAstro(e&&typeof e.sync==="boolean"?e.sync:true,e&&e.loadParams,ilib.bind(this,function(t){RataDie.call(this,e);if(e&&typeof e.callback==="function"){e.callback(this)}}))};PersRataDie.prototype=new RataDie;PersRataDie.prototype.parent=RataDie;PersRataDie.prototype.constructor=PersRataDie;PersRataDie.prototype.epoch=1948319.5;PersRataDie.prototype._tehranEquinox=function(e){var t,r,a,o,i,n;t=Astro._equinox(e,0);r=t-Astro._deltat(e)/(24*60*60);n=Astro._equationOfTime(t)*360;n=(n-20*Math.floor(n/20))/360;a=r+n;i=52.5/360;o=a+i;return o};PersRataDie.prototype._getYear=function(e){var t=new GregorianDate({julianday:e});var r=t.getYears()-2,a,o={};o.equinox=this._tehranEquinox(r);while(o.equinox>e){r--;o.equinox=this._tehranEquinox(r)}a=o.equinox-1;while(!(Math.floor(o.equinox)+.5<=e&&e<Math.floor(a)+.5)){o.equinox=a;r++;a=this._tehranEquinox(r)}o.year=Math.round((o.equinox-this.epoch-1)/365.24219878)+1;return o};PersRataDie.prototype._setDateComponents=function(e){var t,r,a;r=this.epoch+1+365.24219878*(e.year-2);t={year:e.year-1,equinox:0};while(t.year<e.year){t=this._getYear(r);r=t.equinox+(365.24219878+2)}a=Math.floor(t.equinox)+(e.month<=7?(e.month-1)*31:(e.month-1)*30+6)+(e.day-1+.5);a+=(e.hour*36e5+e.minute*6e4+e.second*1e3+e.millisecond)/864e5;this.rd=a-this.epoch};PersRataDie.prototype._onOrBefore=function(e,t){return e-MathUtils.mod(Math.floor(e)-t-3,7)};module.exports=PersRataDie;