/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.RelManList = {
        //货主和下属经销商关系绑定
        info:[],
        IsEdit: false,
        GetRelManList:function () {
            /// <summary>获取货主经销商关系列表</summary>
            var relorgCode =[];
            relorgCode = $scope.getSelectedRow();
            if (relorgCode) {
                var paramData = $.extend({ orgCode: relorgCode.orgCode }, $scope.Pagein);
                $Api.ManageOIDLRel.GetqueryAllOIDLRel(paramData, function (rData) {
                    $scope.RelManList.info = rData.rows;
                    $scope.Pagein.total = rData.total;
                    for (var i = 0; i < $scope.RelManList.info.length; i++) {
                        if ($scope.RelManList.info[i].certStatusName == "已认证") {
                            $scope.RelManList.info[i].isEnable = true;
                        }
                    }
                    console.log($scope.RelManList.info)
                })
            } else {
                $MessagService.caveat("请选择一条货主数据！")
                $scope.RelManList.IsEdit = false;
            }
        },
        getSelectedRow:function () {
            /// <summary>获取选择的行</summary>
            var result = false;
            $.each($scope.RelManList.info, function (index, item) {
                if (item.isSelected) {
                    result = item;
                }
            });
            return result;
        }

    };
    $scope.UserStatus = function (row) {
        $scope.RelManList.info = row ? row : $scope.RelManList.getSelectedRow();
        console.log($scope.RelManList.info)
        if ($scope.RelManList.info.isEnable) {
            console.log(1)
            $scope.RelManList.info.isEnable == "Y";
        } else {
            $scope.RelManList.info.b == "N";
        }
        console.log($scope.RelManList.info)
        $Api.ManageOIDLRel.GetdeleteOwnerOfInventory($scope.RelManList.info, function (rData) {
            $MessagService.caveat("用户状态修改成功！")
            $scope.RelManList.GetRelManList();
        })
    }


    $scope.OiOrgList = {
        info: [],
        GetOiOrgList: function () {
            /// <summary>获取货主列表</summary>
            var paramData = $.extend({ }, $scope.Pagein);
            $Api.ManageOi.GetqueryAllOwnerOfInventory(paramData, function (rData) {
                $scope.OiOrgList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        }
    }
    $scope.Service = {

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
        isEdit: function (isshow) {
            /// <summary>是否编辑套件</summary>
            $scope.RelManList.IsEdit = isshow;
        },
        RelMan: function () {
            $scope.Service.isEdit(true);
            $scope.RelManList.GetRelManList();
        }
    },
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