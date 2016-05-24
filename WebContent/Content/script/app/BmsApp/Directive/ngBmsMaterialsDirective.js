
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBmsMaterials", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>BMS物资选择</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBmsMaterials.html?data=" + Timestamp,
        scope: { ngBmsMaterials: "=", ngModel: "=" },
        replace: true,
        link: function (s, e, a) {
            s.Service = {
                /// <summary>物资选择服务</summary>
                MaterialList: new Array(),
                //修改的物料列表
                ChangeList: new Array(),
                GetMaterialList: function () {
                    /// <summary>获取物资列表</summary>
                    s.Service.GetChangeMaterials(); var param = $.extend(s.Pagein, s.ngModel); $BMSApi.BMSBaseService.GetMaterialList(s.Pagein, function (queryData) { s.Pagein.total = queryData.total; s.Service.MaterialList = new Array(); $.each(queryData.rows, function (index, item) { s.Service.MaterialList.push($.extend(item, { reqQty: s.Service.GetMaterialQty(item) })); }); });
                },
                GetChangeMaterials: function () {
                    /// <summary>获取修改的物资信息</summary>
                    $.each(s.Service.MaterialList, function (index, data) { if (data.reqQty > 0) { var flg = true; $.each(s.Service.ChangeList, function (i, changeData) { if (data.dHMedMaterialInternalNo == changeData.dHMedMaterialInternalNo) { changeData.reqQty = data.reqQty; flg = false; return false; } }); if (flg) { s.Service.ChangeList.push(data); } } });
                },
                UpEnter: function (e) {
                    /// <summary>点击回车事件</summary>
                    var keycode = window.event ? e.keyCode : e.which; if (keycode == 13) { s.Pagein.ReLoad(); }
                },
                AddAllQty: function () {
                    /// <summary>添加全部的数据</summary>
                    $.each(s.Service.MaterialList, function (index, row) { s.Service.AddreqQty(row) });
                },
                AddreqQty: function (row) {
                    /// <summary>添加使用数量</summary>
                    row.reqQty++;
                },
                GetDayToData: $AppHelp.Data,
                GetMaterialQty: function (data) {
                    /// <summary>获取物资的数量</summary>
                    var result = 0; $.each(s.Service.ChangeList, function (i, changeData) { if (data.dHMedMaterialInternalNo == changeData.dHMedMaterialInternalNo) { result = changeData.reqQty; return false; } }); return result;
                },
                InitializeDirective: function () {
                    /// <summary>初始化插件</summary>
                    s.Service.ChangeList = new Array(); s.Service.MaterialList = new Array(); s.Pagein.searchValue = ""; s.Pagein.ReLoad();
                }
            }

            /// <summary>分页信息</summary>
            s.Pagein = { pageSize: 20, pageIndex: 1, callbake: function () { s.Service.GetMaterialList(); } };

            var modelConfig = {
                open: function () {
                    /// <summary>弹出层打开事件</summary>
                    //清空冗余数据
                    s.Service.InitializeDirective();
                },
                title: "物资选择", width: "100%", position: [0], height: "90%", buttons: { "确定": function () { s.Service.GetChangeMaterials(); var data = s.Service.ChangeList; if (data.length) { s.$apply(function () { s.ngBmsMaterials.fixed(data); }); s.ngBmsMaterials.hide(); } else { $MessagService.caveat("请至少添加一件物资...") } }, "关闭": function () { s.ngBmsMaterials.hide(); } }
            }
            $.extend(s.ngBmsMaterials, modelConfig);
        }
    }
});