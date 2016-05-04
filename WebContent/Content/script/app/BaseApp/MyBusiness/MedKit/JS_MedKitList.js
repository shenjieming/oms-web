

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MedKitListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>套件列表内控制器</summary>
    $scope.MedKit = {
        IsView: false,
        IsEdit: false,
        List: new Array(),
        WarehouseList: new Array(),
        ZoneList:new Array(),
        GetWarehouseList: function () {
            /// <summary>获取仓库信息</summary>
            $Api.MaterialsService.GetAllWareHouse({}, function (rData) {
                $scope.MedKit.WarehouseList = rData;
            });
        },
        GetZoneList: function () {
            /// <summary>获取库区的列表</summary>
            $scope.MedKit.ZoneList = new Array();
            if ($scope.Detail.PageData.medMIWarehouse) {
                $Api.BusinessData.Reservoir.AueryAllWhzone({ medMIWarehouse: $scope.Detail.PageData.medMIWarehouse, validStatus: "Y" }, function (rData) {
                    $scope.MedKit.ZoneList = rData.rows;
                });
            }
        },
        GetMedKitList: function () {
            /// <summary>获取套件列表</summary>
            $Api.MedKitService.GetMedKitList($scope.Pagein, function (rData) {
                $scope.MedKit.List = rData.rows;
                $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
            });
        },
        QueryMedKit:function(){
            $scope.Pagein.pageIndex = 1;
            $scope.MedKit.GetMedKitList();
        },
        UpEnter: function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.MedKit.GetMedKitList();
            }
        },
    };
  
    $scope.Service = {
        isView: function (isshow) {
            /// <summary>是否显示明细页面</summary>
            $scope.MedKit.IsView = isshow;
        },
        isEdit: function (isshow) {
            /// <summary>是否编辑套件</summary>
            $scope.MedKit.IsView = false;
            $scope.MedKit.IsEdit = isshow;
        },
        Add: function () {
            /// <summary>添加套件</summary>
            $scope.Detail.PageData = { prodLns: [] };//数据清空
            $scope.Service.isEdit(true);
        },
        Delete: function () {
            /// <summary>删除套件</summary>
            var row = $local.getSelectedRow($scope.MedKit.List);
            if (row) {
                if (confirm("您确认要删除当前套件吗?")) {
                    $Api.MedKitService.DeleteHMedKit(row, function () {
                        $MessagService.succ("套件删除成功！");
                        $scope.MedKit.GetMedKitList();
                    });
                }
            } else {
                $MessagService.caveat("请选择一条需要删除的套件信息！");
            }
        },
        Edit: function () {
            /// <summary>编辑套件</summary>
            var row = $local.getSelectedRow($scope.MedKit.List);
            if (row) {
                this.GetKitDiteil(row, function (kit) {
                    $scope.Service.isEdit(true);
                    $scope.Detail.PageData = kit;
                    $.extend($scope.Detail.PageData, {
                        sOOIOrgCode: kit.oIOrgCode,
                        medMIWarehouse: kit.whCode,
                       
                    });
                    setTimeout(function () {
                        $scope.Detail.PageData.prodLns = kit.productLine;
                    });
                    $scope.Detail.PageData.isChangeProd = true

                });
            } else {
                $MessagService.caveat("请选择一条编辑的套件信息！");
            }
        },
        View: function (row) {
            /// <summary>点击套件详情</summary>
            var medKitopt = row ?row:$local.getSelectedRow($scope.MedKit.List);
            if (medKitopt){
                $scope.goView("app.base.mybusiness.kitsview",{medKitopt:medKitopt.medKitInternalNo})
                // this.ViewKit(row)
            } else {
                $MessagService.caveat("请选择一条查看的套件信息！");
            }
        },
        ViewKit: function (row) {
            /// <summary>查看套件详情</summary>
            this.GetKitDiteil(row, function (kit) {
                $scope.view.PageData = kit;
                $scope.Service.isView(true);
            });
        },
        GetKitDiteil: function (rowData,callback) {
            /// <summary>获取套件详细信息</summary>
            $Api.MedKitService.GetMedKitDetail(rowData,callback);
        },
        KitValid:function(){
            var result = true;
            $.each($scope.Detail.PageData.prodLns,function(pindex,pro){
                if(pro.medMaterias.length<=0){
                    $MessagService.eorr("请选择产品线"+"  "+pro.medProdLnCodeName+"  "+"下的物料！");
                    result = false;
                }
            });
            if(!($scope.Detail.PageData.prodLns.length>0)){
                $MessagService.eorr("请选择产品线!");
                result = false;
            }
            if(!$scope.Detail.PageData.zoneCode){
                $MessagService.eorr("请选择库区!");
                result = false;
            }
            if(!$scope.Detail.PageData.medMIWarehouse){
                $MessagService.eorr("请选择存储仓库！");
                result = false;
            }
            if(!$scope.Detail.PageData.kitType){
                $MessagService.eorr("请输入套件类型！");
                result = false;
            }
            if(!$scope.Detail.PageData.kitName){
                $MessagService.eorr("请输入套件名称！");
                result = false;
            }
            if(!$scope.Detail.PageData.kitCode){
                $MessagService.eorr("请输入套件编码！");
                result = false;
            }
            if(!$scope.Detail.PageData.oIOrgCode){
                $MessagService.eorr("请选择货主！");
                result = false;
            }
            return result;
        },
        Save: function () {
            /// <summary>保存套件</summary>
            //必输项校验
            if ($scope.Service.KitValid()){
                if (!$scope.Detail.PageData.kitFullName){
                    $scope.Detail.PageData.kitFullName = $scope.Detail.PageData.kitName
                }
                $Api.MedKitService.Save($scope.Detail.PageData, function () {
                    $MessagService.succ("套件保存成功！");
                    $scope.MedKit.GetMedKitList();
                    $scope.Service.isEdit(false);
                });
            }
        }
    }

    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        searchValue:"",
        callbake: function () {
            $scope.MedKit.GetMedKitList();
        }
    }
    $scope.MedKit.GetWarehouseList();
    $scope.MedKit.GetMedKitList();
    $scope.view = {
        PageData: {},
        ProductService: {},
        ProductCompetence: { operat: false, kits: false, tool: false, warehouse: false }
    }
    $scope.Detail = {
        PageData: {
            oIOrgCode: "",
            sOOIOrgCode :"",
            kitCode: "",
            kitName: "",
            kitFullName: "",
            kitType: "",
            kitDesc: "",
            medMIWarehouse: "",
            zoneCode: "",
            relDesc: "",
            remark: ""
        },
        ProductService: {},
        ProductCompetence: { operat: true, kits: false, tool: false, warehouse: false }
    }
    $scope.$watch("Detail.PageData.medMIWarehouse", function () {
        $scope.MedKit.GetZoneList()
    });

    $scope.$watch("Detail.PageData.sOOIOrgCode", function () {
        $.extend($scope.Detail.PageData, {
            oIOrgCode: $scope.Detail.PageData.sOOIOrgCode, prodLns: new Array()
        })
    });
});