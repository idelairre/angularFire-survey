import angular from 'angular';
import firebase from 'firebase';
import constants from '../../constants/constants';

const survey = angular.module('survey', [])
    .controller('surveyController', ['$scope', '$state', '$firebaseArray', '$uibModalInstance',
        function($scope, $state, $firebaseArray, $uibModalInstance) {
            /* @ngInject */

            const VALID_FIREBASE_KEY = /[^a-zA-Z0-9 ]/g;

            const formatKeys = formData => {
              for (const key in formData) {
                if ({}.hasOwnProperty.call(formData, key)) {
                  if (key.match(VALID_FIREBASE_KEY)) {
                    const newKey = key.replace(VALID_FIREBASE_KEY, '');
                    formData[newKey] = formData[key];
                    delete formData[key];
                  }
                }
              }
              return formData;
            }

            const ref = firebase.database().ref().child('survey');
            const questions = firebase.database().ref().child('questions');

            $scope.buttonText = 'Send results';

            $scope.questions = $firebaseArray(questions);

            // create a synchronized array
            $scope.surveys = $firebaseArray(ref);

            // timestamp
            $scope.timestamp = new Date().getTime();

            // store data in this object
            // and set default values
            $scope.formData = {
                timestamp: $scope.timestamp
            };

            /**
             * Update rating score to object.
             * @param {Number} rating - Star rating score.
             */
            $scope.updateRating = rating => {
                $scope.formData.rating = rating;
            };

            /**
             * Add survey to Firebase database.
             */
            $scope.addSurvey = () => {
                if ($scope.formData) {
                    // change button to loading state
                    localStorage.setItem('lastUser', $scope.formData.applicant);

                    const formData = formatKeys($scope.formData);

                    $scope.buttonText = 'loading...';
                    // push data to Firebase
                    $scope.surveys.$add(formData).then(() => {
                        // show success information/alert
                        $scope.successInfo = true;
                        $scope.buttonText = 'Send result';
                        setTimeout($scope.ok, 300);
                    }).catch(err => console.error(err));
                }
            };

            $scope.ok = () => {
                $uibModalInstance.close();
                $state.go('result');
            };

            $scope.cancel = () => {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ])

.name;

export default survey;
