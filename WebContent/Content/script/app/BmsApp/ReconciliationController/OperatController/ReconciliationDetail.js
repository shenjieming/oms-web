/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />


app.controller("ReconciliationDetailController", function ($scope, $state, $local, $BMSApi, $MessagService, $Api, $RecInfFactory, $FileService) {
    /// <summary>对账单管理，明细管理器</summary>

    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) { if ($scope.RecInfo.images.length >= 5) { $MessagService.caveat("您上传的图片超过了5张。"); return false; }; if (item.type.indexOf("image") > -1) { $FileService.ReaderFiles(item, function (data) { $Api.Public.UploadFile(data, function (rData) { $scope.RecInfo.images.push(rData); }); }); } else { $MessagService.caveat("您上传的不是图片！"); } });
        }
    }

    $scope.Service = {
        /// <summary>对账单明细服务</summary>
        OrderSource: new Array(),
        GetOrderSource: function () {
            /// <summary>获取对账单来源</summary>
            $Api.Public.GetDictionary({ dictType: "HSOAST" }, function (dicty) { $scope.Service.OrderSource = dicty; });
        },
        ChangeOrderSource: function (hsoast) {
            /// <summary>修改对账单来源</summary>
            $.extend($scope.RecInfo, { hSOASourceType: hsoast.id, hSOASourceTypeName: hsoast.text });
        },
        Submit: function () {
            /// <summary>对账单提交</summary>
            $BMSApi.ReconciliationService.Submit($scope.RecInfo, function (rdata) { $MessagService.succ("对账单" + rdata + "保存成功！"); $scope.goLastPage(); });
        },
        Init: function () {
            /// <summary>页面加载事件</summary>
            $scope.Service.GetOrderSource();
        }
    }
})