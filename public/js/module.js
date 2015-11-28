angular.module('tastebuds', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('upload', {
      url: '/upload',
      templateUrl: '../views/upload-page.html',
    })
    .state('home', {
      url: '/',
      templateUrl: '../views/landing-page.html',
    })
    .state('feed', {
      url: '/feed',
      templateUrl: '../views/feed.html',
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '../views/user-profile.html',
    })
    .state('profile.postList', {
      url: '/post-list',
      templateUrl: '../views/post-list.html',
    })
    .state('profile.eatList', {
      url: '/want-to-try',
      templateUrl: '../views/want-to-try.html'
    })
    .state('wantToTry', {
      url: '/wantToTry',
      templateUrl: '../views/want-to-try.html'
    });
})

// .service('SharedUserDataService', function ($http) {
//   var SharedUserDataService = {
//     async: function() {
//       // $http returns a promise, which has a then function, which also returns a promise
//       var promise = $http.get('').then(function (response) {
//         // The then function here is an opportunity to modify the response
//         console.log(response);
//         // The return value gets picked up by the then in the controller.
//         return response.data;
//       });
//       // Return the promise to the controller
//       return promise;
//     }
//   };
//   return myService;
// })

.controller('landingController', function($scope) {
  $scope.message = 'lol the landingController works.';
})

.controller('feedController', function($scope, $http) {

  $http.get('/posts').success(function(data){
    // console.log("SCOPE" + $scope.userProfile)
    $scope.allposts = data;
    console.log("DATA ALL POSTS: ", data[0].user);
  })
  .error(function(error){
    console.log('ERROR: ' + error)
  });
})

.controller('profileController', function($scope, $http) {
    // $http.get('/users/:id').success(function(data){
    $http.get('/users/1').success(function(data){
       $scope.userProfile = data;
    })
    .error(function(error){
       console.log('ERROR: ' + error);
    });

    $http.get('/posts/user/1').success(function(data){
       $scope.userPosts = data.data;
       console.log("inside user post", $scope.userPosts
        )
    })
    .error(function(error){
      // console.log('ERROR: ' + error);
    });

    $scope.submit = function(){
      var data = {
         location: $scope.location,
         user_id: $scope.user_id,
         restaurant_id: $scope.restaurant_id,
         comment: $scope.comment
        }

       $http.post('/posts', data).success(function(data, status){
        console.log('data2: ', data);
      })
    }
})

.controller('uploadController', function($scope, $http, uploadFactory) {
  var self = this;
  self.bullshit = 'ricky';
  self.postData = function() {
    console.log('postData fires');
    uploadFactory.sendData()
    .then(function(res) {
      console.log(res.data);
    });
  };
});
