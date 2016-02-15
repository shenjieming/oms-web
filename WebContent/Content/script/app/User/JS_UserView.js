/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("UserViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    $scope.tree = {
        setting: {
            callback: {
                beforeExpand: true,
                onExpand: function (event, treeId, treeNode) {
                    /// <summary>tree查询子节点</summary>
                    if (!treeNode.reNode) {
                        treeNode.reNode = true;
                    }
                },
                onClick: function (event, treeId, treeNode) {
                    /// <summary>点击tree后的事件</summary>
                    console.log(treeNode)
                    if (treeNode.isParent) {
                        $scope.UserDetail.option = "";
                        $scope.UserDetail.parOption = treeNode.id
                    } else {
                        $scope.UserDetail.parOption = "";
                        $scope.UserDetail.option = treeNode.id;
                    }
                    $scope.UserDetail.getTreeMenuList();//数据读取
                },
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId",
                }
            },
        },

        obj: new Object()
    }


    /// <summary>用户视图</summary>
    $scope.Information = [];
    $scope.UserDetail = {
        MenuInfo: [],
        RoleNameList: [],
        UserInfo: [],
        option: [],
        parOption:[],

        Load: function (callback) {
            $scope.accId = $stateParams.accId;
            console.log($scope.accId)
            $scope.UserDetail.getUserDetail();
            $scope.UserDetail.getUserInformation();
            $scope.UserDetail.GetFindUserInfo();
        },
        getUserDetail: function () {
            /// <summary>获取用户列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                $scope.UserDetail.UserInfo = rData;
                console.log(rData)
            })
        },
        getUserInformation: function () {
            /// <summary>获取用户当前登录信息</summary>
            $Api.AccountService.CurrentUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                if (!rData.code) {
                    for (var i = 0; i < rData.roleInfo.length; i++) {
                        $scope.UserDetail.RoleNameList.push(rData.roleInfo[i].roleName)
                    }
                    $scope.UserDetail.UserInfo.roleName = $scope.UserDetail.RoleNameList;                      
                }
            })
        },
        GetFindUserInfo: function () {
            /// <summary>获取指定用户信息</summary>
            $Api.AccountService.GetFindUserInfo({ userID: $scope.UserDetail.UserInfo.userId }, function (rData) {
                console.log(rData)
                $scope.UserDetail.MenuInfo = rData.functionInfo;
                //ztree  树级菜单
                var treeData = new Array();
                for (var i = 0; i < rData.functionInfo.length; i++) {
                treeData.push({ id: rData.functionInfo[i].functionID, pId: rData.functionInfo[i].parentFunctionID, name: rData.functionInfo[i].functionName });                   
                }
                $scope.tree.data = treeData;
            });
        },
        getTreeMenuList: function () {
            /// <summary>获取功能菜单列表</summary>
            console.log($scope.functionID)
            $MessagService.loading("菜单列表获取中，请稍等...");
            var options = $.extend({ functionID: $scope.UserDetail.option, parentFunctionID: $scope.UserDetail.parOption }, {})
            $Api.MenuService.GetMenuList(options, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.UserDetail.MenuInfo = rData;
            });
        },
        GetRoleInfo: function () {
            /// <summary>获取角色列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.RoleService.GetRoleDetail({ roleId: $scope.UserDetail.UserInfo.roles[0].roleId }, function (rData) {
                if (!rData.code) {
                    $scope.UserDetail.UserInfo.roleName = rData.roleName;
                    //console.log(rData)
                }
            })
        }

    }
    $scope.UserDetail.Load();
})