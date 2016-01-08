/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("EventCodeListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>事件管理控制器</summary>
    $scope.EventCodeInfo = [];
    $scope.EventCodeView = {
        Info: {},
        showEventCode: function (row) {
            /// <summary>显示选择的事件管理信息</summary>
            $scope.EventCodeView.Info = row ? row : $scope.getSelectedRow();
            /// <summary>获取选中的行</summary>
            if ($scope.EventCodeView.Info) {
                $scope.EventCodeView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            $scope.EventCodeView.model.hide();
        }
    }
    $scope.EventCodeView.model = { title: "事件管理详情", width: 800, height: 300, buttons: { "确定": $scope.EventCodeView.cancel } }
    /// <summary>Dialog页面</summary>
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.EventCodeInfo, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        console.log(result)
        return result;
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $MessagService.loading("事件管理获取中，请稍等...");
        $Api.BasisService.GetEventCodeList($scope.Pagein, function (eventCodeData) {
            /// <summary>获取事件管理信息</summary>
            $scope.EventCodeInfo = eventCodeData.rows;
            $scope.Pagein.total = eventCodeData.total;
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