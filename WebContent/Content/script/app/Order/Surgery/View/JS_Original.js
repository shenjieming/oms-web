/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("OriginalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>原始订单控制器</summary>
    $scope.singleProduc = {
        Service: {},
        Competence: { warehouse: false, materials: true, kits: false, tool: true, operat: false }
    }

    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                initFile: $scope.file.GetEventMapping($scope.PageData.events, "0001_0011")
            });
            if (!$scope.PageData.initFile.images.length) {
                $scope.PageData.initFile = $scope.file.GetEventMapping($scope.PageData.events, "0001_0001")
            }

            $.extend($scope.singleProduc, {
                prodLns: $scope.PageData.initOrderProdlns
            });
        }
    });

});