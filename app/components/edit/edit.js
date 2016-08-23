import angular from 'angular';
import firebase from 'firebase';
import add from './add/add';
import pictures from './pictures/pictures';
import questions from './questions/questions';
import types from './types/types';
import 'angular-xeditable/dist/css/xeditable.css';

const edit = angular.module('edit', [add, pictures, questions, types]).component('editComponent', {
    template: require('./edit.html'),
    controller: function($scope, $state, $firebaseArray) {
        /* @ngInject */
      
        this.questions = firebase.database().ref().child('questions');

        const labels = firebase.database().ref().child('labels');

        $scope.labels = $firebaseArray(labels);

        $scope.questions = $firebaseArray(this.questions);
    }
})

.name;

export default edit;
