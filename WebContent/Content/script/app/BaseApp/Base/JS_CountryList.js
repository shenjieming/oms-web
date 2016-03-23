/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("CountryListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>国家表控制器</summary>
    $scope.CountryInfo = [];
    $scope.CountryView = {
        Info: {},
        showCountry: function (row) {
            /// <summary>显示选择的国家列表信息</summary>
            $scope.CountryView.Info = row ? row : $scope.getSelectedRow();
            /// <summary>获取选中的行</summary>
            if ($scope.CountryView.Info) {         
                /// <summary>y=有效</summary>
                $scope.CountryView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            $scope.CountryView.model.hide();
        }
    }
    $scope.CountryView.model = { title: "国家列表详情", width: 500, height: 300, buttons: { "确定": $scope.CountryView.cancel } }
    /// <summary>Dialog页面</summary>
    $scope.getSelectedRow = function () {

        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.CountryInfo, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        return result;
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $MessagService.loading("国家列表获取中，请稍等...");
        $Api.BasisService.GetCountryList($scope.Pagein, function (countryData) {
            /// <summary>获取国家列表信息</summary>
            $scope.CountryInfo = countryData.rows;
            $scope.Pagein.total = countryData.total;
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