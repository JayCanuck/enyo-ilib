var ilib=require("./ilib.js");var CType=require("./CType.js");var IString=require("./IString.js");var isBlank=function(e){var i;switch(typeof e){case"number":i=e;break;case"string":i=IString.toCodePoint(e,0);break;case"undefined":return false;default:i=e._toCodePoint(0);break}return CType._inRange(i,"blank",ilib.data.ctype)};isBlank._init=function(e,i,r){CType._init(e,i,r)};module.exports=isBlank;