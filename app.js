var myform = angular.module('myform', [])
.run(($rootScope)=>{
    $rootScope.text="test data";
});


myform.factory('usersHelper',($http)=>{
    return {
        getUsers:()=>{
            return $http(
                {
                    url: "https://jsonplaceholder.typicode.com/users",
                    method: "GET"
                }
            );
        }
    }
})

myform.directive('action',()=>{
    return {
        template:"<h1>{{name}}</h1>",
        link:(scope,element,attrs)=>{
            scope.name=attrs.name;
        }
    }
})

myform.controller('FormController', ($scope, $http,$rootScope,usersHelper) => {
    $scope.privateText="This text is private";
    $rootScope.users = [];

    $scope.delete=(user)=>{
         $scope.users=$scope.users.filter(item=>{
              return item.id!=user.id;

         })
    }
    $scope.update=(user)=>{
        $scope.user={};
        user.edit=!user.edit
        let elem = document.getElementById(user.id).id;
        angular.element(elem).css('display', 'none');
    }


    usersHelper.getUsers().then((response) => {
        console.log(response);
        $rootScope.users = response.data;
    }, (err) => {
        console.log(err);
    })

})

myform.controller('AddUserController',($scope)=>{
    $scope.myStyle={'background-color':x.edit ? '#454d55': 'white'};
    $scope.user={};
    $scope.addUser=()=>{
        if(!$scope.user.title || !$scope.user.body)
            alert('Title or body required');
        if($scope.post.title=='' || $scope.post.body=='')
            alert('Title or body required');
        $scope.user.id=$scope.users[$scope.users.length-1].id+1;
        $scope.users.push($scope.user);
         
    }
})
