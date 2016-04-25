///  <autosync enabled="true" /> 
/// <reference path="../Config.js" />
/// <reference path="../BMSPath.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-route.js" />
/// <reference path="../../../lib/jnDo_1.0/jnDo_1.0.js" />
app.controller("InvoiceController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>票据管理</summary>
    console.log("票据管理，主程序运行");

    $scope.Competence = {
        /// <summary>权限配置</summary>
        modify: false, batchapproval: false, approval: false, unapproval: false, discard: false
    }

    $scope.Integrated = {
        /// <summary>计费发票列表</summary>
        InvoiceList: new Array(),
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetInvoiceList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetInvoiceList: function (param, isNew) {
            /// <summary>获取计费发票列表</summary>
            $scope.Integrated.InvoiceList = new Array(); if (isNew) { $scope.Integrated.ClearWhere(); };    var paramData = $.extend($scope.Pagein, param);     $BMSApi.PublicInfoService.GetInvoiceList(paramData, function (getResult) {     $scope.Pagein.total = getResult.total;    $scope.Integrated.InvoiceList = getResult.rows;   });
        }
    };

    $scope.PageControl = {
        /// <summary>页面控制</summary>
        SetCompetence: function (comp) {
            /// <summary>设置页面权限</summary>
            this.InitCompetence();
            $.extend($scope.Competence, comp);
        },
        InitCompetence: function () {
            /// <summary>初始化权限</summary>
            $scope.Competence = { modify: false, batchapproval: false, approval: false, unapproval: false, discard: false }
        },
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.setValue("ORDERCOMP", $scope.Competence);
            $local.CarriedSelectedRow($scope.Integrated.InvoiceList, callback);
        }
    }


    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});



