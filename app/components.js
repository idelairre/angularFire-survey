import angular from 'angular';
import edit from './components/edit/edit';
import login from './components/login/login';
import main from './components/main/main';
import nav from './components/nav/nav';
import results from './components/results/results';
import survey from './components/survey/survey';

const components = angular.module('components', [edit, login, main, nav, results, survey])

.name;

export default components;
