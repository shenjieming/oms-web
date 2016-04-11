/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OrderRoutingListController", function ($scope, $state, $local, $Api, $MessagService) {

    /// <summary>订单仓库路由列表</summary>
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
                                if (treeNode.SubsetType == "oIOrgCode") {//根据条件参数控制子集的条件参数
                                    node.SubsetType = "orgCode";                   
                                    node.isParent = true;
                                    node.Subset = $Api.OrderRout.GetfindDLByOIOrgCodeCombox;
                                    node.options = { wHOrgCode: treeNode.options.wHOrgCode, orgCode: rData[i].id };
                                } else {
                                    node.options = { dLOrgCode: rData[i].id, oIOrgCode: treeNode.options.orgCode, wHOrgCode: treeNode.options.wHOrgCode }
                                }
                                nodeList.push(node);
                            }
                            $scope.tree.obj.addNodes(treeNode, nodeList);
                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary
                    $scope.Pagein.pageIndex = 1;//当前数据分页从第一页开始
                    $scope.WhRouting.options = treeNode.options;//获取当前节点的条件
                    console.log($scope.WhRouting.options)
                    $scope.WhRouting.GetZreeWhRouting();//数据读取
                }
            }
        },
        obj: new Object()
    }


    $scope.WhRouting = {
        info: [],
        options: [],
        GetZreeWhRouting: function () {
            /// <summary>获取订单仓库路由列表</summary>
            var opt = $.extend($scope.WhRouting.options, $scope.Pagein);
            $Api.OrderRout.GetqueryOdwhCfg(opt, function (rData) {
                $scope.WhRouting.info = rData;
                console.log(rData)
                $scope.Pagein.total = rData.total;
                //数据合并
            })
        },
        FindAllWareHouse: function () {
            /// <summary>获取所有仓库路由配置</summary>
            $Api.MaterialsService.GetAllWareHouse({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { wHOrgCode: rData[i].id }, Subset: $Api.OrderRout.GetfindOICombox, SubsetType: "oIOrgCode" });
                }
                $scope.tree.data = treeData;;
            })
        },
    }
    $scope.WhRoutingDetailAdd = {
        //产品线新增页面
        Info: [],
        ShowAdd: function (row) {
            $scope.WhRoutingDetailAdd.Info = row;
            $scope.WhRoutingDetailAdd.model.show();
            // 货主编码、品牌编码、
            $scope.WhRoutingDetailAdd.Info.oIOrgCode = $scope.WhRouting.options.oIOrgCode;
            $scope.SelectInfo.WhRoutingType.getWhRoutingTypeList();
            if ($scope.WhRouting.options.medBrandCode) {
                $scope.WhRoutingDetailAdd.Info.medBrandCode = $scope.WhRouting.options.medBrandCode;
                $scope.WhRoutingDetailAdd.Info.medBrandCodeName = $scope.WhRouting.options.medBrandCodeName;

            } else {
                $scope.SelectInfo.Bind.getBindList();
            }

        },
        cancel: function () {
            $scope.WhRoutingDetailAdd.model.hide();
        },
        verification: function () {
            /// <summary>//验证开启</summary>
            var result = true;
            if (!$scope.WhRoutingDetailAdd.Info.medBrandCode || !$scope.WhRoutingDetailAdd.Info.medBrandCodeName) {
                result = false;
                $MessagService.caveat("请维护该产品品牌信息！")
            }
            else if (!$scope.WhRoutingDetailAdd.Info.medProdLnName || !$scope.WhRoutingDetailAdd.Info.medProdLnCode) {
                result = false;
                $MessagService.caveat("请维护该产品信息！")
            }
            else if (!$scope.WhRoutingDetailAdd.Info.medProdLnTypeCode) {
                result = false;
                $MessagService.caveat("请维护该产品产品线类型！")
            }
            return result;
        },
        Save: function () {
            //保存产品线信息
            if ($scope.WhRoutingDetailAdd.verification()) {
                $Api.ProductLine.Getinsert($scope.WhRoutingDetailAdd.Info, function (rData) {
                    $scope.WhRoutingDetailAdd.model.hide();
                    $MessagService.succ("该信息保存成功！")
                    $scope.WhRouting.GetZreeWhRouting();
                });
            }
        }
    }
    ////  产品线编辑页面启动！
    $scope.WhRoutingDetail = {
        Info: [],
        ShowEdit: function () {
            var porline = $scope.getSelectedRow();
            if (porline) {
                $scope.WhRoutingDetail.model.show();
                $Api.ProductLine.Getquery(porline, function (rData) {
                    $scope.WhRoutingDetail.Info = rData.rows[0];
                    $scope.WhRoutingDetail.Info.oIOrgCode = $scope.WhRouting.options.oIOrgCode;
                    $scope.SelectInfo.WhRoutingTypeEdit.getWhRoutingTypeEditList();
                    if ($scope.WhRouting.options.medBrandCode) {
                        $scope.WhRoutingDetail.Info.medBrandCode = $scope.WhRouting.options.medBrandCode;
                        $scope.WhRoutingDetail.Info.medBrandCodeName = $scope.WhRouting.options.medBrandCodeName;
                    } else {
                        $scope.SelectInfo.BindEdit.getBindEditList();
                    }
                });
            } else {
                $MessagService.caveat("该选择一条编辑的产品线！")
            }
        },
        verification: function () {
            /// <summary>//验证开启</summary>
            var result = true;
            if (!$scope.WhRoutingDetail.Info.medBrandCode || !$scope.WhRoutingDetail.Info.medBrandCodeName) {
                result = false;
                $MessagService.caveat("请维护该产品品牌信息！")
            }
            else if (!$scope.WhRoutingDetail.Info.medProdLnName || !$scope.WhRoutingDetail.Info.medProdLnCode) {
                result = false;
                $MessagService.caveat("请维护该产品信息！")
            }
            else if (!$scope.WhRoutingDetail.Info.medProdLnTypeCode) {
                result = false;
                $MessagService.caveat("请维护该产品产品线类型！")
            }
            return result;
        },
        Save: function () {
            if ($scope.WhRoutingDetail.verification()) {
                $Api.ProductLine.Getupdate($scope.WhRoutingDetail.Info, function (rData) {
                    $scope.WhRoutingDetail.model.hide();
                    $MessagService.succ("该信息保存成功！")
                    $scope.WhRouting.GetZreeWhRouting();
                });
            }
        },
        cancel: function () {
            $scope.WhRoutingDetail.model.hide();
        },
    }
    // 关闭
    $scope.WhRoutingView = {
        // 产品线详情
        Info: [],
        ShowView: function () {
            var porline = $scope.getSelectedRow();
            console.log(porline)
            if (porline) {
                $scope.WhRoutingView.model.show();
                $Api.ProductLine.Getquery(porline, function (rData) {
                    $scope.WhRoutingView.Info = rData.rows[0];
                });
            } else {
                $MessagService.caveat("该选择一条查看的产品线！")
            }
        },
        cancel: function () {
            $scope.WhRoutingView.model.hide();
        },
    }
    $scope.WhRoutingDelect = function () {
        /// <summary>产品线删除</summary>
        var WhRouting = $scope.getSelectedRow();
        if (WhRouting) {
            $Api.ProductLine.Getdelect(WhRouting, function (rData) {
                $MessagService.succ("该产品线删除成功！")
                $scope.WhRouting.GetZreeWhRouting();
            })
        }
    }
    $scope.WhRoutingView.model = { title: "品牌详情", width: 550, height: 300, buttons: { "确定": $scope.WhRoutingView.cancel } }
    $scope.WhRoutingDetail.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.WhRoutingDetail.Save, "取消": $scope.WhRoutingDetail.cancel } }
    $scope.WhRoutingDetailAdd.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.WhRoutingDetailAdd.Save, "取消": $scope.WhRoutingDetailAdd.cancel } }


    ///下拉框启动
    $scope.SelectInfo = {
        Bind: {
            dic: [],
            change: function (item) {
                /// <summary>品牌列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Bind.dic.length; i++) {
                    if ($scope.SelectInfo.Bind.dic[i].id == $scope.WhRoutingDetailAdd.Info.medBrandCode) {
                        $scope.WhRoutingDetailAdd.Info.medBrandCodeName = $scope.SelectInfo.Bind.dic[i].text;
                        return;
                    }
                }
            },
            getBindList: function () {
                /// <summary>获取品牌列表</summary>
                $Api.BrandService.GetBrandList({ oIOrgCode: $scope.WhRoutingDetailAdd.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.Bind.dic = rData;
                    console.log(rData)
                });
            }
        },
        BindEdit: {
            dic: [],
            change: function (item) {
                /// <summary>品牌列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.BindEdit.dic.length; i++) {
                    if ($scope.SelectInfo.BindEdit.dic[i].id == $scope.WhRoutingDetail.Info.medBrandCode) {
                        $scope.WhRoutingDetail.Info.medBrandCodeName = $scope.SelectInfo.BindEdit.dic[i].text;
                        return;
                    }
                }
            },
            getBindEditList: function () {
                /// <summary>获取品牌列表</summary>
                $Api.BrandService.GetBrandList({ oIOrgCode: $scope.WhRoutingDetail.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.BindEdit.dic = rData;
                    console.log(rData)
                });
            }
        },
        WhRoutingType: {
            dic: [],
            change: function (item) {
                /// <summary>产品线类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.WhRoutingType.dic.length; i++) {
                    if ($scope.SelectInfo.WhRoutingType.dic[i].id == $scope.WhRoutingDetailAdd.Info.medProdLnTypeCode) {
                        $scope.WhRoutingDetailAdd.Info.medProdLnTypeCodeName = $scope.SelectInfo.WhRoutingType.dic[i].text;
                        return;
                    }
                }
            },
            getWhRoutingTypeList: function () {
                /// <summary>获取产品线类型</summary>
                $Api.BrandService.GetProductLineType({ oIOrgCode: $scope.WhRoutingDetailAdd.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.WhRoutingType.dic = rData;
                    console.log(rData)
                });
            }
        },
        WhRoutingTypeEdit: {
            dic: [],
            change: function (item) {
                /// <summary>产品线类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.WhRoutingTypeEdit.dic.length; i++) {
                    if ($scope.SelectInfo.WhRoutingTypeEdit.dic[i].id == $scope.WhRoutingDetail.Info.medProdLnTypeCode) {
                        $scope.WhRoutingDetail.Info.medProdLnTypeCodeName = $scope.SelectInfo.WhRoutingTypeEdit.dic[i].text;
                        return;
                    }
                }
            },
            getWhRoutingTypeEditList: function () {
                /// <summary>获取产品线类型</summary>
                console.log($scope.WhRoutingDetail.Info.oIOrgCode)
                $Api.BrandService.GetProductLineType({ oIOrgCode: $scope.WhRoutingDetail.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.WhRoutingTypeEdit.dic = rData;
                    console.log(rData)
                });
            }
        }
    }
    ///下拉框关闭

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.WhRouting.info, function (index, item) {
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
        $scope.WhRouting.FindAllWareHouse();
    }
    $scope.Load();
})