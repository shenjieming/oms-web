/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBillList", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>计费单选择列表</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBillList.html?data=" + Timestamp,
        scope: { ngBillList: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {
            s.Integrated = {
                /// <summary>计费单管理控制器</summary>
                BillList: new Array(), Enter: function (e) { var keycode = window.event ? e.keyCode : e.which; if (keycode == 13) { s.Integrated.DataQuery({}); } },
                DataQuery: function (data) {
                    /// <summary>时间日期查询</summary>
                    s.Pagein = $.extend(s.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); s.Integrated.GetBillList();
                },
                ClearWhere: function () {
                    /// <summary>清空查询条件</summary>
                    $.extend(s.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
                },
                GetBillList: function () {
                    /// <summary>获取计费单信息</summary>
                    s.Service.GetSelectBill(s.Integrated.BillList); s.Integrated.BillList = new Array(); $BMSApi.PublicInfoService.GetBillList(s.Pagein, function (getResult) { s.Pagein.total = getResult.total; s.Integrated.BillList = s.Service.SetBillSelected(getResult.rows); });
                }
            }
          
            s.Service = {
                /// <summary>计费请求管理服务</summary>
                SelectBill: new Array(),
                GetSelectBill: function (list) {
                    /// <summary>获取选择的订单列表</summary>
                    $.each(list, function (index, item) { var flg = true; $.each(s.Service.SelectBill, function (bindex, bill) { if (bill.hOFNNo == item.hOFNNo) { flg = false; return false; } }); if (item.selected) { s.Service.SelectBill.push(item); } });
                },
                SetBillSelected: function (list) {
                    /// <summary>获取订单的选择状态</summary>
                    $.each(list, function (index, item) { $.each(s.Service.SelectBill, function (bindex, bill) { if (bill.hOFNNo == item.hOFNNo) { item.selected = true; return false; } }); }); return list;
                },
                GetSelectedBillDetail: function (callback) {
                    /// <summary>获取选择的订单明细信息</summary>
                    s.Service.GetSelectBill(s.Integrated.BillList); if (s.Service.SelectBill.length > 0) { $BMSApi.PublicInfoService.GetMoreBillDetail({ hOFNNos: s.Service.SelectBill, hPCode: s.ngModel.hPCode }, callback); } else { $MessagService.caveat("请选择计费单信息！"); }
                }
            }

            s.Pagein = { opt: "WAIT_SOA_FEENOTE", pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { s.Integrated.GetBillList(); } }

            var modelConfig = {
                /// <summary>弹出层模板配置</summary>
                title: "计费单选择", width: "100%", position: [0], height: "90%", buttons: { "确定": function () { s.Service.GetSelectedBillDetail(function (list) { s.ngBillList.fixed(list); s.ngBillList.hide(); }) }, "关闭": function () { s.ngBillList.hide(); } }, open: function () { s.Integrated.BillList = new Array(); s.Service.SelectBill = new Array(); s.Integrated.DataQuery({}); }
            }
            $.extend(s.ngBillList, modelConfig);

        }
    }
});