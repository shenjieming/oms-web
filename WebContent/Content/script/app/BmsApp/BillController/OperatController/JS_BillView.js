
app.controller("BillViewController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单视图页面");

    $scope.ApprovalConfig = {
        /// <summary>订单审核配置</summary>
        fixed: function () { $scope.goLastPage(); }
    }
    $scope.UnApprovalConfig = {
        /// <summary>订单反审核配置</summary>
        fixed: function () { $scope.goLastPage(); }
    }
    $scope.DisableConfig = {
        /// <summary>计费单作废配置</summary>
        fixed: function () { $scope.goLastPage(); }
    }
});