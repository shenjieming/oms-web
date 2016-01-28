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
                    console.log($scope.MenuInfo)
                    for (var i = 0; i < $scope.MenuInfo.length; i++) {
                        if (treeNode.id == $scope.MenuInfo[i].functionID) {
                            $scope.functionID = treeNode.id;
                        }
                    }
                    $scope.MenuDetail.getTreeMenuList();//数据读取
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
            $Api.MenuService.GetMenuList({ functionID: $scope.functionID }, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.MenuInfo = rData;
            });
        },
        getMenuDetail: function () {
            /// <summary>获取功能菜单详细</summary>
            $Api.MenuService.GetMenuDetail({ functionID: $scope.MenuView.Info.functionID }, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.MenuView.Info = rData;
            });
        },
        getMenuZtree: function () {
            /// <summary>树层名称</summary>
            /// <summary>获取菜单功能</summary>
            $Api.MenuService.GetMenuList({}, function (rData) {
                var treeData = new Array();
                $scope.MenuDetail.getMenuList();//数据读取
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i].functionLevel != 2) {
                        treeData.push({ id: rData[i].functionID, pId: rData[i].parentFunctionID, name: rData[i].functionName, isParent: true });
                    } else {
                        treeData.push({ id: rData[i].functionID, pId: rData[i].parentFunctionID, name: rData[i].functionName });
                    }
                }
                $scope.tree.data = treeData;
            })
        }

    }
    //菜单详情
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.MenuInfo, function (index, item) {
            if (item.isSelected) {
                result = item
            }
        });
        console.log(result)
        return result;
    }
    $scope.MenuView = {

        Info: {},
        showMenuView: function (row) {
            $scope.MenuView.Info = row ? row : $scope.getSelectedRow();
            $scope.MenuDetail.getMenuDetail();
            /// <summary>获取选中的行</summary>
            if ($scope.MenuView.Info) {
                /// <summary>y=有效</summary>
                console.log($scope.MenuView.Info)
                $scope.MenuView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            /// <summary>取消</summary>
            $scope.MenuView.model.hide();
        }

    }
    $scope.MenuView.model = { title: "菜单详情", width: 600, height: 300, buttons: { "确定": $scope.MenuView.cancel } }

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