/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngDoctors", function ($Api, $MessagService, $local) {
    /// <summary>医生选择</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngDoctors.html",
        scope: {
            ngModel: '=',
            ngOperat: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var modelConfig = {
                title: "医生选择", width: 650, height: 300, buttons: {
                    "确定": function () {
                        var doctData = $local.getSelectedRow($scope.Service.DoctorsList);
                        if (doctData) {
                            $scope.ngOperat.fixed(doctData);
                        }  else {
                            $MessagService.caveat("请选择一条医生信息！");
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                },
                open: function () {
                    $scope.Service.GetDoctors();
                }
            }

            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Service = {
                DoctorsList:new Array(),
                GetDoctors: function () {
                    /// <summary>获取常用医生</summary>
                    $Api.HospitalService.GetDoctors($scope.ngModel, function (rData) {
                        $scope.Service.DoctorsList = rData;
                    });
                }
            };

        }
    }
});