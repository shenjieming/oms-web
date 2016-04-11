/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("MaterialViewController", function ($scope, $state,$stateParams, $local, $Api, $MessagService, $FileService) {
    /// <summary>经销商物料详情</summary>
    $scope.PageData = {};

    $scope.Service = {
        /// <summary>物料管理服务</summary>
        GetDetail: function () {
            /// <summary>获取物料明细</summary>
            $Api.BusinessData.MedMaterial.GetMedMaterialItemDetail($stateParams, function (rData) {
                $scope.PageData = rData;
            });
        }
    }

    $scope.Service.GetDetail();

});