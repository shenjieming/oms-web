
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
app.directive("ngBmsMaterials", function ($BMSApi, $MessagService, $local, $AppHelp) {
    /// <summary>BMS物资选择</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBmsMaterials.html?data=" + Timestamp,
        scope: {  ngBmsMaterials: "=", ngModel:"="   },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                /// <summary>物资选择服务</summary>
                MaterialList: new Array(),
                //修改的物料列表
                ChangeList: new Array(),
                GetMaterialList: function () {
                    /// <summary>获取物资列表</summary>
                    $scope.Service.GetChangeMaterials(); var param = $.extend($scope.Pagein, $scope.ngModel); $BMSApi.BMSBaseService.GetMaterialList($scope.Pagein, function (queryData) { $scope.Pagein.total = queryData.total; $scope.Service.MaterialList = new Array(); $.each(queryData.rows, function (index, item) { $scope.Service.MaterialList.push($.extend(item, { reqQty: $scope.Service.GetMaterialQty(item) })); }); });
                },
                GetChangeMaterials: function () {
                    /// <summary>获取修改的物资信息</summary>
                    $.each($scope.Service.MaterialList, function (index, data) { if (data.reqQty > 0) { var flg = true; $.each($scope.Service.ChangeList, function (i, changeData) { if (data.dHMedMaterialInternalNo == changeData.dHMedMaterialInternalNo) { changeData.reqQty = data.reqQty; flg = false; return false; } }); if (flg) { $scope.Service.ChangeList.push(data); } } });
                },
                UpEnter: function (e) {
                    /// <summary>点击回车事件</summary>
                    var keycode = window.event ? e.keyCode : e.which; if (keycode == 13) { $scope.Pagein.ReLoad(); }
                },
                AddAllQty: function () {
                    /// <summary>添加全部的数据</summary>
                    $.each($scope.Service.MaterialList, function (index, row) { $scope.Service.AddreqQty(row) });
                },
                AddreqQty: function (row) {
                    /// <summary>添加使用数量</summary>
                    row.reqQty++;
                },
                GetDayToData: $AppHelp.Data.GetDate,
                GetMaterialQty: function (data) {
                    /// <summary>获取物资的数量</summary>
                    var result = 0; $.each($scope.Service.ChangeList, function (i, changeData) { if (data.dHMedMaterialInternalNo == changeData.dHMedMaterialInternalNo) { result = changeData.reqQty; return false; } }); return result;
                },
                InitializeDirective: function () {
                    /// <summary>初始化插件</summary>
                    $scope.Service.ChangeList = new Array(); $scope.Service.MaterialList = new Array(); $scope.Pagein.searchValue = ""; $scope.Pagein.ReLoad();
                }
            }

            /// <summary>分页信息</summary>
            $scope.Pagein = { pageSize: 20, pageIndex: 1, callbake: function () { $scope.Service.GetMaterialList(); } }



            var modelConfig = {
                open: function () {
                    /// <summary>弹出层打开事件</summary>
                    //清空冗余数据
                    $scope.Service.InitializeDirective();
                },
                title: "物资选择", width: "100%", position: [0], height: "90%", buttons: { "确定": function () { $scope.Service.GetChangeMaterials(); var data = $scope.Service.ChangeList; if (data.length) { $scope.$apply(function () { $scope.ngBmsMaterials.fixed(data); }); $scope.ngBmsMaterials.hide(); } else { $MessagService.caveat("请至少添加一件物资...") } }, "关闭": function () { $scope.ngBmsMaterials.hide(); } }
            }
            $.extend($scope.ngBmsMaterials, modelConfig);
        }
    }
});