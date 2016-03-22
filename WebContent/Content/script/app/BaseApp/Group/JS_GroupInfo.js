/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("GroupListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>群组信息管理器</summary> 
    $scope.GroupList = new Array();
    $scope.GroupInfo = {
        /// <summary>群组列表信息</summary>
        GroupName: [],
        GroupnameDesc: [],
        GetMember: [],
        GroupList: { teamCode: "", dLOrgCode: "" },//用户列表数据
        GroupUserList: new Array(),//组成员数据
        GruopUserDetail: new Array(),//选取组成员信息数据
        GetGroupList: function () {
            /// <summary>获取群组列表信息</summary>
            var paramData = $.extend({ validStatus: "Y", teamName: "", teamUserName: "" }, $scope.Pagein);
            $Api.GruopService.GetGroupList(paramData, function (rData) {
                $scope.Pagein.total = rData.total;
                $scope.GroupList = rData.rows;
                console.log(rData.rows)
            });
        },
        GetUserName: function () {
            /// <summary>获取组成员姓名</summary>
            $Api.UserService.GetUserList($scope.Pagein, function (rData) {
                $scope.GroupInfo.GroupUserList = rData.rows;
                console.log(rData.rows)
                $scope.Pagein.total = rData.total;
            });
        },
        GetGroupDetail: function () {
            /// <summary>获取群组列表详情</summary>
            console.log($scope.GroupView.Info)
            $Api.GruopService.GetGroupDetail({ teamCode: $scope.GroupView.Info.teamCode }, function (rData) {
                $scope.GroupView.Info = rData;
                console.log(rData)
                //显示编辑组成员信息
                $scope.GroupInfo.GroupName = [];
                $scope.GroupInfo.GroupnameDesc = [];
                $scope.GroupInfo.GetMember = [];
                for (var i = 0; i < rData.member.length; i++) {
                    $scope.GroupInfo.GroupName.push(rData.member[i].userName)
                    $scope.GroupInfo.GetMember.push({ userID: rData.member[i].userId, teamMemberDesc: rData.member[i].teamMemberDesc })
                    if (rData.member[i].teamMemberDesc) {
                        $scope.GroupInfo.GroupnameDesc.push(rData.member[i].teamMemberDesc)
                    }
                }
                console.log($scope.GroupInfo.GetMember)
                console.log(rData)
            });
        },
        GetUserDesc: function () {
            /// <summary>获取组成员详情</summary>
            console.log($scope.select.dic.loginAccountId)
            if ($scope.select.dic.loginAccountId) {
                $Api.UserService.GetUserInfo({ loginAccountId: $scope.select.dic.loginAccountId }, function (rData) {
                    $scope.GroupInfo.GruopUserDetail = rData;
                    $scope.GroupInfo.GroupList.dLOrgCode = rData.orgCode;
                    console.log(rData)
                });

            }
            else { $MessagService.caveat("请选择一条操作数据！"); }
        },
        verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.GroupInfo.GroupList.teamName || !$scope.GroupInfo.GroupList.member) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            return result;
        },
        saveGroup: function () {
            /// <summary>保存用户组信息</summary>  
            if ($scope.GroupInfo.verification()) {
                //$MessagService.loading("群组信息保存中，请稍等...");
                $Api.GruopService.Save($scope.GroupInfo.GroupList, function (rData) {
                    $scope.GroupDetail.hide();
                    $scope.GroupInfo.GetGroupList();
                    $MessagService.succ("群组信息保存成功！")
                });
            }
        },
        showGroup: function (rowData) {
            /// <summary>新增用户组信息</summary>
            $scope.GroupInfo.GetUserName();//用户组成员姓名
            //$scope.GroupInfo.GetUserDesc();//用户详情描述
            $scope.GroupInfo.GroupList = rowData;
            $scope.select.nameDetail = new Array;
            $scope.select.nameList = new Array;
            $scope.select.namedesc = new Array;
            $scope.GroupDetail.show();

        },
        showEditGroup: function () {
            /// <summary>编辑用户组信息</summary>
            var rowData = $scope.getSelectedRow();
            $scope.GroupView.Info.teamCode = rowData.teamCode;

            $scope.GroupInfo.GetGroupDetail();
            rowData.userName = $scope.GroupInfo.GroupName;
            rowData.nameDesc = $scope.GroupInfo.GroupnameDesc;
            rowData.member = $scope.GroupInfo.GetMember;
            console.log(rowData)
            if (rowData) {
                $scope.GroupInfo.showGroup(rowData);
            } else {
                $MessagService.caveat("请选择一条操作数据！");
            }
        },
        cancel: function () {
            /// <summary>取消</summary>
            $scope.GroupDetail.hide();
        }
    }
    //组成员详情
    $scope.GroupView = {
        Info: {},
        nameList: [],  // 群组成员
        desc: [],   //群组描述
        showRole: function (row) {
            /// <summary>显示选择的角色信息</summary>      
            $scope.GroupView.Info = row ? row : $scope.getSelectedRow();
            if ($scope.GroupView.Info) {
                $scope.GroupView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
            //显示组成员姓名，描述信息
            $scope.GroupInfo.GetGroupDetail();
            $scope.GroupView.nameList = [];
            $scope.GroupView.desc = [];
            for (var i = 0; i < $scope.GroupView.Info.member.length; i++) {
                $scope.GroupView.nameList.push($scope.GroupView.Info.member[i].userName)
                if ($scope.GroupView.Info.member[i].teamMemberDesc) {
                    $scope.GroupView.desc.push($scope.GroupView.Info.member[i].teamMemberDesc)
                }
            }
            console.log($scope.GroupView.desc)
            return;
        },
        cancel: function () {
            /// <summary>隐藏dialog</summary>
            $scope.GroupView.model.hide();
        }
    },
    $scope.GroupView.model = { title: "群组详情", width: 500, height: 300, buttons: { "确定": $scope.GroupView.cancel } }
    $scope.GroupDetail = { title: "群组信息", width: 650, height: 550, buttons: { "保存": $scope.GroupInfo.saveGroup, "取消": $scope.GroupInfo.cancel } }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary> 
        var result = false;
        $.each($scope.GroupList, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        })
        return result;
    }
    $scope.getSelectedRowName = function () {
        /// <summary>获取组成员选择的行</summary> 
        var result = false;
        $.each($scope.GroupInfo.GroupUserList, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    //  组成员选择
    $scope.select = {
        dic: [],
        nameDetail: [], //组成员Id
        nameList: [],  //组成员姓名
        namedesc: [],  //组成员描述
        doc: [],
        addNameList: function () {
            /// <summary>新增成员</summary>
            $scope.select.dic = $scope.getSelectedRowName();
            $scope.GroupInfo.GetUserDesc();

            if ($scope.GroupInfo.GroupList.member) {
                $scope.select.nameDetail = $scope.GroupInfo.GroupList.member;
                $scope.select.nameList = $scope.GroupInfo.GroupList.userName;
                $scope.select.namedesc = $scope.GroupInfo.GroupList.nameDesc;
            }
            //选择群组成员信息
            if ($scope.select.dic) {
                $scope.select.namedesc.push($scope.GroupInfo.GruopUserDetail.userJobDesc)
                $scope.select.nameList.push($scope.GroupInfo.GruopUserDetail.userName)
                $scope.select.nameDetail.push({ userID: $scope.GroupInfo.GruopUserDetail.userId, teamMemberDesc: $scope.GroupInfo.GruopUserDetail.userJobDesc })
                $scope.GroupInfo.GroupList.member = $scope.select.nameDetail;
                $scope.GroupInfo.GroupList.userName = $scope.select.nameList;
                $scope.GroupInfo.GroupList.nameDesc = $scope.select.namedesc;
                $scope.GroupInfo.GroupList.teamCode = "";
                return
            } else {
                $MessagService.caveat("请选择一条新增数据！");
            }
        },
        deletNameList: function () {
            /// <summary>删除成员</summary>
            $scope.select.dic = $scope.getSelectedRowName();
            console.log($scope.select.dic)
            $scope.select.nameDetail = $scope.GroupInfo.GroupList.member;
            $scope.select.nameList = $scope.GroupInfo.GroupList.userName;
            $scope.select.namedesc = $scope.GroupInfo.GroupList.nameDesc;
            if ($scope.select.dic) {
                for (var i = 0; i < $scope.select.nameList.length; i++) {
                    if ($scope.select.dic.userName == $scope.select.nameList[i]) {
                        $scope.select.nameList.splice(i, 1)
                        $scope.select.namedesc.splice(i, 1)
                        $scope.select.nameDetail.splice(i, 1)
                        console.log(i)
                    }
                }
            }
            else { $MessagService.caveat("请选择一条删除数据！"); }
            $scope.GroupInfo.GroupList.member = $scope.select.nameDetail;
            $scope.GroupInfo.GroupList.userName = $scope.select.nameList;
            $scope.GroupInfo.GroupList.nameDesc = $scope.select.namedesc;
            console.log($scope.GroupInfo.GroupList)
        },
    }

    $scope.GroupDetailPage = {
        //新增
        add: function () {
            $state.go("app.base.comp.group.detail");
        },
        //编辑
        eduit: function () {
            var teamCodeId = $scope.getSelectedRow();
            if (teamCodeId) {
                $state.go("app.base.comp.group.detail", { teamCodeId: teamCodeId.teamCode });
            } else {
                $MessagService.caveat("请选择一条成员数据！")
            }
         
        }
    }
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        //启动群组列表
        $scope.GroupInfo.GetGroupList(); //用户组列表
        $scope.GroupInfo.GetUserName();
    }
    $scope.Load()
})