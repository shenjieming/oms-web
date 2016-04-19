

app.controller("BillApprovaledListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已审批计费列表</summary>
    console.log("计费管理-待对账计费单管理"); $scope.title = "已审核计费单"; $scope.PageControl.SetCompetence({ unapproval: true }); $scope.Integrated.GetBillList({ opt: "HAS_CHECKED_FEENOTE" }, true);
});
