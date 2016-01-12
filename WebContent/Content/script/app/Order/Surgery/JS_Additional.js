/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("AdditionalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>订单追加</summary>

    $scope.AdditionalServiice = {
        /// <summary>出库单追加服务</summary>
        Submit: function () {
            /// <summary>提交追加出库单</summary>
            $Api.SurgeryService.Process.Add($scope.PageData, function (rData) {
                $scope.goLastPage();
            });
        }
    }
    $scope.AddProduct = {
        Service: {}, Competence: { tool: false }
    }

    /*数据监控Begion*/
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        $scope.PageData.prodLns = new Array();
    });

    /*数据监控End*/

});