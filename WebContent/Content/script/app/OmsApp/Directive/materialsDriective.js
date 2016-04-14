/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngMaterials", function ($Api, $MessagService, $local) {
    /// <summary>物料选择组件</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngMaterials.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngLine: "=",
            ngOperat: "=",
            ngChange:"="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                //物料列表
                MaterialList: new Array(),
                //修改的物料列表
                ChangeList: new Array(),
                productLine: false,
                brandLine: false,
                all: false,
                checkgroup: true,
                option:false,
                AddreqQty: function (Material) {
                    /// <summary>添加套件物料</summary>
                    Material.reqQty++;
                },
                AddAllQty: function () {
                    /// <summary>添加全部的物料数量</summary>
                    $.each($scope.Service.MaterialList, function (index, material) {
                        $scope.Service.AddreqQty(material);
                    })

                },
                UpEnter: function (e) {
                    /// <summary>点击回车事件</summary>
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode == 13) {
                        $scope.Service.QueryMaterialList();
                    }
                },
                GetList: function () {
                    /// <summary>获取物料列表</summary>
                    $MessagService.loading("物料列表获取中，请稍等...");
                    $scope.Service.GetChangeMaterials();
                    var options = $.extend({
                        medProdLnCode: $scope.ngLine,
                        isQueryInventory: "N"
                    }, $scope.Pagein);//条件合并
                    $Api.MaterialsService.GetMaterialsList(options, function (rData) {
                        $scope.Service.MaterialList = new Array();
                        $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
                        $.each(rData.rows, function (index, item) {
                            $scope.Service.MaterialList.push($.extend(item, {
                                reqQty: $scope.Service.GetMaterialQty(item)
                            }));
                        });
                    });
                },
                QueryMaterialList: function () {
                    /// <summary>便捷查询物料信息</summary> 
                    console.log($scope.Service)
                    if (!$scope.Service.brandLine && !$scope.Service.productLine && !$scope.Service.all && $scope.Pagein.categoryByPlatform == "TOOL") {
                        $scope.Service.option = true;
                    }
                    $.extend($scope.Pagein, {
                        pageIndex: 1,
                        productLine: $scope.Service.productLine ? "Y" : "N",//品牌内通用(跨产品线)
                        brandLine: $scope.Service.brandLine ? "Y" : "N",
                        all: $scope.Service.all ? "Y" : "N"
                    });
                    console.log($scope.Pagein)
                    $scope.Pagein.ReLoad();
                    // $scope.Service.GetList();
                },
                GetMaterialListByCategory: function (type) {
                    /// <summary>根据物料类型获取物料</summary>                    
                    $.extend($scope.Pagein, { categoryByPlatform: type });
                    $scope.Service.QueryMaterialList();
                },
                GetCheckis: function () {
                    /// <summary>选择产品线专用</summary>
                    $scope.Pagein.categoryByPlatform = "TOOL";
                    $scope.Service.option = true;
                    $scope.Service.GetMaterialListByCategory();
                },
                GetCheckon: function () {
                    /// <summary>选择产品线通用</summary>
                    $scope.Service.option = !$scope.Service.option;
                    if ($scope.Service.option) {
                        $scope.Service.all = false;
                        $scope.Service.productLine = false;
                        $scope.Service.brandLine = false;
                    } else {
                        $scope.Service.all = true;
                        $scope.Service.productLine = true;
                        $scope.Service.brandLine = true;
                    }
                    $scope.Service.GetMaterialListByCategory();
                },
                GetMaterialQty: function (data) {
                    /// <summary>获取物料的数量</summary>
                    var result = 0;
                    $.each($scope.Service.ChangeList, function (index, item) {
                        if (item.medMICode == data.medMICode) {
                            result = item.reqQty;
                            return false;
                        }
                    })
                    return result;
                },
                GetChangeMaterials: function () {
                    /// <summary>获取修改数量的物料</summary>
                    $.each($scope.Service.MaterialList, function (index, item) {
                        if (item.reqQty > 0) {
                            var flg = true;
                            $.each($scope.Service.ChangeList, function (i, changData) {
                                if (item.medMICode == changData.medMICode) {
                                    changData.reqQty = item.reqQty;
                                    flg = false;
                                    return false;
                                }
                            })
                            if (flg) {
                                $scope.Service.ChangeList.push(item);
                            }
                        }
                    });
                }
            }
     
          
            $scope.Pagein = {
                /// <summary>分页信息</summary>
                pageSize: 8,
                categoryByPlatform: "IMPLANT",
                pageIndex: 1,
                callbake: function () {
                    $scope.Service.GetList();
                }
            }
            var categoryByPlatform = new Object();
            categoryByPlatform = $scope.Pagein.categoryByPlatform;
            categoryByPlatform = "IMPLANT" ? "植入物" : "工具";
            var modelConfig = {
                open: function () {
                    /// <summary>弹出层打开事件</summary>
                    //清空冗余数据
                    $scope.Service.ChangeList = new Array();
                    $scope.Service.MaterialList = new Array();
                    $scope.Pagein.searchValue = "";
                    $scope.Service.GetMaterialListByCategory();
                },
                //"物料选择- "+categoryByPlatform+" - 产品线"
                //"物料选择-植入物/工具-产品线"
                title:"物料选择-植入物/工具-产品线", width: "100%", position: [0], height: "90%", buttons: {
                    "确定": function () {
                        $scope.Service.GetChangeMaterials();
                        var data = $scope.Service.ChangeList;
                        if (data.length) {
                            $scope.ngOperat.fixed(data);
                            $scope.ngOperat.hide();
                        } else {
                            $MessagService.caveat("请至少添加一件物料...")
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                },
            }
            $.extend($scope.ngOperat, modelConfig);
           
        }
    }
});