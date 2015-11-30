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

.controller('landingController', function($scope) {
  $scope.message = 'lol the landingController works.';
})

.controller('feedController', function($scope, $http) {

  $http.get('/posts').success(function(data){
    $scope.allposts = data;
    var newImg = $('<img class="postImage">');
    newImg.attr('src', $scope.allposts[$scope.allposts.length-1].image);
    newImg.appendTo('.post li').last();
  })
  .error(function(error){
    console.log('ERROR: ' + error)
  });
  $scope.wantToTry = function(post) {
    console.log("SECTION: " + JSON.stringify(post))
    $scope.post =post;
    var data = {
      user_id: $scope.post.user_id,
      post_id: $scope.post.id
    }
    console.log(data)
    $http.post('/want_to_trys', data).success(function(data, status){
      console.log("SUCCESS: " + data);
    });
  }
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
})

.controller('uploadController', function($scope, $http) {
    $('.recc .btn').click(function(){
      $scope.eat = true;
    })
    $('.recc .btn.red').click(function(){
      $scope.eat = false;
    })
    console.log($scope.eat);

  $scope.submit = function(){
    console.log("INSIDE SUBMIT")
    var imgVar= $(".upload-file").prop('files')[0]['name'];
    $scope.imgTag ="assets/"+imgVar;
    console.log("IMGTAG: "+ $scope.imgTag);

    var data = {
     location: $scope.location,
     user_id: $scope.user_id,
     restaurant_id: $scope.restaurant_id,
     post_image: $scope.imgTag,
     comment: $scope.comment,
     eat: $scope.eat
    }

    $http.post('/posts', data).success(function(data, status){
      console.log('data2: ', data);
    })
  }
})

.controller('wantToTryController', function($scope, $http){
  var array;
  $http.get('/want_to_trys/user/1').success(function(data){
    console.log("BLA" + JSON.stringify(data));
    array = data.data;
    console.log(JSON.stringify(array[0]));
  });
  $scope.wantToTryUser =[];
  setTimeout(function(){
   array.forEach(function(single){
     $http.get('/posts/'+single.post_id).success(function(data){
       console.log("BOOOO ",data);
       $scope.wantToTryUser.push(data);
     })
   })

  },1000);

});













