

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MaterialTemplateListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>物料模板控制器</summary>
    $scope.MaterialTemplate = {
        IsView: false,
        IsEdit: false,
        List: new Array(),
        GetMaterialTemplateList: function () {
            /// <summary>获取套件列表</summary>
            $Api.MaterialsService.GetMaterialsTemplateList($scope.Pagein, function (rData) {
                $scope.MaterialTemplate.List = rData.rows;
                $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
            });
        }
    };


    $scope.Service = {
        /// <summary>服务管理</summary>
        IsView: function (isshow) {
            /// <summary>是否显示视图</summary>
            $scope.MaterialTemplate.IsView = isshow;
        },
        IsEdit: function (isshow) {
            /// <summary>是否显示编辑</summary>
            $scope.MaterialTemplate.IsEdit = isshow;
        },
        Add: function () {
            /// <summary>添加模板</summary>
        },
        Edit: function () {
            /// <summary>编辑模板</summary>
        },
        Detail: function () {
            /// <summary>删除模板</summary>
        },
        View: function () {
            /// <summary>显示</summary>
        },
        ViewTemplate: function (row) {
            /// <summary>Description</summary>
            this.GetTemplateDetail(row, function (rdata) {
                $scope.view.PageData = rdata;
                $scope.view.PageData.medKits = rdata.kitTemplateInfo;
                $scope.view.PageData.prodLns = rdata.productLine;
                $scope.Service.IsView(true);
            });
            
        },
        GetTemplateDetail: function (data,callback) {
            /// <summary>获取模板明细</summary>
            $Api.MaterialsService.GetMaterialsTemplateDateil(data,callback)
        },
        GetNewProdLine: function (prodLines) {
            /// <summary>获取产品线信息</summary>
            $.each(prodLines, function (index, prodLine) {
                var flg = true;//标志
                var newLine = {
                    medProdLnCode: prodLine.medProdLnCode,
                    medProdLnCodeName: prodLine.medProdLnName,
                    medBrandCode: prodLine.medBrandCode,
                    medBrandCodeName: prodLine.medBrandName,
                    medMaterias: $scope.Service.GetNewMedMaterias(prodLine.templateMedMaterialItem, false)
                };
                $.each($scope.ngModel.prodLns, function (i, oldLine) {
                    if (newLine.medProdLnCode == oldLine.medProdLnCode) {//存在相同的产品线
                        oldLine.medMaterias = $scope.Service.GetNewMedMaterias(newLine.medMaterias, oldLine.medMaterias);
                        flg = false;
                        return true;
                    }
                });
                if (flg) {
                    $scope.ngModel.prodLns.push(newLine);
                }
            });
        },
        GetNewMedMaterias: function (newMs, oldMs) {
            /// <summary>获取去重后的物料</summary>
            var result = oldMs ? oldMs : new Array();
            $.each(newMs, function (index, item) {
                var flg = true;
                newMs.medMIWarehouse = userInfo.orgCode;//默认仓库填充
                $.each(result, function (i, node) {
                    if (item.medMIInternalNo == node.medMIInternalNo && item.medMIWarehouse == node.medMIWarehouse) {
                        item.reqQty = (parseInt(item.reqQty) + parseInt(node.reqQty));
                        flg = false;
                        return true;
                    }
                });

                if (flg) {
                    result.push(item);
                }
            })
            return result;
        }
    }


    $scope.view = {
        PageData: {},
        ProductService: {},
        ProductCompetence: { operat: false, tool: false }
    }

    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.MaterialTemplate.GetMaterialTemplateList();
        }
    }

    $scope.MaterialTemplate.GetMaterialTemplateList();
});