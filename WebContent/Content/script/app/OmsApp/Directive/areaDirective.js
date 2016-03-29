/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngArea", function ($Api, $MessagService) {
    /// <summary>地区级联管理标签</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngArea.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngData: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var Original = {
                IsNewModel: false
            }

            $scope.AreaController = {
                /// <summary>地区管理控制器</summary>
                Province: new Array(), City: new Array(), Township: new Array(), GetProvince: function () {
                    /// <summary>获取省信息</summary>
                    $MessagService.loading("地区获取中，请稍等..."); $Api.BasisService.GetadmdivisionList({ level: 1 }, function (rData) { $scope.AreaController.Province = rData.rows; });
                }, GetCity: function (code) {
                    /// <summary>获取市信息</summary>
                    $scope.ngModel.deliveryCityCode = Original.IsNewModel ? $scope.ngModel.deliveryCityCode : ""; if (code) { $MessagService.loading("地区获取中，请稍等..."); $Api.BasisService.GetadmdivisionList({ level: 2, parentDivCode: code }, function (rData) { $scope.AreaController.City = rData.rows; }); } else { $scope.AreaController.City = new Array(); }
                }, GetTownship: function (code) {
                    /// <summary>获取区信息</summary>
                    $scope.ngModel.deliveryDistrictCode = Original.IsNewModel ? $scope.ngModel.deliveryDistrictCode : ""; if (code) { $MessagService.loading("地区获取中，请稍等..."); $Api.BasisService.GetadmdivisionList({ level: 3, parentDivCode: code }, function (rData) { $scope.AreaController.Township = rData.rows; if (Original.IsNewModel) { setTimeout(function () { Original.IsNewModel = false; }, 500); } }); } else { $scope.AreaController.Township = new Array(); }
                },
                NewModel: function () {
                    /// <summary>新的模型对象的处理</summary>
                    Original.IsNewModel = true; $scope.AreaController.GetProvince(); $scope.AreaController.GetCity($scope.ngModel.deliveryProvinceCode); $scope.AreaController.GetTownship($scope.ngModel.deliveryCityCode);
                }
            }

            $scope.$watch("ngModel", function () {
                /// <summary>监控整体对象的变化</summary>
                //当满足所有的数据都是被第三方修改时
                if ($scope.ngModel.deliveryProvinceCode && $scope.ngModel.deliveryCityCode && $scope.ngModel.deliveryDistrictCode) { $scope.AreaController.NewModel(); }
            });

            $scope.$watch("ngModel.newNgArea", function () { if ($scope.ngModel.newNgArea) { $scope.AreaController.NewModel(); $scope.ngModel.newNgArea = false; } })

            $scope.$watch("ngModel.deliveryProvinceCode", function () {
                /// <summary>省修改事件</summary>
                if (!Original.IsNewModel) {   if (!$scope.ngModel.deliveryProvinceCode && $scope.ngModel.deliveryProvinceCode != "") {   $scope.AreaController.GetProvince();     }   $scope.AreaController.GetCity($scope.ngModel.deliveryProvinceCode);    }
            });

            $scope.$watch("ngModel.deliveryCityCode", function () {
                /// <summary>市修改事件</summary>
                if (!Original.IsNewModel) { $scope.AreaController.GetTownship($scope.ngModel.deliveryCityCode); }
            });
        }
    };
});