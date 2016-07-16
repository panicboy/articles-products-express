module.exports = (function(){
  var titleStorage = [];
  var articleStorage = [];
  var articleSpec = {title: 'string', body: 'string', author: 'string'};
  // ... functions declared and private variables?!
  // ...
  //...
    function _getByTitle(titleToFind, cb) {
    let indx = titleStorage.indexOf(titleToFind);
    if(indx > -1) return cb(articleStorage[indx]);
    // otherwise, if no number is found?
    return cb('CANNOT FIND TITLE');
  }

  function _listTitles() {
    return articleStorage.map(function(el, i, a) {
      console.log('title: ', el.title, ', urlTitle: ', el.urlTitle);
      return {title: el.title, urlTitle: el.urlTitle};
    });
  }

  function _all(){
    return 'Hi, all!';
  }

  function _editByTitle(){
    return `I'm totally gonna edit a title.`;
  }

  function _add(theArticle, cb){
     let theTitle = theArticle.title;
     let articleCount = articleStorage.length;
    if(titleStorage.indexOf(theTitle) > -1) return cb(false);
    titleStorage.push(theTitle);
    console.log(`'${theTitle}' stored. Encoded: `, theArticle.urlTitle);
    return cb(articleStorage.push(theArticle) > articleCount);
  }

  function _getArticleSpec(){
    return articleSpec;
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    getArticleSpec: _getArticleSpec,
    listTitles: _listTitles
  };
})();