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
        templateUrl: "Content/script/app/Directive/ui/ngMaterials.html?data=" + Timestamp,
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
                //查询条件
                SearchWhere:"",
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
                    $.extend($scope.Pagein, {
                        pageIndex: 1,
                        medMIName: $scope.Service.SearchWhere,
                        medMIInternalNo: $scope.Service.SearchWhere
                    });
                    $scope.Service.GetList();
                },
                GetMaterialListByCategory: function (type) {
                    /// <summary>根据物料类型获取物料</summary>
                    $.extend($scope.Pagein, { pageIndex: 1, categoryByPlatform: type });
                    $scope.Service.GetList();
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
                pageSize: 5,
                categoryByPlatform: "IMPLANT",
                pageIndex: 1,
                callbake: function () {
                    $scope.Service.GetList();
                }
            }
            var modelConfig = {
                open: function () {
                    $scope.Service.ChangeList = new Array();
                    $scope.Service.MaterialList = new Array();
                    $scope.Service.GetMaterialListByCategory();
                },
                title: "物料选择", width: 950, height: 100, buttons: {
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
                }
            }
            $.extend($scope.ngOperat, modelConfig);
        }
    }
});