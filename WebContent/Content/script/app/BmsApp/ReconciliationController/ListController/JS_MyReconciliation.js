
app.controller("RecListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>我的对账单管理</summary>
    console.log("对账管理-我的对账单运行");
    $scope.title = "我的对账单";
    $scope.PageControl.SetCompetence({});
    $scope.Integrated.GetReconciliationList({ opt: "MY_SOA" }, true);
});