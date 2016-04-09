/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("NoticeListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.NoticeList = {
        info: [],
        GetNoticeList: function () {
            /// <summary>获取经销商事件通知配置列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            console.log(paramData)
            $Api.ManaEvent.GetqueryAllDlsoEventNoTificationCfg(paramData, function (rData) {
                $scope.NoticeList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        }
    }
    $scope.NoticeJump = {
        Delet: function (row) {
            $scope.NoticeList.info = row ? row : $scope.getSelectedRow();
            if ($scope.NoticeList.info) {
                $Api.ManaEvent.GetdeleteDlsoEventNoTificationCfg($scope.NoticeList.info, function (rData) {
                    $MessagService.caveat("该信息删除成功!")

                })
            } else {
                $MessagService.caveat("请选择一条删除的数据!")
            }
            $scope.NoticeList.GetNoticeList();
        }
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.NoticeList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }



    // 经销商通知时间配置管理器：
    $scope.NoticePageInfo = {
        Info: { isEmailopen: true, isApplyTeam: true, isSMS: true, isWeChat: true, isApplyDLAL: true },
        Load: function (callback) {
            if ($stateParams.dlnoticeopt) {
                console.log($stateParams.dlnoticeopt)
                $scope.dlnoticeopt = $stateParams.dlnoticeopt;
                $scope.NoticePageInfo.GetNoticeDetail();
            }
            $scope.SelectInfo.DLlist.getDlList();
        },
        GetNoticeDetail: function () {
            /// <summary>获取经销商事件通知详情</summary>
            $Api.ManaEvent.GetqueryAllDlsoEventNoTificationCfg({ orgCode: $scope.dlnoticeopt }, function (rData) {
                $scope.NoticePageInfo.Info = rData;
            })
        },
        showAdd: function (row) {
            $scope.NoticePageInfo.model.show();
            console.log($scope.NoticePageInfo.Info)
            $scope.NoticePageInfo.Info = row;
            $scope.NoticePageInfo.Info.isApplyTeam = true;
                $scope.NoticePageInfo.Info.isEmailopen = true;
                $scope.NoticePageInfo.Info.isSMS = true;          
                $scope.NoticePageInfo.Info.isWeChat = true;            
                $scope.NoticePageInfo.Info.isApplyDLAL = true;
                $scope.SelectInfo.DLlist.getDlList();
                $scope.SelectInfo.EmailList.getEmailList();
                $scope.SelectInfo.SMSList.getSMSList();
                $scope.SelectInfo.WeChatList.getWeChatList();
                $scope.SelectInfo.DlEventList.getDlEventList();
        },
        showEdit: function () {
            var noticeopt = $scope.getSelectedRow();
            if (noticeopt) {
                $scope.NoticePageInfo.model.show();
                $scope.SelectInfo.DLlist.getDlList();
                $scope.SelectInfo.EmailList.getEmailList();
                $scope.SelectInfo.SMSList.getSMSList();
                $scope.SelectInfo.WeChatList.getWeChatList();
                $scope.SelectInfo.DlEventList.getDlEventList();
                var option = { dLOrgCode: noticeopt.dLOrgCode, sOEventCode: noticeopt.sOEventCode }
                $Api.ManaEvent.GetqueryAllDlsoEventNoTificationCfg(option, function (rData) {
                    $scope.NoticePageInfo.Info = rData.rows[0];
                    console.log(rData.rows)
                    if ($scope.NoticePageInfo.Info.isApplyToTeam == "Y") {
                        $scope.NoticePageInfo.Info.isApplyTeam = true;
                    } else {
                        $scope.NoticePageInfo.Info.isApplyTeam = false;
                    }
                    if ($scope.NoticePageInfo.Info.isApplyDLAL == "Y") {
                        $scope.NoticePageInfo.Info.isApplyDLAL = true;
                    } else {
                        $scope.NoticePageInfo.Info.isApplyDLAL = false;
                    }
                    if ($scope.NoticePageInfo.Info.isEmailNotificationOpened == "Y") {
                        $scope.NoticePageInfo.Info.isEmailopen = true;
                    } else {
                        $scope.NoticePageInfo.Info.isEmailopen = false;
                    }
                    if ($scope.NoticePageInfo.Info.isSMSNotificationOpened == "Y") {
                        $scope.NoticePageInfo.Info.isSMS = true;
                    } else {
                        $scope.NoticePageInfo.Info.isSMS = false;
                    }
                    if ($scope.NoticePageInfo.Info.isWeChatNotificationOpened == "Y") {
                        $scope.NoticePageInfo.Info.isWeChat = true;
                    } else {
                        $scope.NoticePageInfo.Info.isWeChat = false;
                    }
                })
            } else {
                $MessagService.caveat("请选择一条编辑的事件通知!")
            }
        },
        Save: function () {
            /// <summary>经销商事件通知操作</summary>
            console.log($scope.NoticePageInfo.Info)          
            $Api.ManaEvent.Save($scope.NoticePageInfo.Info, function (rData) {
                $MessagService.succ("用户保存成功！");
                $scope.goView('app.base.business.dlmanagementnotice');
            })
        },
        cancel: function () {
            $scope.NoticePageInfo.model.hide()
        }
    }
    $scope.SelectInfo = {
        DLlist: {
            //经销商下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>经销商修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.DLlist.dic.length; i++) {
                    if ($scope.SelectInfo.DLlist.dic[i].orgCode == $scope.NoticePageInfo.Info.dLOrgCode) {
                        $scope.NoticePageInfo.Info.dLOrgCodeName = $scope.SelectInfo.DLlist.dic[i].dLName;
                        return;
                    }
                }
            },
            getDlList: function () {
                /// <summary>获取经销商信息</summary>
                $Api.ManageDl.GetqueryAllDealer({}, function (rData) {
                    $scope.SelectInfo.DLlist.dic = rData.rows;
                    console.log(rData)
                });
            },
        },
        EmailList: {
            //邮件通知下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>邮件通知修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.EmailList.dic.length; i++) {
                    if ($scope.SelectInfo.EmailList.dic[i].id == $scope.NoticePageInfo.Info.emailNotificationTmplCode) {
                        $scope.NoticePageInfo.Info.emailNotificationTmplCodeName = $scope.SelectInfo.EmailList.dic[i].text;
                        return;
                    }
                }
            },
            getEmailList: function () {
                /// <summary>获取邮件通知信息</summary>
                $Api.Public.GetDictionary({ dictType: "TPSOEM" }, function (rData) {
                    $scope.SelectInfo.EmailList.dic = rData;
                    console.log(rData)
                });
            },
        },
        SMSList:{
            //短信通知下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>短信通知修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.SMSList.dic.length; i++) {
                    if ($scope.SelectInfo.SMSList.dic[i].id == $scope.NoticePageInfo.Info.sMSNotificationTmplCode) {
                        $scope.NoticePageInfo.Info.sMSNotificationTmplCodeName = $scope.SelectInfo.SMSList.dic[i].text;
                        return;
                    }
                }
            },
            getSMSList: function () {
                /// <summary>获取短信通知信息</summary>
                $Api.Public.GetDictionary({ dictType: "TPSOSS" }, function (rData) {
                    $scope.SelectInfo.SMSList.dic = rData;
                    console.log(rData)
                });
            },
        },
        WeChatList: {
            //微信通知下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>微信通知修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.WeChatList.dic.length; i++) {
                    if ($scope.SelectInfo.WeChatList.dic[i].id == $scope.NoticePageInfo.Info.weChatNotificationTmplCode) {
                        $scope.NoticePageInfo.Info.weChatNotificationTmplCodeCodeName = $scope.SelectInfo.WeChatList.dic[i].text;
                        return;
                    }
                }
            },
            getWeChatList: function () {
                /// <summary>获取微信通知信息</summary>
                $Api.Public.GetDictionary({ dictType: "TPSOWC" }, function (rData) {
                    $scope.SelectInfo.WeChatList.dic = rData;
                    console.log(rData)
                });
            },
        },
        DlEventList: {
            //微信通知下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>微信通知修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.DlEventList.dic.length; i++) {
                    if ($scope.SelectInfo.DlEventList.dic[i].id == $scope.NoticePageInfo.Info.sOEventCode) {
                        $scope.NoticePageInfo.Info.sOEventCodeName = $scope.SelectInfo.DlEventList.dic[i].text;
                        return;
                    }
                }
            },
            getDlEventList: function () {
                /// <summary>获取微信通知信息</summary>
                $Api.ManaEvent.GetqueryEventCode({}, function (rData) {
                    $scope.SelectInfo.DlEventList.dic = rData;
                    console.log(rData)
                });
            },
        },
    }
    ///// 按钮集合
    $scope.ButtonList = {
        isApplyTeam: function () {
            /// <summary>经销商订单全共享人</summary>
            $scope.NoticePageInfo.Info.isApplyTeam = !$scope.NoticePageInfo.Info.isApplyTeam;
            $scope.NoticePageInfo.Info.isApplyToTeam = $scope.NoticePageInfo.Info.isApplyTeam ? "Y" : "N";
        },
        isApplyDLAL: function () {
            /// <summary>订单人所在订单共享组</summary>
           alert(1)
            $scope.NoticePageInfo.Info.isApplyDLAL = !$scope.NoticePageInfo.Info.isApplyDLAL;
            $scope.NoticePageInfo.Info.isApplyToDLALL = $scope.NoticePageInfo.Info.isApplyDLAL ? "Y" : "N";
        },
        isEmailopen: function () {
            /// <summary>邮件通知</summary>
            $scope.NoticePageInfo.Info.isEmailopen = !$scope.NoticePageInfo.Info.isEmailopen;
            $scope.NoticePageInfo.Info.isEmailNotificationOpened = $scope.NoticePageInfo.Info.isEmailopen ? "Y" : "N";
        },
        isSMS: function () {
            /// <summary>短信通知</summary>
            $scope.NoticePageInfo.Info.isSMS = !$scope.NoticePageInfo.Info.isSMS;
            $scope.NoticePageInfo.Info.isSMSNotificationOpened = $scope.NoticePageInfo.Info.isSMS ? "Y" : "N";
        },
        isWeChat: function () {
            /// <summary>微信通知</summary>
            $scope.NoticePageInfo.Info.isWeChat = !$scope.NoticePageInfo.Info.isWeChat;
            $scope.NoticePageInfo.Info.isWeChatNotificationOpened = $scope.NoticePageInfo.Info.isWeChat ? "Y" : "N";
        },
    }


   ///  事件通知详情
    $scope.NoticePageView = {
        Info: [],
        showView: function () {
            var noticeopt = $scope.getSelectedRow();
            if (noticeopt) {
                $scope.NoticePageView.model.show();
                $Api.ManaEvent.GetqueryAllDlsoEventNoTificationCfg(noticeopt, function (rData) {
                    $scope.NoticePageView.Info = rData.rows[0];
                    console.log(rData)
                })
            } else {
                $MessagService.caveat("请选择一条查看的事件通知!");
            }
        },
        cancel: function () {
            $scope.NoticePageView.model.hide();
        },
    }


    $scope.NoticePageView.model = { title: "配置详情", width: 550, height: 300, buttons: { "确定": $scope.NoticePageView.cancel } }
    $scope.NoticePageInfo.model = { title: "配置模板", width: 800, height: 300, buttons: { "保存": $scope.NoticePageInfo.Save, "取消": $scope.NoticePageInfo.cancel } }



    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.NoticeList.GetNoticeList();
    }
    $scope.Load();
})