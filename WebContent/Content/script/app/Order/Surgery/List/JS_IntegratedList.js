

/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("IntegratedListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>综合订单查询列表</summary>
    $scope.title = "综合订单查询";
    $scope.Competence = {
    };
    $scope.Integrated = {
        OrderList: new Array(),
        GetOrderList: function () {
            /// <summary>获取我的订单数据列表</summary>
            $MessagService.loading("综合订单获取中，请稍等...");
            $scope.Pagein.total = 0;
            $scope.Integrated.OrderList = new Array();
            var paramData = $.extend($scope.Pagein, { soType: "OPER" });
            $Api.SurgeryService.DataSources.GetIntegratedOrderInquiry(paramData, function (rowdata) {
                $scope.Integrated.OrderList = rowdata.rows;
                $scope.Pagein.total = rowdata.total;
                console.log(rowdata)
            });
        }
    }


    $scope.showViewDetail = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.order.view");
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Integrated.GetOrderList();
        }
    }
    $scope.Integrated.GetOrderList();


    $scope.ListCompetence = {
        /// <summary>列表权限</summary>
        initMedProdLnCodeName: false
    }
});