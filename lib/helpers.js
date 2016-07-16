module.exports = (function() {
// EXAMPLES
//  simple validation for property & format:
//    {name: 'string', price: 'number'}
//  validation for property, format & value
//    {name: 'string', price: {format: 'number', value: 12.99}}
 function _validateParams(theObject, paramSpecs){
  var testParams = props(paramSpecs);
  for (var i = 0; i <= testParams.length -1; i++) {
    let param = testParams[i];
    if(!theObject.hasOwnProperty(param)) return false;
    let oParam = theObject[param];
    var formatSpec = (paramSpecs[param].format ? paramSpecs[param].format : paramSpecs[param]);
    var valueSpec = (paramSpecs[param].value ? paramSpecs[param].value : false);
    if(formatSpec == 'boolean' && boolTest(theObject[param])) theObject[param] = boolify(theObject[param]);
    if(formatSpec == 'number' && numTest(theObject[param])) theObject[param] = Number(theObject[param]);
    if(typeof theObject[param] != formatSpec) return false;
    if(valueSpec && theObject[param] != valueSpec) return false;
  }
  return true;
}

function boolTest(theVal) {
  return (['true',true,'false', false].indexOf(theVal) >= 0);
}

function numTest(theVal) {
  return (Number(theVal) == theVal);
}

function boolify(theVal) {
  return (theVal == 'true' || theVal === true);
}

function props(obj) {
  return Object.getOwnPropertyNames(obj);
}

function coerceBoolean(theVal) {
  if(boolTest(theVal)) return boolify(theVal);
  return null;
}

function capWord(theWord){
  return theWord.charAt(0).toUpperCase() + theWord.substr(1);
}

function parsedDate(){
  var d = new Date();
  var options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  d = d.toLocaleDateString('en-US', options);
  var dateParts = d.replace(/(\d\d)\/(\d\d)\/(\d{4})[^0-9]+(\d\d):(\d\d):(\d\d)$/i, "$3 $1 $2 $4 $5 $6");
  return dateParts.split(' ');
}

function isNumberString(theNum) {
    return (/\d{1,12}\.?\d{0,2}/i.test(theNum));
}

function _toCurrencyString(theNum){
  return theNum.toLocaleString(undefined, {minimumFractionDigits: 2, useGrouping: false});
}

function _timeStamp(ymdSeparator, separator, hmsSeparator){
  if(arguments.length === 0) {
    ymdSeparator = '-';
    separator = ' ';
    hmsSeparator = ':';
  }
  let timeStampArray = parsedDate();
  let dateArr = timeStampArray.slice(0,3);
  let timeArr = timeStampArray.slice(3);
  return dateArr.join(ymdSeparator).concat(separator,timeArr.join(hmsSeparator));
}

function _cleanAddr(theIpAddress){
  return theIpAddress.split(':').slice(-1).join();
}

function _logEntry(theMethod, theUri, clientAddr, optionalNote){
  let logMsg = {timestamp: _timeStamp(), method: theMethod, uri: theUri, client: _cleanAddr(clientAddr)};
  if(arguments.length == 4) logMsg.note = optionalNote;
  return logMsg;
}

function _objToString(obj) {
    var str = '';
    for(var key in Object.keys(obj)) {
      if (obj.hasOwnProperty(key)) {
        key == 'timestamp' ? str += obj[key] + '\t' : str += key + ': ' + obj[key] + '\t';
      }
    }
    return str;
  }

return {
  cleanAddr: _cleanAddr,
  timeStamp: _timeStamp,
  validateParams: _validateParams,
  logEntry: _logEntry,
  objToString: _objToString
};

})();