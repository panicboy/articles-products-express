module.exports = (function() {
// EXAMPLES
//  simple validation for property & format:
//    {name: 'string', price: 'number'}
//  validation for property, format & value
//    {name: 'string', price: {format: 'number', value: 12.99}}
 function _validateParams(theObject, paramSpecs){
  console.log('validating...');
  var testParams = props(paramSpecs);
  for (var i = 0; i <= testParams.length -1; i++) {
    let param = testParams[i];
    if(!theObject.hasOwnProperty(param)) return false;
    let oParam = theObject[param];
    var formatSpec = (paramSpecs[param].format ? paramSpecs[param].format : paramSpecs[param]);
    var valueSpec = (paramSpecs[param].value ? paramSpecs[param].value : false);
    if(formatSpec == 'boolean' && boolTest(oParam)) oParam = boolify(oParam);
    if(formatSpec == 'number' && numTest(oParam)) oParam = Number(oParam);
    if(typeof oParam != formatSpec) return false;
    if(valueSpec && oParam != valueSpec) return false;
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

function toCurrencyString(theNum){
  return theNum.toLocaleString(undefined, {minimumFractionDigits: 2, useGrouping: false});
}

function formattedTimeStamp(ymdSeparator, separator, hmsSeparator){
  let timeStampArray = parsedDate();
  let dateArr = timeStampArray.slice(0,3);
  let timeArr = timeStampArray.slice(3);
  return dateArr.join(ymdSeparator).concat(separator,timeArr.join(hmsSeparator));
}

return {
  validateParams: _validateParams
};

});