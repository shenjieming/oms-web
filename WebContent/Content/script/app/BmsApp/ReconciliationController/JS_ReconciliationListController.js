///  <autosync enabled="true" /> 
/// <reference path="../Config.js" />
/// <reference path="../BMSPath.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-route.js" />
/// <reference path="../../../lib/jnDo_1.0/jnDo_1.0.js" />
app.controller("ReconciliationController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>对账单管理</summary>
    console.log("对账单管理主程序运行");
    $scope.title = "计费单对账";

    $scope.Competence = {
        /// <summary>权限配置</summary>
        modify: false, batchapproval: false, approval: false, unapproval: false, discard: false
    }

    $scope.Integrated = {
        //对账单列表
        ReconciliationList: new Array(),
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetBillList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetReconciliationList: function (param, isNew) {
            /// <summary>获取对账单列表</summary>
            $scope.Integrated.BillList = new Array(); if (isNew) { $scope.Integrated.ClearWhere(); };
            var paramData = $.extend($scope.Pagein, param);
            $BMSApi.PublicInfoService.GetReconciliationList(paramData, function (getResult) {
                $scope.Pagein.total = getResult.total; $scope.Integrated.ReconciliationList = getResult.rows;
            });
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
            $local.CarriedSelectedRow($scope.Integrated.BillList, callback);
        }
    }


    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});





