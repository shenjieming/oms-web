

app.controller("BillApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批计费列表管理</summary>
    console.log("计费管理-待审批计费管理"); $scope.title = "待审批计费单"; $scope.PageControl.SetCompetence({ batchapproval: false, approval: true, discard: true }); $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});

app.controller("BillNotApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>未审批计费列表管理</summary>
    console.log("计费管理-未审批计费管理"); $scope.title = "未审批计费单"; $scope.PageControl.SetCompetence({ modify: true, discard: true }); $scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});