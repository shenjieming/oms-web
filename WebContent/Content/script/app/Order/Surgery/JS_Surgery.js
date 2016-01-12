

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("SurgeryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>订单操作控制器</summary>
    var userData = $local.getValue("USER");
    /*页面操作Begion*/
    $scope.GetRowGoPage = function (view,callback) {
        /// <summary>Description</summary>
        var rowData = $local.getSelectedRow($scope.Integrated.OrderList);
        if (rowData) {
            $MessagService.loading("页面启动中，请稍等...");
            if (callback) {
                callback(rowData);
            } else {
                $state.go(view, { sono: rowData.sONo });
            }
        } else {
            $MessagService.caveat("请选择一条订单数据！");
        }
    }

    $scope.ProcessingOrders = function (sono) {
        /// <summary>处理订单</summary>
        $local.setValue("ORDERCOMP", { dealwith: true });
        $state.go("app.order.dealpage", { sono: sono });
    }

    $scope.Additional = function () {
        /// <summary>追加出库单</summary>
        $scope.GetRowGoPage("app.order.additional");
    }

    $scope.addSurgery = function () {
        /// <summary>添加手术下单</summary>
        $state.go("app.order.single");
    }

    $scope.editSurgery = function (sono) {
        /// <summary>编辑手术订单</summary>
        $scope.GetRowGoPage("app.order.single");
    }
    $scope.ApprovalSurgery = function (sono) {
        /// <summary>审批手术订单</summary>
        $local.setValue("ORDERCOMP", { approval: true });
        $scope.GetRowGoPage("app.order.view");
    }

    $scope.SignSurgery = function (sono) {
        /// <summary>签收手术订单</summary>
        $local.setValue("ORDERCOMP", { sign: true });
        $scope.GetRowGoPage("app.order.view");
    }

    $scope.DealSurgery = function () {
        /// <summary>处理手术订单</summary>
        $scope.GetRowGoPage(null, function (rowData) {
            if (rowData.status == "SOSTS00060") {//已处理订单的话
                if (rowData.sOHandleBy == userData.userInfo.userId) {
                    $scope.ProcessingOrders(rowData.sONo);
                } else {
                    $MessagService.caveat("当前订单已被" + rowData.sOHandleByName + "处理中！");
                }
            } else {
                $Api.SurgeryService.Process.Receive({ sONo: rowData.sONo, opt: "OPER_PROCESS_RECEIVE" }, function () {
                    $MessagService.loading("订单处理启动中...");
                    setTimeout(function () { $scope.ProcessingOrders(rowData.sONo) }, 1000);
                });
            }
        });
    }

    $scope.ApplyBack = function (sono) {
        /// <summary>申请返库</summary>
        $local.setValue("ORDERCOMP", { apply: true });
        $scope.GetRowGoPage("app.order.addevent");
    }

    $scope.OrderBack = function (sono) {
        /// <summary>订单返库处理</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.order.fback");
    }

    $scope.showViewDetail = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.order.view");
    }
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $state.go("app.order.view", { sono: sono });
    }

    /*页面操作End*/

    /*页面列表Begion*/
    $scope.Pagein = {
        /// <summary>分页配置信息对象</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Integrated.GetOrderList();
        }
    }

    $scope.Integrated = {
        OrderList: new Array(),
        GetOrderList: function (param) {
            /// <summary>获取我的订单数据列表</summary>
            $MessagService.loading("订单信息获取中，请稍等...");
            $scope.Pagein.total = 0;
            $scope.Integrated.OrderList = new Array();
            var paramData = $.extend($scope.Pagein, param);
            $Api.SurgeryService.DataSources.GetOrderList(paramData, function (rData) {
                $scope.Pagein.total = rData.total;
                $scope.Integrated.OrderList = rData.rows;
            });
        }
    }

    $scope.file = {
        /// <summary>附件控制器</summary>
        GetEventMapping: function (eventList, statusCode) {
            /// <summary>获取附件映射</summary>
            var result = { images: new Array(), remark: "" }
            $.each(eventList, function (index, event) {
                if (event.eventCode == statusCode) {
                    $.each(event.attachments, function (fileindex, item) {
                        result.remark = item.attachmentDesc;
                        var img = { id: item.attachmentId, url: item.attachmentDir }
                        if (JSON.stringify(result.images).indexOf(JSON.stringify(img)) == -1) {
                            result.images.push(img);
                        }
                    });
                    return result;
                }
            });
            return result;
        }
    }
  
    /*页面列表End*/

    /*页面权限Begion*/
    $scope.Competence = {
        modify: false,
        submit: false,
        approval: false,
        sign: false,
        dealwith: false,
        apply: false,
        back: false,
        append:false,
    }

    /*页面权限End*/
});