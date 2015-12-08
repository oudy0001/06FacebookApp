var document = document;

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$rootScope', 'optionsFactory', function($scope, $rootScope, optionsFactory) {
    
    $rootScope.isLoggedInBool = false;
    console.log($rootScope.isLoggedInBool);
    
    var vibrateBoolString = optionsFactory.getVibratePreference();
    var allCompleteToggleString = optionsFactory.getAllCompletePreference();
    if(vibrateBoolString == 'true'){
        this.vibrateToggleBool = true;
    }else{
        this.vibrateToggleBool = false;
    }
    if(allCompleteToggleString == 'true'){
        this.allCompleteToggleBool = true;
    }else{
        this.allCompleteToggleBool = false;
    }

    // Toggling the $rootScope.vibrate
    this.vibrateToggle = function(){
        optionsFactory.setVibratePreference(this.vibrateToggleBool);
    };
    this.allCompleteToggle = function(){
        optionsFactory.setAllCompletePreference(this.allCompleteToggleBool);
    };
}])

.controller('OptionsController', function(){
    
    //things to be done on startUp
    
})

.controller('ListController', ['$scope', '$stateParams', 'listHandlerFactory', 'localStorageFactory', 'optionsFactory', function($scope, $stateParams, listHandlerFactory, localStorageFactory, optionsFactory){
    
    //things to be done on start-up
    this.hrefNumber = document.URL.charAt(document.URL.length - 1);
    var localStorageReference = "ca.edumedia/oudy0001/mad9135/list" + this.hrefNumber;
    this.tasks = localStorageFactory.getItems(localStorageReference);
    console.log(this.tasks);
    
    //functions to be called as needed
    this.delete = function(task){
        listHandlerFactory.deleteTask(task, this.tasks, localStorageReference);
    };
    
    this.deleteAll = function(){
        listHandlerFactory.deleteAll(this.tasks, localStorageReference);
    };
    
    this.add = function(){
        listHandlerFactory.addTask(this.newItem, this.tasks, localStorageReference);
        this.newItem = {};
    };
    
    this.checkCompleted = function(positive){
        optionsFactory.vibrateOnComplete(positive, optionsFactory.getVibratePreference());
        localStorageFactory.setItems(localStorageReference, this.tasks);
        optionsFactory.noticeAllComplete(this.tasks, optionsFactory.getAllCompletePreference());
    };
}])

.controller('PlaylistsCtrl', ['$scope', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
}])

  .controller('LoginCtrl', ['$scope', '$auth', '$rootScope', 'loginFactory', function($scope, $auth, $rootScope, loginFactory) {
      $rootScope.username;
      $rootScope.password;
    this.login = function() {
      $auth.login($rootScope.user)
        .then(function() {
          console.log('You have successfully signed in!');
          $rootscope.isLoggedInBool = true;
    console.log($rootScope.isLoggedInBool);
        })
        .catch(function(error) {
          console.log(error.data.message, error.status);
    console.log($rootScope.isLoggedInBool);
        });
    };
    this.authenticate = function(provider) {
        
    console.log('log in attempt, = ' + $rootScope.isLoggedInBool);
      $auth.authenticate(provider);
    };

  }]);

;

