/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBillMaterials", function ($BMSApi, $MessagService, $local, $AppHelp, $RecInfFactory) {
    /// <summary>订单物料分析列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBillMaterials.html?data=" + Timestamp,
        scope: { ngBillMaterials: "=", ngModel: "=" ,ngBillService:"=",ngOperat:"="},
        replace: true,
        link: function (s, e, a) {
            s.Factory = $RecInfFactory(s);
            s.BillService = {
                /// <summary>计费单信息处理服务</summary>
                Gather: new Object(),
                ViewMaterial: false,
                MaterialList: new Array(),
                IsShowMaterialView: function (isshow) {
                    /// <summary>是否显示物料列表</summary>
                    s.BillService.ViewMaterial = isshow; if (isshow) { s.BillService.ChangeBillList(); s.BillService.GetMaterialView(); }
                },
                ChangeBillList: function () {
                    /// <summary>修改订单列表信息</summary>
                    s.BillService.Gather = s.Factory.BillAnalysis(s.ngModel.detail);
                },
                GetMaterialView: function () {
                    /// <summary>获取物料维度的订单视图</summary>
                    s.BillService.MaterialList = s.Factory.GetMaterialView(s.ngModel.detail);
                },
                GetRecByMappingData: function (data) {
                    /// <summary>根据映射数据获取对账信息</summary>
                    $.extend(s.ngModel, data); s.BillService.ChangeBillList();
                },
                DeletBillMaterial: function (row) {
                    /// <summary>删除计费单物料</summary>
                    $BMSApi.ReconciliationService.FndDelete(row, s.BillService.GetNewReconciliation);
                },
                GetNewReconciliation: function () {
                    /// <summary>获取新的对账单信息</summary>
                    $BMSApi.PublicInfoService.GetReconciliationDetail(s.ngModel, function (data) { $MessagService.succ("耗材删除成功！"); $.extend(s.ngModel, data); });
                }
            }

            s.BillConfig = {
                /// <summary>物料选择配置</summary>
                Edit: false,
                IsEditDetail: function (is) {
                    /// <summary>编辑对账明细</summary>
                    s.BillConfig.Edit = is; s.BillService.IsShowMaterialView(!is);
                },
                fixed: function (list) { s.BillService.GetRecByMappingData({ detail: s.Factory.GetNewBillDetail(s.ngModel.detail, list) }); }
            };

            if (s.ngBillService) { s.ngBillService = $.extend(s.BillService, s.ngBillService); } if (s.ngBillMaterials) { s.ngBillMaterials = $.extend(s.BillConfig, s.ngBillMaterials); }
        }
    }
});


app.directive("ngOperatBillList", function ($BMSApi, $MessagService, $local, $AppHelp, $RecInfFactory) {
    /// <summary>计费单操作列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngOperatBillList.html?data=" + Timestamp,
        scope: { ngOperatBillList: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, e, a) {
            $scope.BillService = {
                /// <summary>计费单服务</summary>
            }
        }
    }
});

app.directive("ngOperatBillMaterialList", function ($BMSApi, $MessagService, $local, $AppHelp, $RecInfFactory) {
    /// <summary>计费单物料操作列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngOperatBillMaterialList.html?data=" + Timestamp,
        scope: { ngOperatBillMaterialList: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, e, a) {
            $scope.MaterialService = {
                /// <summary>计费单物料服务</summary>
                
            }
        }
    }
});




app.factory("$RecInfFactory", function ($BMSApi, $AppHelp) {
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
            var result = { BillCount: 0, MaterialCount: 0, BrandCount: 0, SpeciCount: 0, StuffCount: 0, HsQtyCount: 0, OffsetQtyCount: 0, Amount: 0 }; var Dictionary = { bill: new Array(), Material: new Array(), Brand: new Array(), Speci: new Array(), Stuff: new Array() }; $.each(list, function (index, bill) { Dictionary.bill[bill.hOFNNo] = 1; Dictionary.Material[bill.dHMedMaterialInternalNo] = 1; Dictionary.Brand[bill.medMaterialBrandName] = 1; Dictionary.Speci[bill.dHMMSpecification] = 1; Dictionary.Stuff[bill.dHMMMaterials] = 1; var OffsetQty = bill.offsetQty; var HsQty = (bill.qty - (bill.recordInHSOAQty ? bill.recordInHSOAQty : 0)); var Amount = OffsetQty * bill.hPUnitPrice; $.extend(result, { HsQtyCount: result.HsQtyCount + HsQty, OffsetQtyCount: result.OffsetQtyCount + OffsetQty, Amount: result.Amount + Amount }); }); $.extend(result, { BillCount: GetDictionaryCount(Dictionary.bill), MaterialCount: GetDictionaryCount(Dictionary.Material), BrandCount: GetDictionaryCount(Dictionary.Brand), SpeciCount: GetDictionaryCount(Dictionary.Speci), StuffCount: GetDictionaryCount(Dictionary.Stuff) }); return result;
        }

        this.GetMaterialView = function (list) {
            /// <summary>获取物料分析试图</summary>
            var result = new Array(); $.each(list, function (index, item) { var flg = true; $.each(result, function (mindex, material) { if (item.medMaterialName == material.medMaterialName) { material.offsetQty = (material.offsetQty + item.offsetQty); flg = false; return false; } }); if (flg) { result.push($.extend({}, item)); } }); return result;
        }
        var RecInfFactory = this; return this;
    }
    return $RecInfFactory;
});

