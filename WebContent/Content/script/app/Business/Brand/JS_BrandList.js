/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("BrandListController", function ($scope, $state, $local, $Api, $MessagService) {

    /// <summary>品牌列表</summary>
    $scope.tree = {
        setting: {
            callback: {
                beforeExpand: true,
                onExpand: function (event, treeId, treeNode) {
                    /// <summary>tree查询子节点</summary>
                    console.log($scope.tree.data)
                    if (!treeNode.reNode) {
                        treeNode.reNode = true;
                        treeNode.Subset(treeNode.options, function (rData) {
                            /// <summary>子集数据查询</summary>
                            var nodeList = new Array();
                            for (var i = 0; i < rData.rows.length; i++) {
                                var node = {
                                    id: rData.rows[i].medMnfcCode, name: rData.rows[i].medMnfcCodeName
                                };
                                node.options = { medMnfcCode: rData.rows[i].medMnfcCode, medMnfcCodeName:rData.rows[i].medMnfcCodeName };
                                nodeList.push(node);
                            }
                            $scope.tree.obj.addNodes(treeNode, nodeList);
                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary>
                    $scope.Pagein.pageIndex = 1;//当前数据分页从第一页开始
                        $scope.BrandList.options = treeNode.options;//获取当前节点的条件
                        $scope.BrandList.GetZreeBrandList();//数据读取
                    }               
            }
        },
        obj: new Object()
    }


    $scope.BrandList = {
        info: [],
        IsView: false,
        IsEdit: false,
        options: [],
        GetZreeBrandList: function () {
            /// <summary>获取品牌列表</summary>
            var opt = $.extend($scope.BrandList.options, $scope.Pagein);
            console.log(opt)
            $Api.BusinessData.MedBrand.GetQueryAllMedBrand(opt, function (rData) {
                $scope.BrandList.info = rData.rows;
                console.log(rData.rows)
                $scope.Pagein.total = rData.total;
                //for (var i = 0; i < $scope.BrandList.info.length; i++) {
                //    if ($scope.BrandList.info[i].validStatusName == "无效") {
                //        $scope.BrandList.info[i].isEnable = true;
                //    }
                //}
            })
        },
        GetFacture: function () {
            /// <summary>厂商下拉框</summary>
            $Api.BusinessData.MedManuFacture.GetMedManuFactureCommboxList({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { medMnfcCode: rData[i].id, medMnfcCodeName: rData[i].text }, Subset: $Api.BusinessData.MedBrand.GetQueryAllMedBrand, SubsetType: "medMnfcCode" });
                }
                $scope.tree.data = treeData;
            })
        }
    }

    $scope.BrandDetail = {
        // 品牌编辑
        Info:new Object(),
        ShowEdit: function () {
            var opt=  $scope.getSelectedRow();
            if (opt) {
                $Api.BusinessData.MedBrand.GetQueryMedBrandDetail({ medBrandCode: opt.medBrandCode }, function (rData) {
                    console.log(rData)
                    $scope.BrandDetail.Info = rData;
                    $scope.BrandDetail.model.show();
                    $scope.BrandDetail.Info.medMnfcCode = $scope.BrandList.options.medMnfcCode;
                    $scope.BrandDetail.Info.medMnfcCodeName = $scope.BrandList.options.medMnfcCodeName;
                })         
            }else{
                $MessagService.cavet("请选择编辑的品牌信息！")
            }
         
        },
        cancel: function () {
            $scope.BrandDetail.model.hide();
        },
        Verification: function () {
            var result = true;
            if (!$scope.BrandDetail.Info.medBrandName) {
                result = false;
                $MessagService.cavet("请输入品牌名称")
            }
            else if (!$scope.BrandDetail.Info.medBrandCode) {
                    result = false;
                $MessagService.cavet("请输入品牌编码")
            }
            return result;
        },
        Save: function () {
            if ($scope.BrandDetail.Verification()) {
                $Api.BusinessData.MedBrand.GetUpdateMedBrand($scope.BrandDetail.Info, function (rData) {
                    $MessagService.succ("该品牌保存成功！");
                    $scope.BrandList.GetFacture();
                })
            }
        },        
    }

    $scope.BrandView = {
        // 品牌详情
        Info: [],
        ShowView: function () {
            var opt = $scope.getSelectedRow();
            if (opt) {
                $Api.BusinessData.MedBrand.GetQueryMedBrandDetail({ medBrandCode: opt.medBrandCode }, function (rData) {
                    $scope.BrandView.Info = rData;
                    $scope.BrandView.model.show();
                    console.log(rData)
                    $scope.BrandView.Info.medMnfcCode = $scope.BrandList.options.medMnfcCode;
                    $scope.BrandView.Info.medMnfcCodeName = $scope.BrandList.options.medMnfcCodeName;
                })
            } else {
                $MessagService.cavet("请选择查看的品牌信息！")
            }
        },
        cancel: function () {
            $scope.BrandView.model.hide();
        }

    }
    $scope.BrandDetailAdd = {
        Info: new Object(),
        ShowAdd: function (row) {
            /// <summary>品牌新增</summary>
            $scope.BrandDetailAdd.Info = row;
            $scope.BrandDetailAdd.model.show();
            console.log($scope.BrandList.options)
            $scope.BrandDetailAdd.Info.medMnfcCode = $scope.BrandList.options.medMnfcCode;
            $scope.BrandDetailAdd.Info.medMnfcCodeName = $scope.BrandList.options.medMnfcCodeName;
        },
        cancel: function () {
            $scope.BrandDetailAdd.model.hide();
        },
        Verification: function () {
            var result = true;
            if (!$scope.BrandDetailAdd.Info.medBrandName) {
                $MessagService.cavet("请输入品牌名称")
                result = false;
            }
            else if (!$scope.BrandDetailAdd.Info.medBrandCode) {
                $MessagService.cavet("请输入品牌编码")
                result = false;
            }
            return result;
        },
        Save: function () {
            console.log($scope.BrandDetailAdd.Info)
            if ($scope.BrandDetailAdd.Verification()) {
                $Api.BusinessData.MedBrand.GetAddMedBrand($scope.BrandDetailAdd.Info, function (rData) {
                    $MessagService.succ("该品牌保存成功！")
                    $scope.BrandList.GetZreeBrandList();
                    $scope.BrandDetailAdd.model.hide();
                })
            }
        },
    },


    $scope.BrandView.model = { title: "品牌详情", width: 550, height: 300, buttons: { "确定": $scope.BrandView.cancel } }
    $scope.BrandDetail.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.BrandDetail.Save, "取消": $scope.BrandDetail.cancel } }
    $scope.BrandDetailAdd.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.BrandDetailAdd.Save, "取消": $scope.BrandDetailAdd.cancel } }


    $scope.BrandDelet = function (row) {
        $scope.BrandList.info = row ? row : $scope.getSelectedRow();
        if ($scope.BrandList.info) {
            $Api.BusinessData.MedBrand.GetDeleteMedBrand($scope.BrandList.info, function (rData) {
                $MessagService.succ("该品牌删除成功！")
                $scope.BrandList.GetZreeBrandList();
            })
        } else {
            $MessagService.cavet("请选择一条删除的品牌！")
        }
    }

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.BrandList.info, function (index, item) {
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
        $scope.BrandList.GetFacture();
    }
    $scope.Load();
})