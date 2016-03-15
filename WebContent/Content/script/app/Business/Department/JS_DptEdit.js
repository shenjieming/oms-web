/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DptEditController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>经销商编辑</summary>
    $scope.DepartmentDetail = {
        Info: { hPCodeName: "", hPCode: "" },
        checkIs: function () {
            $scope.DepartmentDetail.isvalidStatus = !$scope.DepartmentDetail.isvalidStatus
        },
        GetDepartMentDetail: function () {
            $Api.ManaDepartment.GetbizDataWDDetail({ wardDeptCode: $scope.wardDeptCode }, function (rData) {
                console.log(rData)
                $scope.DepartmentDetail.Info = rData;
                if ($scope.DepartmentDetail.Info.validStatusName == "无效") {
                    $scope.DepartmentDetail.Info.isvalidStatus = true;
                }
            })
        },
        verification: function () {
            /// <summary>页面验证</summary>
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
            console.log($scope.DepartmentDetail.Info)
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
    $scope.server = {
        /// <summary>获取下拉框API开发</summary>
        SelectList: function () {
            $scope.SelectInfo.contact1Func.getcontact1FuncList();//联系人用途
            $scope.SelectInfo.contact1PMsgType.getcontact1PMsgTypeList(); //通讯工具
            $scope.SelectInfo.contact2Func.getcontact2FuncList();//联系人用途
            $scope.SelectInfo.contact2PMsgType.getcontact2PMsgTypeList();// 通讯工具
            $scope.SelectInfo.contact3Func.getcontact3FuncList();//联系人用途
            $scope.SelectInfo.contact3PMsgType.getcontact3PMsgTypeList(); //通讯工具
            $scope.SelectInfo.Hosptail.getHosptailList();
        },
        QueryOiList: function () {
            /// <summary>查询货主列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, searchValue: $scope.Service.SearchDptWhere });
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
    $scope.SelectInfo = {
        Department: {
            dic: [],
            change: function (item) {
                /// <summary>科室类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Department.dic.length; i++) {
                    if ($scope.SelectInfo.Department.dic[i].id == $scope.DepartmentDetail.Info.wardDeptCode) {
                        $scope.DepartmentDetail.Info.wardDeptCodeName = $scope.SelectInfo.Department.dic[i].text;
                        console.log($scope.DepartmentDetail.Info.wardDeptCodeName)
                        return;
                    }
                }
            },
        },
        Hosptail: {
            getHosptailList: function () {
                /// <summary>获取医院类型</summary>
                console.log($scope.DepartmentDetail.Info.hPCode)
                $Api.HospitalService.GetHospital({}, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData;
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
        contact3Func: {
            dic: new Array(),
            getcontact3FuncList: function () {
                /// <summary>获取第3联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact3Func.dic = rData;
                })
            },
        },
        contact3PMsgType: {
            dic: new Array(),
            getcontact3PMsgTypeList: function () {
                /// <summary>获取第3联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact3PMsgType.dic = rData;
                })
            },
        },
    }
    $scope.load = function () {
        console.log($stateParams.cc)
        if ($stateParams.cc) {/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
            /// <reference path="../../lib/angular-1.2.20/angular.min.js" />
            /// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
            /// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
            /// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
            /// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
            /// <reference path="../service/system/localService.js" />
            /// <reference path="../Config.js" />

            app.controller("DptListController", function ($scope, $state, $local, $Api, $MessagService) {
                /// <summary>科室列表</summary>
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
                                    $scope.DepartmentList.options = treeNode.options;//获取当前节点的条件
                                } else {
                                    $scope.DepartmentList.options = $scope.Pagein;
                                }
                                $scope.DepartmentList.GetZreeDepartmentList();//数据读取
                            }
                        }
                    },
                    obj: new Object()
                }

                $scope.DepartmentList = {
                    info: [],
                    IsView: false,
                    IsEdit: false,
                    options: [],
                    GetZreeDepartmentList: function () {
                        /// <summary>获取科室列表</summary>
                        console.log($scope.DepartmentList.options)
                        if ($scope.DepartmentList.options.hPCode) {
                            var opt = $.extend($scope.DepartmentList.options, $scope.Pagein);
                        } else {
                            var opt = $.extend({}, $scope.Pagein);
                        }
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
                    UesrInformatin: function () {
                        /// <summary>根据医院查询科室</summary>
                        //后期改成当前用户登录
                        // treeData.push({ id: $scope.User.userInfo.orgCode, name: $scope.User.userInfo.orgName, isParent: true, options: { oIOrgCode: $scope.User.userInfo.orgCode }, Subset: $Api.Public.GetHosptailComboxListByDLHPRel, SubsetType: "oIOrgCode" });
                        $Api.Public.GetOiMedMaterialComboxList({}, function (rData) {
                            var treeData = new Array();
                            for (var i = 0; i < rData.length; i++) {
                                treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.Public.GetHosptailComboxListByDLHPRel, SubsetType: "oIOrgCode" });
                            }
                            $scope.DepartmentList.GetZreeDepartmentList()
                            $scope.tree.data = treeData;
                        })
                    }
                }
                //按钮服务开启
                $scope.server = {
                    List: true,
                    Add: false,
                    Edit: false,
                    View: false,
                    SelectList: function () {
                        $scope.SelectInfo.contact1Func.getcontact1FuncList();//联系人用途
                        $scope.SelectInfo.contact1PMsgType.getcontact1PMsgTypeList(); //通讯工具
                        $scope.SelectInfo.contact2Func.getcontact2FuncList();//联系人用途
                        $scope.SelectInfo.contact2PMsgType.getcontact2PMsgTypeList();// 通讯工具
                        $scope.SelectInfo.contact3Func.getcontact3FuncList();//联系人用途
                        $scope.SelectInfo.contact3PMsgType.getcontact3PMsgTypeList(); //通讯工具
                        $scope.SelectInfo.Hosptail.getHosptailList();
                    },
                    QueryOiList: function () {
                        /// <summary>查询货主列表</summary>
                        $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, searchValue: $scope.Service.SearchDptWhere });
                        $scope.DepartmentList.GetZreeDepartmentList()
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
                    Info: { hPCodeName: "", hPCode: "" },
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
                        console.log($scope.DepartmentList.options)
                        $scope.DepartmentJump.isEdit(true);
                        if ($scope.DepartmentList.options.hPCode) {
                            $scope.DepartmentDetail.Info.hPCode = $scope.DepartmentList.options.hPCode;
                            $scope.DepartmentDetail.Info.hPCodeName = $scope.DepartmentList.options.hPCodeName;
                            if ($scope.DepartmentList.options.wardDeptCode) {
                                $scope.DepartmentDetail.Info.wardDeptCodeName = $scope.DepartmentList.options.wardDeptCodeName;
                            }
                        }

                        $scope.server.SelectList();
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
                                $scope.SelectInfo.Hosptail.getHosptailList();
                                $scope.server.SelectList();
                            })
                        } else {
                            $MessagService.caveat("请选择一条编辑的科室信息！");
                        }
                    },
                    View: function () {
                        /// <summary>点击科室详情</summary>
                        var row = $local.getSelectedRow($scope.DepartmentList.info);
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
                    },
                    Save: function () {
                        /// <summary>保存科室</summary>
                        if ($scope.DepartmentJump.verification()) {
                            console.log($scope.DepartmentDetail.Info)
                            $Api.ManaDepartment.Save($scope.DepartmentDetail.Info, function (rData) {
                                $MessagService.succ("科室保存成功！");
                                $scope.DepartmentList.GetZreeDepartmentList();
                                $scope.DepartmentJump.isEdit(false);
                            });
                        }
                    }
                }

                ///按钮关闭
                $scope.SelectInfo = {
                    Department: {
                        dic: [],
                        change: function (item) {
                            /// <summary>科室类型修改事件</summary>
                            for (var i = 0; i < $scope.SelectInfo.Department.dic.length; i++) {
                                if ($scope.SelectInfo.Department.dic[i].id == $scope.DepartmentDetail.Info.wardDeptCode) {
                                    $scope.DepartmentDetail.Info.wardDeptCodeName = $scope.SelectInfo.Department.dic[i].text;
                                    console.log($scope.DepartmentDetail.Info.wardDeptCodeName)
                                    return;
                                }
                            }
                        },
                    },
                    Hosptail: {
                        getHosptailList: function () {
                            /// <summary>获取医院类型</summary>
                            $Api.HospitalService.GetHospital({}, function (rData) {
                                $scope.SelectInfo.Hosptail.dic = rData;
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
                    contact3Func: {
                        dic: new Array(),
                        getcontact3FuncList: function () {
                            /// <summary>获取第3联系人用途类型</summary>
                            $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                                $scope.SelectInfo.contact3Func.dic = rData;
                            })
                        },
                    },
                    contact3PMsgType: {
                        dic: new Array(),
                        getcontact3PMsgTypeList: function () {
                            /// <summary>获取第3联系人通讯工具<</summary>
                            $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                                $scope.SelectInfo.contact3PMsgType.dic = rData;
                            })
                        },
                    },
                }
                $scope.DepartmentStatus = function (row) {
                    $scope.DepartmentList.info = row ? row : $local.getSelectedRow($scope.DepartmentList.info);
                    $Api.ManaDepartment.SwitchButton($scope.DepartmentList.info, function (rData) {
                        $MessagService.caveat("科室状态修改成功！")
                        $scope.DepartmentList.GetZreeDepartmentList();
                    })

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
                    $scope.DepartmentList.UesrInformatin();
                }
                $scope.Load();
            })
            $scope.wardDeptCode = $stateParams.wardDeptCode
            $scope.DepartmentDetail.GetDepartMentDetail();
        }
        $scope.server.SelectList();
    },
     $scope.load();
})