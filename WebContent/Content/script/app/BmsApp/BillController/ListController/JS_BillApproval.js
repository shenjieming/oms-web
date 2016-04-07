

app.controller("BillApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批计费列表管理</summary>
    console.log("计费管理-待审批计费管理");
    $scope.title = "待审批计费单";
    $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});