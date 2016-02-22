/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.OiOrgList = {
        info: [],
        GetOiOrgList: function () {
            /// <summary>获取货主列表</summary>
            var paramData = $.extend({ orgCode: $scope.User.userInfo.orgCode }, $scope.Pagein);
            console.log(paramData)
            $Api.ManageOi.GetqueryAllOwnerOfInventory(paramData, function (rData) {
                $scope.OiOrgList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        }
    }
    $scope.DlOrgJump = {
        Add: function () {
            /// <summary>货主新增</summary>
            $state.go("app.business.oiorganizationEduit");
        },
        Eduit: function () {
            /// <summary>货主编辑</summary>
            var oiopt = $scope.getSelectedRow()
            $state.go("app.business.oiorganizationEduit", { oiopt: oiopt.orgCode });
        },
        View: function () {
            /// <summary>货主详情</summary>
            var oiopt = $scope.getSelectedRow()
            $state.go("app.business.oiorganizationView", { oiopt: oiopt.orgCode });
        },
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.OiOrgList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
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
        $scope.OiOrgList.GetOiOrgList();
    }
    $scope.Load();
})