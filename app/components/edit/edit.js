import angular from 'angular';
import firebase from 'firebase';
import 'angular-xeditable/dist/css/xeditable.css';

const edit = angular.module('edit', []).component('editComponent', {
    template: require('./edit.html'),
    controller: function($scope, $state, $firebaseArray) {
        /* @ngInject */
        const ref = firebase.database().ref().child('survey');
        const questions = firebase.database().ref().child('questions');
        const labels = firebase.database().ref().child('labels');

        $scope.labels = $firebaseArray(labels);

        $scope.editLabel = label => {
            $scope.labels.$save(label);
        };

        $scope.addLabel = label => {
            $scope.labels.$add(label);
        };

        $scope.removeLabel = label => {
            $scope.labels.$remove(label);
        }

        $scope.questions = $firebaseArray(questions);

        $scope.questionData = {
            name: '',
            options: []
        };

        $scope.options = {
            number: undefined
        };

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        $scope.remove = function(item) {
            $scope.questions.$remove(item).then(function(questions) {
                questions.key() == item.$id;
            });
        };

        $scope.addQuestions = function() {
            $scope.questions.$add($scope.questionData).then(function() {
                $scope.questionData = {
                    name: '',
                    options: []
                };
            });
        };

        $scope.addOption = question => {
            $scope.questions.map(q => {
                if (q.name === question) {
                    if (!q.options) {
                        q.options = [];
                        $scope.questions.$save(q);
                    }
                    q.options.push('click to edit question');
                    $scope.questions.$save(q);
                }
            });
        }

        $scope.saveOption = (question, index, data) => {
            questions.child(question.$id).child(`options/${index}`).set(data);
        }

        $scope.items = [
            'text input',
            'text box',
            'checkbox',
            'radio',
            'rating/scale'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }
})

.name;

export default edit;
