/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OrderRoutingListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单仓库路由</summary>
    $scope.tree = {
        setting: {
            callback: {
                beforeExpand: true,
                onExpand: function (event, treeId, treeNode) {
                    /// <summary>tree查询子节点</summary>
                    if (!treeNode.reNode) {
                        treeNode.reNode = true;
                        treeNode.Subset(treeNode.options, function (rData) {
                            /// <summary>子集数据查询</summary>
                            var nodeList = new Array();
                            for (var i = 0; i < rData.length; i++) {
                                var node = {
                                    id: rData[i].id, name: rData[i].text
                                };
                                if (treeNode.SubsetType == "medBrandCode") {//根据条件参数控制子集的条件参数
                                    node.SubsetType = "medProdLnCode";
                                    node.isParent = true;
                                    node.Subset = $Api.BrandService.GetProductLine;
                                    node.options = { oIOrgCode: treeNode.options.oIOrgCode, medBrandCode: rData[i].id, includeMedProdLn: rData[i].param, medBrandCodeName: rData[i].text };
                                } else {
                                    console.log(treeNode.options)
                                    node.options = { medBrandCode: treeNode.options.medBrandCode, medBrandCodeName: treeNode.options.medBrandCodeName, medProdLnCode: rData[i].id, medProdLnCodeName: rData[i].text };
                                }
                                nodeList.push(node);
                            }
                            $scope.tree.obj.addNodes(treeNode, nodeList);
                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary>
                    $scope.Pagein.pageIndex = 1;//当前数据分页从第一页开始
                    $scope.OrderRouting.options = treeNode.options;//获取当前节点的条件
                    $scope.OrderRouting.GetZreeOrderRouting();//数据读取
                    $scope.Server.Add = true;
                    $scope.Server.Delect = true;            
                    $scope.Server.Edit = true;
                    $scope.Server.View = true;                  
                }
            }
        },
        obj: new Object()
    }


    $scope.OrderRouting = {
        info: [],
        options: [],
        GetZreeOrderRouting: function () {
            /// <summary>获取产品线列表</summary>
            var opt = $.extend($scope.OrderRouting.options, $scope.Pagein);
            console.log(opt)
            $Api.ProductLine.Getquery(opt, function (rData) {
                $scope.OrderRouting.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        },
        GetWareHouseList: function () {
            /// <summary>获取我的货主信息</summary>
            $Api.MaterialsService.GetAllWareHouse({}, function (rData) {
                var treeData = new Array();
                console.log(rData);
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.OrderRout.GetBrandList, SubsetType: "oIOrgCode" });
                }
                $scope.tree.data = treeData;;
            })
        },
    }

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.OrderRouting.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.a = {
        info: [],
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
      
    }
    $scope.Load();
})