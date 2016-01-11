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
            console.log($scope.accId)
            if ($scope.accId) {               
                $scope.PageInfo.GetUserInfo();//用户详细列表
                $scope.SelectInfo.roleName.getList();//角色列表
                $scope.PageInfo.GetRoleInfo();//角色详情
                $scope.SelectInfo.roleType.getOrgcodeList();//编码类型
            };
            $scope.SelectInfo.orgType.getUserList();//获取当前用户登录信息
            if (!$scope.PageInfo.UserInfo.orgTypeName) {
                $scope.PageInfo.UserInfo.orgTypeName = "-";
            };                   
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
            userPMsgType2: "", userPMsgNo2: "", userPMsgDesc2: "", roles: [], roleId: "",
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
            console.log($scope.PageInfo.UserInfo)
            /// <summary>保存用户信息</summary>
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
                    console.log(rData)
                    //$scope.PageInfo.UserInfo.roles = [{ roleId:$scope.PageInfo.UserInfo.userId}]
                }
            })
        },
        GetRoleInfo: function () {
            /// <summary>获取角色列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            console.log($scope.PageInfo.UserInfo)
            console.log($scope.PageInfo.UserInfo.roles[0].roleId)
            $Api.RoleService.GetRoleDetail({ roleId: $scope.PageInfo.UserInfo.roles[0].roleId }, function (rData) {
                console.log(rData)
                if (!rData.code) {
                    $scope.PageInfo.UserInfo.roleName = rData.roleName;
                    console.log(rData)
                }
            })
        }
    }
    // 下拉框模块
    $scope.SelectInfo = {
        /// <summary>选项卡信息</summary>
        orgType: {
            //机构类型下拉框  
            dic: new Array(),
            doc: [],     //用户登录机构类型
            result: [],
            change: function (item) {
                /// <summary>角色类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.orgType.result.length; i++) {
                    if ($scope.SelectInfo.orgType.result[i].id == $scope.PageInfo.UserInfo.orgType) {
                        $scope.PageInfo.UserInfo.orgTypeName = $scope.SelectInfo.orgType.result[i].text;
                        $scope.SelectInfo.roleName.getList();
                        $scope.SelectInfo.roleType.getOrgcodeList()
                        console.log($scope.PageInfo.UserInfo)
                        return;
                    }
                }
          
            },
            getList: function () {
                /// <summary>获取组织类型</summary>
                $Api.Public.GetDictionary({ dictType: "ORGTYP" }, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.orgType.dic = rData;
                        //console.log(rData)
                    };
                    //等获取状态接口
                    switch ($scope.SelectInfo.orgType.doc.orgType) {
                        case "DL"://经销商能控制的组织类型
                            for (var i = 0; i < rData.length; i++) {
                                if (rData[i].id == $scope.SelectInfo.orgType.doc.orgType) {
                                    $scope.SelectInfo.orgType.result.push(rData[i])
                                }
                            }
                            break;
                        case "OI"://货主能控制的组织类型
                            for (var i = 0; i < rData.length; i++) {
                                if (rData[i].id == $scope.SelectInfo.orgType.doc.orgType) {
                                    $scope.SelectInfo.orgType.result.push(rData[i])
                                    $scope.SelectInfo.orgType.result.push(rData[i + 1])
                                }
                            }
                            break;
                        case "WH"://仓库能控制的组织类型
                            for (var i = 0; i < rData.length; i++) {
                                if (rData[i].id == $scope.SelectInfo.orgType.doc.orgType) {
                                    $scope.SelectInfo.orgType.result.push(rData[i])
                                }
                            }
                            break;
                        case "PL"://平台能控制的组织类型
                            for (var i = 0; i < rData.length; i++) {
                                if (rData[i].id == $scope.SelectInfo.orgType.doc.orgType) {
                                    $scope.SelectInfo.orgType.result.push(rData[0])
                                    $scope.SelectInfo.orgType.result.push(rData[1])
                                    $scope.SelectInfo.orgType.result.push(rData[2])
                                }
                            }
                            break;
                    }
                    console.log($scope.SelectInfo.orgType.result)
                    console.log($scope.PageInfo.UserInfo)

                });
            },
            getUserList: function () {
                $Api.AccountService.CurrentUserInfo({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.orgType.doc = rData.userInfo;                     
                        //console.log(rData)
                    }
                })
            },          
        },
        roleType:{
            dic:[type=[]],
            result: [],
            change: function (item) { 
                for (var i = 0; i < $scope.SelectInfo.roleType.result.length; i++) {
                    if ($scope.SelectInfo.roleType.result[i].id == $scope.PageInfo.UserInfo.roleType) {
                        $scope.PageInfo.UserInfo.roleTypeName = $scope.SelectInfo.roleType.result[i].text
                        $scope.PageInfo.UserInfo.orgCode = $scope.SelectInfo.roleType.result[i].id                  
                    }
                }
                console.log($scope.PageInfo.UserInfo)
            },
            getOrgcodeList: function () {
                $Api.UserService.OrgCodeList({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.roleType.dic = rData;
                        console.log(rData)
                        $scope.SelectInfo.roleType.result = new Array();
                        for (var i = 0; i < $scope.SelectInfo.roleType.dic.length; i++) {
                            $scope.SelectInfo.roleType.dic[i].type = ($scope.SelectInfo.roleType.dic[i].id.slice(0, 2));
                            if ($scope.SelectInfo.roleType.dic[i].type == $scope.PageInfo.UserInfo.orgType) {
                                $scope.SelectInfo.roleType.result.push($scope.SelectInfo.roleType.dic[i])
                            }
                        }
                        console.log($scope.PageInfo.UserInfo.orgType)
                        console.log($scope.SelectInfo.roleType.result)
                    }
                })
            }
        },
        roleName: {
            //用户角色名称下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>角色类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.roleName.dic.length; i++) {
                    if ($scope.SelectInfo.roleName.dic[i].roleName == $scope.PageInfo.UserInfo.roleName) {
                        $scope.PageInfo.UserInfo.roleName = $scope.SelectInfo.roleName.dic[i].roleName;
                        $scope.PageInfo.UserInfo.roles = [{ roleId: $scope.SelectInfo.roleName.dic[i].roleId }];
                        console.log($scope.PageInfo.UserInfo)                      
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取用户角色信息</summary>
                console.log($scope.PageInfo.UserInfo.orgType)
                console.log($scope.PageInfo.UserInfo)
                $Api.RoleService.GetRoleList({ orgType: $scope.PageInfo.UserInfo.orgType, validStatus: "Y" }, function (rData) {
                    $scope.SelectInfo.roleName.dic = rData.rows;
                    console.log(rData.rows)                   
                });
            },
        },
        userSex: {
            //用户性别下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>性别修改事件</summary>
                console.log($scope.PageInfo.UserInfo.userSex)
                console.log($scope.PageInfo.UserInfo.userSexName)
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
            }
        },
        userEducation: {
            //用户学历下拉框
            dic: new Array(),
            change: function (item) {
                /// <summary>学历修改事件</summary>
                console.log($scope.PageInfo.UserInfo.userEducation)
                for (var i = 0; i < $scope.SelectInfo.userEducation.dic.length; i++) {
                    if ($scope.SelectInfo.userEducation.dic[i].id == $scope.PageInfo.UserInfo.userEducation) {
                        $scope.PageInfo.UserInfo.userEducationName = $scope.SelectInfo.userEducation.dic[i].text;   
                        console.log($scope.PageInfo.UserInfo.userEducationName)
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取学历信息</summary>
                $Api.Public.GetDictionary({ dictType: "PRNEDU" }, function (rData) {
                    $scope.SelectInfo.userEducation.dic = rData;
                });
            }
        }
    }
    //显示模块
    $scope.PageInfo.Load();
});