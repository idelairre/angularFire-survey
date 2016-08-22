webpackJsonp([0],{0:function(module,exports,__webpack_require__){__webpack_require__(1),module.exports=__webpack_require__(298)},298:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),_btnRadio=__webpack_require__(301),_components=(_interopRequireDefault(_btnRadio),__webpack_require__(302)),_components2=_interopRequireDefault(_components),_routes=__webpack_require__(323),_routes2=_interopRequireDefault(_routes),_services=__webpack_require__(324),_services2=_interopRequireDefault(_services),_angularUiRouter=__webpack_require__(325),_angularUiRouter2=_interopRequireDefault(_angularUiRouter);__webpack_require__(304),__webpack_require__(326),__webpack_require__(328),__webpack_require__(330),__webpack_require__(332),__webpack_require__(333),_angular2["default"].module("pollingApp",["xeditable","ngAnimate","ngSanitize","ui.bootstrap",_angularUiRouter2["default"],_components2["default"],_services2["default"]]).config(_routes2["default"]).run(["$rootScope","$location","Auth",function($rootScope,$location,Auth){Auth.$onAuthStateChanged(function(authData){$rootScope.authData=authData}),$rootScope.logout=function(){Auth.$signOut(),$location.path("/survey")},$rootScope.$on("$routeChangeError",function(event,next,previous,error){"AUTH_REQUIRED"===error&&$location.path("/survey")})}]).run(function(editableOptions){editableOptions.theme="bs3"})},301:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),btnRadio=_angular2["default"].module("pollingApp.directives",["ngRoute"]).directive("btnRadio",[function(){var activeClass="active",toggleEvent="click";return{require:"ngModel",link:function(scope,element,attrs,ngModelCtrl){ngModelCtrl.$render=function(){element.toggleClass(activeClass,_angular2["default"].equals(ngModelCtrl.$modelValue,scope.$eval(attrs.btnRadio)))},element.bind(toggleEvent,function(){element.hasClass(activeClass)||scope.$apply(function(){ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio)),ngModelCtrl.$render()})})}}}]);exports["default"]=btnRadio},302:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),_edit=__webpack_require__(303),_edit2=_interopRequireDefault(_edit),_login=__webpack_require__(311),_login2=_interopRequireDefault(_login),_main=__webpack_require__(313),_main2=_interopRequireDefault(_main),_nav=__webpack_require__(316),_nav2=_interopRequireDefault(_nav),_results=__webpack_require__(318),_results2=_interopRequireDefault(_results),_survey=__webpack_require__(321),_survey2=_interopRequireDefault(_survey),components=_angular2["default"].module("components",[_edit2["default"],_login2["default"],_main2["default"],_nav2["default"],_results2["default"],_survey2["default"]]).name;exports["default"]=components},303:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),_firebase=__webpack_require__(304),_firebase2=_interopRequireDefault(_firebase);__webpack_require__(306);var edit=_angular2["default"].module("edit",[]).component("editComponent",{template:__webpack_require__(310),controller:function($scope,$state,$firebaseArray){var questions=(_firebase2["default"].database().ref().child("survey"),_firebase2["default"].database().ref().child("questions")),labels=_firebase2["default"].database().ref().child("labels");$scope.labels=$firebaseArray(labels),$scope.editLabel=function(label){$scope.labels.$save(label)},$scope.addLabel=function(label){$scope.labels.$add(label)},$scope.removeLabel=function(label){$scope.labels.$remove(label)},$scope.questions=$firebaseArray(questions),$scope.questionData={name:"",options:[]},$scope.options={number:void 0},$scope.getNumber=function(num){return new Array(num)},$scope.remove=function(item){$scope.questions.$remove(item).then(function(questions){questions.key()==item.$id})},$scope.addQuestions=function(){$scope.questions.$add($scope.questionData).then(function(){$scope.questionData={name:"",options:[]}})},$scope.addOption=function(question){$scope.questions.map(function(q){q.name===question&&(q.options||(q.options=[],$scope.questions.$save(q)),q.options.push("click to edit question"),$scope.questions.$save(q))})},$scope.saveOption=function(question,index,data){questions.child(question.$id).child("options/"+index).set(data)},$scope.items=["text input","text box","checkbox","radio","rating/scale"],$scope.status={isopen:!1},$scope.toggleDropdown=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.status.isopen=!$scope.status.isopen}}}).name;exports["default"]=edit},310:function(module,exports){module.exports='<div class="container">\r\n    <h2 class="modal-title">Survey Questions</h2>\r\n    <hr>\r\n    <div class="panel panel-default" ng-repeat="question in questions track by $index">\r\n        <div class="panel-heading" editable-text="question.name" onaftersave="questions.$save(question)">Question: "{{ question.name }}"<a class="pull-right" ng-click="remove(question)"><span class="glyphicon glyphicon-remove"></span></a></div>\r\n        <div class="panel-body">\r\n            <span uib-dropdown on-toggle="toggled(open)">\r\n          <a href uib-dropdown-toggle>\r\n            type: {{ question.type }}\r\n          </a>\r\n          <ul class="dropdown-menu" uib-dropdown-menu>\r\n            <li ng-repeat="choice in items">\r\n              <a href ng-click="question.type = choice; questions.$save(question); question.options = []; questions.$save(question)">{{choice}}</a>\r\n            </li>\r\n          </ul>\r\n        </span>\r\n            <font ng-if="qustion.scale"> scale: {{ question.scale }}</font>\r\n        </div>\r\n        <div class="panel-footer" ng-if="question.type === \'radio\' || question.type === \'checkbox\'">Options:<a class="pull-right" ng-click="addOption(question.name)"><span class="glyphicon glyphicon-plus"></span></a></div>\r\n        <ul class="list-group" ng-if="question.type === \'radio\' || question.type === \'checkbox\'">\r\n            <li class="list-group-item" ng-repeat="option in question.options track by $index" editable-text="option" onaftersave="saveOption(question, $index, $data)">{{ $index + 1 }}: {{ option }}</li>\r\n        </ul>\r\n    </div>\r\n    <hr>\r\n    <h2 class="modal-title">Label Answers</h2>\r\n    <hr>\r\n    <div class="input-group">\r\n        <input type="text" class="form-control" placeholder="Add label..." ng-model="label.title">\r\n        <span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="addLabel(label)">add</button></span>\r\n    </div>\r\n    <!-- /input-group -->\r\n    <br>\r\n    <div class="panel panel-default">\r\n        <ul class="list-group">\r\n            <li class="list-group-item" ng-repeat="label in labels">{{ $index }}: {{ label.title }}<a class="pull-right" ng-click="removeLabel(label)"><span class="glyphicon glyphicon-remove"></span></a></li>\r\n        </ul>\r\n    </div>\r\n    <hr>\r\n    <h2 class="modal-title">Result Pictures</h2>\r\n    <hr>\r\n    <div class="media" ng-repeat="label in labels">\r\n        <div class="media-left media-middle">\r\n            <a href="#">\r\n                <img class="media-object" height="100" width="100" ng-src="{{ label.img || \'http://rs901.pbsrc.com/albums/ac215/KenkoKimche/Random%20Gif/Pyong%20Gifs/Wave.gif~c200\' }}" alt="...">\r\n            </a>\r\n        </div>\r\n        <div class="media-body">\r\n            <h4 class="media-heading">{{ label.title }}</h4>\r\n            <div class="input-group">\r\n                <input type="text" class="form-control" placeholder="Add image src..." ng-model="label.img">\r\n                <span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="editLabel(label)">set</button></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <h2 class="modal-title">Add Questions</h2>\r\n    <hr>\r\n    <!-- input box -->\r\n    <div class="form-group">\r\n        <label>Question Name</label>\r\n        <input type="text" class="form-control" name="name" ng-model="questionData.name">\r\n    </div>\r\n    <fieldset>\r\n        <label>Question Type</label>\r\n        <div class="radio">\r\n            <label>\r\n                <input type="radio" name="optionsRadios" value="text" ng-model="questionData.type">text input (short answer)\r\n            </label>\r\n        </div>\r\n        <div class="radio">\r\n            <label>\r\n                <input type="radio" name="optionsRadios" value="textbox" ng-model="questionData.type">text box (long answer)\r\n            </label>\r\n        </div>\r\n        <div class="radio">\r\n            <label>\r\n                <input type="radio" name="optionsRadios" value="checkbox" ng-model="questionData.type">checkboxes (multiple choices/multiple answers)\r\n            </label>\r\n        </div>\r\n        <div class="form-group" ng-if="questionData.type == \'checkbox\'">\r\n            <label>number of options</label>\r\n            <input type="number" class="form-control" placeholder="from 0 to ?" ng-model="options.number" min="2">\r\n        </div>\r\n        <div class="form-group" ng-repeat="i in getNumber(options.number) track by $index" ng-if="questionData.type == \'checkbox\'">\r\n            <label>option {{ $index + 1 }} name</label>\r\n            <input type="text" class="form-control" placeholder="option name" ng-model="questionData.options[$index]">\r\n        </div>\r\n        <div class="radio">\r\n            <label>\r\n                <input type="radio" name="optionsRadios" value="radio" ng-model="questionData.type">radio buttions (multiple choices/single answer)\r\n            </label>\r\n        </div>\r\n        <div class="form-group" ng-if="questionData.type == \'radio\'">\r\n            <label>number of options</label>\r\n            <input type="number" class="form-control" placeholder="from 0 to ?" ng-model="options.number" min="2">\r\n        </div>\r\n        <div class="form-group" ng-repeat="i in getNumber(options.number) track by $index" ng-if="questionData.type == \'radio\' && questionData.options">\r\n            <label>option {{ $index + 1 }} name</label>\r\n            <input type="text" class="form-control" placeholder="option name" ng-model="questionData.options[$index]">\r\n        </div>\r\n        <div class="radio">\r\n            <label>\r\n                <input type="radio" name="optionsRadios" value="rating" ng-model="questionData.type">rating/scale\r\n            </label>\r\n        </div>\r\n        <div class="form-group" ng-if="questionData.type == \'rating\'">\r\n            <label>rating scale</label>\r\n            <input type="number" class="form-control" placeholder="from 0 to ?" ng-model="questionData.scale" min="0">\r\n        </div>\r\n    </fieldset>\r\n    <button type="button" class="btn btn-primary" id="addButton" data-loading-text="Sending..." ng-click="addQuestions()">Add question</button>\r\n</div>\r\n'},311:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),login=_angular2["default"].module("login",[]).component("loginComponent",{template:__webpack_require__(312),controller:function($scope,$state,Auth){$scope.loginText="Sign in",$scope.login=function(){console.log($scope.email),console.log($scope.password),$scope.authData=null,$scope.error=null,$scope.loginText="Loading...",Auth.$signInWithEmailAndPassword($scope.email,$scope.password).then(function(authData){$scope.authData=authData,$scope.loginText="Sign in successful",setTimeout($state.go("edit"),700)})["catch"](function(error){$scope.error=error,$scope.loginText="Sign in"})}}}).name;exports["default"]=login},312:function(module,exports){module.exports='<div class="container">\r\n  <h2>Login Page</h2>\r\n\r\n  <hr>\r\n\r\n  <form class="form-horizontal" role="form">\r\n      <div class="form-group">\r\n          <label for="inputEmail" class="col-lg-2 control-label">Email</label>\r\n          <div class="col-lg-4">\r\n              <input type="email" class="form-control" id="inputEmail" placeholder="Email" ng-model="email">\r\n          </div>\r\n      </div>\r\n      <div class="form-group">\r\n          <label for="inputPassword" class="col-lg-2 control-label">Password</label>\r\n          <div class="col-lg-4">\r\n              <input type="password" class="form-control" id="inputPassword" placeholder="Password" ng-model="password">\r\n          </div>\r\n      </div>\r\n      <div class="form-group">\r\n          <div class="col-lg-offset-2 col-lg-10">\r\n              <button type="submit" class="btn btn-default" id="loginButton" ng-click="login()">{{ loginText }}</button>\r\n          </div>\r\n      </div>\r\n      <p ng-show="error" class="alert alert-warning">{{error}}</p>\r\n  </form>\r\n</div>\r\n'},313:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),main=_angular2["default"].module("main",["ui.bootstrap","nav","survey"]).component("mainComponent",{template:__webpack_require__(314),controller:function($scope,$uibModal){$scope.successInfo=!1,$scope.takeSurvey=function(){var modalInstance=$uibModal.open({animation:!0,ariaLabelledBy:"survey",ariaDescribedBy:"modal-body",template:__webpack_require__(315),controller:"surveyController",size:"lg"});modalInstance.result.then(function(){},function(){})}}}).name;exports["default"]=main},314:function(module,exports){module.exports='<div class="container">\r\n    <h2>AngularFire Survey</h2>\r\n\r\n    <hr>\r\n\r\n    <ul>\r\n        <li>An open source online survey tool.</li>\r\n        <li>Based on AngularFire, AngularJS, Bootstrap and Firebase.</li>\r\n        <li>Easy to set up without worrying about server code.</li>\r\n    </ul>\r\n\r\n    <hr>\r\n\r\n    <button type="button" class="btn btn-primary pull-right" ng-click="takeSurvey()" ng-hide="successInfo">Take the Survey</button>\r\n\r\n    <!-- success information/alert -->\r\n    <div class="alert alert-success alert-dismissable" ng-show="successInfo">\r\n        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\r\n        <strong>Thank you for your feedback!</strong>.\r\n    </div>\r\n</div>\r\n'},315:function(module,exports){module.exports='<!-- survey detail modal dialog -->\r\n<div class="modal-content">\r\n    <div class="modal-header">\r\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\r\n        <h4 class="modal-title">Survey Questions</h4>\r\n    </div>\r\n    <div class="modal-body">\r\n        <label>Enter your name</label>\r\n        <input type="text" class="form-control" ng-model="formData.applicant">\r\n        <hr>\r\n        <form class="" ng-repeat="question in questions" ng-init="questionIndex = $index">\r\n            <div class="form-group">\r\n                <label>{{ $index + 1 }}: {{ question.name }}</label>\r\n                <input type="text" class="form-control" name="{{ question.name }}" ng-model="formData[question.name]" ng-if="question.type == \'text\'">\r\n                <textarea class="form-control" rows="2" name="{{ question.name }}" ng-model="formData[question.name]" ng-if="question.type == \'textbox\'"></textarea>\r\n                <div ng-repeat="option in question.options" ng-if="question.options && question.type == \'checkbox\'">\r\n                    <label class="checkbox-inline">\r\n                        <input type="checkbox" id="inlineCheckbox{{ $index }}" name="{{ question.name }}" value="{{ option }}" ng-model="formData[question.name]" ng-true-value="\'{{ option }}\'" ng-false-value="\'nil\'"> {{ option }}\r\n                    </label>\r\n                </div>\r\n                <div ng-repeat="option in question.options" name="{{ question.name }}" ng-if="question.options && question.type == \'radio\'">\r\n                    <label class="checkbox-inline">\r\n                        <input type="radio" id="inlineRadio{{ $index }}" name="{{ question.name }}" value="{{ option }}" ng-model="formData[question.name]" ng-true-value="\'{{ option }}\'"> {{ option }}\r\n                    </label>\r\n                </div>\r\n                <div class="form-group" ng-if="question.type == \'rating\'">\r\n                    <rating ng-model="formData[question.name]" max="{{ question.scale }}" readonly="isReadonly" on-hover="hoveringOver(value)" on-leave="overStar = null" titles="[\'one\',\'two\',\'three\']"></rating>\r\n                </div>\r\n            </div>\r\n        </form>\r\n        <div class="modal-footer">\r\n            <button type="button" class="btn btn-default" ng-click="cancel()">Close</button>\r\n            <button type="button" class="btn btn-primary" id="addButton" ng-click="addSurvey()">{{ buttonText }}</button>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n<!-- /.modal -->\r\n'},316:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),nav=_angular2["default"].module("nav",["firebase"]).component("navComponent",{template:__webpack_require__(317),controller:function($scope,Auth){$scope.authData=Auth.$getAuth(),Auth.$onAuthStateChanged(function(firebaseUser){firebaseUser?$scope.authData=firebaseUser.uid:$scope.authData=null}),$scope.logout=function(){Auth.$signOut()}}}).name;exports["default"]=nav},317:function(module,exports){module.exports='<!-- Navigation -->\r\n<nav class="navbar navbar-default" role="navigation">\r\n   <div class="container">\r\n      <div class="navbar-header">\r\n         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\r\n            <span class="sr-only">Toggle navigation</span>\r\n            <span class="icon-bar"></span>\r\n            <span class="icon-bar"></span>\r\n            <span class="icon-bar"></span>\r\n         </button>\r\n         <a class="navbar-brand" href="#/">AngularFire Survey</a>\r\n      </div>\r\n\r\n       <ul class="nav navbar-nav">\r\n          <li ng-show="authData"><a href="#/edit">Edit the Survey</a>\r\n          </li>\r\n<!--\r\n          <li ng-show="authData"><a href="#/result" disabled>Survey Result</a>\r\n          </li>\r\n-->\r\n       </ul>\r\n       <ul class="nav navbar-nav navbar-right">\r\n          <li ng-hide="authData" class="active"><a href="#/login">Login</a>\r\n          </li>\r\n          <li ng-show="authData"><a href ng-click="logout()">Logout</a>\r\n          </li>\r\n       </ul>\r\n      <!-- /.navbar-collapse -->\r\n   </div>\r\n   <!-- /.container -->\r\n</nav>\r\n'},318:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),_constants=__webpack_require__(319),_firebase=(_interopRequireDefault(_constants),__webpack_require__(304)),_firebase2=_interopRequireDefault(_firebase),result=_angular2["default"].module("result",[]).component("resultComponent",{template:__webpack_require__(320),controller:function($scope,$firebaseArray){var allResults=_firebase2["default"].database().ref().child("survey"),questions=_firebase2["default"].database().ref().child("questions"),labels=_firebase2["default"].database().ref().child("labels");$scope.labels=$firebaseArray(labels),$scope.allResults=$firebaseArray(allResults),$scope.headings=$firebaseArray(questions),$scope.user=localStorage.getItem("lastUser");var parseAnswers=function(answers,questions){var _loop=function(key){for(var _key in questions){var question=questions[_key];question.name===key&&question.options.forEach(function(opt){opt.name===answers[key]&&(opt.checked=!0)})}};for(var key in answers)_loop(key)},tallyAnswers=function(parsedQs){var tally={};for(var key in parsedQs){var options=parsedQs[key].options;"undefined"!=typeof options&&options.forEach(function(opt,i){opt.checked&&(tally[i]?tally[i]+=1:tally[i]=1)})}return tally},calculatePercent=function(tally,questions){var percentages={};for(var key in tally){var percent=(tally[key]/questions*100).toFixed(2);percentages[key]=percent}return percentages},showHighest=function(percentages){var highest=0,highestKey="",highestLabel="";for(var key in percentages){var entry=percentages[key];entry>highest&&(highest=entry,highestKey=key,highestLabel=$scope.labels[key].title)}return{highest:highest,highestKey:highestKey,highestLabel:highestLabel}};$scope.headings.$loaded().then(function(){var parsedQuestions={};for(var key in $scope.headings)"function"!=typeof $scope.headings[key]&&(parsedQuestions[key]=$scope.headings[key],delete parsedQuestions[key].$id,delete parsedQuestions[key].$priority,parsedQuestions[key].options=parsedQuestions[key].options.map(function(opt){return{name:opt,checked:!1}}));$scope.allResults.$loaded().then(function(){$scope.allResults.forEach(function(survey){survey.applicant===$scope.user&&(delete survey.applicant,delete survey.timestamp,delete survey.$id,delete survey.$priority,parseAnswers(survey,parsedQuestions),$scope.results=parsedQuestions,$scope.tally=tallyAnswers(parsedQuestions),$scope.percentages=calculatePercent($scope.tally,$scope.headings.length),$scope.highest=showHighest($scope.percentages))})})}),$scope.showIndex=function(item){for(var i=0;i<item.options.length;i+=1)if(item.options[i].checked)return i}}}).name;exports["default"]=result},319:function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var constants={apiKey:"AIzaSyBxgACRnMbApl7nH5uApDQrSW5vjy4r9Tw",authDomain:"torid-fire-2372.firebaseapp.com",databaseURL:"https://torid-fire-2372.firebaseio.com",storageBucket:"torid-fire-2372.appspot.com"};exports["default"]=constants},320:function(module,exports){module.exports='<div class="container">\r\n  <h2>Survey Result</h2>\r\n  <hr>\r\n  <h3>You got... {{ labels[highest.highestKey].title }}</h3>\r\n  <img ng-src="{{ labels[highest.highestKey].img }}" />\r\n\r\n  <!-- <table class="table table-hover">\r\n      <tr>\r\n          <th ng-repeat="header in headings">{{ header.name }}</th>\r\n      </tr>\r\n      <tr ng-repeat="result in allResults | orderBy: \'-timestamp\'">\r\n          <td ng-repeat="header in headings">{{ header.options.indexOf(result[header.name]) }} : {{result[header.name]}}</td>\r\n      </tr>\r\n  </table> -->\r\n\r\n  <h1>{{ user }}\'s answers:</h1>\r\n\r\n  <table class="table table-hover">\r\n      <tr>\r\n          <th ng-repeat="label in labels">{{ label.title }}</th>\r\n      </tr>\r\n      <tr>\r\n          <td ng-repeat="(key, val) in percentages">% {{ val }}</td>\r\n      </tr>\r\n  </table>\r\n</div>\r\n'},321:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _jquery=__webpack_require__(322),_angular=(_interopRequireDefault(_jquery),__webpack_require__(299)),_angular2=_interopRequireDefault(_angular),_firebase=__webpack_require__(304),_firebase2=_interopRequireDefault(_firebase),_constants=__webpack_require__(319),survey=(_interopRequireDefault(_constants),_angular2["default"].module("survey",[]).controller("surveyController",["$scope","$state","$firebaseArray","$uibModalInstance",function($scope,$state,$firebaseArray,$uibModalInstance){var ref=_firebase2["default"].database().ref().child("survey"),questions=_firebase2["default"].database().ref().child("questions");$scope.buttonText="Send results",$scope.questions=$firebaseArray(questions),$scope.surveys=$firebaseArray(ref),$scope.timestamp=(new Date).getTime(),$scope.formData={timestamp:$scope.timestamp},$scope.updateRating=function(rating){$scope.formData.rating=rating},$scope.addSurvey=function(){$scope.formData?(localStorage.setItem("lastUser",$scope.formData.applicant),$scope.buttonText="loading...",$scope.surveys.$add($scope.formData).then(function(){$scope.successInfo=!0,$scope.buttonText="Send result",setTimeout($scope.ok,300)})):alert("Please complete all questions before submitting.")},$scope.ok=function(){$uibModalInstance.close(),$state.go("result")},$scope.cancel=function(){$uibModalInstance.dismiss("cancel")}}]).name);exports["default"]=survey},323:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),routes=(_interopRequireDefault(_angular),function($stateProvider,$urlRouterProvider){$stateProvider.state("login",{url:"/login",component:"loginComponent"}),$stateProvider.state("edit",{url:"/edit",component:"editComponent"}),$stateProvider.state("main",{url:"/main",component:"mainComponent"}),$stateProvider.state("result",{url:"/result",component:"resultComponent"}),$urlRouterProvider.otherwise("main")});exports["default"]=routes},324:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _angular=__webpack_require__(299),_angular2=_interopRequireDefault(_angular),_constants=__webpack_require__(319),_constants2=_interopRequireDefault(_constants),_firebase=__webpack_require__(304),_firebase2=_interopRequireDefault(_firebase),services=_angular2["default"].module("services",["firebase"]).factory("Auth",["$firebaseAuth",function($firebaseAuth){return _firebase2["default"].initializeApp(_constants2["default"]),$firebaseAuth()}]).name;exports["default"]=services}});
//# sourceMappingURL=app.bundle.js.map