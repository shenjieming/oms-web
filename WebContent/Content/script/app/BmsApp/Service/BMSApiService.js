/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../ServerConfiguration.js" />
/// <reference path="../../Config.js" />
/// <reference path="../BMSPath.js" />

var BMSApiService = angular.module('BMSApiService', []);
BMSApiService.service("$BMSApi", function ($PublicInfoFactory, $BillFactory, $ReconciliationFactory, $InvoiceFactory) {
    return {
        //公共信息服务
        PublicInfoService: $PublicInfoFactory, BillService: $BillFactory, ReconciliationService: $ReconciliationFactory, InvoiceService: $InvoiceFactory
    }
});
BMSApiService.factory("$BMSApiFactory", function ($AjaxHelp) {
    /// <summary>BMSApi请求服务配置</summary>
    var apiHelp = new $AjaxHelp(ServerConfiguration.BMSPath);
    return apiHelp;
});
BMSApiService.factory("$PublicInfoFactory", function ($BMSApiFactory, $MessagService) {
    /// <summary>公共信息服务</summary>
    return {
        GetPendingList: function (data, callback) {
            /// <summary>获取待计费订单列表</summary>
            $MessagService.loading("待计费列表获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.pendinglist, data, callback);
        },
        GetPendingDetail: function (data, callback) {
            /// <summary>获取待计费订单的详细信息</summary>
            $MessagService.loading("待计费详情获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.pendingdetail, data, callback);
        },
        GetBillList: function (data, callback) {
            /// <summary>获取计费订单列表信息</summary>
            $MessagService.loading("计费单列表获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.billlist, data, callback);
        },
        GetBillDetail: function (data, callback) {
            /// <summary>获取计费订单的详细信息</summary>
            $MessagService.loading("计费单详情获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.billdetail, data, callback);
        },
        GetReconciliationList: function (data, callback) {
            /// <summary>获取对账单列表信息</summary>
            $MessagService.loading("对账单列表获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.reconciliationlist, data, callback);
        },
        GetReconciliationDetail: function (data, callback) {
            /// <summary>获取对账单明细信息</summary>
            $MessagService.loading("对账单明细获取中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.PublicInfo.reconciliationdetail, data, callback);
        }
    }
});
BMSApiService.factory("$BillFactory", function ($BMSApiFactory, $MessagService) {
    /// <summary>计费管理服务工场</summary>
    return {
        Submit: function (data, callback) {
            /// <summary>提交计费单</summary>
            $MessagService.loading("计费单提交中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.doFee, data, callback);
        },
        Modify: function (data, callback) {
            /// <summary>计费单修改</summary>
            $MessagService.loading("计费单修改中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.modify, data, callback);
        },
        Check: function (data, callback) {
            /// <summary>计费单审批</summary>
            $MessagService.loading("计费单审批中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.check, data, callback);
        },
        AntiCheck: function (data, callback) {
            /// <summary>计费单反审核</summary>
            $MessagService.loading("计费单取消审核中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.antiCheck, data, callback);
        },
        Disable: function (data, callback) {
            /// <summary>计费单作废</summary>
            $MessagService.loading("计费单作废中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.disable, data, callback);
        },
        Print: function (data, callback){
            /// <summary>计费单打印</summary>
            $MessagService.loading("计费单打印中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.BillManage.print, data, callback);
        }
    }
});
BMSApiService.factory("$ReconciliationFactory", function ($BMSApiFactory, $MessagService) {
    /// <summary>对账单服务工厂</summary>
    return {
        Submit: function (data, callback) {
            /// <summary>提交对账单</summary>
            $MessagService.loading("对账单提交中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.doSoa, data, callback);
        },
        Print: function (data, callback) {
            /// <summary>打印对账单</summary>
            $MessagService.loading("对账单提交中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.print, data, callback);
        },
        Modify: function (data, callback) {
            /// <summary>修改对账单</summary>
            $MessagService.loading("对账单修改中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.Modify, data, callback);
        },
        FndAdd: function (data, callback) {
            /// <summary>Description</summary>
            $MessagService.loading("对账单添加中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.FNDAdd, data, callback);
        },
        FndModify: function (data, callback) {
            /// <summary>对账单修改</summary>
            $MessagService.loading("对账单修改中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.FNDModify, data, callback);
        },
        FndDelete: function (data, callback) {
            /// <summary>对账单删除</summary>
            $MessagService.loading("对账单删除中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.FNDDelete, data, callback);
        },
        Check: function (data, callback) {
            /// <summary>对账单审批</summary>
            $MessagService.loading("对账单审批，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.check, data, callback);
        },
        AntiCheck: function (data, callback) {
            /// <summary>对账单反审批</summary>
            $MessagService.loading("对账单取消审核中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.antiCheck, data, callback);
        },
        Disabale: function (data, callback) {
            /// <summary>对账单作废</summary>
            $MessagService.loading("对账单作废中，请稍等...");
            $BMSApiFactory.PostApi(BMSPath.ReconciliationManage.disabale, data, callback);
        }
    };
});
BMSApiService.factory("$InvoiceFactory", function ($BMSApiFactory, $MessagService) {
    /// <summary>发票管理工厂</summary>
    return {

    };
});


