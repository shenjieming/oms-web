/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DtrListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>医生列表</summary>
    $scope.DoctorList = {
        info: [],
        IsView: false,
        IsEdit: false,
        GetDoctorList: function () {
            /// <summary>获取医生列表</summary>
            var opt = $.extend({}, $scope.Pagein);
            $Api.ManaDocter.GetbizDataDoctorList(opt, function (rData) {
                console.log(rData)
                $scope.DoctorList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        },
    }

    $scope.server = {
        //服务层开启
        SelectInfo: function () {
            /// <summary>下拉框接口集合</summary>
            $scope.SelectInfo.Hosptail.getHosptailList();
        },
        SelectButton: function () {
            $scope.SelectButton.Hosptail.getHosptailList();
        },
    }
    // 按钮开关启动 
    $scope.DoctorJump = {
        isView: function (isshow) {
            /// <summary>是否显示明细页面</summary>
            $scope.DoctorList.IsView = isshow;
        },
        isEdit: function (isshow) {
            /// <summary>是否编辑医生</summary>
            $scope.DoctorList.IsView = false;
            $scope.DoctorList.IsEdit = isshow;
        },
        Delect: function () {
            var row = row ? row : $local.getSelectedRow($scope.DoctorList.info)
            if (row) {
                if (confirm("您确认要删除当前医生吗?")) {
                    $Api.ManaDocter.GetbizDataDoctorDisable({ dTCode: row.dTCode }, function () {
                        $MessagService.succ("该医生删除成功！");
                        $scope.DoctorList.GetDoctorList();
                    })
                } 
            } else {
                $MessagService.caveat("请选择一条删除的医生信息！");
            }
        },
        Add: function () {
            /// <summary>添加医生</summary>
            $scope.DoctorDetail.Info = new Object(); // 数据清空
            $scope.DoctorDetail.Info.isLocal = "LOCAL";
            if ($scope.DoctorDetail.Info.isLocal = "LOCAL") {
                $scope.DoctorDetail.Info.isLocalCheck = true;
            } else {
                $scope.DoctorDetail.Info.isLocalCheck = false;
            };
            $scope.DoctorJump.isEdit(true);
            $scope.server.SelectInfo();

        },
        Edit: function () {
            /// <summary>编辑医生</summary>
            var row = $scope.getSelectedRow()
            if (row) {
                $scope.DoctorJump.isEdit(true);
                $Api.ManaDocter.GetbizDataDoctorDetail(row, function (rData) {
                    $scope.DoctorDetail.Info = rData;
                    $scope.server.SelectInfo();//下拉框开启
                    if ($scope.DoctorDetail.Info.isLocal == "LOCAL") {
                        $scope.DoctorDetail.Info.isLocalCheck = true;
                    } else {
                        $scope.DoctorDetail.Info.isLocalCheck = false;
                    }
                })
                $scope.SelectInfo.Department.getDepartmentList();
            } else {
                $MessagService.caveat("请选择一条编辑的医生信息！");
            }
        },
        View: function (row) {
            /// <summary>点击医生详情</summary>
            var row =row?row: $local.getSelectedRow($scope.DoctorList.info);
            if (row) {
                $scope.DoctorJump.isView(true);
                $Api.ManaDocter.GetbizDataDoctorDetail(row, function (rData) {
                    $scope.DoctorView.Info = rData;
                })
            } else {
                $MessagService.caveat("请选择一条查看的医生信息！");
            }
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.DoctorDetail.Info.dTName) {
                $MessagService.caveat("请维护该医生名称！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.hPCode) {
                $MessagService.caveat("请维护该医生所在医院！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.wardDeptCode) {
                $MessagService.caveat("请维护该医生所在科室！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.dTIDCard) {
                $MessagService.caveat("请维护该医生工作编号！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.wardDeptCode) {
                $MessagService.caveat("请维护该医生科室名称！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.dTGrade) {
                $MessagService.caveat("请维护该医生级别！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.dTSex) {
                $MessagService.caveat("请维护该医生性别！");
                result = false;
            }
            else if (!$scope.DoctorDetail.Info.dTEducation) {
                $MessagService.caveat("请维护该医生学历！");
                result = false;
            }
            return result;
        },

        Save: function () {
            /// <summary>保存医生</summary>
            if ($scope.DoctorDetail.Info.isLocalCheck) {
                $scope.DoctorDetail.Info.isLocal = "LOCAL"
            } else {
                $scope.DoctorDetail.Info.isLocal = "UNLOCAL"
            }
            console.log($scope.DoctorDetail.Info)
            $Api.ManaDocter.Save($scope.DoctorDetail.Info, function (rData) {
                $MessagService.succ("医生保存成功！");
                $scope.DoctorList.GetDoctorList();
                $scope.DoctorJump.isEdit(false);
            });
        },
        QueryOiList: function () {
            /// <summary>查询医生列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, hPCode: $scope.DoctorJump.SearchWhere });
            $scope.DoctorList.GetDoctorList();

        },
        SelectHostptail: function () {
            /// <summary>医院查询框</summary> 
            //后期调整 searchValue:""
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, hPCode: $scope.DoctorList.hPCode });
            $scope.DoctorList.wardDeptCode = "";
            $scope.SelectButton.Department.getDepartmentList();
            $scope.DoctorList.GetDoctorList();
        },
        SelectDepartment: function () {
            /// <summary>科室查询框</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, wardDeptCode: $scope.DoctorList.wardDeptCode });
            $scope.DoctorList.GetDoctorList();
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.DoctorJump.QueryOiList();
            }
        }
    }
    $scope.DoctorDetail = {
        //医生编辑页面
        Info: [],
    };
    $scope.DoctorView = {
        //医生编辑页面
        Info: [],
    };
    $scope.SelectInfo = {
        Hosptail: {
            dic: new Array(),
            change: function () {
                $scope.DoctorDetail.Info.wardDeptCode = "";
                $scope.SelectInfo.Department.getDepartmentList();
            },
            getHosptailList: function () {
                /// <summary>获取医院列表</summary>
                $Api.ManaHospital.GetqueryAllHospital({}, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData.rows;
                    console.log(rData)
                })
            }
        },
        Department: {
            dic: [],
            getDepartmentList: function () {
                /// <summary>获取科室列表</summary>
                if ($scope.DoctorDetail.Info.hPCode) {
                    $Api.ManaDepartment.GetbizDataWDList({ hPCode: $scope.DoctorDetail.Info.hPCode }, function (rData) {
                        $scope.SelectInfo.Department.dic = rData.rows;
                        console.log(rData)
                    });
                }
            }
        },
    }
    $scope.buttonList = {
        isLocal: function () {
            /// <summary>医生归属开关</summary>
            $scope.DoctorDetail.Info.isLocalCheck = !$scope.DoctorDetail.Info.isLocalCheck;
        },
        validStatus: function () {
            /// <summary>医生状态开关</summary>
            $scope.DoctorDetail.Info.isvalidStatus = !$scope.DoctorDetail.Info.isvalidStatus;
        }
    }
    $scope.DoctorStatus = function (row) {
        $scope.DoctorList.info = row ? row : $scope.getSelectedRow();
        $Api.ManaDocter.SwitchButton($scope.DoctorList.info, function (rData) {
            $MessagService.caveat("科室状态修改成功！")
            $scope.DoctorList.GetDoctorList();
        })

    }

    $scope.SelectButton = {
        /// <summary>选择条件框</summary
        Hosptail: {
            dic: new Array(),
            getHosptailList: function () {
                /// <summary>获取医院列表</summary>
                $Api.ManaHospital.GetqueryAllHospital({}, function (rData) {
                    $scope.SelectButton.Hosptail.dic = rData.rows;
                    console.log(rData)
                })
            }
        },
        Department: {
            dic: new Array(),
            getDepartmentList: function () {
                /// <summary>获取科室列表</summary>
                if ($scope.DoctorList.hPCode) {
                    $Api.ManaDepartment.GetbizDataWDList({ hPCode: $scope.DoctorList.wardDeptCode }, function (rData) {
                        $scope.SelectButton.Department.dic = rData.rows;
                        console.log(rData)
                    })
                }
            }
        }
    }

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DoctorList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
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
        $scope.DoctorList.GetDoctorList();
        $scope.server.SelectButton();
    }
    $scope.Load();
})



