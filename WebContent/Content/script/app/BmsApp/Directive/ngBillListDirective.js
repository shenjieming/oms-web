/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBillList", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>计费单选择列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBillList.html?data=" + Timestamp,
        scope: { ngBillList: "=", ngModel: "=" },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Integrated = {
                /// <summary>计费单管理控制器</summary>
                BillList: new Array(), Enter: function (e) { var keycode = window.event ? e.keyCode : e.which; if (keycode == 13) { $scope.Integrated.DataQuery({}); } },
                DataQuery: function (data) {
                    /// <summary>时间日期查询</summary>
                    $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetBillList();
                },
                ClearWhere: function () {
                    /// <summary>清空查询条件</summary>
                    $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
                },
                GetBillList: function () {
                    /// <summary>获取计费单信息</summary>
                    $scope.Service.GetSelectBill($scope.Integrated.BillList); $scope.Integrated.BillList = new Array(); $BMSApi.PublicInfoService.GetBillList($scope.Pagein, function (getResult) { $scope.Pagein.total = getResult.total; $scope.Integrated.BillList = $scope.Service.SetBillSelected(getResult.rows); });
                }
            }
           
            $scope.Service = {
                /// <summary>计费请求管理服务</summary>
                SelectBill: new Array(),
                GetSelectBill: function (list) {
                    /// <summary>获取选择的订单列表</summary>
                    $.each(list, function (index, item) { var flg = true; $.each($scope.Service.SelectBill, function (bindex, bill) { if (bill.hOFNNo == item.hOFNNo) { flg = false; return false; } }); if (item.selected) { $scope.Service.SelectBill.push(item); } });
                },
                SetBillSelected: function (list) {
                    /// <summary>获取订单的选择状态</summary>
                    $.each(list, function (index, item) { $.each($scope.Service.SelectBill, function (bindex, bill) { if (bill.hOFNNo == item.hOFNNo) { item.selected = true; return false; } }); }); return list;
                },
                GetSelectedBillDetail: function (callback) {
                    /// <summary>获取选择的订单明细信息</summary>
                    $scope.Service.GetSelectBill($scope.Integrated.BillList); if ($scope.Service.SelectBill.length > 0) { $BMSApi.PublicInfoService.GetMoreBillDetail({ hOFNNos: $scope.Service.SelectBill, hPCode: $scope.ngModel.hPCode }, callback); } else { $MessagService.caveat("请选择计费单信息！"); }
                }
            }


            $scope.Pagein = { opt: "WAIT_SOA_FEENOTE", pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }

            var modelConfig = {
                /// <summary>弹出层模板配置</summary>
                title: "计费单选择", width: "100%", position: [0], height: "90%", buttons: { "确定": function () { $scope.Service.GetSelectedBillDetail(function (list) { $scope.ngBillList.fixed(list); $scope.ngBillList.hide(); }) }, "关闭": function () { $scope.ngBillList.hide(); } }, open: function () { $scope.Service.SelectBill = new Array(); $scope.Integrated.DataQuery({}); }
            }
            $.extend($scope.ngBillList, modelConfig);

        }
    }
});