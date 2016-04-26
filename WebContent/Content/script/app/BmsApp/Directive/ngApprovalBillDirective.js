/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngApprovalBill", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>计费单审批</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngApprovalBill.html?data=" + Timestamp,
        scope: { ngApprovalBill: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, element, attrs) {

            $scope.Service = {
                hOFNNo: $scope.ngModel.hOFNNo,
                Approval: function (callback) {
                    /// <summary>计费单审批</summary>
                    $BMSApi.BillService.Check($scope.ngModel, function (rData) { $MessagService.succ("计费单审批成功！"); if (callback) { callback(); } $scope.ngApprovalBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单审批", width: "500", height: "350", buttons: { "确定": function () { $scope.Service.Approval($scope.ngApprovalBill.fixed); }, "关闭": function () { $scope.ngApprovalBill.hide(); } } }
            $.extend($scope.ngApprovalBill, modelConfig);

        }
    }
});

app.directive("ngAntiApprovalBill", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>计费单反审批</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngUnApprovalBill.html?data=" + Timestamp,
        scope: { ngAntiApprovalBill: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, element, attrs) {

            $scope.Service = {
                hOFNNo: $scope.ngModel.hOFNNo,
                AntiApproval: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.BillService.AntiCheck($scope.ngModel, function (rData) { $MessagService.succ("计费单反审批成功！"); if (callback) { callback(); } $scope.ngAntiApprovalBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { $scope.Service.AntiApproval($scope.ngAntiApprovalBill.fixed); }, "关闭": function () { $scope.ngAntiApprovalBill.hide(); } } }; $.extend($scope.ngAntiApprovalBill, modelConfig);
        }
    }
});


app.directive("ngDisableBill", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>废弃计费单</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngDisableBill.html?data=" + Timestamp,
        scope: {   ngDisableBill: "=",    ngModel: "="   },
        replace: true,
        link: function ($scope, element, attrs) {

            $scope.Service = {
                hOFNNo: $scope.ngModel.hOFNNo,
                Disable: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.BillService.Disable($scope.ngModel, function (rData) { $MessagService.succ("计费单废弃成功！"); if (callback) { callback(); } $scope.ngDisableBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { $scope.Service.Disable($scope.ngDisableBill.fixed); }, "关闭": function () { $scope.ngDisableBill.hide(); } } }; $.extend($scope.ngDisableBill, modelConfig);
        }
    }
});