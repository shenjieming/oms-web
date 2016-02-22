/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("RelManListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.RelManList = {
        info: [],
        GetRelManList: function () {
            /// <summary>获取货主经销商关系列表</summary>
            var paramData = $.extend({ orgCode: $scope.User.userInfo.orgCode }, $scope.Pagein);
            console.log(paramData)
            $Api.ManageOIDLRel.GetqueryAllOIDLRel(paramData, function (rData) {
                $scope.RelManList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                for (var i = 0; i < $scope.RelManList.info.length; i++) {
                    if ($scope.RelManList.info.certStatusName=="已认证") {
                        $scope.RelManList.info.isEnable = true;
                    }
                }
                console.log(rData)
            })
        }
    }
    $scope.RelManJump = {
        View: function () {
            /// <summary>货主经销商关系详情</summary>
            var relopt = $scope.getSelectedRow()
            $state.go("app.business.relmanagement.relmanagementView", { relopt: relopt.orgCode });
        },
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.RelManList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    $scope.UserStatus = function (row) {
        $scope.UserInfo.UserList = row ? row : $scope.getSelectedRow();
        $Api.ManageOIDLRel.GetdeleteOwnerOfInventory($scope.RelManList.info, function (rData) {
            $MessagService.caveat("用户状态修改成功！")
            $scope.RelManList.GetRelManList();
        })
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
        $scope.RelManList.GetRelManList();
    }
    $scope.Load();
})