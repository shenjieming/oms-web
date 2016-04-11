

app.controller("BillPostingListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>已对账计费单列表管理</summary>
    console.log("计费管理-已对账计费管理");
    $scope.title = "已对账计费单";
    $scope.Integrated.GetBillList({ opt: "HAS_SOA_FEENOTE" }, true);
});
