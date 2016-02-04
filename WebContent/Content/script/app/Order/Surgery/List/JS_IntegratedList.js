

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
    $scope.Integrated.OrderList = [];
    //$scope.Integrated.GetOrderList({ opt: "OPER_ADUIT_LIST" });
    $scope.Load = function () {
        $MessagService.loading("综合订单获取中，请稍等..."); 
        var paramData = $.extend({ soType: "OPER" }, $scope.Pagein);
        console.log($scope.Pagein)
        $Api.SurgeryService.DataSources.GetIntegratedOrderInquiry(paramData, function (rowdata) {
            /// <summary>获取综合查询信息信息</summary>
            $scope.Integrated.OrderList = rowdata.rows;
            $scope.Pagein.total = rowdata.total;
            console.log(rowdata)
        });
    
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
            $scope.Load();
        }
    }
    $scope.Load();


    $scope.ListCompetence = {
        /// <summary>列表权限</summary>
        initMedProdLnCodeName: false
    }
});