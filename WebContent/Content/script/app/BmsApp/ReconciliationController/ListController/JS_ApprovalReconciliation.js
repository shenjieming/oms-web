

app.controller("RecApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批对账单管理</summary>
    console.log("对账管理-待审批对账单运行");
    $scope.title = "待审批对账单";
    $scope.PageControl.SetCompetence({ batchapproval: true, approval: true, discard: true });
    $scope.Integrated.GetReconciliationList({ opt: "WAIT_CHECK_SOA" }, true);
});


app.controller("RecNotApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>未审批对账单管理</summary>
    console.log("对账管理-未审批对账单运行");
    $scope.title = "未审批对账单";
    $scope.PageControl.SetCompetence({ modify: true, discard: true });
    $scope.Integrated.GetReconciliationList({ opt: "WAIT_CHECK_SOA" }, true);
});