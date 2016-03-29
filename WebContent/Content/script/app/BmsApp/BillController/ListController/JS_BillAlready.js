app.controller("BillAlreadyListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已计费列表管理</summary>
    console.log("计费管理-预计计费订单管理");
    $scope.title = "已计费订单";
    $scope.Integrated.GetBillList({ opt: "HAS_FEENOTE" }, true);
});