
app.controller("BillViewController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单视图页面");

    $scope.Service = {
        /// <summary>计费单视图管理服务</summary>
        Competence: {
            /// <summary>权限配置信息</summary>
            approval: false
        },
        Approval: function () {
            /// <summary>计费单审批</summary>
            $BMSApi.BillService.Check($scope.BillData, function (rData) {
                $MessagService.succ("计费单审批成功！");
                $scope.goLastPage();
            });
        },
        AntiApproval: function () {
            /// <summary>计费单反审批</summary>
            $BMSApi.BillService.AntiCheck($scope.BillData, function (rData) {
                $MessagService.succ("计费单反审批成功！"); $scope.goLastPage();
            });
        }
    }
});