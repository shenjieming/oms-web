/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngCargo", function ($Api, $MessagService) {
    /// <summary>货主标签</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngCargoOwner.html",
        scope: {
            ngModel: '='
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Cargo = {
                List: new Array(),
                GetCargo: function () {
                    /// <summary>获取货主信息</summary>
                    $MessagService.loading("货主信息获取中，请稍等...");
                    $Api.OrganizationService.GetCargoOwner({}, function (rData) {
                        $scope.Cargo.List = rData;
                        if (!$scope.ngModel && $scope.Cargo.List[0]) {
                            $scope.ngModel = $scope.Cargo.List[0].id;
                        }
                    })
                }
            }
            $scope.Cargo.GetCargo();

        }
    };
});