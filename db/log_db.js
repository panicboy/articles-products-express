module.exports = (function(){
  var logStorage = [];
  var logSpec = {method: 'string', uri: 'string', client: 'string', timestamp: 'string'};
  // ... functions declared and private variables?!
  // ...
  //...
  function _write(logItem) {
    logStorage.push(logItem);
  }

  function _clear(){
    logStorage = [];
  }

  function _save(){
    console.log('eventually this will write the log do disk');
  }

  function _get(linebreak){
    if(arguments.length === 0) linebreak = '\n';
    let output = '';
    if(logStorage){
      for (var i = 0; i <= logStorage.length - 1; i++) {
        entry = logStorage[i];
        output += entry.timestamp + '  method: ' + entry.method + '  client: ' + entry.client + '  uri: ' + entry.uri + linebreak;
      }
    }
    return output;
  }

  return {
    write: _write,
    clear: _clear,
    save: _save,
    get: _get
  };
})();