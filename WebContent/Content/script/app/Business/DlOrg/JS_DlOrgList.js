/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.DlOrgList = {
        info: [],
        GetDlOrgList: function () {
            /// <summary>获取经销商列表</summary>
            var paramData = $.extend({ orgCode: $scope.User.userInfo.orgCode }, $scope.Pagein);
            console.log(paramData)
            $Api.ManageDl.GetqueryAllDealer(paramData, function (rData) {
                $scope.DlOrgList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        }
    }
    $scope.DlOrgJump = {
        Add: function () {
            /// <summary>经销商新增</summary>
            $state.go("app.business.dlorganizationEduit");
        },
        Eduit: function () {
            /// <summary>经销商编辑</summary>
            var dlopt = $scope.getSelectedRow()
            $state.go("app.business.dlorganizationEduit", { dlopt: dlopt.orgCode });
        },
        View: function () {
            /// <summary>经销商详情</summary>
            var dlopt = $scope.getSelectedRow()
            $state.go("app.business.dlorganizationView", { dlopt: dlopt.orgCode });
        },
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DlOrgList.info, function (index, item) {
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
        $scope.DlOrgList.GetDlOrgList();
    }
    $scope.Load();
})