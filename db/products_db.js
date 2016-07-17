module.exports = (function() {
  var productIdStorage = [];
  var productStorage = [];
  var productId = 0;
  var productSpec = {name: 'string', price: 'number', inventory: 'number'};

  function _getById(idToFind, cb) {
    let indx = productIdStorage.indexOf(idToFind);
    if(indx > -1) return cb(productStorage[indx]);
    // otherwise, if no number is found?
    return cb('CANNOT FIND NUMBER BY ID');
  }

  function _getAll() {
    if (!productStorage.length) {
      return false;
    }
    return productStorage;
  }

  function _newId(){
    return ++productId;
  }

  function _addProduct(theProduct, cb){
    let productCount = productStorage.length;
    let pId = Number(theProduct.id);
    theProduct.price = Number(theProduct.price);
    theProduct.inventory = Number(theProduct.inventory);
    productIdStorage.push(pId);
    return cb(productStorage.push(theProduct) > productCount);
  }

  function _deleteProduct(idToDelete, cb) {
    let indx = productIdStorage.indexOf(Number(idToDelete));
    if(indx > -1) {
      productIdStorage.splice(indx,1);
      return cb(productStorage.splice(indx,1).length > 0);
    }
    return cb(false);
  }

  function _updateProduct(pId, propertiesToUpdate, cb){
    let indx = productIdStorage.indexOf(Number(pId));
    let updateKeys = Object.keys(propertiesToUpdate);
    if(indx > -1){
      for (var i = 0 ; i <= updateKeys.length - 1; i++) {
        let prop = updateKeys[i];
        if(!productStorage[indx].hasOwnProperty(prop)) return cb(false);
        if(productSpec[prop] == 'number') propertiesToUpdate[prop] = Number(propertiesToUpdate[prop]);
        productStorage[indx][prop] = propertiesToUpdate[prop];
      }
      return cb(true);
    }
    return cb(false);
  }

  function _getProductSpec(optionalSpec) {
    if(arguments.length === 0) return productSpec;
    let fullSpec = productSpec;
    fullSpec.id = 'number';
    return fullSpec;
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