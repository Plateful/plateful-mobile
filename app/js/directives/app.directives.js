(function() {
  angular.module('app.directives', [
    "ngSelect",
    "ngRater",
    "ngPlaces",
    "ngBackImg",
    "ngAutocomplete",
    // "googleAutocomplete"
  ])
  .directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    console.log(element.val())
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

}).call(this);
