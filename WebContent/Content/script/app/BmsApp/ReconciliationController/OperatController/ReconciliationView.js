/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />

app.controller("ReconciliationViewController", function ($scope) {
    /// <summary>对账管理，详情页面控制器</summary>

    $scope.Config = {
        /// <summary>配置项</summary>
        Approval: {
            /// <summary>对账单审批</summary>
            fixed: function () { $scope.goLastPage(); }
        },
        UnApproval: {
            /// <summary>对账单反审批</summary>
            fixed: function () { $scope.goLastPage(); }
        },
        Disable: {
            /// <summary>对账单作废</summary>
            fixed: function () { $scope.goLastPage(); }
        }
    }
});