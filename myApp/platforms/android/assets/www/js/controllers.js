angular.module('starter.controllers', [])

.controller('loginController', function ($scope, $state, dayData, auth) {
  $scope.loginUser = function (user) {
    
    // get login user data
    auth.login(user)
    .success(function (response) {

      // get cohort/day data
      if (response.userType.student) {

        dayData.getDayData(response._id)
        .then(function (result) {
          console.info('cohort result:', result);
          $state.go('tab.calendar');
        })
        .catch(function (err) {
          console.error(err);
        })

      }

    })
    .error(function (err) {
      console.error(err);
    })

  }

})




.controller('calendarController', function ($scope, $state, calendar, infoStorage) {
  $scope.days = calendar.cohortId.curriculum

  $scope.viewDay = function (day) {
    if (!day.topic) return;

    infoStorage.storeDay(day);
    $state.go("tab.day");
  }
})



.controller('dayController', function ($scope, dayInfo) {
  $scope.day = dayInfo;
})





///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////








.controller('ChatsCtrl', function ($scope, Chats, calendar) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log(calendar);

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
