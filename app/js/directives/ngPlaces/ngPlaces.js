(function() {
  angular.module('ngPlaces', []).directive('ngPlaces', [
    '$ionicTemplateLoader', '$ionicBackdrop', '$q', '$timeout', '$rootScope', '$document', 'ngGPlacesAPI', 'MenusData', function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $document, ngGPlacesAPI, MenusData) {
      return {
        require: '?ngModel',
        restrict: 'E',
        template: '<input type="text" readonly="readonly" class="ion-google-place" autocomplete="off">',
        replace: true,
        link: function(scope, element, attrs, ngModel) {
          var POPUP_TPL, geocoder, popupPromise, searchEventTimeout;
          scope.locations = [];
          scope.locate = window.currLocation.coords;
          geocoder = new google.maps.Geocoder();
          searchEventTimeout = void 0;
          POPUP_TPL = ['<div class="ion-google-place-container">', '<div class="bar bar-header bar-positive item-input-inset">', '<label class="item-input-wrapper">', '<i class="icon ion-ios7-search placeholder-icon"></i>', '<input id="searchQuery" class="google-place-search" type="search" ng-model="searchQuery" placeholder="Enter an address, place or ZIP code">', '</label>', '<button class="button button-clear">', 'Cancel', '</button>', '</div>', '<ion-content class="has-header has-header">', '<ion-list>', '<ion-item ng-repeat="location in locations" type="item-text-wrap" ng-click="selectLocation(location)">', '<h2>{{location.name}}</h2>', '</ion-item>', '</ion-list>', '</ion-content>', '</div>'].join('');
          popupPromise = $ionicTemplateLoader.compile({
            template: POPUP_TPL,
            scope: scope,
            appendTo: $document[0].body
          });
          popupPromise.then(function(el) {
            var onCancel, onClick, searchInputElement;
            searchInputElement = angular.element(el.element.find('input'));
            scope.selectLocation = function(location) {
              ngModel.$setViewValue(location);
              ngModel.$render();
              el.element.css('display', 'none');
              return $ionicBackdrop.release();
            };
            scope.$watch('searchQuery', function(query) {
              if (searchEventTimeout) {
                $timeout.cancel(searchEventTimeout);
              }
              return searchEventTimeout = $timeout(function() {
                if (!query) {
                  return;
                }
                return ngGPlacesAPI.nearbySearch({
                  nearbySearchKeys: ['geometry'],
                  name: query,
                  reference: query,
                  latitude: scope.locate.latitude,
                  longitude: scope.locate.longitude
                }).then(function(data) {
                  MenusData.set(data);
                  console.log(data);
                  scope.locations = data;
                  return scope.vm.locations = data;
                });
              }, 350);
            });
            onClick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              $ionicBackdrop.retain();
              el.element.css('display', 'block');
              searchInputElement[0].focus();
              return setTimeout(function() {
                return searchInputElement[0].focus();
              }, 0);
            };
            onCancel = function(e) {
              scope.searchQuery = '';
              $ionicBackdrop.release();
              return el.element.css('display', 'none');
            };
            element.bind('click', onClick);
            element.bind('touchend', onClick);
            return el.element.find('button').bind('click', onCancel);
          });
          if (attrs.placeholder) {
            element.attr('placeholder', attrs.placeholder);
          }
          ngModel.$formatters.unshift(function(modelValue) {
            if (!modelValue) {
              return '';
            }
            return modelValue;
          });
          ngModel.$parsers.unshift(function(viewValue) {
            return viewValue;
          });
          return ngModel.$render = function() {
            if (!ngModel.$viewValue) {
              return element.val('');
            } else {
              return element.val(ngModel.$viewValue.formatted_address || '');
            }
          };
        }
      };
    }
  ]);

}).call(this);
