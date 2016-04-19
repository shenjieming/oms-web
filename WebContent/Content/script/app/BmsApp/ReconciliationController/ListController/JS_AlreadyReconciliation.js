app.controller("RecAlreadyListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已开票列表管理</summary>
    console.log("对账管理-已开票对账单管理");
    $scope.title = "已开票对账单";
    $scope.PageControl.SetCompetence({});
    $scope.Integrated.GetReconciliationList({ opt: "HAS_INVOICE_SOA" }, true);
});