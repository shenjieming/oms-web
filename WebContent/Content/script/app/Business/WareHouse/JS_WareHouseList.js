﻿/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("WareHouseListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.WareHouseList = {
        info: [],
        GetWareHouseList: function () {
            /// <summary>获取仓库列表</summary>
            var paramData = $.extend({ }, $scope.Pagein);
            $Api.ManaWareHouse.GetqueryWareHouse(paramData, function (rData) {
                $scope.WareHouseList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        }
    }
    $scope.Service = {
        Add: function () {
            /// <summary>仓库新增</summary>
            $state.go("app.business.whmanagementEduit");
        },
        Edit: function () {
            /// <summary>仓库编辑</summary>
            var whopt = $scope.getSelectedRow()
            if (whopt) {
                $state.go("app.business.whmanagementEduit", { whopt: whopt.orgCode });
            } else {
                $MessagService.caveat("请选择一条编辑的仓库！")
            }
        
        },
        View: function () {
            /// <summary>仓库详情</summary>
            var whopt = $scope.getSelectedRow()
            if (whopt) {
                $state.go("app.business.whmanagementView", { whopt: whopt.orgCode });
            } else {
                $MessagService.caveat("请选择一条查看的仓库！")
            }
        },
    },
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.WareHouseList.info, function (index, item) {
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
        $scope.WareHouseList.GetWareHouseList();
    }
    $scope.Load();
})
