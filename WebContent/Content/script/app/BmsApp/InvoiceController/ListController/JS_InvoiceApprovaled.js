

app.controller("InvoiceApprovaedlListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批发票管理</summary>
    console.log("票据管理-待审批发票管理");
    $scope.title = "待审批发票";
    //$scope.PageControl.SetCompetence({ batchapproval: false, approval: true, discard: true });
    //$scope.Integrated.GetBillList({ opt: "WAIT_CHECK_FEENOTE" }, true);
});