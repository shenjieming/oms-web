/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("MatManListController", function ($scope, $state, $local, $Api, $MessagService) {
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
                            console.log(rData)
                                for (var i = 0; i < rData.rows.length; i++) {
                                    var node = {
                                        id: rData.rows[i].medMnfcOrgCode, name: rData.rows[i].medMnfcName
                                    };
                                    if (treeNode.SubsetType == "medMnfcOrgCode") {//根据条件参数控制子集的条件参数
                                        node.SubsetType = "medMnfcOrgCode";
                                        node.isParent = true;
                                        node.Subset = $Api.BusinessData.GetBrandList;
       
                                        node.options = { oIOrgCode: treeNode.options.oIOrgCode, medBrandCode: rData.rows[i].medMnfcOrgCode, includeMedProdLn: "ALL" };
                                    } else {
                                        node.options = { medProdLnCode: rData.rows[i].medMnfcOrgCode };
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
                    console.log(treeNode)
                    if (treeNode.isLastNode) {
                        $scope.Material.options = treeNode.options;//获取当前节点的条件
                        $scope.Material.GetList();//数据读取
                    }
                }
            }
        },
        obj: new Object()
    }
    $scope.MaterialRouting =[1,2,3,4,5];
    $scope.Material = {
        //条件
        options: {},
        MaterialList: new Array(),
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
            $Api.OrganizationService.GetOwnerList({}, function (rData) {
                var treeData = new Array();
                console.log(rData);
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.BusinessData.MedManuFacture.GetManufacturerList, SubsetType: "medMnfcOrgCode" });
                }
                $scope.tree.data = treeData;;
            })
        },
    }
    $scope.MaterialFrom = {
        View: function () {
            /// <summary>获取物料详细</summary>
            var opt = $scope.getSelectedRow();
            //应传单挑物料编码
            $state.go("app.business.material.materialView", { opt: opt.medMIInternalNo });
        },
        addMaterial: function () {
            /// <summary>物料添加</summary>
            $state.go("app.business.material.materialInfo")
        },
        Detail: function () {
            /// <summary>物料编辑</summary>
            var MatID = $scope.getSelectedRow();
            $state.go("app.business.material.materialInfo", { MatID: MatID.medMIInternalNo })
        },
        removal: function () {
            /// <summary>物料删除</summary>
            var MatID = $scope.getSelectedRow();
            console.log(MatID.medMIInternalNo);
            $Api.BusinessData.MedMater.GetSearchMedMaterialItemDetail({ medMIInternalNo: MatID.medMIInternalNo }, function (rdata) {
                $MessagService.caveat("物料删除成功！")
                $scope.Material.GetCargoOwner();
            })
        }
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.Material.MaterialList, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        return result;
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