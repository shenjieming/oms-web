/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.directive("ngMaterialsTemplate", function ($Api, $MessagService, $local) {
    /// <summary>货主标签</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngMaterialsTemplate.html?data=" + Timestamp,
        scope: {
            ngMaterialsTemplate:"=",
            ngModel: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            //模板选择默认配置
            var userInfo = $local.getValue("USER").userInfo;
            var modelConfig = {
                title: "选择订单器械模板（可一键添加订单所需器械，又快又准）", width: 850, height: 300, buttons: {
                    "确定": function () {
                        $scope.Service.fixed();
                    },
                    "关闭": function () {
                        $scope.ngMaterialsTemplate.hide();
                    }
                },
                open: function () {
                    /// <summary>模板选择打开事件</summary>
                    $scope.Pagein.tmplName = "";
                    $scope.Service.GetMaterialsTemplate();
                }
            }
            //模板选择配置合并
            $scope.ngMaterialsTemplate = $.extend(modelConfig, $scope.ngMaterialsTemplate);

            $scope.Service = {
                /// <summary>模板选择服务</summary>
                List: new Array(),
                UpEnter: function (e) {
                    var keycode = window.event ? e.keyCode : e.which;
                    if (keycode == 13) {

                        $scope.Service.QueryMaterialsTemplateList();
                    }
                },
                QueryMaterialsTemplateList: function () {
                    /// <summary>查询模板列表</summary>
                    $scope.Pagein.pageIndex = 1;
                    $scope.Service.GetMaterialsTemplate();
                },
                GetMaterialsTemplate: function () {
                    /// <summary>获取物料模板信息</summary>
                    $scope.Service.List = new Array();
                    $Api.MaterialsService.GetMaterialsTemplateList($scope.Pagein, function (rData) {
                        $scope.Service.List = rData.rows;
                        $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
                        console.log(rData)
                    })
                },
                Select: function (template) {
                    /// <summary>模板选择</summary>
                    $Api.MaterialsService.GetMaterialsTemplateDateil(template, function (rdata) {
                        $scope.Service.DataDealWith(rdata);
                        if ($scope.ngMaterialsTemplate.fixed) {
                            $scope.ngMaterialsTemplate.fixed(rdata);
                        }
                        $scope.ngMaterialsTemplate.hide();
                    })
                },
                DataDealWith: function (Template) {
                    /// <summary>数据处理</summary>
                    $scope.Service.AddNewMedKits(Template.kitTemplateInfo);
                    $scope.Service.AddNewProdLine(Template.freeTemplateInfo);
                  
                    $scope.ngModel.isChangeProd = true;
                },
                AddNewProdLine: function (prodLines) {
                    /// <summary>添加产品线信息</summary>
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
                },
                AddNewMedKits: function (lise) {
                    /// <summary>添加新的套件</summary>
                    $.each(lise, function (index, item) {
                        var flg = true;
                        var data = $.extend(item, {
                            estZoneCode: item.zoneCode, estMedMIWarehouse: userInfo.orgCode,
                            medKitInternalNo: item.medMIInternalNo, inventory: "",
                        })
                        $.each($scope.ngModel.medKits, function (mKIndex, medKit) {
                            if (medKit.medKitInternalNo == data.medKitInternalNo
                                && data.estMedMIWarehouse == medKit.estMedMIWarehouse) {
                                medKit.reqQty += item.reqQty;
                                flg = false;
                                return false;
                            }
                        });
                        if (flg) {
                            $scope.ngModel.medKits.push(data);
                        }
                    });
                },
                fixed: function () {
                    /// <summary>确认选择模板</summary>
                    var template = $local.getSelectedRow($scope.Service.List);
                    if (template) {
                        $scope.Service.Select(template);
                    } else {
                        $MessagService.caveat("请选择一条模板数据！");
                    }
                }
            }
            $scope.Pagein = {
                /// <summary>分页信息</summary>
                pageSize: 5,
                pageIndex: 1,
                callbake: function () {
                    $scope.Service.GetMaterialsTemplate();
                }
            }
            
        }
    }
});