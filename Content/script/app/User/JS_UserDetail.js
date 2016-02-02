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
    $scope.addRoleList = [];//角色列表
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
            }
            return result;
        },
        saveUesr: function () {
            /// <summary>保存用户信息</summary>
            console.log($scope.PageInfo.UserInfo)
            if ($scope.PageInfo.verification()) {
                $MessagService.loading("用户信息保存中，请稍等...");
                $Api.UserService.Save($scope.PageInfo.UserInfo, function (rData) {
                    self.location = 'index.html#/app/comp/user/list';
                    $MessagService.succ("用户保存成功！");
                });
            }
        },
        GetUserInfo: function () {
            /// <summary>获取用户信息信息</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                if (!rData.code) {
                    $scope.PageInfo.UserInfo = rData;
                    for (var i = 0; i < rData.roles.length; i++) {
                        $scope.RolePage.name.push(rData.roles[i].roleName)
                    }
                    $scope.PageInfo.UserInfo.roleName = $scope.RolePage.name;
                    console.log(rData)
                }
            })
        },
        GetRoleList: function () {
            /// <summary>获取用户角色列表</summary
            //var paramData = $.extend({ orgType: $scope.PageInfo.UserInfo.orgType, validStatus: "Y" })
            $Api.UserService.userAddRole({ orgType: $scope.PageInfo.UserInfo.orgType }, function (rData) {
                $scope.addRoleList = rData;
            });
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
                        console.log()
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取组织类型</summary>
                $Api.UserService.userAddOrgTpye({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.orgType.dic = rData;
                    };
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
    $scope.RolePage = {
        dic:[],
        name: [],
        roles:[],
        show: function () {
            if ($scope.PageInfo.UserInfo.orgTypeName=="-") {
                $MessagService.caveat("请选择机构类型");            
            } else {
                $scope.PageInfo.GetRoleList()
                $scope.RolePageView.show()
            }
        },
        cancel: function () {
            $scope.RolePageView.hide();
        },
        deletrole: function () {
            $scope.PageInfo.UserInfo.roleName = "-";
            $scope.PageInfo.UserInfo.roles = "";
        }
    }

    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.addRoleList, function (index, item) {
            if (item.isSelected) {
                result = item
            }
        });
        return result;
    }
    $scope.RolePageView = {
        title: "角色详情", width: 500, height: 300, buttons: {
            "新增": function () {
                var doctData = $scope.getSelectedRow();
                if (doctData) {
                    $scope.$apply(function () {
                        console.log($scope.PageInfo.UserInfo.roleName)
                        console.log(doctData.text)
                        for (var i = 0 ; i < $scope.PageInfo.UserInfo.roleName.length; i++) {
                            if (doctData.text == $scope.PageInfo.UserInfo.roleName[i]) {
                                $scope.PageInfo.UserInfo.roleName.splice(i, 1);
                                $MessagService.caveat("该角色重复！")
                            }
                        }
                        $scope.RolePage.dic = $scope.getSelectedRow();
                        $scope.RolePage.name.push($scope.RolePage.dic.text);
                        $scope.RolePage.roles.push({ roleId: $scope.RolePage.dic.id })
                        $scope.PageInfo.UserInfo.roleName = $scope.RolePage.name;
                        $scope.PageInfo.UserInfo.roles = $scope.RolePage.roles;

                        $scope.RolePageView.hide();
                    });
                } else {
                    $MessagService.caveat("请选择数据！")
                }                                                                    
            }, "取消": $scope.RolePage.cancel
        }
    }
    $scope.rolelist = function () {
        $Api.RoleService.GetRoleList({ orgType: $scope.PageInfo.UserInfo.orgType, validStatus: "Y" }, function (rData) {
            $scope.SelectInfo.roleName.dic = rData.rows;
            console.log(rData.rows)
        });
    }
    //显示模块
    $scope.PageInfo.Load();
});