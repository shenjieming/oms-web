

app.controller("BillApprovaledListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已审批计费列表</summary>
    console.log("计费管理-待对账计费单管理");
    $scope.title = "待对账计费单";
    $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});