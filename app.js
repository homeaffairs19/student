angular.module('registrationApp', [])
    .controller('RegistrationController', function(RegistrationService) {
        var ctrl = this;

        // Initialize registration fields
        ctrl.registration = {
            name: '',
            age: 0,
            random1: '',
            random2: ''
        };

        // Initialize registrations array
        ctrl.registrations = [];

        // Initialize filter value
        ctrl.nameFilter = '';  // This will bind to the input field in HTML for filtering by name

        // Function to submit registration data
        ctrl.submitRegistration = function() {
            // Submit the registration data to the backend
            RegistrationService.submitRegistration(ctrl.registration).then(function(response) {
                console.log('Registration submitted:', response.data);
                ctrl.getRegistrations();  // Refresh the list of registrations
            }, function(error) {
                console.error('Error submitting registration:', error);
            });
        };

        // Function to get all registrations
        ctrl.getRegistrations = function() {
            RegistrationService.getRegistrations().then(function(response) {
                ctrl.registrations = response.data;
            }, function(error) {
                console.error('Error fetching registrations:', error);
            });
        };

        // Fetch registrations on page load
        ctrl.getRegistrations();
    })
    .service('RegistrationService', function($http) {
        this.submitRegistration = function(registration) {
            return $http.post('http://localhost:3000/registrations', registration);
        };

        this.getRegistrations = function() {
            return $http.get('http://localhost:3000/registrations');
        };
    });
