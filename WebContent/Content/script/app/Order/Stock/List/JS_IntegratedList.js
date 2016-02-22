

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("StockIntegratedListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>综合订单查询列表</summary>
    $scope.title = "综合订单查询";
    $scope.Competence = {
    };
    $scope.Integrated.StockList = [];
    //$scope.Integrated.GetOrderList({ opt: "INSTK_ADUIT_LIST" });

    $scope.Integrated = {
        StockList: new Array(),
        GetStockList: function (param) {
            /// <summary>获取我的订单数据列表</summary>
            $MessagService.loading("综合订单获取中，请稍等...");
            var paramData = $.extend($scope.Pagein, { soType: "INSTK" });
            $Api.StockService.DataSources.GetIntegratedStockInquiry(paramData, function (rData) {
                $scope.Pagein.total = rData.total;
                $scope.Integrated.StockList = rData.rows;
            });
        }
    }
   
    $scope.showViewDetail = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.stock.view");
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Integrated.GetStockList();
        }
    }
    $scope.Integrated.GetStockList();


    $scope.ListCompetence = {
        /// <summary>列表权限</summary>
        initMedProdLnCodeName: false
    }
});