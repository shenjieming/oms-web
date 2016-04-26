/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />


app.controller("ReconciliationDetailController", function ($scope, $state, $local, $BMSApi, $MessagService, $Api) {
    /// <summary>对账单管理，明细管理器</summary>

    $scope.Service = {
        /// <summary>对账单明细服务</summary>
        OrderSource:new Array(),
        GetOrderSource:function(){
            /// <summary>获取对账单来源</summary>
            $Api.Public.GetDictionary({ dictType: "HSOAST" }, function(dicty) {
                $scope.Service.OrderSource = dicty;
            });
        },
        ChangeOrderSource: function (hsoast) {
            /// <summary>修改对账单来源</summary>
            $scope.QueryService.GetRecByMappingData({
                hSOASourceType: hsoast.id,
                hSOASourceTypeName: hsoast.text,
            });
        },
        Init: function () {
            /// <summary>页面加载事件</summary>
            $scope.Service.GetOrderSource();
        }
    }
})