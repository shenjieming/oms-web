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
            this.InitCompetence();
            $.extend($scope.Competence, comp);
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
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});

app.controller("RecInfoController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $RecInfFactory) {
    /// <summary>对账信息管理</summary>
    console.log("对账管理-对账详情启动");
    $scope.RecInfo = { detail: new Array(), images: new Array() };
    $scope.MaterialView = new Array();

    $scope.Factory = $RecInfFactory($scope);
    $scope.QueryService = {
        /// <summary>对账管理，查询服务</summary>
        GetReconciliationInfo: function (param) {
            /// <summary>获取对账单明细</summary>
            $BMSApi.PublicInfoService.GetReconciliationDetail(param, function (data) {
                $.extend($scope.RecInfo, data); setTimeout(function () { $.extend($scope.RecInfo.detail, data.detail); $scope.BillService.ChangeBillList(); $scope.BillService.IsShowMaterialView(true); });
            });
        },
        GetRecByMappingData: function (data) {
            /// <summary>根据映射数据获取对账信息</summary>
            $.extend($scope.RecInfo, data)
        },
        GetMaterialView: function () {
            /// <summary>获取新的物料列表</summary>
            $scope.MaterialView = $scope.Factory.GetMaterialView($scope.RecInfo.detail);
        }
    };

    $scope.BillService = {
        /// <summary>计费单信息处理服务</summary>
        Gather: new Object(),
        ViewMaterial: false,
        MaterialList:new Array(),
        IsShowMaterialView: function (isshow) {
            /// <summary>是否显示物料列表</summary>
            $scope.BillService.ViewMaterial = isshow; if (isshow) { $scope.BillService.GetMaterialView(); }
        },
        ChangeBillList: function () {
            /// <summary>修改订单列表信息</summary>
            $scope.BillService.Gather = $scope.Factory.BillAnalysis($scope.RecInfo.detail);
        },
        GetMaterialView: function () {
            /// <summary>获取物料维度的订单视图</summary>
            $scope.BillService.MaterialList = $scope.Factory.GetMaterialView($scope.RecInfo.detail);
        }
    }

    if ($stateParams.hSOANo) { $scope.QueryService.GetReconciliationInfo($stateParams); } else { $scope.QueryService.GetRecByMappingData($scope.Factory.GetNewRecMapping()); }
});
app.factory("$RecInfFactory", function ($BMSApi,$AppHelp) {
    /// <summary>对账管理服务平台工厂</summary>
    var $RecInfFactory = function (scope) {
        /// <summary>对账管理服务器</summary>
        this.$scope = scope;

        var GetBillDetailMapping = function (detail) {
            /// <summary>获取计费单详情映射信息</summary>
            return $.extend(detail, { medMaterialName: detail.dHMMName, hOFNLineSeqNo: detail.lineSeqNo, offsetQty: (detail.qty - (detail.recordInHSOAQty ? detail.recordInHSOAQty : 0)) });
        }

        var GetDictionaryCount = function (dictionary) {
            /// <summary>获取字典的属性数量</summary>
            var result = 0; for (var key in dictionary) { result++; } return result;
        }

        this.GetNewRecMapping = function () {
            /// <summary>获取新的的对账单映射</summary>
            return { hSOASourceType: "HSOASTHP", hSOASourceTypeName: "医院", hSOAType: "HSOATPNM", hSOADateFrom: $AppHelp.Data.GetDate(30, null, 3), hSOADateTo: $AppHelp.Data.GetDate(0, null, 3), hSOAIssueDate: $AppHelp.Data.GetDate(0, null, 3), hSOAIssueByName: $scope.User.userInfo.userName, detail: new Array(), images: new Array() };
        }

        this.GetNewBillDetail = function (oldlist, newlist) {
            /// <summary>获取新的计费单详情</summary>
            $.each(newlist, function (index, bill) { var newbill = GetBillDetailMapping(bill); var flg = true; $.each(oldlist, function (oindex, item) { if (newbill.hOFNNo == item.hOFNNo && newbill.hOFNLineSeqNo == item.hOFNLineSeqNo) { flg = false; return false; } }); if (flg) { oldlist.push(newbill); } }); return oldlist;
        }

        this.BillAnalysis = function (list) {
            /// <summary>订单数据分析</summary>
            var result = { BillCount: 0, MaterialCount: 0, BrandCount: 0, SpeciCount: 0, StuffCount: 0, HsQtyCount: 0, OffsetQtyCount: 0, Amount: 0 }; var Dictionary = { bill: new Array(), Material: new Array(), Brand: new Array(), Speci: new Array(), Stuff: new Array() }; $.each(list, function (index, bill) { Dictionary.bill[bill.hOFNNo] = 1; Dictionary.Material[bill.dHMedMaterialInternalNo] = 1; Dictionary.Brand[bill.medMaterialBrandName] = 1; Dictionary.Speci[bill.dHMMSpecification] = 1; Dictionary.Stuff[bill.dHMMMaterials] = 1; var OffsetQty = bill.offsetQty; var HsQty = (bill.qty - (bill.recordInHSOAQty ? bill.recordInHSOAQty : 0)); var Amount = OffsetQty * bill.hPUnitEstPrice; $.extend(result, { HsQtyCount: result.HsQtyCount + HsQty, OffsetQtyCount: result.OffsetQtyCount + OffsetQty, Amount: result.Amount + Amount }); }); $.extend(result, { BillCount: GetDictionaryCount(Dictionary.bill), MaterialCount: GetDictionaryCount(Dictionary.Material), BrandCount: GetDictionaryCount(Dictionary.Brand), SpeciCount: GetDictionaryCount(Dictionary.Speci), StuffCount: GetDictionaryCount(Dictionary.Stuff) }); return result;
        }

        this.GetMaterialView = function (list) {
            /// <summary>获取物料分析试图</summary>
            var result = new Array(); $.each(list, function (index, item) { var flg = true; $.each(result, function (mindex, material) { if (item.medMaterialName == material.medMaterialName) { material.offsetQty = (material.offsetQty + item.offsetQty); flg = false; return false; } }); if (flg) { result.push($.extend({}, item)); } }); return result;
        }
        var RecInfFactory = this; return this;
    }
    return $RecInfFactory;
});


