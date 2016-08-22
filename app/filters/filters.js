import angular from 'angular';

const filters = angular.module('pollingApp.filters', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}])

.name;

export default filters;
