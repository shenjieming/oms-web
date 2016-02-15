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
        templateUrl: "Content/script/app/Directive/ui/ngMaterialsTemplate.html?data=" + Timestamp,
        scope: {
            ngMaterialsTemplate:"=",
            ngModel: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            //模板选择默认配置
            var modelConfig = {
                title: "选择物料模板", width: 850, height: 300, buttons: {
                    "确定": function () {
                        $scope.Service.fixed();
                    },
                    "关闭": function () {
                        $scope.ngMaterialsTemplate.hide();
                    }
                },
                open: function () {
                    /// <summary>模板选择打开事件</summary>
                    $scope.Service.GetMaterialsTemplate();
                }
            }
            //模板选择配置合并
            $scope.ngMaterialsTemplate = $.extend(modelConfig, $scope.ngMaterialsTemplate);

            $scope.Service = {
                /// <summary>模板选择服务</summary>
                List:new Array(),
                GetMaterialsTemplate: function () {
                    /// <summary>获取物料模板信息</summary>
                    $scope.Service.List = new Array();
                    $Api.MaterialsService.GetMaterialsTemplateList($scope.Pagein, function (rData) {
                        $scope.Service.List = rData.rows;
                        $scope.Pagein.total = rData.total;//分页控件获取当前数据请求的总页数
                    })
                },
                Select: function (template) {
                    /// <summary>模板选择</summary>
                    $Api.MaterialsService.GetMaterialsTemplateDateil(template, function (rdata) {
                        $scope.Service.DataDealWith(rdata);
                        $scope.ngMaterialsTemplate.fixed(rdata);
                        $scope.ngMaterialsTemplate.hide();
                    })
                },
                DataDealWith: function (Template) {
                    /// <summary>数据处理</summary>
                    $scope.ngModel.medKits = Template.kitTemplateInfo;
                    $scope.ngModel.prodLns = new Array();
                    var newProdLine = new Array();
                    $.each(Template.freeTemplateInfo, function (index, prodLine) {
                        newProdLine.push({
                            medProdLnCode: prodLine.medProdLnCode,
                            medProdLnCodeName: prodLine.medProdLnName,
                            medBrandCode: prodLine.medBrandCode,
                            medBrandCodeName: prodLine.medBrandName,
                            medMaterias: prodLine.templateMedMaterialItem
                        })
                    });
                    $scope.ngModel.prodLns = newProdLine;
                    $scope.ngModel.isChangeProd = true;
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