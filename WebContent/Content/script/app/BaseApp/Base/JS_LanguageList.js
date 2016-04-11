/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("LanguageListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>语言管理控制器</summary>
    $scope.LanguageInfo = [];
    $scope.LanguageView = {
        Info: {},
        showLanguage: function (row) {
            /// <summary>显示选择的语言管理信息</summary>
            $scope.LanguageView.Info = row ? row : $scope.getSelectedRow();
            /// <summary>获取选中的行</summary>

            if ($scope.LanguageView.Info) {
   
                /// <summary>y=有效</summary>
                $scope.LanguageView.model.show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            }
        },
        cancel: function () {
            $scope.LanguageView.model.hide();
        }
    }
    $scope.LanguageView.model = { title: "语言管理详情", width: 500, height: 300, buttons: { "确定": $scope.LanguageView.cancel } }
    /// <summary>Dialog页面</summary>
    $scope.getSelectedRow = function () {

        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.LanguageInfo, function (index, item) {
            /// <summary>如果被选中，则选取选中的行</summary>
            if (item.isSelected) {
                result = item
            }
        });
        console.log(result)
        return result;
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $MessagService.loading("语言管理获取中，请稍等...");
        $Api.BasisService.GetLanguageList($scope.Pagein, function (languageData) {
            /// <summary>获取语言管理信息</summary>
            $scope.LanguageInfo = languageData.rows;
            $scope.Pagein.total = languageData.total;
        });
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load();
})