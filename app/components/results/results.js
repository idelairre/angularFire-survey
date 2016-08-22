import angular from 'angular';
import constants from '../../constants/constants';
import firebase from 'firebase';

const result = angular.module('result', []).component('resultComponent', {
    template: require('./results.html'),
    controller: function($scope, $firebaseArray) {

        const allResults = firebase.database().ref().child('survey'); // download the data into local object
        const questions = firebase.database().ref().child('questions');
        const labels = firebase.database().ref().child('labels');

        $scope.labels = $firebaseArray(labels);

        $scope.allResults = $firebaseArray(allResults);
        $scope.headings = $firebaseArray(questions);

        $scope.user = localStorage.getItem('lastUser');

        const parseAnswers = (answers, questions) => {
          for (const key in answers) {
            for (const _key in questions) {
              const question = questions[_key];
              if (question.name === key) {
                question.options.forEach(opt => {
                  if (opt.name === answers[key]) {
                    opt.checked = true;
                  }
                });
              }
            }
          }
        }

        const tallyAnswers = parsedQs => {
          let tally = {};
          for (const key in parsedQs) {
            const { options } = parsedQs[key];
            if (typeof options !== 'undefined') {
              options.forEach((opt, i) => {
                  if (opt.checked) {
                    if (!tally[i]) {
                      tally[i] = 1;
                    } else {
                      tally[i] += 1;
                    }
                  }
                });
              }
            }

          return tally;
        }

        const calculatePercent = (tally, questions) => {
          const percentages = {};
          for (const key in tally) {
            const percent = ((tally[key] / questions) * 100).toFixed(2);
            percentages[key] = percent;
          }
          return percentages;
        }

        const showHighest = (percentages) => {
          let highest = 0;
          let highestKey = '';
          let highestLabel = '';
          for (const key in percentages) {
              const entry = percentages[key];
              if (entry > highest) {
                highest = entry;
                highestKey = key;
                highestLabel = $scope.labels[key].title;
              }
          }
          return { highest, highestKey, highestLabel };
        }

        // $scope.labels.$loaded().then(() => {
        //   $scope.labels = $scope.labels.map(label => {
        //     return label.title;
        //   });
        // });

        $scope.headings.$loaded().then(() => {
          const parsedQuestions = {};

          for (const key in $scope.headings) {
            if (typeof $scope.headings[key] !== 'function') {
              parsedQuestions[key] = $scope.headings[key];
              delete parsedQuestions[key].$id;
              delete parsedQuestions[key].$priority;
              parsedQuestions[key].options = parsedQuestions[key].options.map(opt => {
                return {
                  name: opt,
                  checked: false
                }
              });
            }
          }

          $scope.allResults.$loaded().then(() => {
            $scope.allResults.forEach(survey => {
              if (survey.applicant === $scope.user) {
                delete survey.applicant;
                delete survey.timestamp;
                delete survey.$id;
                delete survey.$priority;

                parseAnswers(survey, parsedQuestions)

                $scope.results = parsedQuestions;

                $scope.tally = tallyAnswers(parsedQuestions);

                $scope.percentages = calculatePercent($scope.tally, $scope.headings.length);

                $scope.highest = showHighest($scope.percentages);
              }
            });
          });
        });

        $scope.showIndex = (item) => {
          for (let i = 0; i < item.options.length; i += 1) {
            if (item.options[i].checked) {
              return i ;
            }
          }
        }
    }
})

.name;

export default result;
