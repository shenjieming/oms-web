/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DptListController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>科室列表</summary>
    $scope.DepartmentList = {
        info: [],
        IsView: false,
        IsEdit: false,
        options: [],
        GetDepartmentList: function () {
            /// <summary>获取科室列表</summary>
            var opt = $.extend( {hPCode:$scope.DepartmentDetail.hPCode} , $scope.Pagein);
            console.log(opt)
            $Api.ManaDepartment.GetbizDataWDList(opt, function (rData) {
                $scope.DepartmentList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData.rows)
                for (var i = 0; i < $scope.DepartmentList.info.length; i++) {
                    if ($scope.DepartmentList.info[i].validStatusName == "无效") {
                        $scope.DepartmentList.info[i].isEnable = true;
                    }
                }
            })
        },
    }
    //按钮服务开启
    $scope.server = {
        SelectList: function () {
            $scope.SelectInfo.contact1Func.getcontact1FuncList();//联系人用途
            $scope.SelectInfo.contact1PMsgType.getcontact1PMsgTypeList(); //通讯工具
            $scope.SelectInfo.contact2Func.getcontact2FuncList();//联系人用途
            $scope.SelectInfo.contact2PMsgType.getcontact2PMsgTypeList();// 通讯工具
            $scope.SelectInfo.Hosptail.getHosptailList();
        },
        QueryOiList: function () {
            /// <summary>查询货主列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1,  wardDeptName: $scope.Service.SearchDptWhere });
            $scope.DepartmentList.GetDepartmentList()
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.server.QueryOiList();
            }
        }
    }
    //按钮服务关闭
    ////  科室编辑页面启动！
    $scope.DepartmentDetail = {
        Info: { hPCodeName: "", hPCode: "",contact2Func:"",contact2PMsgType:"",contact1Func:"",contact2PMsgType:"" },
        checkIs: function () {
            $scope.DepartmentDetail.isvalidStatus = !$scope.DepartmentDetail.isvalidStatus
        }
    }
    // 关闭
    // 按钮开关启动 
    $scope.DepartmentJump = {
        isView: function (isshow) {
            /// <summary>是否显示明细页面</summary>
            $scope.DepartmentList.IsView = isshow;
        },
        isEdit: function (isshow) {
            /// <summary>是否编辑科室</summary>
            $scope.DepartmentList.IsView = false;
            $scope.DepartmentList.IsEdit = isshow;
        },
        Add: function () {
            /// <summary>添加科室</summary>
            //$scope.Detail.PageData = { prodLns: [] };//数据清空
            $scope.DepartmentDetail.Info = new Object();
            $scope.DepartmentJump.isEdit(true);
            $scope.DepartmentDetail.Info.hPCode = $scope.DepartmentDetail.hPCode;
            $scope.server.SelectList();
        },
        Delect: function () {
            /// <summary>删除科室</summary>
            var dptopt = $local.getSelectedRow($scope.DepartmentList.info)
            if (dptopt) {
                $Api.ManaDepartment.GetbizDataWDDisable(dptopt, function (rData) {
                    $MessagService.caveat("科室状态修改成功！")
                    $scope.DepartmentList.GetDepartmentList();
                })
            } else {
                  $MessagService.caveat("请选择一条删除的科室信息！");
            }
        },
        Edit: function () {
            /// <summary>编辑科室</summary>
            var row = $local.getSelectedRow($scope.DepartmentList.info)
            if (row) {
                $scope.DepartmentJump.isEdit(true);
                $Api.ManaDepartment.GetbizDataWDDetail({ wardDeptCode: row.wardDeptCode }, function (rData) {
                    console.log(rData)
                    $scope.DepartmentDetail.Info = rData;
                    if ($scope.DepartmentDetail.Info.validStatusName == "无效") {
                        $scope.DepartmentDetail.Info.isvalidStatus = true;
                    }
                    $scope.server.SelectList();
                })
            } else {
                $MessagService.caveat("请选择一条编辑的科室信息！");
            }
        },
        View: function (row) {
            /// <summary>点击科室详情</summary>
            var row =row?row: $local.getSelectedRow($scope.DepartmentList.info);
            if (row) {
                $scope.DepartmentJump.isView(true);
                $Api.ManaDepartment.GetbizDataWDDetail({ wardDeptCode: row.wardDeptCode }, function (rData) {
                    $scope.DepartmentView.Info = rData;
                })
            } else {
                $MessagService.caveat("请选择一条查看的科室信息！");
            }
        },
        verification: function () {
            var result = true;
            if (!$scope.DepartmentDetail.Info.hPCode) {
                result = false;
                $MessagService.caveat("请维护该医院名称！");
            }
            else if (!$scope.DepartmentDetail.Info.wardDeptName) {
                result = false;
                $MessagService.caveat("请维护该科室名称！");
            }
            else if (!$scope.DepartmentDetail.Info.wardDeptFullName) {
                result = false;
                $MessagService.caveat("请维护该科室全称！");
            }
            return result;
        },
        Save: function () {
            /// <summary>保存科室</summary>
            if ($scope.DepartmentJump.verification()) {
                console.log($scope.DepartmentDetail.Info)
                $Api.ManaDepartment.Save($scope.DepartmentDetail.Info, function (rData) {
                    $MessagService.succ("科室保存成功！");
                    $scope.DepartmentList.GetDepartmentList();
                    $scope.DepartmentJump.isEdit(false);
                });
            }
        }
    }

    ///按钮关闭
    $scope.SelectInfo = {
        Hosptail: {
            getHosptailList: function () {
                /// <summary>获取医院类型</summary>
                $Api.ManaHospital.GetqueryAllHospital({}, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData.rows;
                    console.log(rData)
                })
            }
        },
        contact1Func: {
            dic: new Array(),
            getcontact1FuncList: function () {
                /// <summary>获取第一联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact1Func.dic = rData;
                    console.log(rData)
                })
            },
        },
        contact1PMsgType: {
            dic: new Array(),
            getcontact1PMsgTypeList: function () {
                /// <summary>获取第一联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact1PMsgType.dic = rData;
                    console.log(rData)
                })
            },
        },
        contact2Func: {
            dic: new Array(),
            getcontact2FuncList: function () {
                /// <summary>获取第2联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact2Func.dic = rData;
                })
            },
        },
        contact2PMsgType: {
            dic: new Array(),
            getcontact2PMsgTypeList: function () {
                /// <summary>获取第2联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact2PMsgType.dic = rData;
                })
            },
        },
    }
    $scope.DepartmentView = {
        // 科室详情
        Info: [],
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.DepartmentDetail.hPCode = $stateParams.dptopt;
        console.log($scope.DepartmentDetail.hPCode)
        $scope.DepartmentList.GetDepartmentList();
    }
    $scope.Load();
})