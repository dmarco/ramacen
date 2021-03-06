'use strict';

/* Controllers */

angular.module('ramacenApp.controllers', [])
  


  
  //==========================================================
  // MAIN
  .controller('MainCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', function($scope, $rootScope, $routeParams, $http, $location) {
    
    // TRAIGO PRODUCTOS Y LOS GUARDO EN ROOT
    $http.get('items/products.json').success(function(data) {
      $rootScope.products = data['ar'];
    });

    // ARMA MENU FILTROS Y LOS GUARDO EN ROOT
    $http.get('items/categories.json').success(function(data) {
      $rootScope.categoriesData = data['ar'];
    });
  
  }])


  

  //==========================================================
  // MAIN
  .controller('BreadcrumbCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

  }])




  //==========================================================
  // HOME
  .controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$filter', function($scope, $rootScope, $routeParams, $location, $filter) {
    
    // CAROUSEL
    $scope.carouselShow = true;

    // TRAIGO PRODUCTOS
    var products = $rootScope.products;
    $scope.items = products;

    // ARMA MENU FILTROS
    $scope.categories = $rootScope.categoriesData;
    $scope.categoryOrder = 'name'; 

    // ORDEN
    $scope.order = [
      { name:'Alfabético', value:'name' },
      { name:'Menor Precio', value:'age' },
      { name:'Mayor Precio', value:'id' },
      { name:'Destacados', value:'snippet' }
    ];
    //$scope.selectOrder = $scope.order[0].value; 

    // PAGINADOR
    $scope.maxSize = 4;
    $scope.bigTotalItems = 22;
    $scope.bigCurrentPage = 1;





    
    // LISTENER ON CHANGE ROUTE 
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      console.log( $location.path() );
    });
    




    /*$scope.categoryNestedMenu = function(url){

      // BUSCA EL VALOR DEL MENU EN CATEGORIAS
      var dataFiltered = $filter('filter')( $scope.categories, function (d) { return d.name === url; })[0];

      // SI TIENE SUBCATEGORIA NESTEA EL MENU
      if( dataFiltered.subcategoria !== undefined ){
        $scope.categories = dataFiltered.subcategoria;
        $scope.categoryOrder = 'name';
      }

      $scope.$apply( $location.path( "/asdasda/" ) );

    }*/

    /*
    // LISTENER ON CHANGE ROUTE 
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      
      // SEPARO URL
      //var arrLocation = $location.path().split('/');

      // TRAE DATA POR PAIS
      var categories = $scope.categories;

      //var filterYesSpace = $filter('yesspace');
      //console.log( filterYesSpace($routeParams.catID) );
 
      // FILTRO DATOS BUSCANDO LA CATEGORIA
      if( $routeParams.catID ){
        
        var categoryID = $routeParams.catID.replace(/-/g, ' ');
        var dataFiltered = $filter('filter')( categories, function (d) { return d.name === categoryID; })[0];

        if( dataFiltered.subcategoria ){
          $scope.categories = dataFiltered.subcategoria;
          $scope.categoryOrder = 'name'; 
        }
        
      }

      // if( arrLocation[1] == arrLocation[arrLocation.length-1] ){
      //   //console.log("poipio");
      // }
      //$scope.breadcrum = arrLocation.splice(1);
   
   });
    */

  }])





  //==========================================================
  // CATEGORIES
  .controller('CategoryFilterCtrl', ['$scope', '$rootScope', '$routeParams', '$filter', function($scope, $rootScope, $routeParams, $filter) {

    $scope.categoryNestedMenu = function(url){

      console.log( $scope.categories , url );
      // ARMA MENU FILTROS
      $scope.categories = $rootScope.categoriesData;

      // BUSCA EL VALOR DEL MENU EN CATEGORIAS
      var dataFiltered = $filter('filter')( $scope.categories, function (d) { return d.name === url; })[0];

      // SI TIENE SUBCATEGORIA NESTEA EL MENU
      if( dataFiltered.subcategoria !== undefined ){
        $scope.categories = dataFiltered.subcategoria;
        $scope.categoryOrder = 'name';
      }

    }
  
  }])


  
  


  //==========================================================
  // DETAIL
  .controller('DetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('items/' + $routeParams.itemId + '.json').success(function(data) {
      $scope.phone = data;
    });
  }])
  




  //==========================================================
  // FOOTER
  .controller('FooterCtrl', ['$scope', function($scope) {

  }])




  //==========================================================
  // NAVIGATION
  .controller('NavCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  	// JSon navbars data
  	console.log("Loading Json....");
    $http.get('/items/nav.json').success(function(data) {
      $scope.navs = data;
      console.log("Json Loaded!");
    });    
  }])




  //==========================================================
  // CAROUSEL
  .controller('CarouselDemoCtrl', ['$scope', function($scope) {
  	$scope.myInterval = 5000;
	  var slides = $scope.slides = [];
	  $scope.addSlide = function() {
	    var newWidth = 601 + slides.length;
	    slides.push({
	      image: 'http://placekitten.com/' + newWidth + '/300',
	      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	    });
	  };
	  for (var i=0; i<4; i++) {
	    $scope.addSlide();
	  }
  }]);


