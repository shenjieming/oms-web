

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
    $scope.Pagein = {
        /// <summary>分页信息</summary>
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.MaterialTemplate.GetMaterialTemplateList();
        }
    }

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
        View: function () {
            /// <summary>查看模板详情</summary>
            $local.CarriedSelectedRow($scope.MaterialTemplate.List, function (row) {
                $scope.Service.GoTemplateView(row);
            });
        },

        Edit: function () {
            /// <summary>编辑模板</summary>
            $local.CarriedSelectedRow($scope.MaterialTemplate.List, function (row) {
                $scope.Service.GoTemplateDetail(row);
            });
        },
        Add: function () {
            /// <summary>添加模板</summary>
            $scope.Service.GoTemplateDetail({});
        },
        GoTemplateView: function (row) {
            /// <summary>前往模板详细页面</summary>
            row.isView = true;
            $scope.goView("app.base.mybusiness.materialtemplateview", row);
        },
        GoTemplateDetail: function (param) {
            /// <summary>前往模板编辑明细页</summary>
            $scope.goView("app.base.mybusiness.materialtemplatedetail", param);
        },
        Delete: function () {
            /// <summary>删除模板</summary>
            $local.CarriedSelectedRow($scope.MaterialTemplate.List, function (row) {
                if (confirm("您确定要删除当前模板吗？")) {
                    $Api.MaterialsService.DeleteTemplate(row, function (rData) {
                        $MessagService.caveat("模板删除成功！");
                        $scope.MaterialTemplate.GetMaterialTemplateList();
                    });
                }
            });
           
        },
        UpEnter: function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.Service.QueryTemplate();
            }
        },
        QueryTemplate: function () {
            /// <summary>条件查询模板信息</summary>
            $scope.Pagein.pageIndex = 1;
            $scope.MaterialTemplate.GetMaterialTemplateList();
        }
    }
    $scope.MaterialTemplate.GetMaterialTemplateList();
});


app.controller("MaterialTemplateController", function ($scope, $stateParams, $state, $local, $Api, $MessagService) {
    /// <summary>物料模板控制器</summary>
    $scope.Detail = {
        PageData: { medKits: [], prodLns: [] },
        ProductService: {},
        ProductCompetence: { operat: true, tool: false, warehouse: false }
    }

    $scope.Service = {
        /// <summary>模板服务管理</summary>
        Save: function () {
            /// <summary>模板保存</summary>
            $Api.MaterialsService.SaveTemplate($scope.Detail.PageData, function (rData) {
                $MessagService.caveat("模板保存成功！");
                $scope.goLastPage();
            });

        },
        GetTemplateDetail: function (data) {
            /// <summary>获取模板明细</summary>
            $Api.MaterialsService.GetMaterialsTemplateDateil(data, function (rdata) {
                $scope.Detail.PageData = $.extend($scope.Detail.PageData, rdata);
                $scope.Detail.PageData = $.extend($scope.Detail.PageData, {
                    sOOIOrgCode: rdata.oIOrgCode
                });
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.Detail.isChangeProd = true;
                        debugger
                        $scope.Service.GetNewProdLine(rdata.freeTemplateInfo, $scope.Detail.PageData.prodLns);
                        $scope.Detail.PageData.medKits = rdata.kitTemplateInfo;
                    });
                }, 100);
            })
        },
        GetNewProdLine: function (prodLines,data) {
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
                $.each(data, function (i, oldLine) {
                    if (newLine.medProdLnCode == oldLine.medProdLnCode) {//存在相同的产品线
                        oldLine.medMaterias = $scope.Service.GetNewMedMaterias(newLine.medMaterias, oldLine.medMaterias);
                        flg = false;
                        return true;
                    }
                });
                if (flg) {
                    data.push(newLine);
                }
            });
        },
        GetNewMedMaterias: function (newMs, oldMs) {
            /// <summary>获取去重后的物料</summary>
            var result = oldMs ? oldMs : new Array();
            $.each(newMs, function (index, item) {
                var flg = true;
                $.each(result, function (i, node) {
                    if (item.medMIInternalNo == node.medMIInternalNo) {
                        node.reqQty = (parseInt(item.reqQty) + parseInt(node.reqQty));
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
    if ($stateParams.tmplSODetailID) {//模板ID非空的话
        $scope.Service.GetTemplateDetail($stateParams);
    }
    if ($stateParams.isView) {
        $scope.Detail.ProductCompetence.operat = false;
    }

});