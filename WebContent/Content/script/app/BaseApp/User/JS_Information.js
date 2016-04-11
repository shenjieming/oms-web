/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("InformationController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>我的信息管理</summary>
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
                        $scope.PageInfo.option = "";
                        $scope.PageInfo.parOption = treeNode.id
                    } else {
                        $scope.PageInfo.parOption = "";
                        $scope.PageInfo.option = treeNode.id;
                    }
                    $scope.PageInfo.getTreeMenuList();//数据读取
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


    $scope.Information = [];//用户信息
    $scope.PageInfo = {
        UserInfo: [],
        RoleNameList: [],
        option:[],
        getUserInformation: function () {
            /// <summary>获取用户当前登录信息</summary>
            $Api.AccountService.CurrentUserInfo({}, function (rData) {
                console.log(rData)
                if (!rData.code) {
                    $scope.Information = rData;
                    $scope.MenuInfo = rData.functionInfo;
                    $scope.userInformationDetail();
                    for (var i = 0; i < rData.roleInfo.length; i++) {
                        $scope.PageInfo.RoleNameList.push(rData.roleInfo[i].roleName)
                    }
                    $scope.Information.roleName = $scope.PageInfo.RoleNameList;
                }
            })
        },
        GetFindUserInfo: function () {
            /// <summary>获取指定用户信息</summary>
            $Api.AccountService.GetFindUserInfo({ userID: $scope.User.userInfo.userId }, function (rData) {
                console.log(rData)
                $scope.MenuInfo = rData.functionInfo;
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
            var options = $.extend({ functionID: $scope.PageInfo.option, parentFunctionID: $scope.PageInfo.parOption }, {})
            $Api.MenuService.GetMenuList(options, function (rData) {
                /// <summary>获取菜单列表</summary>
                $scope.MenuInfo = rData;
            });
        },
    }

    $scope.userInformationDetail= function () {
        /// <summary>获取用户信息信息</summary>
        $MessagService.loading("用户信息加载中，请稍等...");
        $Api.UserService.GetUserInfo({ loginAccountId: $scope.Information.userInfo.loginAccountId }, function (rData) {
            if (!rData.code) {
                $scope.PageInfo.UserInfo = rData;
            }
        })
    },
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    };
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.PageInfo.getUserInformation();
        $scope.PageInfo.GetFindUserInfo();
    }
    $scope.Load();
})