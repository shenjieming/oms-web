/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("SuiteListController", function ($scope, $state, $local, $Api, $MessagService) {
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
                            debugger                        
                            for (var i = 0; i < rData.rows.length; i++) {
                                var node = {
                                    id: rData.rows[i].orgCode, name: rData.rows[i].wHName
                                };
                                console.log(treeNode.SubsetType)
                                if (treeNode.SubsetType == "medMIWarehouse") {//根据条件参数控制子集的条件参数
                                    node.SubsetType = "medMIWarehouse";
                                    node.isParent = true;
                                    node.Subset = $Api.BusinessData.Reservoir.GetQueryWareHouse;
                                    node.options = { oIOrgCode: treeNode.options.oIOrgCode};
                                } else {
                                    node.options = { oIOrgCode: rData.rows[i].orgCode };
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
                    if (treeNode.isLastNode) {
                        $scope.SuiteList.options = treeNode.options;//获取当前节点的条件
                        $scope.SuiteList.GetSuiteList();//数据读取
                    }
                }
            }
        },
        obj: new Object()
    }


    $scope.SuiteList = {
        options:[],
        info: [],
        //套件列表
        GetSuiteList: function () {
            var options = $.extend($scope.SuiteList.options, $scope.Pagein);//条件合并
            $Api.MedKitService.GetMedKitList(options, function (rData) {
                $scope.SuiteList.info = rData.rows;
                console.log(rData)
            })
        },
        GetCargoOwner: function () {
            /// <summary>获取我的货主信息</summary>
            $Api.OrganizationService.GetOwnerList({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { validStatus: "Y" }, Subset: $Api.BusinessData.Warehouse.GetQueryWareHouse, SubsetType: "medMIWarehouse" });
                }
                $scope.tree.data = treeData;;
            })
        },
        Add: function () {
            $state.go("app.business.detail");
        },
        Eduit: function () {
            $state.go("app.business.detail");
        }
    }
    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.SuiteList.GetSuiteList();
        }
    }
    $scope.SuiteList.GetCargoOwner();
})