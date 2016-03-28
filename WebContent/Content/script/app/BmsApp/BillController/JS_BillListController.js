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
        ViewBill: function () {
            /// <summary>查看订单详情</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.view", { hOFNNo: row.hOFNNo }); });
        }
    }

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});

app.controller("BillComplexListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单综合管理</summary>
    console.log("计费管理-综合订单运行");
    $scope.title = "计费综合管理";
    $scope.Integrated.GetBillList({ opt: "COMPLEX_FEENOTE" }, true);
});

app.controller("BillListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>我的计费单管理</summary>
    console.log("计费管理-我的计费单运行");
    $scope.title = "我的计费单";
    $scope.Integrated.GetBillList({ opt: "MY_FEENOTE" }, true);
});

app.controller("BillAlreadyListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已计费列表管理</summary>
    console.log("计费管理-预计计费订单管理");
    $scope.title = "已计费订单";
    $scope.Integrated.GetBillList({ opt: "HAS_FEENOTE" }, true);
});

app.controller("BillApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批计费列表管理</summary>
    console.log("计费管理-待审批计费管理");
    $scope.title = "待审批计费单";
    $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});

app.controller("BillApprovaledListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已审批计费列表</summary>
    console.log("计费管理-待对账计费单管理");
    $scope.title = "待对账计费单";
    $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});

app.controller("BillPostingListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已对账计费单列表管理</summary>
    console.log("计费管理-已对账计费管理");
    $scope.title = "已对账计费单";
    $scope.Integrated.GetBillList({ opt: "HAS_SOA_FEENOTE" }, true);
});


