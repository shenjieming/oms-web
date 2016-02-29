/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngMaterialsImportTemplateDirective", function ($Api, $MessagService, $local) {
    /// <summary>物料模板导出</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngMaterialsImportTemplate.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngOperat: "=",
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
            }
            var modelConfig = {
                open: function () {
                },
                title: "模板导入", width: "99%", position: [0], height: "100%", buttons: {
                    "确定": function () {
                  
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                }
            }
            $.extend($scope.ngOperat, modelConfig);
        }
    }
});