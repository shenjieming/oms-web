/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBillMaterials", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>订单物料分析列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBillMaterials.html?data=" + Timestamp,
        scope: { ngBillMaterials: "=", ngModel: "=" ,ngBillService:"="},
        replace: true,
        link: function ($scope, element, attrs) {

            $scope.BillService = {
                /// <summary>计费单信息处理服务</summary>
                Gather: new Object(),
                ViewMaterial: false,
                MaterialList: new Array(),
                IsShowMaterialView: function (isshow) {
                    /// <summary>是否显示物料列表</summary>
                    $scope.BillService.ViewMaterial = isshow; if (isshow) { $scope.BillService.GetMaterialView(); }
                },
                ChangeBillList: function () {
                    /// <summary>修改订单列表信息</summary>
                    $scope.BillService.Gather = $scope.Factory.BillAnalysis($scope.RecInfo.detail);
                },
                GetMaterialView: function () {
                    /// <summary>获取物料维度的订单视图</summary>
                    $scope.BillService.MaterialList = $scope.Factory.GetMaterialView($scope.RecInfo.detail);
                }
            }

            $scope.BillConfig = {
                /// <summary>物料选择配置</summary>
                fixed: function (list) {
                    $scope.QueryService.GetRecByMappingData({
                        detail: $scope.Factory.GetNewBillDetail($scope.RecInfo.detail, list)
                    });
                    $scope.BillService.ChangeBillList();
                    $scope.BillService.IsShowMaterialView(true);
                }
            };

            $.extend($scope.ngBillService, $scope.BillService);

            $.extend($scope.ngBillMaterials, $scope.BillConfig);

        }
    }
});