
app.controller("StockTobeshippedListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单处理控制器</summary>
    $scope.deliveryPagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $Api.SurgeryService.DataSources.GetOrderList({ soType: "INSTK " }, function (rData) {
                $scope.Integrated.OrderList = rData.rows;
                $scope.deliveryPagein.total = rData.total;
                for (var i = 0; i < rData.rows.length; i++) {
                    //rData.rows[i].operationDate = rData.rows[i].operationDate.substring(0, 11)  
                    if (rData.rows[i].operationDate) {
                        rData.rows[i].operationDate = FormatDate(new Date(rData.rows[i].operationDate.replace("-", "/").replace("-", "/")))
                    }
                    if (rData.rows[i].createDate) {
                        rData.rows[i].createDate = FormatDate(new Date(rData.rows[i].createDate.replace("-", "/").replace("-", "/")))
                    }
                }
            });
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
    function FormatDate(strTime) {
        //   var date = new Date(replace("-", "/").replace("-", "/"));         
        return strTime.getFullYear() + "-" + (strTime.getMonth() + 1) + "-" + strTime.getDate();
    }

    //$scope.Integrated.GetOrderList({ opt: "OPER_CAN_ADD_ORDER_LIST" });
    //$Api.SurgeryService.Process.deliverylist
    //$Api.SurgeryService.DataSources.GetOrderList
    //var parm = $.extend($scope.deliveryPagein, { opt: "OPER_CAN_ADD_ORDER_LIST" })
    $Api.SurgeryService.Process.deliverylist({ soType: "INSTK " }, function (rData) {
        $scope.Integrated.OrderList = rData.rows;
        $scope.deliveryPagein.total = rData.total;
        for (var i = 0; i < rData.rows.length; i++) {
            if (rData.rows[i].operationDate) {
                rData.rows[i].operationDate = FormatDate(new Date(rData.rows[i].operationDate.replace("-", "/").replace("-", "/")))
            }
            if (rData.rows[i].createDate) {
                rData.rows[i].createDate = FormatDate(new Date(rData.rows[i].createDate.replace("-", "/").replace("-", "/")))
            }
        }
    });
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.goView("app.oms.stock.view", { sono: sono });
    }
})