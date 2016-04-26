app.controller("BillComplexListController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单综合管理</summary>
    console.log("计费管理-综合订单运行"); $scope.title = "计费综合管理"; $scope.PageControl.SetCompetence({}); $scope.Integrated.GetBillList({ opt: "COMPLEX_FEENOTE" }, true);
});