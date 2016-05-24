/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />


app.directive("ngReconciliationMain", function ($BMSApi, $MessagService, $local, $AppHelp, $Api) {
    /// <summary>对账单主表修改</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngReconciliationMain.html?data=" + Timestamp,
        scope: { ngReconciliationMain: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, e, a) {
            $scope.Service = {
                OrderSource: new Array(),
                GetOrderSource: function () {
                    /// <summary>获取对账单来源</summary>
                    if (!$scope.Service.OrderSource.length) { $Api.Public.GetDictionary({ dictType: "HSOAST" }, function (dicty) { $scope.Service.OrderSource = dicty; }); }
                },
                ChangeOrderSource: function (hsoast) {
                    /// <summary>修改对账单来源</summary>
                    $.extend($scope.ngModel, { hSOASourceType: hsoast.id, hSOASourceTypeName: hsoast.text });
                },
                Edit: function (callback) {
                    /// <summary>计费单审批</summary>
                    $BMSApi.ReconciliationService.Modify($scope.ngModel, function (rData) { $MessagService.succ("对账单" + $scope.ngModel.hSOANo + "修改成功！"); if (callback) { callback(); } $scope.ngReconciliationMain.hide(); });
                }
            }

            var modelConfig = { title: "对账信息修改", width: "950", height: "350", buttons: { "确定": function () { $scope.Service.Edit($scope.ngReconciliationMain.fixed); }, "关闭": function () { $scope.ngReconciliationMain.hide(); } }, open: function () { $scope.Service.GetOrderSource(); } }; $scope.ngReconciliationMain = $.extend($scope.ngReconciliationMain, modelConfig);

        }
    }
});

app.directive("ngOperatReconciliationDetail", function ($BMSApi, $MessagService, $local, $AppHelp, $RecInfFactory) {
    /// <summary>编辑操作对账单明细</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngOperatReconciliationDetail.html?data=" + Timestamp,
        scope: { ngOperatReconciliationDetail: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, e, a) {
        }
    }
});