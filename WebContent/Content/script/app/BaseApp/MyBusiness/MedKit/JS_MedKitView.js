/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MedKitViewController", function ($scope, $state, $local, $Api,$stateParams) {
    /// <summary>套件列表内控制器</summary>/**
    $scope.view = {
        PageData: {},
        ProductService: {},
        ProductCompetence: { operat: false, kits: false, tool: false, warehouse: false },
        GetKitDetail: function () {
            /// <summary>获取套件详细信息</summary>
            $Api.MedKitService.GetMedKitDetail({medKitInternalNo:$stateParams.medKitopt}, function (row) {
                $scope.view.PageData=row;
                console.log(row)
                $scope.view.PageData.prodLns = row.productLine;
            });
        },
    }
    $scope.view.GetKitDetail();

})
