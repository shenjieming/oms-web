/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DictionaryListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.DictionaryInfo = [];
    $scope.Dictionaryvalue = [];
    $scope.DictionaryView = {
        Info: {},
        showDictionary: function (row) {
            $scope.DictionaryView.Info = row ? row : $scope.getSelectedRow();   
            /// <summary>获取选中的行</summary>
            if ($scope.DictionaryView.Info) {
                /// <summary>从表相关信息</summary>
                $scope.Dictionaryvalue = $scope.DictionaryView.Info.dictValue;
                $(".Dictionary_page").show();
            } else {
                $MessagService.caveat("请选择一条查看数据！");
            } console.log($scope.Dictionaryvalue)
        }
    },

    $scope.getSelectedRow = function () {

        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DictionaryInfo, function (index, item) {
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
        $MessagService.loading("数据字典获取中，请稍等...");
        $Api.BasisService.GetDictionaryList($scope.Pagein, function (dictionaryData) {
            /// <summary>获取数据字典信息</summary>    
            $scope.DictionaryInfo = dictionaryData.rows;
            $scope.Pagein.total = dictionaryData.total;
            $(".Dictionary_page").hide();
        });
    }
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load();
})