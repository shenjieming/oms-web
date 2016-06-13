


PrintApp.controller("BillTemplatController", function ($scope, $PrintHelp, $AppHelp) {
    /// <summary>计费单模板控制器</summary>
    console.log("打印模板管理-计费单模板管理");
    $scope.Triple = [  { name: "植入性耗材使用质量跟踪记录单(手术室联)" },   { name: "植入性耗材使用质量跟踪记录单(采购处联)" },   { name: "植入性耗材使用质量跟踪记录单(供应商联)" }   ];
    $scope.BillData = { detail: new Array(), images: new Array() };   $scope.msgBox = {}; $scope.Help = $AppHelp;

    var Service = {
        /// <summary>计费单服务</summary>
        GetBillDetail: function (param) {
            /// <summary>获取计费单明细</summary>
            $PrintHelp.GetBillDetail(param, Service.GetBillMapping);
        },
        GetBillMapping: function (data) {
            /// <summary>计费单数据映射</summary>
            $.extend($scope.BillData, data);
            $scope.BillData.Money = 0; $scope.BillData.UserMoney = 0;
            $.each(data.detail, function (index, item) {
                $scope.BillData.Money += item.qty * item.hPUnitPrice; $scope.BillData.UserMoney += item.qty * item.patientUnitPrice;
            });
            $scope.BillData.Money = parseFloat($scope.BillData.Money).toFixed(2); $scope.BillData.UserMoney = parseFloat($scope.BillData.UserMoney).toFixed(2);
        }
    }

    var data = { hOFNNo: $AppHelp.Tool.GetQueryString("hOFNNo") };  if (data.hOFNNo) {  Service.GetBillDetail(data);   }   else { alert("无效的请求，请重新选择计费单！");   }
});