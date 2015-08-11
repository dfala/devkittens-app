angular.module('starter.services', [])



.factory('dayData', function ($http, $q, env, infoStorage) {
  var service = {};


  service.getDayData = function (userId) {
    var deferred = $q.defer();
    var uri = env + '/api/app-cohort/' + userId;

    $http.get(uri)
    .success(function (response) {
      infoStorage.storeCohort(response);
      deferred.resolve(response);
    })
    .error(function (err) {
      deferred.reject(err);
    })

    return deferred.promise;
  }


  return service;
})






.factory('auth', function ($http, env) {
  var service = {};


  service.login = function (user) {
    var uri = env + '/auth/login';
    return $http.post(uri, user)
  }


  return service;
})






.factory('infoStorage', function () {
  var service = {};
  var cohort;
  var activeDay;
  
  // COHORT INFO
  service.storeCohort = function (cohortInfo) {
    cohort = cohortInfo;
    return cohort;
  }
  
  service.serveCohort = function () {
    if (cohort) return cohort;
    return undefined;
  }


  // DAY INFO
  service.storeDay = function (day) {
    return activeDay = day;
  }

  service.serveDay = function () {
    return activeDay;
  }

  return service;
})




.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
      return $sce.trustAsHtml(text);
  };
}])



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////










.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
