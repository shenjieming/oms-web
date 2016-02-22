/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DptListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>科室列表</summary>
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
                                    node.options = { oIOrgCode: treeNode.options.oIOrgCode, medBrandCode: rData[i].id, includeMedProdLn: rData[i].param };
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
    $scope.DepartmentList = {
        info: [],
        GetDepartmentList: function () {
            /// <summary>获取科室列表</summary>
            var paramData = $.extend({ oIOrgCode: $scope.User.userInfo.orgCode }, $scope.Pagein);
            console.log(paramData)
            $Api.ManaDepartment.GetbizDataWDList(paramData, function (rData) {
                $scope.DepartmentList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        },
        GetHosptailList: function () {
            /// <summary>根据医院查询科室</summary>
            $Api.Public.GetOiMedMaterialComboxList({}, function (rData) {
                console.log(rData)
                for (var i = 0; i < length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.Public.GetHosptailComboxListByDLHPRel, SubsetType: "oIOrgCode" });
                }
                $scope.tree.data = treeData;;
            })
        }
    }
    //$scope.DepartmentJump = {
    //    Add: function () {
    //        /// <summary>科室新增</summary>
    //        $state.go("app.business.DepartmentanizationEduit");
    //    },
    //    Eduit: function () {
    //        /// <summary>科室编辑</summary>
    //        var dlopt = $scope.getSelectedRow()
    //        $state.go("app.business.DepartmentanizationEduit", { dlopt: dlopt.orgCode });
    //    },
    //    View: function () {
    //        /// <summary>科室详情</summary>
    //        var dlopt = $scope.getSelectedRow()
    //        $state.go("app.business.DepartmentanizationView", { dlopt: dlopt.orgCode });
    //    },
    //}
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DepartmentList.info, function (index, item) {
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
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.DepartmentList.GetHosptailList();
    }
    $scope.Load();
})