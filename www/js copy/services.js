var localStorage = localStorage, navigator = navigator;
angular.module('starter')

.factory('listChecker', function(){
    return{
        validate: function(list){
            if(list == null){
                    return [
                        {text:'wake up', done: true},
                        {text:'get dressed', done: true},
                        {text:'go crazy', done: false}
                    ];
                }else{
                        return list;
                    }
        }
    };
})

.factory('localStorageFactory', ['listChecker', function(listChecker){
    return{
        getItems: function(hrefNumber){
            var storedItems = JSON.parse(localStorage.getItem(hrefNumber));
                return listChecker.validate(storedItems);
            },
        setItems: function(hrefNumber, storageObject){
//            var objectJSON = angular.toJson(storageObject);
            return localStorage.setItem(hrefNumber, JSON.stringify(storageObject));
        }
    };
}])

.factory('listHandlerFactory', ['localStorageFactory', function(localStorageFactory){
    return{
        deleteTask: function(task, tasks, hrefNumber){
            var index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorageFactory.setItems(hrefNumber, tasks);
            return tasks;
        },
        deleteAll: function(tasks, hrefNumber){
            for(var i = 0; i < tasks.length; i++){
                if(tasks[i].done === true){
                    tasks.splice(i, 1);
                    i--;
                }
            }
            localStorageFactory.setItems(hrefNumber, tasks);
            return tasks;
        },
        addTask: function(task, tasks, hrefNumber){
            
            /* 
            *  This bit of code fixes a hashkey problem I was having by cutting off the "object:".
            *  Which is part of the string which is attached to the last task, 
            *  then parsing the remaining number and then adding it to the restored hashKey.  
            *  It's kind of hacky but it works
            */
            var lastHashKey = tasks[tasks.length - 1].$$hashKey;
            var slicedHashKey = lastHashKey.slice(7, lastHashKey.length);
            var lastHashKeyNumber = parseInt(slicedHashKey);
            task.$$hashKey = ("object:" + (lastHashKeyNumber + 1));
            
            task.done = false;
            tasks.push(task);
            
            localStorageFactory.setItems(hrefNumber, tasks);
            return tasks;
        },
        taskCheck: function(tasks)
        {
            var allDoneFlag = true;
            for(var i = 0; i < tasks.length; i++){
                if(tasks[i].done === false){
                    console.log('false');
                    allDoneFlag = false;
                    break;
                }
            }
            if(allDoneFlag === true){
                
            }
        }
    };
}])

.factory('optionsFactory', ['$rootScope', 'localStorageFactory', function($rootScope, localStorageFactory){
    var vibrateBool;
    return{
        vibrateOnComplete: function(positive, toggle){
            var combinedBool = true;
            if(positive === false){
                combinedBool = false;
            }
            if(toggle == 'false'){
                combinedBool = false;
            }
            
            if(combinedBool){
                navigator.vibrate(300);
            }
        },
        noticeAllComplete: function(tasks, toggle){
            var allCompletedBool = true;
            for(var i = 0; i < tasks.length; i++){
                if(tasks[i].done === false){
                    allCompletedBool = false;
                }
            }
            if(toggle && allCompletedBool){
                cordova.plugins.notification.local.update({
                    id: 1,
                    title: 'You accomplished everthing on your list!'
                }, 0);
            }
        },
//                navigator.vibrate(300);
        setVibratePreference: function(toggle){
            vibrateBool = toggle;
            var localStorageReference = "ca.edumedia/oudy0001/mad9135/preferences/vibrate";
            localStorageFactory.setItems(localStorageReference, toggle);
        },
        setAllCompletePreference: function(toggle){
            vibrateBool = toggle;
            var localStorageReference = "ca.edumedia/oudy0001/mad9135/preferences/complete";
            localStorageFactory.setItems(localStorageReference, toggle);
        },
        getVibratePreference: function(){
            var localStorageReference = "ca.edumedia/oudy0001/mad9135/preferences/vibrate";
            var storedPref = localStorage.getItem(localStorageReference);
            if(storedPref == null){
                return true;
            }else{
                return storedPref;
            }
        },
        getAllCompletePreference: function(){
            var localStorageReference = "ca.edumedia/oudy0001/mad9135/preferences/complete";
            var storedPref = localStorage.getItem(localStorageReference);
            if(storedPref == null){
                return true;
            }else{
                return storedPref;
            }
        }
    };
}])
;