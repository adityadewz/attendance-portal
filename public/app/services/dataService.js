(function(app) {

    app.factory("dataService",["$http",dataService] )

    function dataService($http) {

        return {
            userLogin: userLogin,
            createAccount:createAccount,
            getAttendance:getAttendance
        }

        function userLogin(user) {
            return $http({
                method: 'POST',
                url: '/api/login',
                data: user
                    // ,
                    // headers: {'x-auth': details.header}
            });
        }

        function createAccount(user)
        {

            return $http({
                method: 'POST',
                url: '/api/users',
                data: user
                    // ,
                    // headers: {'x-auth': details.header}
            });

        }

        function getAttendance(details)
        {
            console.log(details)

            return $http({
                method: 'POST',
                url: '/api/attendance',
                data: details.body
                    // ,
                    // headers: {'x-auth': details.header}
            });

        }

    }

}(angular.module("myApp")))


