

app.controller("InvoiceApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>待审批发票管理</summary>
    console.log("票据管理-待审批发票管理");
    $scope.title = "待审批发票";
    $scope.PageControl.SetCompetence({ batchapproval: false, approval: true, discard: true });
    $scope.Integrated.GetInvoiceList({ opt: "WAIT_CHECK_INVOICE" }, true);
});

app.controller("InvoiceNotApprovalListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>未审批发票列表管理</summary>
    console.log("票据管理-未审批发票管理");
    $scope.title = "未审批发票";
    $scope.PageControl.SetCompetence({ modify: true, discard: true });
    $scope.Integrated.GetInvoiceList({ opt: "WAIT_CHECK_INVOICE" }, true);
});