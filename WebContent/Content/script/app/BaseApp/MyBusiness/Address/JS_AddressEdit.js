/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("AddressEditController", function ($scope, $state, $local, $Api, $MessagService,$stateParams) {
    /// <summary>我的地址编辑</summary>
    $scope.AddressDetail = {
        info:new Array(), 
    }
    $scope.GetListServer={
        // 获取接口服务
        AddressView:function () {
            // 接口详情
            $Api.MyAddress.GetbizDataMyAddressList({userID:$scope.User.userInfo.userId,lineNo:$stateParams.lineNo}, function (rData) {
                $scope.AddressDetail.info = rData.rows[0];
            })
        }
    }
    $scope.Save=function () {
        
    }
    $scope.load=function () {
        $stateParams.lineNo=$scope.AddressDetail.lineNo;
        if( $stateParams.lineNo){
            $scope.GetListServer.AddressView();
        }
    }
    $scope.load();
})