var ilib=require("./ilib.js");var SearchUtils=require("./SearchUtils.js");var MathUtils=require("./MathUtils.js");var Locale=require("./Locale.js");var LocaleInfo=require("./LocaleInfo.js");var TimeZone=require("./TimeZone.js");var IDate=require("./IDate.js");var Calendar=require("./Calendar.js");var Astro=require("./Astro.js");var PersianCal=require("./PersianCal.js");var PersRataDie=require("./PersRataDie.js");var PersianDate=function(e){this.cal=new PersianCal;this.timezone="local";if(e){if(e.locale){this.locale=typeof e.locale==="string"?new Locale(e.locale):e.locale;var t=new LocaleInfo(this.locale);this.timezone=t.getTimeZone()}if(e.timezone){this.timezone=e.timezone}}Astro.initAstro(e&&typeof e.sync==="boolean"?e.sync:true,e&&e.loadParams,ilib.bind(this,function(t){if(e&&(e.year||e.month||e.day||e.hour||e.minute||e.second||e.millisecond)){this.year=parseInt(e.year,10)||0;this.month=parseInt(e.month,10)||1;this.day=parseInt(e.day,10)||1;this.hour=parseInt(e.hour,10)||0;this.minute=parseInt(e.minute,10)||0;this.second=parseInt(e.second,10)||0;this.millisecond=parseInt(e.millisecond,10)||0;this.dayOfYear=parseInt(e.dayOfYear,10);if(typeof e.dst==="boolean"){this.dst=e.dst}this.rd=this.newRd(this);if(!this.tz){this.tz=new TimeZone({id:this.timezone})}this.offset=this.tz._getOffsetMillisWallTime(this)/864e5;if(this.offset!==0){this.rd=this.newRd({rd:this.rd.getRataDie()-this.offset})}}if(!this.rd){this.rd=this.newRd(e);this._calcDateComponents()}if(e&&typeof e.onLoad==="function"){e.onLoad(this)}}))};PersianDate.prototype=new IDate({noinstance:true});PersianDate.prototype.parent=IDate;PersianDate.prototype.constructor=PersianDate;PersianDate.cumMonthLengths=[0,31,62,93,124,155,186,216,246,276,306,336,366];PersianDate.prototype.newRd=function(e){return new PersRataDie(e)};PersianDate.prototype._calcYear=function(e){var t=e+this.rd.epoch;return this.rd._getYear(t).year};PersianDate.prototype._calcDateComponents=function(){var e,t=this.rd.getRataDie();this.year=this._calcYear(t);if(typeof this.offset==="undefined"){if(!this.tz){this.tz=new TimeZone({id:this.timezone})}this.offset=this.tz.getOffsetMillis(this)/864e5}if(this.offset!==0){t+=this.offset;this.year=this._calcYear(t)}var i=this.newRd({year:this.year,month:1,day:1,hour:0,minute:0,second:0,millisecond:0});e=t-i.getRataDie()+1;this.dayOfYear=e;this.month=SearchUtils.bsearch(Math.floor(e),PersianDate.cumMonthLengths);e-=PersianDate.cumMonthLengths[this.month-1];this.day=Math.floor(e);e-=this.day;e=Math.round(e*864e5);this.hour=Math.floor(e/36e5);e-=this.hour*36e5;this.minute=Math.floor(e/6e4);e-=this.minute*6e4;this.second=Math.floor(e/1e3);e-=this.second*1e3;this.millisecond=e};PersianDate.prototype.getDayOfWeek=function(){var e=Math.floor(this.getRataDie());return MathUtils.mod(e-3,7)};PersianDate.prototype.getDayOfYear=function(){return PersianDate.cumMonthLengths[this.month-1]+this.day};PersianDate.prototype.getEra=function(){return this.year<1?-1:1};PersianDate.prototype.getCalendar=function(){return"persian"};IDate._constructors["persian"]=PersianDate;module.exports=PersianDate;