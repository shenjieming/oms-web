

app.controller("RecComplexListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>对账单综合管理</summary>
    console.log("对账管理-综合订单运行");
    $scope.title = "对账单综合管理";
    $scope.PageControl.SetCompetence({});
    $scope.Integrated.GetReconciliationList({ opt: "COMPLEX_SOA" }, true);
});