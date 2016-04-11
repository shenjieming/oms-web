/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("JournalInfoController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.JournalEdit = {
        JournalList: [],
        //用户登录日志
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
     $scope.Load = function () {
         /// <summary>页面初始化</summary>
         $Api.AccountService.GetLoginAccountLog($scope.Pagein, function (rdata) {
             $scope.JournalEdit.JournalList = rdata.rows;
             $scope.Pagein.total = rdata.total;
             console.log($scope.JournalEdit.JournalList)
         });
     }
    $scope.Load();
})