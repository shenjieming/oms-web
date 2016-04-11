/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("RoleListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>角色管理控制器</summary>
    $scope.RoleInfo = [];
    $scope.RoleParameters = [];
    $scope.RoleDetail = {
        /// <summary>操作角色详情</summary>
        getRoleList: function () {
            /// <summary>获取角色列表</summary>
            $MessagService.loading("角色获取中，请稍等...");
            var paramData = $.extend({ validStatus: "Y", roleName: "", orgType: $scope.User.userInfo.orgType }, $scope.Pagein);
            if ($scope.User.userInfo.orgType=="PL") {
                paramData = $scope.Pagein
            }
            $Api.RoleService.GetRoleList(paramData, function (roleData) {
                /// <summary>获取角色信息</summary>
                $scope.RoleInfo = roleData.rows;
                for (var i = 0; i < $scope.RoleInfo.length; i++) {
                    if ($scope.RoleInfo[i].validStatus == "Y") {
                        $scope.RoleInfo[i].isEnable = true;
                    }
                }
                $scope.Pagein.total = roleData.total;
            });
        },
        showRole: function (rowData) {
            /// <summary>显示添加角色信息</summary>
            if (!rowData.orgTypeName) {
                rowData.orgTypeName = "-";
            }
            $scope.RoleDetail.model.show();
            $scope.RoleDetail.roleInfo = rowData;
            $scope.orgType.getList();
        },//操作的角色信息
        roleInfo: {relationDesc:""},
        showEditRole: function () {
            /// <summary>显示编辑行信息</summary>
            var rowData = $scope.getSelectedRow();
            if (rowData) {
                $scope.RoleDetail.showRole(rowData);
                $scope.RoleDetail.model.show();
                $scope.orgType.getList();
            } else {
                $MessagService.caveat("请选择一条操作数据！");
            }
        },
        verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.RoleDetail.roleInfo.roleName || !$scope.RoleDetail.roleInfo.roleFullName || !$scope.RoleDetail.roleInfo.orgType) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            for (var i = 0; i < $scope.RoleInfo.length; i++) {
                if ($scope.RoleInfo[i].roleName == $scope.RoleDetail.roleInfo.roleName) {
                    $MessagService.caveat("该角色名称已存在,请创建其他角色名称！");
                }
            }        
            return result;
        },
            saveRole: function () {
                /// <summary>保存角色</summary>
                if ($scope.RoleDetail.roleInfo.relationDesc==null) {
                    $scope.RoleDetail.roleInfo.relationDesc = "";
                }
                console.log($scope.RoleDetail.verification())
                if ($scope.RoleDetail.verification()) {
                    $MessagService.loading("角色保存中，请稍等...");
                    $Api.RoleService.Save($scope.RoleDetail.roleInfo, function (rData) {
                        $scope.RoleDetail.model.hide();   
                        $scope.RoleDetail.getRoleList();
                        $MessagService.succ("角色保存成功！")
                    });
                }
            },
        cancel: function () {
            /// <summary>取消</summary>
            $scope.RoleDetail.model.hide();
        }
    };
    $scope.RoleView = {
        Info: {},
        showRole: function (row) {
            /// <summary>显示选择的角色信息</summary>
            $scope.RoleView.Info = row ? row : $scope.getSelectedRow();
            if ($scope.RoleView.Info) {
                if ($scope.RoleView.Info.validStatus == "Y") {
                    $scope.RoleView.Info.isEnable = true;
                }
                $scope.RoleView.model.show();

            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        ModifyRoleState: function () {
            /// <summary>开启关闭</summary>
            $MessagService.loading("请求操作中，请稍等...");
            $Api.RoleService.ModifyRoleState($scope.RoleView.Info, function (rData) {
                $scope.RoleView.model.hide();
                $MessagService.succ("状态修改成功！");
                setTimeout(function () {
                    $scope.Load();
                }, 1000)
            });
        },
        cancel: function () {
            $scope.RoleView.model.hide();
        }
    };
    $scope.RoleView.model = { title: "角色详情", width: 550, height: 300, buttons: { "确定": $scope.RoleView.cancel } }
    $scope.RoleDetail.model = { title: "角色信息", width: 650, height: 300, buttons: { "保存": $scope.RoleDetail.saveRole, "取消": $scope.RoleDetail.cancel } }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.RoleInfo, function (index, item) {
            if (item.isSelected) {
                result = item
            }
        });
        return result;
    }
    $scope.RoleStatus = function (row) {
        /// <summary>角色状态控制</summary>
        $scope.RoleInfo = row ? row : $scope.getSelectedRow();
        console.log($scope.RoleInfo)
        $Api.RoleService.ModifyRoleState($scope.RoleInfo, function (rData) {
            $MessagService.caveat("角色状态修改成功！")
            $scope.Load();  
        })

    }
    $scope.orgType = {
        dic: new Array(),
        change: function (item) {
            /// <summary>组织类型修改事件</summary>
            for (var i = 0; i < $scope.orgType.dic.length; i++) {
                if ($scope.orgType.dic[i].id == $scope.RoleDetail.roleInfo.orgType) {
                    $scope.RoleDetail.roleInfo.orgTypeName = $scope.orgType.dic[i].text;
                    return;
                } else {
                    $scope.RoleDetail.roleInfo.orgTypeName="-"
                }
            }
        },
        getList: function (callback) {
            /// <summary>获取机构类型信息</summary>          
                $MessagService.loading("数据初始化中，请稍等...");
                $Api.UserService.userAddOrgTpye({}, function (rData) {
                    $scope.orgType.dic = rData;
                    console.log(rData)
                });
            }
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
        $scope.RoleDetail.getRoleList();
    }
    $scope.Load();

})