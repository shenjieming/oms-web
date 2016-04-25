/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("UserListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>用户管理列表</summary>
    $scope.UserDetail = {
        /// <summary>用户详情操作</summary>
        Add: function () {
            /// <summary>新增用户</summary>
            $scope.goView("app.base.comp.user.detail");
        },
        Edit: function () {
            /// <summary>编辑用户</summary
            var accId = $scope.getSelectedRow();   // 选中用户信息
            if (!$scope.getSelectedRow()) {
                $MessagService.caveat("请选择一条数据");
            } else {
                $scope.goView("app.base.comp.user.detail", { accId: accId.loginAccountId });
            }
        },
    };
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.UserInfo.UserList, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    $scope.ViewDetail = {
        /// <summary>用户视图操作</summary>
        View: function (row) {
            /// <summary>查看用户详情</summary 
            var accId = $scope.getSelectedRow();   // 选中用户信息   
            $scope.goView("app.base.comp.user.view", { accId: accId.loginAccountId });
        }
    }
    $scope.UserInfo = {
        /// <summary>用户信息</summary>
        //用户列表信息
        UserList: new Array(),
        GetUserList: function () {
            /// <summary>获取用户列表信息</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserList($scope.Pagein, function (rData) {
                $scope.UserInfo.UserList = rData.rows;
                for (var i = 0; i <$scope.UserInfo.UserList.length; i++) {
                    if ($scope.UserInfo.UserList[i].lockStatusName == "非锁定") {
                        $scope.UserInfo.UserList[i].isEnable = true;
                    }
                }
                $scope.Pagein.total = rData.total;
            });
        }
    }
    $scope.file = {
        Upload: function (files) {
            /// <summary>附件上传</summary>
            $.each(files, function (index, item) {
                $FileService.ReaderFiles(item, function (data) {
                    /// <summary>文件读取</summary>
                    $Api.Public.UploadFile(data);
                });
            });
        }
    };
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.UserStatus = function (row) {
        $scope.UserInfo.UserList = row ? row : $scope.getSelectedRow();

            $Api.UserService.ModifyUserState($scope.UserInfo.UserList, function (rData) {
                $MessagService.caveat("用户状态修改成功！")
                $scope.UserInfo.GetUserList();
            })
        
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.UserInfo.GetUserList();
    }
    $scope.Load();


    //选择用户数据类型

})