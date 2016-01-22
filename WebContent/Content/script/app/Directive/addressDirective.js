/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngAddress", function ($Api, $MessagService, $local) {
    /// <summary>常用地址选择器</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngAddress.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngOperat: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var modelConfig = {
                title: "常用地址选择", width: 750, height: 400, buttons: {
                    "确定": function () {
                        var dataRow = $local.getSelectedRow($scope.Service.AddressList);
                        if (dataRow) {
                            $scope.$apply(function () {
                                $scope.ngOperat.fixed(dataRow);
                            });
                        } else {
                            $MessagService.caveat("请选择一条常用地址信息！");
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                }
            };

            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Service = {
                AddressList :new Array(),
                GetAddressList: function () {
                    /// <summary>获取常用地址列表</summary>
                    $Api.RepresentativeService.GetDelivery({ sOCreateBy: $scope.ngModel.sOCreateBy }, function (rData) {
                        $scope.Service.AddressList = rData;
                    });
                }
            };
            $scope.Service.GetAddressList();
        }
    }
});