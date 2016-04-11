/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngMaterialsImportTemplate", function ($Api, $MessagService, $local) {
    /// <summary>物料模板导出</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngMaterialsImportTemplate.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngMaterialsImportTemplate: "=",
        },
        replace: true,
        link: function ($scope, element, attrs) {
            /// <summary>模板另存为插件</summary>
            $scope.TemplateData = { tmplAccessType: "PUBLIC", tmplType: "IMPLANTT", medKits: [], prodLns: [] }
            $scope.Service = {
                Save: function () {
                    /// <summary>保存模板</summary>
                    $Api.MaterialsService.SaveTemplate($scope.TemplateData, function (rData) {
                        $scope.ngMaterialsImportTemplate.hide();
                    });
                },
                ProductService: {},
                ProductCompetence: { tool: false, operat: false, warehouse: false }
            }
            var modelConfig = {
                open: function () {
                    $scope.TemplateData = $.extend($scope.TemplateData, {
                        oIOrgCode: $scope.ngModel.sOOIOrgCode,
                        tmplFullName:"",tmplName:"",tmplDesc:"",remark:"",   tmplAccessType: "PUBLIC", tmplType: "IMPLANTT",
                        isChangeProd: true, medKits: $scope.ngModel.medKits, prodLns: $scope.ngModel.prodLns
                    });
                },
                title: "模板导入", width: "99%", position: [0], height: "90%", buttons: {
                    "确定": function () {
                        $scope.Service.Save();
                    },
                    "关闭": function () {
                        $scope.ngMaterialsImportTemplate.hide();
                    }
                }
            }
            $.extend($scope.ngMaterialsImportTemplate, modelConfig);
        }
    }
});