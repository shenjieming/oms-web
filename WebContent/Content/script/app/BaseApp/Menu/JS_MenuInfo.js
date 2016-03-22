/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("MenuListController", function ($scope, $state, $local, $Api, $MessagService) {

    $scope.tree = {
        setting: {
            callback: {
                beforeExpand: true,
                onExpand: function (event, treeId, treeNode) {
                    /// <summary>tree查询子节点</summary>
                    if (!treeNode.reNode) {
                        treeNode.reNode = true;
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary>
                    console.log(treeNode)
                    $scope.MenuDetail.parOption = treeNode.id;
                    $scope.MenuDetail.getTreeMenuList();//数据读取
                    $scope.MenuDetail.getMenuDetail();
                },
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId",
                }
            },
        },

        obj: new Object()
    }
    /// <summary>菜单列表管理器</summary> 
    $scope.MenuInfo = {};
    $scope.functionID = {};
    $scope.MenuDetail = {
        parOption: [],
        MenuInfo: {},
        getMenuList: function () {
            /// <summary>获取功能菜单列表</summary>
            $MessagService.loading("菜单列表获取中，请稍等...");
            //var options = $.extend({});//条件合并
            $Api.MenuService.GetMenuList({}, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.MenuInfo = rData;
            });
        },
        getTreeMenuList: function () {
            /// <summary>获取功能菜单列表</summary>
            console.log($scope.functionID)
            $MessagService.loading("菜单列表获取中，请稍等...");
            var options = $.extend({ parentFunctionID: $scope.MenuDetail.parOption }, {})
            $Api.MenuService.GetMenuList(options, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.MenuInfo = rData;
                console.log(rData)
            });
        },
        getMenuDetail: function () {
            /// <summary>获取功能菜单详细</summary>
            $Api.MenuService.GetMenuDetail({ functionID: $scope.MenuDetail.parOption }, function (rData) {
                /// <summary>获取菜单列表</summary>
                console.log(rData)
            });
        },
        getMenuZtree: function () {
            /// <summary>树层名称</summary>
            /// <summary>获取菜单功能</summary>
            $Api.MenuService.GetMenuList({}, function (rData) {
                var treeData = new Array();
                $scope.MenuDetail.getMenuList();//数据读取
                for (var i = 0; i < rData.length; i++) {
                    var item = rData[i];
                    treeData.push({
                        id: item.functionID,                        pid: item.parentFunctionID,                        pId: item.parentFunctionID,                        name: item.functionName,
                        isParent: (item.parentFunctionID == 1)
                    });

                }
                $scope.tree.data = treeData;
            })
        }
    }
    //菜单详情
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.load = function () {
        $scope.MenuDetail.getMenuZtree();
    }
    $scope.load();

})