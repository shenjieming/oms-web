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
            var paramData = $.extend({ }, $scope.Pagein);
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
        Edit: function () {
            /// <summary>经销商编辑</summary>
            var dlopt = $scope.getSelectedRow()
            if (dlopt) {
                $state.go("app.business.dlorganizationEduit", { dlopt: dlopt.orgCode });
            } else {
                $MessagService.caveat("请选择一条编辑的经销商");
            }       
        },
        View: function () {
            /// <summary>经销商详情</summary>
            var dlopt = $scope.getSelectedRow()
            if (dlopt) {
                $state.go("app.business.dlorganizationView", { dlopt: dlopt.orgCode });
            }
            else {
                $MessagService.caveat("请选择一条查看的经销商");
            }
        },
        Delect: function () {
            var dlopt = $scope.getSelectedRow();
            if (dlopt) {
                $Api.ManageDl.GetdeleteDealer({ orgCode: dlopt.orgCode }, function (rData) {
                    $MessagService.succ("该信息删除成功");
                    $scope.DlOrgList.GetDlOrgList();
                })
            } else {
                $MessagService.caveat("请选择一条删除的经销商");
            }
   
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