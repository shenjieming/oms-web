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
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetReconciliationList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetReconciliationList: function (param, isNew) {
            /// <summary>获取对账单列表</summary>
            $scope.Integrated.BillList = new Array(); if (isNew) { $scope.Integrated.ClearWhere(); }; var paramData = $.extend($scope.Pagein, param); $BMSApi.PublicInfoService.GetReconciliationList(paramData, function (getResult) { $scope.Pagein.total = getResult.total; $scope.Integrated.ReconciliationList = getResult.rows; });
        }
    };

    $scope.PageControl = {
        /// <summary>页面控制</summary>
        SetCompetence: function (comp) {
            /// <summary>设置页面权限</summary>
            this.InitCompetence(); $.extend($scope.Competence, comp);
        },
        InitCompetence: function () {
            /// <summary>初始化权限</summary>
            $scope.Competence = { add: false, modify: false, batchapproval: false, approval: false, unapproval: false, discard: false }
        },
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.setValue("ORDERCOMP", $scope.Competence); $local.CarriedSelectedRow($scope.Integrated.ReconciliationList, callback);
        },
        GoDetailPage: function (row) {
            /// <summary>前往对账操作明细页面</summary>
            $scope.goView("app.bms.rec.detail", row);
        },
        GoViewPage: function (row) {
            /// <summary>前往对账明细视图页面</summary>
            $scope.goView("app.bms.rec.view", row);
        },
        GoViewByDetail: function () {
            /// <summary>根据对账明细前往对账详情页面</summary>
            $scope.PageControl.GoPageBySedRow($scope.PageControl.GoViewPage);
        },
        EditDetail: function () {
            /// <summary>编辑对账数据</summary>
            $scope.PageControl.GoPageBySedRow($scope.PageControl.GoDetailPage);
        }
    }

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetReconciliationList(); } }
});

app.controller("RecInfoController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $RecInfFactory) {
    /// <summary>对账信息管理</summary>
    console.log("对账管理-对账详情启动");
    $scope.RecInfo = { detail: new Array(), images: new Array() };
    $scope.MaterialView = new Array();

    $scope.Factory = $RecInfFactory($scope);

    $scope.Module = {
        /// <summary>组件控制器</summary>
        BillListConfig: {
            /// <summary>订单列表配置器</summary>
        },
        BillListService: {
            /// <summary>订单服务</summary>
        }
    }
    $scope.QueryService = {
        /// <summary>对账管理，查询服务</summary>
        GetReconciliationInfo: function (param) {
            /// <summary>获取对账单明细</summary>
            $BMSApi.PublicInfoService.GetReconciliationDetail(param, function (data) {
                $.extend($scope.RecInfo, data);
                setTimeout(function () {
                    $.extend($scope.RecInfo.detail, data.detail);
                    $scope.Module.BillListService.IsShowMaterialView(true);
                },500);
            });
        },
        GetMaterialView: function () {
            /// <summary>获取新的物料列表</summary>
            $scope.MaterialView = $scope.Factory.GetMaterialView($scope.RecInfo.detail);
        }
    };

    if ($stateParams.hSOANo) { $scope.QueryService.GetReconciliationInfo($stateParams); } else { $.extend($scope.RecInfo, $scope.Factory.GetNewRecMapping()); }
});


