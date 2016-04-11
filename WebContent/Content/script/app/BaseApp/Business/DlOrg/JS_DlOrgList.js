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
            var paramData = $.extend({}, $scope.Pagein);
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
            $state.go("app.base.business.dlorganizationEduit");
        },
        Edit: function () {
            /// <summary>经销商编辑</summary>
            var dlopt = $local.getSelectedRow($scope.DlOrgList.info)
            if (dlopt) {
                $state.go("app.base.business.dlorganizationEduit", { dlopt: dlopt.orgCode });
            } else {
                $MessagService.caveat("请选择一条编辑的经销商");
            }       
        },
        View: function (row) {
            /// <summary>经销商详情</summary>
            var dlopt = row ? row : $local.getSelectedRow($scope.DlOrgList.info);
            console.log(dlopt)
            if (dlopt) {
                $state.go("app.base.business.dlorganizationView", { dlopt: dlopt.orgCode });
            }
            else {
                $MessagService.caveat("请选择一条查看的经销商");
            }
        },
        Delect: function () {
            var dlopt = $local.getSelectedRow($scope.DlOrgList.info);
            if (dlopt) {
                if (confirm("您确认要删除当前经销商吗?")) {
                    $Api.ManageDl.GetdeleteDealer({ orgCode: dlopt.orgCode }, function (rData) {
                        $MessagService.succ("该经销商删除成功");
                        $scope.DlOrgList.GetDlOrgList();
                    })
                }
           
            } else {
                $MessagService.caveat("请选择一条删除的经销商");
            }   
        },
        QueryDLList: function () {
            /// <summary>查询经销商列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1,  dLName: $scope.DlOrgJump.SearchWhere });
            $scope.DlOrgList.GetDlOrgList();
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.DlOrgJump.QueryDLList();
            }
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
        $scope.DlOrgList.GetDlOrgList();
    }
    $scope.Load();
})