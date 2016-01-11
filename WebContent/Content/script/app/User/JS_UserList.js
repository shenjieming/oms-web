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
            $state.go("app.comp.user.detail");
        },
        Edit: function () {
            /// <summary>编辑用户</summary
            var accId = [];   // 选中用户信息
            if (!$scope.getSelectedRow()) {
                $MessagService.caveat("请选择一条数据");
            } else {
                $state.go("app.comp.user.detail", { accId: $scope.getSelectedRow() });
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
        console.log(result)
        return result.loginAccountId
    }
    $scope.ViewDetail = {
        /// <summary>用户视图操作</summary>
        View: function (row) {
            /// <summary>查看用户详情</summary 
            var accId = $scope.getSelectedRow();   // 选中用户信息   
            $state.go("app.comp.user.view", { accId: accId });           
            }   
    }
    $scope.UserInfo = {
        /// <summary>用户信息</summary>
        //用户列表信息
        UserList: new Array(),
        GetUserList: function () {
            /// <summary>获取用户列表信息</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserList({}, function (rData) {
                $scope.UserInfo.UserList = rData.rows;
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

    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.UserInfo.GetUserList();
    }
    $scope.Load();

    
    //选择用户数据类型
 
})