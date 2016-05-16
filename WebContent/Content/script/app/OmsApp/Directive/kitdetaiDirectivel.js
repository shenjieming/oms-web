/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
 
app.directive("ngKitDetail", function ($Api, $MessagService) {
    /// <summary>产品线选择</summary>
    return {
        restrict: "EAC",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngKitDetail.html?data=" + Timestamp,
        scope: {
            ngModel: '=',  //对象
            ngOperat: "="  //套件详情操作
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var modelConfig = {
                title: "选择产品线", width: 650, height: 300, buttons: {
                    "确定": function () {
                        $scope.ngOperat.hide();
                    },
                },
                open: function () { $(".ui-dialog-title").html("套件详情"); $scope.view.GetKitDetail();  },
            };
            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.view = {
                ProductService: {},
                ProductCompetence: { operat: false, kits: false, tool: false, warehouse: false },
                //GetKitDetail: function () {
                //    /// <summary>获取套件详细信息</summary>
                //    $Api.MedKitService.GetMedKitDetail({ medKitInternalNo: $scope.ngModel.medKitopt }, function (row) {
                //        $scope.view.PageData = row;
                //        $scope.view.PageData.prodLns = row.productLine;
                //    });
                //},
            };
        }
    }
})