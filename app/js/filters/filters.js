(function(){
  // Takes a number n and creates an array of arrays with each inner array length n.
  // Used for distributing arrays among rows in views.
  // Ex: An array of length 10 called with partition:3 will result in an array containing
  //     4 arrays each of length 3.
  var partition = function($cacheFactory) {
    var arrayCache = $cacheFactory('partition');
    var filter = function(arr, size) {
      if (!arr) { return; }
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      // Enter blank space for any remaining columns in the last row.
      newArr[newArr.length-1].length = size;
      var cachedParts;
      var arrString = JSON.stringify(arr);
      cachedParts = arrayCache.get(arrString+size);
      if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
        return cachedParts;
      }
      arrayCache.put(arrString+size, newArr);
      return newArr;
    };
    return filter;
  };

  partition.$inject = ['$cacheFactory'];

  angular.module('app.filters', [])
    .filter('partition', partition);

}).call(this);
