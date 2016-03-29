/// <reference path="../Config.js" />
/// <reference path="../BMSPath.js" />
/// <reference path="../../../lib/jnDo_1.0/jnDo_1.0.js" />

app.controller("BillController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单管理</summary>
    console.log("计费管理主程序运行");
    $scope.title = "";
    $scope.Integrated = {
        //计费单列表
        BillList: new Array(),
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetBillList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetBillList: function (param, isNew) {
            /// <summary>获取计费单列表</summary>
            $scope.Integrated.BillList = new Array(); if (isNew) { $scope.Integrated.ClearWhere() }; var paramData = $.extend($scope.Pagein, param); $BMSApi.PublicInfoService.GetBillList(paramData, function (getResult) { $scope.Pagein.total = getResult.total; $scope.Integrated.BillList = getResult.rows; });
        }
    };
   
    $scope.PageControl = {
        /// <summary>页面控制</summary>
        //页面权限控制
        Competence: { modify: false,approval: false },
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.CarriedSelectedRow($scope.Integrated.BillList, callback);
        },
        AddNewBill: function () {
            /// <summary>添加信息的计费单</summary>
            $scope.goView("app.bms.bill.detail", { hOFNNo: "" });
        },
        ModifyBill: function () {
            /// <summary>修改计费单</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.detail", { hOFNNo: row.hOFNNo }); });
        },
        ApprovalBill: function () {
            /// <summary>审批订单</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.view", { hOFNNo: row.hOFNNo }); });
        },
        ViewBillByRow: function (row) {
            /// <summary>根据选中的行</summary>
            $scope.goView("app.bms.bill.view", { hOFNNo: row.hOFNNo });
        },
        ViewBill: function () {
            /// <summary>查看订单详情</summary>
            this.GoPageBySedRow(this.ViewBillByRow);
        }
    }

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});



