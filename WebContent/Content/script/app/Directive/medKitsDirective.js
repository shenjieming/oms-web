/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngMedKits", function ($Api, $MessagService, $local) {
    /// <summary>套件选择标签</summary>  
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngMedKits.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngOperat: "=",
            ngCargoModel: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                MedKits: new Array(),
                GetMedKits: function () {
                    /// <summary>获取套件信息</summary>
                    console.log($scope.ngCargoModel)
                    $Api.MedKitService.GetMedKitList({ oIOrgCode: $scope.ngCargoModel }, function (rData) {
                        $scope.Service.MedKits = new Array();
                        $.each(rData.rows, function (index, item) {
                            $scope.Service.MedKits.push($.extend(item, { reqQty: 0 }));
                        });
                    });
                },
                GetChangeMedKits: function () {
                    /// <summary>获取修改数据的套件信息</summary>
                    var result = new Array();
                    $.each($scope.Service.MedKits, function (index, item) {
                        if (item.reqQty > 0) {
                            result.push(item);
                        }
                    })
                    return result;
                }
            }
            var modelConfig = {
                open: function () {
                    $scope.Service.GetMedKits();
                },
                title: "套件选择", width: 650, height: 300, buttons: {
                    "确定": function () {
                        var data = $scope.Service.GetChangeMedKits();
                        if (data.length) {
                            $scope.ngOperat.fixed(data);
                            $scope.ngOperat.hide();
                        } else {
                            $MessagService.caveat("请至少添加一份套件...")
                        }
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