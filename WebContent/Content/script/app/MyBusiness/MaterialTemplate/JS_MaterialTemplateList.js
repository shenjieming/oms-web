

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MaterialTemplateListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>物料模板控制器</summary>
    $scope.MaterialTemplate = {
        GetMaterialTemplateList: function () {
            /// <summary>获取套件列表</summary>
            $Api.MaterialsService.GetMaterialsTemplateList($scope.Pagein, function (rData) {

            });
        }
    };


    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.MaterialTemplate.GetMaterialTemplateList();
        }
    }

    $scope.MaterialTemplate.GetMaterialTemplateList();
});