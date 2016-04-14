
app.controller("PendingBillListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单管理</summary>
    console.log("计费管理-待计费订单管理");
    $scope.title = "";
    $scope.Integrated = {
        //计费单列表
        OrderList: new Array(),
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetOrderList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetOrderList: function (param, isNew) {
            /// <summary>获取待计费订单列表</summary>
            $scope.Integrated.OrderList = new Array(); if (isNew) { $scope.Integrated.ClearWhere() }; var paramData = $.extend($scope.Pagein, param); $BMSApi.PublicInfoService.GetPendingList(paramData, function (getResult) { $scope.Pagein.total = getResult.total; $scope.Integrated.OrderList = getResult.rows; });
        }
    };

    $scope.PageControl = {
        /// <summary>页面控制</summary>
        //页面权限控制
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.CarriedSelectedRow($scope.Integrated.OrderList, callback);
        },
        AddNewBillByRow: function (row) {
            /// <summary>根据选择的行数据添加计费单</summary>
            $scope.goView("app.bms.bill.detail", { sONo: row.sONo, hOFNNo: "" });
        },
        AddNewBill: function () {
            /// <summary>添加新的计费单</summary>
            this.GoPageBySedRow(this.AddNewBillByRow);
        }
    }

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetOrderList(); } }

    $scope.Integrated.GetOrderList({}, true);

});