import angular from 'angular';
import constants from '../constants/constants';
import firebase from 'firebase';

const services = angular.module('services', ['firebase'])

.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    firebase.initializeApp(constants);
    return $firebaseAuth();
  }
])

.name;

export default services;
