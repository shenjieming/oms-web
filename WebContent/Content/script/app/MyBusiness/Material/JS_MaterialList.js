/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("MaterialController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>经销商物料查询</summary>
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
                                    node.options = { oIOrgCode: treeNode.options.oIOrgCode, medBrandCode: rData[i].id };
                                } else {
                                    node.options = { medProdLnCode: rData[i].id };
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
                    $scope.Material.options = treeNode.options;//获取当前节点的条件
                    $scope.Material.GetList();//数据读取
                }
            }
        },
        obj: new Object()
    }

    $scope.Material = {
        //条件
        options:{},
        MaterialList:new Array(),
        GetList: function () {
            /// <summary>获取物料列表</summary>
            $MessagService.loading("物料列表获取中，请稍等...");
            var options = $.extend($scope.Material.options, $scope.Pagein);//条件合并
            $Api.MaterialsService.GetMaterialsList(options, function (rData) {
                $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
                $scope.Material.MaterialList = rData.rows;
            });
        },
        GetCargoOwner: function () {
            /// <summary>获取我的货主信息</summary>
            ///TODO:后期调整成平台和
            $Api.OrganizationService.GetCargoOwner({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    if (i == 0) {
                        $scope.Material.options = { oIOrgCode: rData[i].id };
                        $scope.Material.GetList();
                    }
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.BrandService.GetBrandList, SubsetType: "medBrandCode" });
                }
                $scope.tree.data = treeData;;
            })
        }
    }

    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Material.GetList();
        }
    }
    //获取我的货主信息
    $scope.Material.GetCargoOwner();
   
});