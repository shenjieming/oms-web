/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("ProductListController", function ($scope, $state, $local, $Api, $MessagService) {

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
                        $scope.ProductList.options = treeNode.options;//获取当前节点的条件
                        $scope.ProductList.GetZreeProductList();//数据读取
                }
            }
        },
        obj: new Object()
    }


    $scope.ProductList = {
        info: [],
        IsView: false,
        IsEdit: false,
        options: [],
        GetZreeProductList: function () {
            /// <summary>获取科室列表</summary>
            var opt = $.extend($scope.ProductList.options, $scope.Pagein);
            console.log(opt)
            $Api.AgentProduct.GetbizDataOIDLMedBrandAgentRelList(opt, function (rData) {
                $scope.ProductList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
                for (var i = 0; i < $scope.ProductList.info.length; i++) {
                    if ($scope.ProductList.info[i].validStatusName == "无效") {
                        $scope.ProductList.info[i].isEnable = true;
                    }
                }
            })
        },
        GetCargoOwner: function () {
            /// <summary>获取我的货主信息</summary>
            $Api.OrganizationService.GetCargoOwner({}, function (rData) {
                var treeData = new Array();
                console.log(rData);
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.BrandService.GetBrandList, SubsetType: "medBrandCode" });
                }
                $scope.tree.data = treeData;;
            })
        },
    }


    ////  科室编辑页面启动！
    $scope.ProductDetail = {
        Info: { hPCodeName: "", hPCode: "" },
        checkIs: function () {
            $scope.ProductDetail.isvalidStatus = !$scope.ProductDetail.isvalidStatus
        }
    }
    // 关闭
    // 按钮开关启动 
    $scope.ProductJump = {
        isView: function (isshow) {
            /// <summary>是否显示明细页面</summary>
            $scope.ProductList.IsView = isshow;
        },
        isEdit: function (isshow) {
            /// <summary>是否编辑科室</summary>
            $scope.ProductList.IsView = false;
            $scope.ProductList.IsEdit = isshow;
        },
        Add: function () {
            /// <summary>添加科室</summary>
            //$scope.Detail.PageData = { prodLns: [] };//数据清空
            $scope.ProductDetail.Info = new Object();
            console.log($scope.ProductList.options)
            if ($scope.ProductList.options.hPCode) {
                $scope.ProductJump.isEdit(true);
                $scope.ProductDetail.Info.hPCode = $scope.ProductList.options.hPCode;
                $scope.ProductDetail.Info.hPCodeName = $scope.ProductList.options.hPCodeName;
                if ($scope.ProductList.options.wardDeptCode) {
                    $scope.ProductDetail.Info.wardDeptCodeName = $scope.ProductList.options.wardDeptCodeName;
                } else {
                    $scope.SelectInfo.Product.getProductList();
                }
            } else {
                $MessagService.caveat("请选择医院！");
            }
        },
        Edit: function () {
            /// <summary>编辑科室</summary>
            var row = $scope.getSelectedRow()
            if (row) {
                $scope.ProductJump.isEdit(true);
                $Api.ManaProduct.GetbizDataWDDetail({ wardDeptCode: row.wardDeptCode }, function (rData) {
                    console.log(rData)
                    $scope.ProductDetail.Info = rData;
                    if ($scope.ProductDetail.Info.validStatusName == "无效") {
                        $scope.ProductDetail.Info.isvalidStatus = true;
                    }
                })
            } else {
                $MessagService.caveat("请选择一条编辑的科室信息！");
            }
        },
        View: function () {
            /// <summary>点击科室详情</summary>
            var row = $local.getSelectedRow($scope.ProductList.info);
            if (row) {
                $scope.ProductJump.isView(true);
                $Api.ManaProduct.GetbizDataWDDetail({ wardDeptCode: row.wardDeptCode }, function (rData) {
                    $scope.ProductView.Info = rData;
                })
            } else {
                $MessagService.caveat("请选择一条查看的科室信息！");
            }
        },
        Save: function () {
            /// <summary>保存科室</summary>
            if ($scope.ProductDetail.Info.wardDeptName) {
                console.log($scope.ProductDetail.Info)
                $Api.ManaProduct.Save($scope.ProductDetail.Info, function (rData) {
                    $MessagService.succ("科室保存成功！");
                    $scope.ProductList.GetZreeProductList();
                    $scope.ProductJump.isEdit(false);
                });
            } else {
                $MessagService.caveat("请输入科室名称！");
            }
        }
    }
    ///按钮关闭
    $scope.SelectInfo = {
        Product: {
            dic: [],
            change: function (item) {
                /// <summary>科室类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Product.dic.length; i++) {
                    if ($scope.SelectInfo.Product.dic[i].id == $scope.ProductDetail.Info.wardDeptcheckCode) {
                        $scope.ProductDetail.Info.wardDeptCodeName = $scope.SelectInfo.Product.dic[i].text;
                        console.log($scope.ProductDetail.Info.wardDeptCodeName)
                        return;
                    }
                }
            },
            getProductList: function () {
                /// <summary>获取科室类型</summary>
                $Api.HospitalService.GetSections({ hPCode: $scope.ProductDetail.Info.hPCode }, function (rData) {
                    $scope.SelectInfo.Product.dic = rData;
                    console.log(rData)
                });
            }
        }
    }
    $scope.ProductStatus = function (row) {
        $scope.ProductList.info = row ? row : $scope.getSelectedRow();
        $Api.ManaProduct.SwitchButton($scope.ProductList.info, function (rData) {
            $MessagService.caveat("科室状态修改成功！")
            $scope.ProductList.GetZreeProductList();
        })

    }

    $scope.ProductView = {
        // 科室详情
        Info: [],
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.ProductList.info, function (index, item) {
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
        info:[],
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.ProductList.GetCargoOwner();
    }
    $scope.Load();
})