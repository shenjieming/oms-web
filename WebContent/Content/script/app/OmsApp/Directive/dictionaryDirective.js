﻿/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
var Dictionary = new Object();
OmsApp.directive("ngDictionary", function ($Api, $MessagService) {
    /// <summary>字典标签</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngDictionary.html?data=" + Timestamp,
        scope: {
            ngModel: '='
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Dictionary = new Array();

            if (Dictionary[attrs.ngDictionary]) {
                $scope.Dictionary = Dictionary[attrs.ngDictionary];
            }
            else {
                $Api.Public.GetDictionary({ dictType: attrs.ngDictionary }, function (data) {
                    $scope.Dictionary = data;
                    Dictionary[attrs.ngDictionary] = data;
                    //if (!$scope.ngModel) {//设置选择项的默认值
                    //    $scope.ngModel = data[data.length - 1].id;
                    //}
                });
            }


        }
    };
});