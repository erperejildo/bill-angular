'use strict';

/**
 * @ngdoc function
 * @name billAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the billAngularJsApp
 */
angular.module('billAngularJsApp')
	.controller('MainCtrl', function($scope, $http) {

		$scope.bill = null;

		$scope.formatDate = function(date) {
			// dd/mm/yyyy format
			date = new Date(date);
			date = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
			return date;
		};

		$http.get('https://still-scrubland-9880.herokuapp.com/bill.json').
		then(function(response) {
			$scope.error = false;
			$scope.bill  = response.data;
			// dates
			$scope.dateFrom  = $scope.formatDate($scope.bill.statement.period.from);
			$scope.dateTo    = $scope.formatDate($scope.bill.statement.period.to);
			$scope.generated = $scope.formatDate($scope.bill.statement.generated);
			$scope.due       = $scope.formatDate($scope.bill.statement.due);
			// total cost
			$scope.total = ($scope.bill.package.total + $scope.bill.callCharges.total + $scope.bill.skyStore.total).toFixed(2);
		}, function(response) {
			$scope.error = true;
		});

		// order data
		$scope.orderSubcriptions = function(predicate) {
			$scope.reverseSub = ($scope.subcription === predicate) ? !$scope.reverseSub : false;
			$scope.subcription = predicate;
		};

		$scope.orderCalls = function(predicate) {
			$scope.reverseCalls = ($scope.call === predicate) ? !$scope.reverseCalls : false;
			$scope.call = predicate;
		};

		$scope.orderRentals = function(predicate) {
			$scope.reverseRentals = ($scope.rental === predicate) ? !$scope.reverseRentals : false;
			$scope.rental = predicate;
		};

		$scope.orderBoughts = function(predicate) {
			$scope.reverseBought = ($scope.bought === predicate) ? !$scope.reverseBought : false;
			$scope.bought = predicate;
		};

	});