/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("UserDetailController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>用户管理操作</summary>
    $scope.PageInfo = {
        /// <summary>页面信息</summary>
        Load: function (callback) {
            /// <summary>初始化</summary> 
            $scope.accId = $stateParams.accId;
            if ($scope.accId) {
                $scope.PageInfo.GetUserInfo();//用户详细列表
                $scope.SelectInfo.roleType.getOrgcodeList();//编码类型
            };
            if (!$scope.PageInfo.UserInfo.orgTypeName) {
                $scope.PageInfo.UserInfo.orgTypeName = "-";

            };
            if (!$scope.PageInfo.UserInfo.roleName) {
                $scope.PageInfo.UserInfo.roleName = "-";
            }                 
            $scope.SelectInfo.orgType.getList();  //机构类型
            $scope.SelectInfo.userSex.getList();  //用户性别
            $scope.SelectInfo.userEducation.getList();  //用户学历 
            console.log($scope.PageInfo.UserInfo)
        },
        UserInfo: {
            loginName: "", loginPassword: "", loginMobileNo: "", loginEmail: "",
            orgType: "", orgCode: "", dLOdAccess: "", userJobDesc: "", userName: "",
            userIDCard: "", userSex: "", userEducation: "", userDescription: "", userRemark: "",
            userTel: "", userEmail: "", userPMsgType1: "", userPMsgNo1: "", userPMsgDesc1: "",
            userPMsgType2: "", userPMsgNo2: "", userPMsgDesc2: "", roles: [], roleName:"",
        },
        UserInfo: {},
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.PageInfo.UserInfo.loginName ||
                !$scope.PageInfo.UserInfo.userName || !$scope.PageInfo.UserInfo.loginPassword ||
                !$scope.PageInfo.UserInfo.surePassword || !$scope.PageInfo.UserInfo.loginMobileNo ||
                !$scope.PageInfo.UserInfo.loginEmail || !$scope.PageInfo.UserInfo.userJobDesc 
                ) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            else if (($scope.PageInfo.UserInfo.loginPassword != $scope.PageInfo.UserInfo.surePassword)) {
                $MessagService.caveat("请保持两次密码输入一致！");
                result = false;
            } else if (isNaN($scope.PageInfo.UserInfo.loginMobileNo)) {
                $MessagService.caveat("请输入数正确的手机号码！");
                result = false;
            } else if ($scope.addRoleList.dic.length == "0") {
                $MessagService.caveat("请添加该用户角色信息！");
                result = false;
            }
            return result;
        },
        saveUesr: function () {
            /// <summary>保存用户信息</summary>
            console.log($scope.PageInfo.UserInfo)
            console.log($scope.addRoleList.dic)
            if ($scope.PageInfo.verification()) {
                $scope.PageInfo.UserInfo.roles = $scope.addRoleList.dic
                $MessagService.loading("用户信息保存中，请稍等...");
                $Api.UserService.Save($scope.PageInfo.UserInfo, function (rData) {
                    $scope.goView('app.comp.user.list');
                    $MessagService.succ("用户保存成功！");
                });
            }
        },
        GetUserInfo: function () {
            /// <summary>获取用户信息信息</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                    $scope.PageInfo.UserInfo = rData;
                    console.log(rData)
                    $scope.addRoleList.dic = rData.roles;
                    $scope.addRoleList.Detail = $scope.addRoleList.dic;
            })
        },
    }
    // 下拉框模块
    $scope.SelectInfo = {
        /// <summary>选项卡信息</summary>
        orgType: {
            //机构类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>角色类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.orgType.dic.length; i++) {
                    if ($scope.SelectInfo.orgType.dic[i].id == $scope.PageInfo.UserInfo.orgType) {
                        $scope.PageInfo.UserInfo.orgTypeName = $scope.SelectInfo.orgType.dic[i].text;
                        $scope.SelectInfo.roleType.getOrgcodeList()
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取组织类型</summary>
                $Api.UserService.userAddOrgTpye({}, function (rData) {          
                    $scope.SelectInfo.orgType.dic = rData;
                });
            }
        },
            roleType: {
                dic: [],
                change: function (item) {
                    for (var i = 0; i < $scope.SelectInfo.roleType.dic.length; i++) {
                        if ($scope.SelectInfo.roleType.dic[i].type == $scope.PageInfo.UserInfo.roleType) {
                            $scope.PageInfo.UserInfo.roleTypeName = $scope.SelectInfo.roleType.dic[i].text
                            $scope.PageInfo.UserInfo.orgCode = $scope.SelectInfo.roleType.dic[i].id
                        }
                    }
                },
                getOrgcodeList: function (code) {
                    /// <summary>用户机构下拉框</summary>
                    $scope.PageInfo.UserInfo.roleTypeName = "";
                    if ($scope.PageInfo.UserInfo.orgType) {
                        $Api.UserService.userAddOrg({ orgType: $scope.PageInfo.UserInfo.orgType }, function (rData) {
                            console.log(rData)
                            if (!rData.code) {
                                $scope.SelectInfo.roleType.dic = rData;
                                console.log(rData)
                            }
                        })
                    }
                    else {
                        $scope.SelectInfo.roleType.dic = new Array();
                    }
                }
            },
            userSex: {
                //用户性别下拉框
                dic: new Array(),
                change: function (item) {
                    /// <summary>性别修改事件</summary>
                    for (var i = 0; i < $scope.SelectInfo.userSex.dic.length; i++) {
                        if ($scope.SelectInfo.userSex.dic[i].id == $scope.PageInfo.UserInfo.userSex) {
                            $scope.PageInfo.UserInfo.userSexName = $scope.SelectInfo.userSex.dic[i].text;
                            return;
                        }
                    }
                },
                getList: function () {
                    /// <summary>获取性别信息</summary>
                    $Api.Public.GetDictionary({ dictType: "PRNSEX" }, function (rData) {
                        $scope.SelectInfo.userSex.dic = rData;
                    });
                },
            },
            userEducation: {
                //用户学历下拉框
                dic: new Array(),
                change: function (item) {
                    /// <summary>学历修改事件</summary>
                    for (var i = 0; i < $scope.SelectInfo.userEducation.dic.length; i++) {
                        if ($scope.SelectInfo.userEducation.dic[i].id == $scope.PageInfo.UserInfo.userEducation) {
                            $scope.PageInfo.UserInfo.userEducationName = $scope.SelectInfo.userEducation.dic[i].text;
                            return;
                        }
                    }
                },
                getList: function () {
                    /// <summary>获取学历信息</summary>
                    $Api.Public.GetDictionary({ dictType: "PRNEDU" }, function (rData) {
                        $scope.SelectInfo.userEducation.dic = rData;
                    });
                },
            }
        
    }
    $scope.addRoleList = {
        Info:[],
        dic: [],
        Detail:[],
        roles:[],
        show: function () {
            if ($scope.PageInfo.UserInfo.orgTypeName=="-") {
                $MessagService.caveat("请选择机构类型");            
            } else {
                $scope.rolelist()
                $scope.addRoleList.model.show()
            }
        },
        cancel: function () {
            $scope.addRoleList.model.hide();
        },
        Save: function () {
            //去重  
            $scope.$apply(function () {
                var user = true;
                $.each(result, function (row, item) {
                    $.each($scope.addRoleList.Detail, function (index, item) {
                        //item.userID = item.userID ? item.userID : item.userId
                        console.log(result[row].roleId)
                        console.log($scope.addRoleList.Info[index].roleId)
                        if (result[row].roleId == $scope.addRoleList.Detail[index].roleId) {
                            $MessagService.caveat("该成员已存在");
                            result = [];
                            $scope.addRoleList.model.hide();
                            user = false;
                            return true;
                        }
                    })
                    if (user) {
                        $scope.addRoleList.Detail.push(item);
                    }
                })
                result = [];
                $scope.addRoleList.model.hide();
                $scope.addRoleList.dic = $scope.addRoleList.Detail;
                console.log($scope.addRoleList.dic)
            })
        },
        delGroup: function (index) {
            /// <summary>删除组成员</summary>CallResult
            console.log(index)
            $scope.addRoleList.dic.splice(index, 1);
        },
    }
    var result = new Array();
    $scope.CallResult = function (row) {
        /// <summary>用户操作状态控制</summary>
        if (row.isClick) {
            result.push(row);
        } else {
            //不勾选删除
            for (var i = 0; i < result.length; i++) {
                if (row == result[i]) {
                    result.splice(i, 1)
                }
            }
        }
    }
    $scope.addRoleList.model = {
        title: "群组成员", width: 650, height: 300, buttons: {
            "确定": $scope.addRoleList.Save
        }
    }

    $scope.rolelist = function () {
        var paramData = $.extend({ validStatus: "Y", roleName: "", orgType: $scope.PageInfo.UserInfo.orgType }, $scope.Pagein);
        if ($scope.PageInfo.UserInfo.orgType == "PL") {
            paramData = $scope.Pagein;
        }
        $Api.RoleService.GetRoleList({ orgType: $scope.PageInfo.UserInfo.orgType, validStatus: "Y" }, function (rData) {
            $scope.addRoleList.Info = rData.rows;
            console.log(rData)
            $scope.Pagein.total = rData.total;
        });
    }
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
    $scope.PageInfo.Load();
    }
    $scope.Load()
    //显示模块 
});