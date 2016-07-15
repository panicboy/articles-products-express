module.exports = (function() {
  var productIdStorage = [];
  var productStorage = [];
  var productId = 0;
  var productSpec = {name: 'string', price: 'number', inventory: 'number'};

  function _getById(idToFind, cb) {
    var indx = productIdStorage.indexOf(Number(idToFind));
    console.log('productStorage: ', productStorage);
    console.log('productIdStorage: ', productIdStorage);
    console.log('looking for index: ', indx);
    console.log('product: ', productStorage[indx]);
    if(indx > -1) return cb(productStorage[indx]);
    // otherwise, if no number is found?
    return cb('CANNOT FIND NUMBER BY ID');
  }

  function _getAll(cb) {
    if (!productStorage.length) {
      return cb('no products.');
    }
    return cb(null, productStorage);
  }

  function _newId(){
    return ++productId;
  }

  function _addProduct(theProduct, cb){
    var productCount = productStorage.length;
    var pId = Number(theProduct.id);
    productIdStorage.push(pId);
    return cb(productStorage.push(theProduct) > productCount);
  }

  function _deleteProduct(idToDelete, cb) {
    var indx = productIdStorage.indexOf(idToDelete);
    if(indx > -1) {
      productIdStorage.splice(indx,1);
      return cb(productStorage.splice(indx,1).length > 0);
    }
    return cb(false);
  }

  function _updateProduct(pId, propertiesToUpdate, cb){
    var indx = productIdStorage.indexOf(idToDelete);
    var updateKeys = Object.keys(propertiesToUpdate);
    if(indx > -1){
      for (var i = 0 ; i < updateKeys.length - 1; i++) {
        var prop = updateKeys[i];
        if(!productIdStorage[indx].hasOwnProperty(prop)) return cb(false);
        productIdStorage[indx].prop = propertiesToUpdate.prop;
      }
      return cb(true);
    }
    return cb(false);
  }

  function _getProductSpec() {
    return productSpec;
  }

  return {
    addProduct: _addProduct,
    deleteProduct: _deleteProduct,
    getAll: _getAll,
    getById: _getById,
    getProductSpec: _getProductSpec,
    newId: _newId,
    updateProduct: _updateProduct
  };
})();