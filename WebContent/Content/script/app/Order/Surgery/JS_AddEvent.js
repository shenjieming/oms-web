/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("AddEventController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>订单处理</summary>
    $scope.Event = { eventCode: "", attachments: { remark: "", images: new Array() } }

    /*数据监控Begion*/
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.Event, {
                sONo: $scope.PageData.sONo,
                eventCode: "", remark: "", PostEvent: $scope.View.Competence.apply ? $Api.SurgeryService.Process.FeedBackApply : $Api.SurgeryService.Process.AddEvent
            })
        }
    });
    /*数据监控End*/

    $scope.EventService = {
        /// <summary>订单处理服务</summary>
        EventList:new Array(),
        Submit: function () {
            /// <summary>订单处理提交</summary>
            $scope.Event.PostEvent($scope.Event, function (rData) {
                $scope.goLastPage();
            });
        },
        GetEventCode: function () {
            /// <summary>获取事件编码</summary>
            $Api.Public.GetEventList({}, function (rData) {
                $scope.AddEventService.EventList = rData;
            });
        }
    }

    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                if ($scope.PageData.attachments.images.length > 5) {
                    $MessagService.caveat("您上传的图片超过了5张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.$apply(function () {
                                $scope.Event.attachments.images.push(rData);
                            });
                        });
                    });
                } else {
                    $MessagService.caveat("您上传的不是图片！")
                }
            });
        },
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

});