'use strict';

/* Directives */


angular.module('ramacenApp.directives', [])
	
	.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  
  .directive('myHolder', function() {
    return {
      link: function(scope, element, attrs) {
        attrs.$set('data-src', attrs.myHolder);
        Holder.run({images:element.get(0), nocss:true});
      }
    };
	});

