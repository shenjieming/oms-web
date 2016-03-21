/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("CurrencyListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>货币管理控制器</summary>
    $scope.CurrencyInfo = [];
    $scope.CurrencyView = {
        Info: {},
        showCurrency: function (row) {
            /// <summary>显示选择的货币管理信息</summary>
            $scope.CurrencyView.Info = row ? row : $scope.getSelectedRow();
            /// <summary>获取选中的行</summary>        
            if ($scope.CurrencyView.Info) {              
                $scope.CurrencyView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            $scope.CurrencyView.model.hide();
        }
    }
    $scope.CurrencyView.model = { title: "货币管理详情", width: 500, height: 300, buttons: { "确定": $scope.CurrencyView.cancel } }
    /// <summary>Dialog页面</summary>
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.CurrencyInfo, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        return result;
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $MessagService.loading("货币列表获取中，请稍等...");
        $Api.BasisService.GetCurrencyList($scope.Pagein, function (currencyData) {
            /// <summary>获取货币列表信息</summary>
            $scope.CurrencyInfo = currencyData.rows;
            $scope.Pagein.total = currencyData.total;

        });
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load();
})