(function() {
  angular.module('ngBackImg', []).directive('ngBackImg', function() {
    return function(scope, element, attrs){
      var url = attrs.ngBackImg;
      console.log(url)
      element.css({
        'background-image': 'url(' + url + ')',
        'background-size' : 'cover',
        'width': '100%',
        'height': '150px'
      });
    };
  });

}).call(this);
