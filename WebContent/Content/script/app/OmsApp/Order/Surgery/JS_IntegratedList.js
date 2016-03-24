/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />


app.controller("SurgeryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>订单操作控制器</summary>
    var userData = $local.getValue("USER");
    /*页面操作Begion*/
    $scope.GetRowGoPage = function (view, callback) {
        /// <summary>Description</summary>
        var rowData = $local.getSelectedRow($scope.Integrated.OrderList);
        console.log(rowData)
        if (rowData) {
            $MessagService.loading("页面启动中，请稍等...");
            if (callback) {
                callback(rowData);
            } else {
                $state.go(view, { sono: rowData.sONo });
            }
        } else {
            $MessagService.caveat("请选择一条订单数据！");
        }
    }

    $scope.ProcessingOrders = function (sono) {
        /// <summary>处理订单</summary>
        $local.setValue("ORDERCOMP", { dealwith: true });
        $state.go("app.oms.order.dealpage", { sono: sono });
    }

    $scope.Additional = function () {
        /// <summary>追加出库单</summary>
        $scope.GetRowGoPage("app.oms.order.additional");
    }

    $scope.addSurgery = function () {
        /// <summary>添加手术下单</summary>
        $state.go("app.oms.order.single", { sono: "" });
    }

    $scope.editSurgery = function (sono) {
        /// <summary>编辑手术订单</summary>
        $scope.GetRowGoPage("app.oms.order.single");
    }
    $scope.ApprovalSurgery = function (sono) {
        /// <summary>审批手术订单</summary>
        $local.setValue("ORDERCOMP", { approval: true });
        $scope.GetRowGoPage("app.oms.order.view");
    }

    $scope.SignSurgery = function (sono) {
        /// <summary>签收手术订单</summary>
        $local.setValue("ORDERCOMP", { sign: true });
        $scope.GetRowGoPage("app.oms.order.view");
    }

    $scope.DealSurgery = function () {
        /// <summary>处理手术订单</summary>
        $scope.GetRowGoPage(null, function (rowData) {
            if (rowData.status == "SOSTS00060") {//已处理订单的话
                if (rowData.sOHandleBy == userData.userInfo.userId) {
                    $scope.ProcessingOrders(rowData.sONo);
                } else {
                    $MessagService.caveat("当前订单已被" + rowData.sOHandleByName + "处理中！");
                }
            } else {
                $Api.SurgeryService.Process.Receive({ sONo: rowData.sONo, opt: "OPER_PROCESS_RECEIVE" }, function () {
                    $MessagService.loading("订单处理启动中...");
                    setTimeout(function () { $scope.ProcessingOrders(rowData.sONo) }, 1000);
                });
            }
        });
    }

    $scope.ApplyBack = function (sono) {
        /// <summary>申请返库</summary>
        $local.setValue("ORDERCOMP", { apply: true });
        $scope.GetRowGoPage("app.oms.order.addevent");
    }

    $scope.OrderBack = function (sono) {
        /// <summary>订单返库处理</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.oms.order.fback");
    }

    $scope.showViewDetail = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.oms.order.view");
    }
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $state.go("app.oms.order.view", { sono: sono });
    }

    /*页面操作End*/

    /*页面列表Begion*/
    $scope.Pagein = {
        /// <summary>分页配置信息对象</summary>
        pageSize: 10,
        createDateBegin: "",
        createDateEnd: "",
        //Select:new Array(),
        hPCode: "",
        sONo: "",
        dTCode: "",
        oIOrgCode: "",
        status:"",
        pageIndex: 1,
        callbake: function () {
            $scope.Integrated.GetOrderList();
        }
    }
    $scope.SelectInfo = {
        OIorg: {
            dic: new Array(),
            GetOIorgList: function () {
                /// <summary>货主下拉框</summary>
                $Api.OrganizationService.GetCargoOwner({}, function (rData) {
                    $scope.SelectInfo.OIorg.dic = rData;
                    console.log(rData)
                })
            }
        },
        Hosptail: {
            dic: new Array(),
            change: function () {
                $scope.SelectInfo.Doctor.dic = new Array();
                $scope.SelectInfo.Doctor.GetDoctorList();
                $scope.Pagein.dTCode = "";
            },
            GetHosptailList: function () {
                /// <summary>医院下拉框</summary>
                console.log($scope.Integrated.OrderList)
                $Api.ManaHospital.GetqueryAllHospital({}, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData.rows;
                    console.log(rData)
                })
            }
        },
        Doctor: {
            dic: new Array(),
            GetDoctorList: function () {
                /// <summary>医生下拉框</summary>
                $Api.ManaDocter.GetbizDataDoctorList({}, function (rData) {
                    $scope.SelectInfo.Doctor.dic = rData.rows;
                    console.log(rData)
                })
            }
        },
        Status: {
            dic: new Array(),
            GetStatusList: function () {
                /// <summary>医生下拉框</summary>
                $Api.Public.GetDictionary({ dictType: "VLDSTS" }, function (rData) {
                    $scope.SelectInfo.Status.dic = rData;
                    console.log(rData)
                })
            }
        }
    }
    $scope.ButtonList = function () {
        $scope.SelectInfo.OIorg.GetOIorgList();
        $scope.SelectInfo.Hosptail.GetHosptailList();
        $scope.SelectInfo.Doctor.GetDoctorList();
        $scope.SelectInfo.Status.GetStatusList();
    }

    // 查询条件
    //sONo
    //createDateBegin
    //createDateEnd
    //status
    //hPCode
    //dTCode
    //oIOrgCode
    //soType
    //sOCreateByOrgCode
    //patientName
    //sOCreateBy  

    $scope.Integrated = {
        OrderList: new Array(),
        IsQuery: false,
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, {
                createDateBegin: data.StartDay,
                createDateEnd: data.EndDay,
            });

            $scope.Integrated.QueryOrderList();
        },
        QueryCancel:function(){
            $scope.Integrated.IsQuery=!$scope.Integrated.IsQuery;
            $scope.Pagein.createDateBegin=$scope.Pagein.createDateEnd=null;
            $scope.Pagein.hPCode= $scope.Pagein.sONo= $scope.Pagein.dTCode= $scope.Pagein.oIOrgCode= $scope.Pagein.status
        },
        ClearWhere: function (isReload) {
            /// <summary>清空条件</summary>
            $scope.Integrated.IsQuery = false;
            $.extend($scope.Pagein, {
                pageIndex: isReload ? 1 : $scope.Pagein.pageIndex, sONo: "",
                createDateBegin: "", createDateEnd: ""
            });
        },
        Enter: function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.Integrated.QueryOrderList();
            }
        },
        QueryOrderList: function () {
            /// <summary>查询</summary>
            $scope.Pagein.pageIndex = 1;
            if ($scope.Pagein.createDateBegin == "" && $scope.Pagein.createDateEnd=="") {
                $scope.Pagein.createDateBegin = $scope.Pagein.createDateEnd = null;
            }
            console.log($scope.Pagein)
            $scope.Integrated.GetOrderList();
        },
        GetOrderList: function (param) {
            /// <summary>获取我的订单数据列表</summary>
            $MessagService.loading("订单信息获取中，请稍等...");
            $scope.Pagein.total = 0;
            $scope.Integrated.OrderList = new Array();
            var paramData = $.extend($scope.Pagein, {
                sONo:$scope.Pagein.sONo, oIOrgCode:$scope.Pagein.oIOrgCode,
                status:$scope.Pagein.status, hPCode:$scope.Pagein.hPCode,
                dTCode:$scope.Pagein.dTCode
            });
            var GetList = $Api.SurgeryService.DataSources.GetOrderList;
            if (!paramData.opt) {
                GetList = $Api.SurgeryService.DataSources.GetIntegratedOrderInquiry;
            }
            GetList(paramData, function (rData) {
                $scope.Pagein.total = rData.total;
                $scope.Integrated.OrderList = rData.rows;
                console.log($scope.Integrated.OrderList)
            });
            $scope.Pagein.createDateBegin = $scope.Pagein.createDateEnd = "";
        }
    }
    $scope.ButtonList();
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

    /*页面列表End*/

    /*页面权限Begion*/
    $scope.Competence = {
        modify: false,
        submit: false,
        approval: false,
        sign: false,
        dealwith: false,
        apply: false,
        back: false,
        append: false,
    }

    $scope.ListCompetence = {
        /// <summary>列表权限</summary>
        sONo: true, initMedProdLnCodeName: true
    }

    /*页面权限End*/
})
app.controller("IntegratedListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>综合订单查询列表</summary>
    $scope.title = "综合订单查询";
    $scope.Competence = {
    };

    $scope.showViewDetail = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $scope.GetRowGoPage("app.oms.order.view");
    }
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: false, soType: "OPER" });
    $scope.ListCompetence = {
        /// <summary>列表权限</summary>
        initMedProdLnCodeName: false
    }
})
app.controller("AppendListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>待追加备货单列表</summary>
    $scope.title = "可追加备货单列表";
    //条件清空

    $scope.Integrated.GetOrderList({ opt: "OPER_CAN_ADD_ORDER_LIST" });
    $scope.Integrated.ClearWhere(true);
    $scope.Competence = { append: true };
})
app.controller("ApplyListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单返库申请控制器</summary>
    $scope.title = "待返库申请列表";

    $scope.Competence = {
        apply: true
    }
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_WAITBACK_LIST" });
})
app.controller("ApprovalListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>手术订单审批控制器</summary>
    $scope.title = "待审批订单列表";

    $scope.Integrated.GetOrderList({ opt: "OPER_ADUIT_LIST" });

    $scope.Competence = { approval: true };

    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", { approval: true });
        $state.go("app.oms.order.view", { sono: sono });
    }
})
app.controller("BackListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>返库处理控制器</summary>
    $scope.title = "待返库处理列表";
    $scope.Competence = {
        back: true
    };
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_PROCESSBACK_LIST" });
})
app.controller("DealWithListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单处理控制器</summary>
    $scope.title = "待订单处理列表";

    $scope.Competence = {
        dealwith: true
    };
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_PROCESS_LIST" });
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", {});
        $state.go("app.oms.order.view", { sono: sono });
    }

})
app.controller("FeedbackListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>反馈单草稿控制器</summary>
    $scope.title = "反馈处理草稿";
    $scope.Competence = {
        back: true
    };
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_PROCESSBACK_DRAFT" });
})
app.controller("MyDraftListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单草稿数据控制器</summary>
    $scope.title = "我的订单草稿";

    $scope.Competence = {
        modify: true,
        submit: true
    };
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $state.go("app.oms.order.single", { sono: sono });
    }
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_MYORDER_DRAFT" });
})
app.controller("MyOrderListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>我的订单控制器</summary>
    $scope.title = "我的订单";
    $scope.Competence = {
    };
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_MYORDER_LIST" });
})
app.controller("SignListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>签收订单管理控制器</summary>
    $scope.title = "待签收订单列表";

    $scope.Competence = {
        sign: true
    };
    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_SIGN_LIST" });

    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", { sign: true });
        $state.go("app.oms.order.view", { sono: sono });
    }
})