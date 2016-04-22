

app.controller("RecApprovaledListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已审批对账单管理</summary>
    console.log("对账管理-已审批对账单运行");
    $scope.title = "待审批对账单";
    $scope.PageControl.SetCompetence({});
    $scope.Integrated.GetReconciliationList({ opt: "HAS_CHECK_SOA" }, true);
});

