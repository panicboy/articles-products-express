module.exports = (function(){
  const articleHeaderSpec = { version: { format: 'string', value: '1.0'} };
  var titleStorage = [];
  var articleStorage = [];
  var articleSpec = {title: 'string', body: 'string', author: 'string'};
  // ... functions declared and private variables?!
  // ...
  //...
  function _getByTitle(titleToFind, cb) {
    let indx = _articleIndex(titleToFind);
    if(indx > -1) return cb(articleStorage[indx]);
    // otherwise, if no number is found?
    return cb('CANNOT FIND TITLE');
  }

  function _listTitles() { // returns array of title objects
    return articleStorage.map(function(el, i, a) {
      console.log('title: ', el.title, ', urlTitle: ', el.urlTitle);
      return {title: el.title, urlTitle: el.urlTitle};
    });
  }

  function _articleIndex(theTitle){
    return titleStorage.indexOf(theTitle);
  }

  function _all(){
    return articleStorage;
  }

  function _updateArticle(indx, propertiesToUpdate, cb){
    let theArticle =  articleStorage[indx];
    for (var key in propertiesToUpdate) {
      if(!articleStorage[indx].hasOwnProperty(key)) return cb(false);
      console.log(`article ${key}: ${articleStorage[indx][key]}; change to: ${propertiesToUpdate[key]}`);
      articleStorage[indx][key] = propertiesToUpdate[key];
    }
    console.log('updated article: ', articleStorage[indx]);
    return cb(true);
  }

  function _add(theArticle, cb){
     let theTitle = theArticle.title;
     let articleCount = articleStorage.length;
    if(titleStorage.indexOf(theTitle) > -1) return cb(false);
    titleStorage.push(theTitle);
    console.log(`'${theTitle}' stored. Encoded: `, theArticle.urlTitle);
    return cb(articleStorage.push(theArticle) > articleCount);
  }

  function _getArticleSpec(optionalSpec){
    return articleHeaderSpec;
  }

  function _getArticleHeaderSpec(){
    let fullSpec = articleSpec;
    fullSpec.urlTitle = 'string';
    return fullSpec;
  }

  function _deleteArticle(indx, cb){
    titleStorage.splice(indx,1);
    return cb(articleStorage.splice(indx,1).length > 0);
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    getArticleSpec: _getArticleSpec,
    listTitles: _listTitles,
    articleIndex: _articleIndex,
    updateArticle: _updateArticle,
    deleteArticle: _deleteArticle,
    getArticleHeaderSpec: _getArticleHeaderSpec
  };
})();