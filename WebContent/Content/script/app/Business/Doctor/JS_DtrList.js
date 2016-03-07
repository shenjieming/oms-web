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
    $scope.tree = {
        setting: {
            callback: {
                beforeExpand: true,
                onExpand: function (event, treeId, treeNode) {
                    /// <summary>tree查询子节点</summary>
                    if (!treeNode.reNode) {
                        treeNode.reNode = true;
                        treeNode.Subset(treeNode.options, function (rData) {
                            /// <summary>子集数据查询</summary>
                            var nodeList = new Array();
                            for (var i = 0; i < rData.length; i++) {
                                var node = {
                                    id: rData[i].id, name: rData[i].text
                                };
                                if (treeNode.SubsetType == "oIOrgCode") {//根据条件参数控制子集的条件参数
                                    node.SubsetType = "hPCode";
                                    node.isParent = true;
                                    node.Subset = $Api.HospitalService.GetSections;
                                    node.options = { hPCode: rData[i].id, hPCodeName: rData[i].text };
                                } else {
                                    node.options = { hPCode: treeNode.options.hPCode, wardDeptCode: rData[i].id, hPCodeName: treeNode.options.hPCodeName, wardDeptCodeName: rData[i].text };
                                }
                                nodeList.push(node);
                            }
                            $scope.tree.obj.addNodes(treeNode, nodeList);
                        });
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary>
                    $scope.Pagein.pageIndex = 1;//当前数据分页从第一页开始
                    if (treeNode.SubsetType != "oIOrgCode") {
                        $scope.DoctorList.options = treeNode.options;//获取当前节点的条件
                        $scope.DoctorList.GetZreeDoctorList();//数据读取
                        $scope.server.Add = true;
                        $scope.server.Edit = true;
                        $scope.server.View = true;
                    } else {
                        $scope.server.List = false;
                        $scope.server.Add = false;
                        $scope.server.Edit = false;
                        $scope.server.View = false;
                        $scope.DoctorList.options = [];
                    }
                }
            }
        },
        obj: new Object()
    }



    $scope.DoctorList = {
        Info: [],
        IsView: false,
        IsEdit: false,
        options: [],
        GetZreeDoctorList: function () {
            /// <summary>获取医生列表</summary>
            console.log($scope.DoctorList.options)
            var opt = $.extend($scope.DoctorList.options, $scope.Pagein);
            $Api.ManaDocter.GetbizDataDoctorList(opt, function (rData) {
                $scope.DoctorList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                $scope.server.List = true;
                console.log(rData)
                for (var i = 0; i < $scope.DoctorList.info.length; i++) {
                    if ($scope.DoctorList.info[i].validStatusName=="无效") {
                        $scope.DoctorList.info[i].isEnable = true;
                    }
                }
            })
        },
        GetHosptailList: function () {
            /// <summary>根据医院查询医生</summary>
            $Api.Public.GetOiMedMaterialComboxList({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.Public.GetHosptailComboxListByDLHPRel, SubsetType: "oIOrgCode" });
                }
                $scope.tree.data = treeData;
            })
        }
    }

    $scope.server = {
        //服务层开启
        List: true,  // 医生列表开关
        SelectInfo: function () {
            /// <summary>下拉框接口集合</summary>
            $scope.SelectInfo.dTGrade.getdTGradeList();
            $scope.SelectInfo.dTEducation.getdTEducationList();
            $scope.SelectInfo.dTSex.getdTSexList();
            $scope.SelectInfo.Department.getDepartmentList();
        },
        Add: false,
        Edit: false,
        View: false,
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
        Add: function () {
            /// <summary>添加医生</summary>
            $scope.DoctorDetail.Info = new Object(); // 数据清空
            $scope.DoctorDetail.Info.isLocal = "LOCAL";
            if ($scope.DoctorDetail.Info.isLocal = "LOCAL") {
                $scope.DoctorDetail.Info.isLocalCheck = true;
            } else {
                $scope.DoctorDetail.Info.isLocalCheck = false;
            }
            console.log($scope.DoctorList.options)
            if ($scope.DoctorList.options.hPCode) {
                $scope.DoctorJump.isEdit(true);
                $scope.DoctorDetail.Info.hPCode = $scope.DoctorList.options.hPCode;
                $scope.DoctorDetail.Info.hPCodeName = $scope.DoctorList.options.hPCodeName;
                if ($scope.DoctorList.options.wardDeptCode) {
                    $scope.DoctorDetail.Info.wardDeptCode = $scope.DoctorList.options.wardDeptCode;
                    $scope.DoctorDetail.Info.wardDeptCodeName = $scope.DoctorList.options.wardDeptCodeName;
                }
                $scope.server.SelectInfo();//下拉框开启
            } else {
                $MessagService.caveat("请选择一个医院！");
            }
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
            } else {
                $MessagService.caveat("请选择一条编辑的医生信息！");
            }
        },
        View: function () {
            /// <summary>点击医生详情</summary>
            var row = $local.getSelectedRow($scope.DoctorList.info);
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
                $scope.DoctorList.GetZreeDoctorList();
                $scope.DoctorJump.isEdit(false);
            });
        }
    }
    $scope.DoctorDetail = {
        //医生编辑页面
        Info: [],
    };
    $scope.DoctorView = {
        //医生编辑页面
        Info:[],
    };
    //// 下拉框开启
    $scope.SelectInfo = {     
        Department: {
            //科室级别
            dic: [],
            change: function (item) {
                /// <summary>科室级别修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Department.dic.length; i++) {
                    if ($scope.SelectInfo.Department.dic[i].id == $scope.DoctorDetail.Info.wardDeptCode) {
                        $scope.DoctorDetail.Info.wardDeptCodeName = $scope.SelectInfo.Department.dic[i].text;
                        return;
                    }
                }
            },
            getDepartmentList: function () {
                /// <summary>获取科室列表</summary>
                $Api.HospitalService.GetSections({ hPCode: $scope.DoctorDetail.Info.hPCode }, function (rData) {
                    $scope.SelectInfo.Department.dic = rData;
                    console.log(rData)
                });
            }
        },
        dTGrade: {
            //医生级别
            dic: [],
            change: function (item) {
                /// <summary>医生级别修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.dTGrade.dic.length; i++) {
                    if ($scope.SelectInfo.dTGrade.dic[i].id == $scope.DoctorDetail.Info.dTGrade) {
                        $scope.DoctorDetail.Info.dTGradeName = $scope.SelectInfo.dTGrade.dic[i].text;
                        return;
                    }
                }
            },
            getdTGradeList: function () {
                /// <summary>获取医生级别</summary>
                $Api.Public.GetDictionary({ dictType: "PLDTGD" }, function (rData) {
                    $scope.SelectInfo.dTGrade.dic = rData;
                });
            }
        },
        dTEducation: {
            //医生学历
            dic: [],
            change: function (item) {
                /// <summary>医生学历修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.dTGrade.dic.length; i++) {
                    if ($scope.SelectInfo.dTGrade.dic[i].id == $scope.DoctorDetail.Info.dTEducation) {
                        $scope.DoctorDetail.Info.dTEducationName = $scope.SelectInfo.dTGrade.dic[i].text;
                        return;
                    }
                }
            },
            getdTEducationList: function () {
                /// <summary>获取医生学历</summary>
                $Api.Public.GetDictionary({ dictType: "PRNEDU" }, function (rData) {
                    $scope.SelectInfo.dTEducation.dic = rData;
                });
            }
        },
        dTSex: {
            //医生性别
            dic: [],
            change: function (item) {
                /// <summary>医生学历修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.dTSex.dic.length; i++) {
                    if ($scope.SelectInfo.dTSex.dic[i].id == $scope.DoctorDetail.Info.dTSex) {
                        $scope.DoctorDetail.Info.dTSexName = $scope.SelectInfo.dTSex.dic[i].text;
                        return;
                    }
                }
            },
            getdTSexList: function () {
                /// <summary>获取医生学历</summary>
                $Api.Public.GetDictionary({ dictType: "PRNSEX" }, function (rData) {
                    $scope.SelectInfo.dTSex.dic = rData;
                });
            }
        },
    }
    //下拉框关闭
    /// 按钮开关开启：
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
    //按钮开关关闭
    //修改医生状态开启
    $scope.DoctorStatus = function (row) {
        $scope.DoctorList.info = row ? row : $scope.getSelectedRow();
        $Api.ManaDocter.SwitchButton($scope.DoctorList.info, function (rData) {
            $MessagService.caveat("科室状态修改成功！")
            $scope.DoctorList.GetZreeDoctorList();
        })

    }
    //修改医生状态关闭
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
        $scope.DoctorList.GetHosptailList();
    }
    $scope.Load();
})




////hPCode 医院编码，必须
 
////wardDeptCode 科室编码 必须
 
////dTName 医生姓名 必须
 
//dTType
 
//dTGrade
 
//isLocal
 
//dTOperationPreferenceDesc
 
//dTRealName
 
//dTIDCard
 
////////////////dTSex
 
////////////////dTEducation
 
//dTDescription
//dTRemark
 
//dTMobile
 
//dTTel
 
//dTEmail
 
//dTAddress
 
////dTPMsgType1
 
////dTPMsgNo1
 
////dTPMsgDesc1
 
////dTPMsgType2
 
////dTPMsgNo2
 
//dTPMsgDesc2
 