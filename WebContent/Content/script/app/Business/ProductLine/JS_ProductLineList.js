/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("ProductLineController", function ($scope, $state, $local, $Api, $MessagService) {

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
                    $scope.ProLine.options = treeNode.options;//获取当前节点的条件
                    $scope.ProLine.GetZreeProLine();//数据读取
                    $scope.Server.Add = true;
                    $scope.Server.Delect = true;            
                    $scope.Server.Edit = true;
                    $scope.Server.View = true;                  
                }
            }
        },
        obj: new Object()
    }


    $scope.ProLine = {
        info: [],
        options: [],
        GetZreeProLine: function () {
            /// <summary>获取科室列表</summary>
            var opt = $.extend($scope.ProLine.options, $scope.Pagein);
            console.log(opt)
            $Api.ProductLine.Getquery(opt, function (rData) {
                $scope.ProLine.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
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
    $scope.Server = {
        Add: false,
        Edit: false,
        Delect: false,
        View: false,
    }

    $scope.ProLineDetailAdd = {
        //产品线新增页面
        Info: [],
        ShowAdd: function (row) {
            $scope.ProLineDetailAdd.Info = row;
            $scope.ProLineDetailAdd.model.show();
            // 货主编码、品牌编码、
            $scope.ProLineDetailAdd.Info.oIOrgCode = $scope.ProLine.options.oIOrgCode;
            $scope.SelectInfo.ProLineType.getProLineTypeList();
            if ($scope.ProLine.options.medBrandCode) {
                $scope.ProLineDetailAdd.Info.medBrandCode = $scope.ProLine.options.medBrandCode;
                $scope.ProLineDetailAdd.Info.medBrandCodeName = $scope.ProLine.options.medBrandCodeName;

            } else {
                $scope.SelectInfo.Bind.getBindList();
            }
    
        },
        cancel: function () {
            $scope.ProLineDetailAdd.model.hide();
        },
        verification: function () {
            /// <summary>//验证开启</summary>
            var result = true;
            if (!$scope.ProLineDetailAdd.Info.medBrandCode || !$scope.ProLineDetailAdd.Info.medBrandCodeName) {
                result = false;
                $MessagService.caveat("请维护该产品品牌信息！")
            }
            else if (!$scope.ProLineDetailAdd.Info.medProdLnName || !$scope.ProLineDetailAdd.Info.medProdLnCode) {
                result = false;
                $MessagService.caveat("请维护该产品信息！")
            }
            else if (!$scope.ProLineDetailAdd.Info.medProdLnTypeCode) {
                result = false;
                $MessagService.caveat("请维护该产品产品线类型！")
            }
            return result;
        },
        Save: function () {
            //保存产品线信息
            if ($scope.ProLineDetailAdd.verification()) {
                $Api.ProductLine.Getinsert($scope.ProLineDetailAdd.Info, function (rData) {
                    $scope.ProLineDetailAdd.model.hide();
                    $MessagService.succ("该信息保存成功！")
                    $scope.ProLine.GetZreeProLine();
                });
            }
        }
    }
    ////  产品线编辑页面启动！
    $scope.ProLineDetail = {
        Info: [],
        ShowEdit: function () {
            var porline = $scope.getSelectedRow();
            if (porline) {
                $scope.ProLineDetail.model.show();
                $Api.ProductLine.Getquery(porline, function (rData) {
                    $scope.ProLineDetail.Info = rData.rows[0];
                    $scope.ProLineDetail.Info.oIOrgCode = $scope.ProLine.options.oIOrgCode;
                    $scope.SelectInfo.ProLineTypeEdit.getProLineTypeEditList();
                    if ($scope.ProLine.options.medBrandCode) {
                        $scope.ProLineDetail.Info.medBrandCode = $scope.ProLine.options.medBrandCode;
                        $scope.ProLineDetail.Info.medBrandCodeName = $scope.ProLine.options.medBrandCodeName;
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
            if (!$scope.ProLineDetail.Info.medBrandCode || !$scope.ProLineDetail.Info.medBrandCodeName) {
                result = false;
                $MessagService.caveat("请维护该产品品牌信息！")
            }
            else if (!$scope.ProLineDetail.Info.medProdLnName || !$scope.ProLineDetail.Info.medProdLnCode) {
                result = false;
                $MessagService.caveat("请维护该产品信息！")
            }
            else if (!$scope.ProLineDetail.Info.medProdLnTypeCode) {
                result = false;
                $MessagService.caveat("请维护该产品产品线类型！")
            }
            return result;
        },
        Save: function () {
            if ($scope.ProLineDetail.verification()) {
                $Api.ProductLine.Getupdate($scope.ProLineDetail.Info, function (rData) {
                    $scope.ProLineDetail.model.hide();
                    $MessagService.succ("该信息保存成功！")
                    $scope.ProLine.GetZreeProLine();
                });
            } 
        },
        cancel: function () {
            $scope.ProLineDetail.model.hide();
        },
    }
    // 关闭
    $scope.ProLineView = {
        // 产品线详情
        Info: [],
        ShowView: function () {
            var porline = $scope.getSelectedRow();
            console.log(porline)
            if (porline) {
                $scope.ProLineView.model.show();
                $Api.ProductLine.Getquery(porline, function (rData) {
                    $scope.ProLineView.Info = rData.rows[0];
                });
            } else {
                $MessagService.caveat("该选择一条查看的产品线！")
            }
        },
        cancel: function () {
            $scope.ProLineView.model.hide();
        },
    }
    $scope.ProLineDelect = function () {
        /// <summary>产品线删除</summary>
        var proLine = $scope.getSelectedRow();
        if (proLine) {
            $Api.ProductLine.Getdelect(proLine, function (rData) {
                $MessagService.succ("该产品线删除成功！")
                $scope.ProLine.GetZreeProLine();
            })
        }
    }
    $scope.ProLineView.model = { title: "品牌详情", width: 550, height: 300, buttons: { "确定": $scope.ProLineView.cancel } }
    $scope.ProLineDetail.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.ProLineDetail.Save, "取消": $scope.ProLineDetail.cancel } }
    $scope.ProLineDetailAdd.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.ProLineDetailAdd.Save, "取消": $scope.ProLineDetailAdd.cancel } }


    ///下拉框启动
    $scope.SelectInfo = {
        Bind: {
            dic: [],
            change: function (item) {
                /// <summary>品牌列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Bind.dic.length; i++) {
                    if ($scope.SelectInfo.Bind.dic[i].id == $scope.ProLineDetailAdd.Info.medBrandCode) {
                        $scope.ProLineDetailAdd.Info.medBrandCodeName = $scope.SelectInfo.Bind.dic[i].text;
                        return;
                    }
                }
            },
            getBindList: function () {
                /// <summary>获取品牌列表</summary>
                $Api.BrandService.GetBrandList({ oIOrgCode: $scope.ProLineDetailAdd.Info.oIOrgCode }, function (rData) {
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
                    if ($scope.SelectInfo.BindEdit.dic[i].id == $scope.ProLineDetail.Info.medBrandCode) {
                        $scope.ProLineDetail.Info.medBrandCodeName = $scope.SelectInfo.BindEdit.dic[i].text;
                        return;
                    }
                }
            },
            getBindEditList: function () {
                /// <summary>获取品牌列表</summary>
                $Api.BrandService.GetBrandList({ oIOrgCode: $scope.ProLineDetail.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.BindEdit.dic = rData;
                    console.log(rData)
                });
            }
        },
        ProLineType: {
            dic: [],
            change: function (item) {
                /// <summary>产品线类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.ProLineType.dic.length; i++) {
                    if ($scope.SelectInfo.ProLineType.dic[i].id == $scope.ProLineDetailAdd.Info.medProdLnTypeCode) {
                        $scope.ProLineDetailAdd.Info.medProdLnTypeCodeName = $scope.SelectInfo.ProLineType.dic[i].text;
                        return;
                    }
                }
            },
            getProLineTypeList: function () {
                /// <summary>获取产品线类型</summary>
                $Api.BrandService.GetProductLineType({ oIOrgCode: $scope.ProLineDetailAdd.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.ProLineType.dic = rData;
                    console.log(rData)
                });
            }
        },
        ProLineTypeEdit: {
            dic: [],
            change: function (item) {
                /// <summary>产品线类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.ProLineTypeEdit.dic.length; i++) {
                    if ($scope.SelectInfo.ProLineTypeEdit.dic[i].id == $scope.ProLineDetail.Info.medProdLnTypeCode) {
                        $scope.ProLineDetail.Info.medProdLnTypeCodeName = $scope.SelectInfo.ProLineTypeEdit.dic[i].text;
                        return;
                    }
                }
            },
            getProLineTypeEditList: function () {
                /// <summary>获取产品线类型</summary>
                console.log($scope.ProLineDetail.Info.oIOrgCode)
                $Api.BrandService.GetProductLineType({ oIOrgCode: $scope.ProLineDetail.Info.oIOrgCode }, function (rData) {
                    $scope.SelectInfo.ProLineTypeEdit.dic = rData;
                    console.log(rData)
                });
            }
        }
    }
    ///下拉框关闭

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.ProLine.info, function (index, item) {
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
        $scope.ProLine.GetCargoOwner();
    }
    $scope.Load();
})