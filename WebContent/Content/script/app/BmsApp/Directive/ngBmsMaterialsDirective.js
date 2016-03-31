/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngBmsMaterials", function ($BMSApi, $MessagService, $local) {
    /// <summary>BMS物资选择</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BmsApp/Directive/ui/ngBmsMaterials.html?data=" + Timestamp,
        scope: {
            ngBmsMaterials: "=",
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                /// <summary>物资选择服务</summary>
                MaterialList: new Array(),
                //修改的物料列表
                ChangeList: new Array(),
                GetMaterialList: function () {
                    /// <summary>获取物资列表</summary>
                    $scope.Service.GetChangeMaterials();

                    $BMSApi.BMSBaseService.GetMaterialList($scope.Pagein, function (queryData) {
                        $scope.Service.MaterialList = queryData.rows;
                        $scope.Pagein.total = queryData.total;
                    });
                },
                GetChangeMaterials: function () {
                    /// <summary>获取修改的物资信息</summary>

                },
                UpEnter: function (e) {
                    /// <summary>点击回车事件</summary>
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode == 13) {
                        $scope.Pagein.ReLoad();
                    }
                }
            }

            $scope.Pagein = {
                /// <summary>分页信息</summary>
                pageSize: 20,
                pageIndex: 1,
                callbake: function () {
                    $scope.Service.GetMaterialList();
                }
            }



            var modelConfig = {
                open: function () {
                    /// <summary>弹出层打开事件</summary>
                    //清空冗余数据
                    $scope.Service.ChangeList = new Array();
                    $scope.Service.MaterialList = new Array();
                    $scope.Pagein.searchValue = "";
                    $scope.Pagein.ReLoad();
                },
                title: "物资选择", width: "100%", position: [0], height: "90%", buttons: {
                    "确定": function () {
                        $scope.Service.GetChangeMaterials();
                        var data = $scope.Service.ChangeList;
                        if (data.length) {
                            $scope.ngOperat.fixed(data);
                            $scope.ngOperat.hide();
                        } else {
                            $MessagService.caveat("请至少添加一件物资...")
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                }
            }
            $.extend($scope.ngBmsMaterials, modelConfig);
        }
    }
});