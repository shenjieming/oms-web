/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngDictionary", function ($Api, $MessagService) {
    /// <summary>字典标签</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngDictionary.html?data=" + Timestamp,
        scope: {
            ngModel: '='
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Dictionary = new Array();
            $Api.Public.GetDictionary({ dictType: attrs.ngDictionary }, function (data) {
                $scope.Dictionary = data;
            });
        }
    };
});