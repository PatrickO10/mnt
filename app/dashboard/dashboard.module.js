(function() {
	angular
		.module('app.dashboard', [])
		.controller('DashCtrl', DashCtrl);

	DashCtrl.$inject = ['$http'];

	function DashCtrl($http) {
		/*
		$http({
			method: 'GET',
			url: 'http://svc.metrotransit.org/NexTrip/VehicleLocations/902'
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			//console.log(response);
			console.log(response);
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log(response);
		});
	*/
		//http://svc.metrotransit.org/NexTrip/VehicleLocations/{902}
		//'http://svc.metrotransit.org/NexTrip/Routes'
	}
})();


