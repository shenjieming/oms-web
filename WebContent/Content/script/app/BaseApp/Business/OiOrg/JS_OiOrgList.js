/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.relorgCode = [];
    $scope.RelManList = {
        //货主和下属经销商关系绑定
        info:[],
        IsEdit: false,
        GetRelManList:function () {
            /// <summary>获取货主经销商关系列表</summary>
            $scope.relorgCode = $local.getSelectedRow($scope.OiOrgList.info)
            console.log($scope.relorgCode)
            if ($scope.relorgCode) {
                var paramData = $.extend({ oIorgCode: $scope.relorgCode.orgCode }, $scope.Pagein);
                console.log(paramData)
                $Api.ManageOIDLRel.GetqueryAllOIDLRel(paramData, function (rData) {
                    $scope.RelManList.info = rData.rows;
                    $scope.Pagein.total = rData.total;
                    console.log($scope.RelManList.info)
                })
            } else {
                $MessagService.caveat("请选择一条货主数据！")
                $scope.RelManList.IsEdit = false;
            }
        },
        Delete: function () {
            /// <summary>删除套件</summary>
            var row = row ? row : $local.getSelectedRow($scope.RelManList.info)
            console.log(row)
            if (row) {
                if (confirm("您确认要解除该经销商绑定吗?")) {
                    row.certStatus = "Y" ? "N" : "Y";
                    console.log(row)
                    $Api.ManageOIDLRel.GetdeleteOwnerOfInventory(row, function () {
                        $MessagService.succ("该操作成功！");
                        $scope.RelManList.GetRelManList();
                    });
                }
            } else {
                $MessagService.caveat("请选择一条需要操作的经销商信息！");
            }
        },
        goDlView: function (row) {
            var dlopt=row?row :$local.getSelectedRow($scope.RelManList.info)
            if (dlopt) {
                $state.go("app.business.dlorganizationView", { dlopt: dlopt.dLOrgCode });
            } else {
                $MessagService.caveat("请选择一条查看的经销商数据！")
            }
        },
        Select: function (row) {
           console.log(row)
           if (confirm("您确认要操作该经销商绑定关系吗?")) {
               if (row.certStatus == "APPRED") {
                   row.certStatus = "N";
               } else {
                   row.certStatus = "Y";
               }
                    console.log(row)
                    $Api.ManageOIDLRel.GetdeleteOwnerOfInventory(row, function () {
                        $MessagService.succ("该操作成功！");
                        $scope.ManageOIDLRel.GetqueryAllOIDLRel();
                    });
                }            
        },
        QueryOiList: function () {
            /// <summary>查询认证列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, dLOrgCode: $scope.RelManList.SearchWhere });
            $scope.RelManList.GetRelManList();
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.RelManList.QueryOiList();
            }
        }
    };
    $scope.OiOrgList = {
        info: [],
        GetOiOrgList: function () {
            /// <summary>获取货主列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            $Api.ManageOi.GetqueryAllOwnerOfInventory( $scope.Pagein, function (rData) {
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
        Edit: function () {
            /// <summary>货主编辑</summary>
            var oiopt = $scope.getSelectedRow()
            if (oiopt) {
                $state.go("app.business.oiorganizationEduit", { oiopt: oiopt.orgCode });
            } else {
                $MessagService.caveat("请选择一条编辑的货主！")
            }
       
        },
        View: function (row) {
            /// <summary>货主详情</summary>
            var oiopt = row ? row : $local.getSelectedRow($scope.OiOrgList.info);
            if (oiopt) {
                $state.go("app.business.oiorganizationView", { oiopt: oiopt.orgCode });
            }
            else {
                $MessagService.caveat("请选择一条查看的货主！")
            }
        },
        isEdit: function (isshow) {
            /// <summary>是否编辑套件</summary>
            $scope.RelManList.IsEdit = isshow;
        },
        RelMan: function () {
            //经销商关系
            $scope.Service.isEdit(true);
            $scope.RelManList.GetRelManList();
        },
        Detect: function () {
            //删除货主信息
            var orgCode = $scope.getSelectedRow();
            $Api.ManageOi.GetdeleteOwnerOfInventory({ orgCode: orgCode.orgCode }, function (rData) {
                $MessagService.succ("该货主已删除成功！")
                $scope.OiOrgList.GetOiOrgList();
            })
        },
        QueryOiList: function () {
            /// <summary>查询经销商列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, oIShortCode: $scope.Service.SearchOiWhere, oIName: $scope.Service.SearchOiWhere });
            $scope.OiOrgList.GetOiOrgList();
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.Service.QueryOiList();
            }
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