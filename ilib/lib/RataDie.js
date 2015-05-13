var ilib=require("./ilib.js");var MathUtils=require("./MathUtils.js");var JSUtils=require("./JSUtils.js");var JulianDay=require("./JulianDay.js");var RataDie=function(e){if(e){if(typeof e.date!=="undefined"){var t=e.date;if(!JSUtils.isDate(t)){t=new Date(t)}this._setTime(t.getTime())}else if(typeof e.unixtime!=="undefined"){this._setTime(parseInt(e.unixtime,10))}else if(typeof e.julianday!=="undefined"){this._setJulianDay(parseFloat(e.julianday))}else if(e.year||e.month||e.day||e.hour||e.minute||e.second||e.millisecond||e.parts||e.cycle){this._setDateComponents(e)}else if(typeof e.rd!=="undefined"){this.rd=typeof e.rd==="object"&&e.rd instanceof RataDie?e.rd.rd:e.rd}}if(typeof this.rd==="undefined"){var i=new Date;this._setTime(i.getTime())}};RataDie.gregorianEpoch=1721424.5;RataDie.prototype={epoch:RataDie.gregorianEpoch,_setTime:function(e){this._setJulianDay(2440587.5+e/864e5)},_setJulianDay:function(e){var t=typeof e==="number"?new JulianDay(e):e;this.rd=MathUtils.halfup((t.getDate()-this.epoch)*864e5)/864e5},_onOrBefore:function(e,t){return e-MathUtils.mod(Math.floor(e)-t-2,7)},onOrBefore:function(e,t){t=t||0;return this._onOrBefore(this.rd+t,e)-t},onOrAfter:function(e,t){t=t||0;return this._onOrBefore(this.rd+6+t,e)-t},before:function(e,t){t=t||0;return this._onOrBefore(this.rd-1+t,e)-t},after:function(e,t){t=t||0;return this._onOrBefore(this.rd+7+t,e)-t},getTime:function(){var e=this.getJulianDay();if(e<2440587.5||e>2465442.634803241){return-1}return Math.round((e-2440587.5)*864e5)},getTimeExtended:function(){var e=this.getJulianDay();if(e<-97559412.5||e>102440587.5){return NaN}return Math.round((e-2440587.5)*864e5)},getJulianDay:function(){return this.rd+this.epoch},getRataDie:function(){return this.rd}};module.exports=RataDie;