/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("AdmdivisionListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>行政区域表控制器</summary>
    $scope.AdmdivisionInfo = [];
    $scope.AdmdivisionView = {
        Info: {},
        showAdmdivision: function (row) {
            /// <summary>显示选择的行政区域列表信息</summary>
            $scope.AdmdivisionView.Info = row ? row : $scope.getSelectedRow();
            /// <summary>获取选中的行</summary>
            console.log($scope.AdmdivisionView.Info)
            if ($scope.AdmdivisionView.Info) {
                $scope.AdmdivisionView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            $scope.AdmdivisionView.model.hide();
        }
    }
    $scope.AdmdivisionView.model = { title: "行政区域详情", width: 500, height: 300, buttons: { "确定": $scope.AdmdivisionView.cancel } }
    /// <summary>Dialog页面</summary>
    $scope.getSelectedRow = function () {

        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.AdmdivisionInfo, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        return result;
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $MessagService.loading("行政区域获取中，请稍等...");
        $Api.BasisService.GetadmdivisionList($scope.Pagein, function (admdivisionData) {
            /// <summary>获取行政区域信息</summary>
            $scope.AdmdivisionInfo = admdivisionData.rows;
            $scope.Pagein.total = admdivisionData.total;
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