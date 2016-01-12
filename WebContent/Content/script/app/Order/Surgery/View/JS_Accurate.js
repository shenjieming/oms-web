/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("AccurateController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>精确订单</summary>
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                orderFile: $scope.file.GetEventMapping($scope.PageData.events, "0020_0011")
            });

            setTimeout(function () {
                $.extend($scope.AccurProduct.data, {
                    medKits: $scope.PageData.orderKits,
                    prodLns: $scope.PageData.orderProdlns
                });
            });
        }
    });



    $scope.MaterialsConfig = {
        Material: new Array(),
        GetShowMaterial: function (type) {
            /// <summary>获取显示的物料</summary>
            $scope.MaterialsConfig.Material = new Array();
            $.each($scope.AccProductConfig.useLine.medMaterialItems, function (index, item) {
                if (!type || type == item.categoryByPlatform) {
                    $scope.MaterialsConfig.Material.push(item);
                }
            });
        }
    };

  
    $scope.AccurProduct = {
        data: new Object(),
        Service: {},
        Competence: { tool: false, operat: false }
    }

});