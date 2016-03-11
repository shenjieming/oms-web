/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
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
                        $scope.DepartmentList.GetZreeDepartmentList();//数据读取
                        $scope.server.Add = true;
                        $scope.server.Edit = true;
                        $scope.server.View = true;
                    } else {
                        $scope.DepartmentList.options = [];
                        $scope.server.Add = false;
                        $scope.server.Edit = false;
                        $scope.server.View = false;
                    }
                }
            }
        },
        obj: new Object()
    }


    $scope.DepartmentList = {
        info: [],
        IsView: false,
        IsEdit: false,
        options:[],
        GetZreeDepartmentList: function () {
            /// <summary>获取科室列表</summary>
            var opt = $.extend($scope.DepartmentList.options, $scope.Pagein);
            $Api.ManaDepartment.GetbizDataWDList(opt, function (rData) {
                $scope.DepartmentList.info = rData.rows;
                $scope.server.List = true;
                $scope.Pagein.total = rData.total;
                for (var i = 0; i < $scope.DepartmentList.info.length; i++) {
                    if ($scope.DepartmentList.info[i].validStatusName == "无效") {
                        $scope.DepartmentList.info[i].isEnable = true;
                    }
                }
            })
        },
        GetHosptailList: function () {
            /// <summary>根据医院查询科室</summary>
            $Api.Public.GetOiMedMaterialComboxList({}, function (rData) {
                var treeData = new Array();
                for (var i = 0; i < rData.length; i++) {
                    treeData.push({ id: rData[i].id, name: rData[i].text, isParent: true, options: { oIOrgCode: rData[i].id }, Subset: $Api.Public.GetHosptailComboxListByDLHPRel, SubsetType: "oIOrgCode" });
                }
                $scope.tree.data = treeData;
            })
        }
    }
    //按钮服务开启
    $scope.server = {
        List: true,
        Add: false,
        Edit: false,
        View:false,
    }
    //按钮服务关闭
    ////  科室编辑页面启动！
    $scope.DepartmentDetail = {
        Info: { hPCodeName: "", hPCode: ""},
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
            if ($scope.DepartmentList.options.hPCode) {
                $scope.DepartmentJump.isEdit(true);
                $scope.DepartmentDetail.Info.hPCode = $scope.DepartmentList.options.hPCode;
                $scope.DepartmentDetail.Info.hPCodeName = $scope.DepartmentList.options.hPCodeName;
                if ($scope.DepartmentList.options.wardDeptCode) {
                    $scope.DepartmentDetail.Info.wardDeptCodeName = $scope.DepartmentList.options.wardDeptCodeName;
                } else {
                    $scope.SelectInfo.Department.getDepartmentList();
                }
            } else {
                $MessagService.caveat("请选择医院！");
            }
        },
        Edit: function () {
            /// <summary>编辑科室</summary>
            var row = $scope.getSelectedRow()
            if (row) {
                $scope.DepartmentJump.isEdit(true);
                $Api.ManaDepartment.GetbizDataWDDetail({ wardDeptCode: row.wardDeptCode }, function (rData) {
                    console.log(rData)
                    $scope.DepartmentDetail.Info = rData;
                    if ($scope.DepartmentDetail.Info.validStatusName == "无效") {
                        $scope.DepartmentDetail.Info.isvalidStatus = true;
                    } 
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
        Save: function () {
            /// <summary>保存科室</summary>
            if ($scope.DepartmentDetail.Info.wardDeptName) {
                console.log($scope.DepartmentDetail.Info)
                $Api.ManaDepartment.Save($scope.DepartmentDetail.Info, function (rData) {
                    $MessagService.succ("科室保存成功！");
                    $scope.DepartmentList.GetZreeDepartmentList();
                    $scope.DepartmentJump.isEdit(false);
                });
            } else {
                $MessagService.caveat("请输入科室名称！");
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
                    if ($scope.SelectInfo.Department.dic[i].id == $scope.DepartmentDetail.Info.wardDeptcheckCode) {
                        $scope.DepartmentDetail.Info.wardDeptCodeName = $scope.SelectInfo.Department.dic[i].text;
                        console.log($scope.DepartmentDetail.Info.wardDeptCodeName)
                        return;
                    }
                }
            },
            getDepartmentList: function () {
                /// <summary>获取科室类型</summary>
                $Api.HospitalService.GetSections({ hPCode: $scope.DepartmentDetail.Info.hPCode }, function (rData) {
                        $scope.SelectInfo.Department.dic = rData;
                        console.log(rData)
                });
            }
        }
    }
    $scope.DepartmentStatus = function (row) {
        $scope.DepartmentList.info = row ? row : $scope.getSelectedRow();
        $Api.ManaDepartment.SwitchButton($scope.DepartmentList.info, function (rData) {
            $MessagService.caveat("科室状态修改成功！")
            $scope.DepartmentList.GetZreeDepartmentList();
        })

    }

    $scope.DepartmentView = {
        // 科室详情
        Info:[],
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DepartmentList.info, function (index, item) {
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
        $scope.DepartmentList.GetHosptailList();
    }
    $scope.Load();
})