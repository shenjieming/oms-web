/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("OrderViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>手术下单下单控制器</summary>
    /*基础对象区域Begion*/
    $scope.sono = $stateParams.sono;//获取订单编号
    $scope.PageData = {
        wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "",
        prodLns: new Array(),
        attachments: { images: new Array(), remark: "" }
    }

    $scope.View = {
        Surgery: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
        Competence: { }
    }
    $.extend($scope.View.Competence, $local.getValue("ORDERCOMP"));
    /*基础对象区域End*/

    /*逻辑对象区域Begion*/
    $scope.PageService = {
        /// <summary>页面服务</summary>
        GetDetail: function () {
            /// <summary>获取订单明细</summary>
            $Api.SurgeryService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) { $.extend($scope.PageData, rData); });
        }
    }

    $scope.ApprovalConfig = {
        /// <summary>订单审批配置</summary>
        Operat: { fixed: function () { $scope.goLastPage(); } },
        Model: { sONo: $scope.sono }
    }
    $scope.SignConfig = {
        /// <summary>订单审批配置</summary>
        Operat: { fixed: function () { $scope.goLastPage(); } }
    }
    $scope.EventFilter = function () {
        /// <summary>图片过滤</summary>
        $.each($scope.PageData.events, function (eIndex,event) {
            event.images = new Array();
            $.each(event.attachments, function (index,att) {
                event.images.push({ url: att.attachmentDir })
                event.remark = att.attachmentDesc
            });
        });
    }

    /*逻辑对象区域End*/

    /*数据监控区域Begion*/
    $scope.$watch("sono", function () {
        if ($scope.sono) {
            $MessagService.loading("订单：" + $scope.sono + "数据获取中");
            $scope.PageService.GetDetail();
            $scope.EventFilter();
        }
    })



    $scope.file = {
        /// <summary>附件控制器</summary>
        GetEventMapping: function (eventList, statusCode) {
            /// <summary>获取附件映射</summary>
            var result = { images: new Array(), remark: "" }
            $.each(eventList, function (index, event) {
                if (event.eventCode == statusCode) {
                    $.each(event.attachments, function (fileindex, item) {
                        result.remark = item.attachmentDesc;
                        var img = { id: item.attachmentId, url: item.attachmentDir }
                        if (JSON.stringify(result.images).indexOf(JSON.stringify(img)) == -1) {
                            result.images.push(img);
                        }
                    });
                    return result;
                }
            });
            return result;
        }
    }
    /*数据监控区域End*/

    
});

