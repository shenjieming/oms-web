
app.controller("StockTobeshippedListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单处理控制器</summary>
    $scope.deliveryPagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.deliveryList();
        }
    }
    $scope.title = "待发货订单";
    $scope.Competence = {
        shipped: true
    };
    $scope.ListCompetence.sOOIOrgCodeName = true;
    $scope.ListCompetence.sOCreateByOrgCodeName = true;
    $scope.ListCompetence.hPCodeName = true;
    $scope.ListCompetence.dTCodeName = true;
    //条件清空
    // OPER_CAN_ADD_ORDER_LIST 修改成 INSTK_SIGN_LIST
    
    $scope.deliveryList = function () {
        $MessagService.loading("列表获取中...")
        var pram = $.extend($scope.deliveryPagein, { soType: "INSTK" })
        $Api.SurgeryService.Process.deliverylist(pram, function (rData) {
            for (var i = 0; i < rData.rows.length; i++) {
                rData.rows[i].createDate = rData.rows[i].createDate.substring(0, 11).replace("/", "-").replace("/", "-");
            }
            $scope.Integrated.OrderList = rData.rows;
            $scope.deliveryPagein.total = rData.total;

        });
    }
    $scope.deliveryList();
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.goView("app.oms.stock.view", { sono: sono });
    }
})