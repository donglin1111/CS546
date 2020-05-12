var app = angular.module('app', []);

app.controller('ctrl', function($scope, $window) {
  $scope.cars = $window.data;
  //initialize the values
  var i = 0;
  for(i = 0; i < $scope.cars.length; i++) {
    if($scope.cars[i].image == undefined){
      $scope.cars[i].image = "img/carEmpty.png";
    }   
  }
});

app.filter('search', function() {
  return function(items, keyword) {
    // if no keyword is entered, just display all the items
    if (!keyword) { 
      return items; 
    } 
    // return subset of new items 
    else {
      var newItems = [];
      var keyword = keyword.toLowerCase();
      // create new set of items where the keyword exists in object data
      for (var i of items) {
        if (i.Brand.toLowerCase().indexOf(keyword) > -1 ||             
            checkFeatures(i.features, keyword)) { 
              newItems.push(i); 
            }
      }
      // loop through the features and checking if the keyword exists
      function checkFeatures(mat, keyword) {
        for (var m of mat) {
          if (m.toLowerCase().indexOf(keyword) > -1) {
            return true;
          }
        }
        return false;
      }
      return newItems;
    }
  };
});