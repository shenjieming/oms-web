///  <autosync enabled="true" /> 
/// <reference path="../Config.js" />
/// <reference path="../BMSPath.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-route.js" />
/// <reference path="../../../lib/jnDo_1.0/jnDo_1.0.js" />

app.controller("BillController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $OMSSpecially) {
    /// <summary>计费单管理</summary>
    console.log("计费管理主程序运行");
    $scope.title = "订单计费";
    $scope.Integrated = {
        //计费单列表
        Enter: function (e) { var keycode = window.event ? e.keyCode : e.which; if (keycode == 13) { $scope.Integrated.DataQuery({}); } },
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
       SetCompetence: function (comp) {
           /// <summary>设置页面权限</summary>
           this.InitCompetence();  $.extend($scope.Competence, comp);
       },
       InitCompetence: function () {
           /// <summary>初始化权限</summary>
           $scope.Competence = { modify: false, batchapproval: false, approval: false, unapproval: false, discard: false }
       },
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.setValue("ORDERCOMP", $scope.Competence);   $local.CarriedSelectedRow($scope.Integrated.BillList, callback);
        },
        AddNewBill: function () {
            /// <summary>添加信息的计费单</summary>
            $scope.goView("app.bms.bill.detail", { hOFNNo: "" });
        },
        ModifyBill: function () {
            /// <summary>修改计费单</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.detail", row); });
        },
        BatchApproval: function () {
            /// <summary>批量计费单审批</summary>
            ///TODO:计费单的批量审批
            alert("功能搭建中，敬请期待！");
        },
        ApprovalBill: function () {
            /// <summary>审批订单</summary>
            $local.setValue("MenuDisplay", {approval:true});
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.view", row); });
        },
        InvalidBill:function () {
            //作废订单
            $local.setValue("MenuDisplay", {discard:true});
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.view", row); });
        },
        ViewBillByRow: function (row) {
            /// <summary>根据选中的行</summary>
            $local.setValue("ORDERCOMP", $scope.Competence);
            $scope.goView("app.bms.bill.view", row);
        },
        ViewBill: function () {
            /// <summary>查看订单详情</summary>
            this.GoPageBySedRow(this.ViewBillByRow);
        },
        PrintBill: function () {
            /// <summary>打印</summary>
            this.GoPageBySedRow(function (row) {
                $OMSSpecially.PrintBill(row);
            });
        }
    }

    //权限配置Begion
    $scope.Competence = { modify: false, batchapproval: false, approval: false, unapproval: false, discard: false };
    //权限配置End

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});

app.controller("BillInfoController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $BillDetailFactory, $AppHelp, $OMSSpecially) {
    /// <summary>计费单详情</summary>
    console.log("计费单管理-计费单详情管理");

    $scope.PageData = {}; $scope.BillData = { detail: new Array(), images: new Array() }; $scope.$Factory = new $BillDetailFactory($scope); $scope.Competence = $local.getValue("ORDERCOMP");

    $scope.QueryService = {
        /// <summary>查询服务</summary>
        GetOrderInfo: function (param) {
            /// <summary>获取订单明细</summary>
            $BMSApi.PublicInfoService.GetPendingDetail(param, function (orderInfo) {
                console.log(orderInfo)
                console.log(param.hOFNNo)
                $.extend($scope.PageData, orderInfo);
                if (!param.hOFNNo) {
                    $.extend($scope.BillData, $scope.$Factory.GetOrderMapping(orderInfo));
                } });
        },
        GetBillInfo: function (param) {
            /// <summary>获取计费单明细</summary>
            $BMSApi.PublicInfoService.GetBillDetail(param, function (billInfo) {
                console.log(billInfo)
                $.extend($scope.BillData, billInfo);
                $.extend($scope.BillData, $stateParams);
                setTimeout(function () {
                    $scope.$Factory.AddMaterias(billInfo.detail, $scope.BillData)
                });
            });
        },
        PrintBill: function () {
            /// <summary>打印</summary>
            $OMSSpecially.PrintBill($scope.BillData);
        }
    };

    if ($stateParams.sONo) { $scope.QueryService.GetOrderInfo($stateParams); } if ($stateParams.hOFNNo) { $scope.QueryService.GetBillInfo($stateParams); }

});


