app.controller("BillListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>我的计费单管理</summary>
    console.log("计费管理-我的计费单运行");
    $scope.title = "我的计费单";
    $scope.Integrated.GetBillList({ opt: "MY_FEENOTE" }, true);
});