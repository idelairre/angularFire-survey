import angular from 'angular';
import constants from '../../constants/constants';
import firebase from 'firebase';

const result = angular.module('result', []).component('resultComponent', {
    template: require('./results.html'),
    controller: function($scope, $firebaseArray) {
        /* @ngInject */

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
                    const answer = JSON.parse(answers[key]).name;
                    if (question.name.replace(/\W/g, '').match(key.replace(/\W/g, ''))) {
                        question.options.forEach(opt => {
                            if (opt.name === answer) {
                                opt.checked = true;
                            }
                        });
                    }
                }
            }
        }

        const createTally = () => {
            const tally = {};
            $scope.labels.forEach(label => {
                tally[label.title] = 0;
            });
            return tally;
        }

        const tallyAnswers = parsedQs => {
            let tally = createTally();
            for (const key in parsedQs) {
                const { options } = parsedQs[key];
                for (const _key in options) {
                    if (options[_key].checked) {
                        tally[options[_key].label] += 1;
                    }
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

        const showHighest = percentages => {
            const labels = $scope.labels.map(label => label.title);
            let highest = 0;
            let highestIndex = 0;
            let highestTitle = '';
            for (const key in percentages) {
                const entry = parseInt(percentages[key]);
                if (entry > highest) {
                    highest = entry;
                    highestTitle = key;
                    highestIndex = labels.indexOf(key);
                }
            }
            return {
                highest,
                title: highestTitle,
                index: highestIndex
            };
        }

        $scope.headings.$loaded().then(() => {
            const parsedQuestions = {};
            for (const key in $scope.headings) {
                if (typeof $scope.headings[key] !== 'function') {
                    parsedQuestions[key] = $scope.headings[key];
                    delete parsedQuestions[key].$id;
                    delete parsedQuestions[key].$priority;
                    parsedQuestions[key].options = parsedQuestions[key].options.map(opt => {
                        return {
                            label: opt.label,
                            name: opt.name,
                            checked: false
                        }
                    });
                }
            }

            $scope.allResults.$loaded().then(() => {
                const userSurveys = [];
                $scope.allResults.forEach(survey => {
                    if (survey.applicant === $scope.user) {
                        userSurveys.push(survey);
                    }
                });

                const survey = userSurveys.pop();

                delete survey.applicant;
                delete survey.timestamp;
                delete survey.$id;
                delete survey.$priority;

                parseAnswers(survey, parsedQuestions);

                $scope.results = parsedQuestions;

                $scope.tally = tallyAnswers(parsedQuestions);

                $scope.percentages = calculatePercent($scope.tally, $scope.headings.length);

                $scope.highest = showHighest($scope.percentages);
            });
        });
    }
})

.name;

export default result;
