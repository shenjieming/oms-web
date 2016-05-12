/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngApprovalBill", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>计费单审批</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngApprovalBill.html?data=" + Timestamp,
        scope: { ngApprovalBill: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {

            s.Service = {
                hOFNNo: s.ngModel.hOFNNo,
                Approval: function (callback) {
                    /// <summary>计费单审批</summary>
                    $BMSApi.BillService.Check(s.ngModel, function (rData) { $MessagService.succ("计费单审批成功！"); if (callback) { callback(); } s.ngApprovalBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单审批", width: "500", height: "350", buttons: { "确定": function () { s.Service.Approval(s.ngApprovalBill.fixed); }, "关闭": function () { s.ngApprovalBill.hide(); } } }
            $.extend(s.ngApprovalBill, modelConfig);

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
        link: function (s, e, a) {

            s.Service = {
                hOFNNo: s.ngModel.hOFNNo,
                AntiApproval: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.BillService.AntiCheck(s.ngModel, function (rData) { $MessagService.succ("计费单反审批成功！"); if (callback) { callback(); } s.ngAntiApprovalBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { s.Service.AntiApproval(s.ngAntiApprovalBill.fixed); }, "关闭": function () { s.ngAntiApprovalBill.hide(); } } }; $.extend(s.ngAntiApprovalBill, modelConfig);
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
        link: function (s, e, a) {

            s.Service = {
                hOFNNo: s.ngModel.hOFNNo,
                Disable: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.BillService.Disable(s.ngModel, function (rData) { $MessagService.succ("计费单废弃成功！"); if (callback) { callback(); } s.ngDisableBill.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { s.Service.Disable(s.ngDisableBill.fixed); }, "关闭": function () { s.ngDisableBill.hide(); } } }; $.extend(s.ngDisableBill, modelConfig);
        }
    }
});


app.directive("ngApprovalReconciliation", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>对账单审批</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngApprovalReconciliation.html?data=" + Timestamp,
        scope: { ngApprovalReconciliation: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {

            s.Service = {
                hSOANo: s.ngModel.hSOANo,
                Approval: function (callback) {
                    /// <summary>计费单审批</summary>
                    $BMSApi.ReconciliationService.Check(s.ngModel, function (rData) { $MessagService.succ("对账单" + s.ngModel.hSOANo + "审批成功！"); if (callback) { callback(); } s.ngApprovalReconciliation.hide(); });
                }
            }

            var modelConfig = {
                title: "对账单审批", width: "500", height: "350", buttons: {
                    "确定": function () { s.Service.Approval(s.ngApprovalReconciliation.fixed); }, "关闭": function () { s.ngApprovalReconciliation.hide(); }
                }
            }
            $.extend(s.ngApprovalReconciliation, modelConfig);

        }
    }
});


app.directive("ngAntiApprovalReconciliation", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>对账单反审批</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngAntiApprovalReconciliation.html?data=" + Timestamp,
        scope: { ngAntiApprovalReconciliation: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {
            s.Service = {
                hSOANo: s.ngModel.hSOANo,
                AntiApproval: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.ReconciliationService.AntiCheck(s.ngModel, function (rData) { $MessagService.succ("对账单" + s.ngModel.hSOANo + "反审批成功！"); if (callback) { callback(); } s.ngAntiApprovalReconciliation.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { s.Service.AntiApproval(s.ngAntiApprovalReconciliation.fixed); }, "关闭": function () { s.ngAntiApprovalReconciliation.hide(); } } }; $.extend(s.ngAntiApprovalReconciliation, modelConfig);
        }
    }
});


app.directive("ngDisableReconciliation", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>废弃对账单</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngDisableReconciliation.html?data=" + Timestamp,
        scope: { ngDisableReconciliation: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {

            s.Service = {
                hSOANo: s.ngModel.hSOANo,
                Disable: function (callback) {
                    /// <summary>计费单反审批</summary>
                    $BMSApi.ReconciliationService.Disable(s.ngModel, function (rData) { $MessagService.succ("对账单" + s.ngModel.hSOANo + "废弃成功！"); if (callback) { callback(); } s.ngDisableReconciliation.hide(); });
                }
            }

            var modelConfig = { title: "计费单反审批", width: "500", height: "350", buttons: { "确定": function () { s.Service.Disable(s.ngDisableReconciliation.fixed); }, "关闭": function () { s.ngDisableReconciliation.hide(); } } }; $.extend(s.ngDisableReconciliation, modelConfig);
        }
    }
});


