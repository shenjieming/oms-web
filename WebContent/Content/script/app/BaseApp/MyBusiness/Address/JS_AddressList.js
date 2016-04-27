/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("AddressListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.AddressList = {
        info: [],
        GetAddressList: function () {
            /// <summary>获取我的地址列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            console.log(paramData)
            $Api.MyAddress.GetbizDataMyAddressList(paramData, function (rData) {
                $scope.AddressList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        },
        checkIs: function () {
            $scope.AddressDetail.Info.checkisDefaultPerAddressType = !$scope.AddressDetail.Info.checkisDefaultPerAddressType;
        }
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.AddressList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }

    $scope.AddressJumpSever = {
        /// <summary>常用地址跳转</summary>
        Add:function(){
            $scope.goView("app.base.mybusiness.addressedit", {addopt:""})
        },
        Edit: function () {
            var addopt = $local.getSelectedRow($scope.AddressList.info)
            if (addopt) {
                $scope.goView("app.base.mybusiness.addressedit", { addopt: addopt.lineNo })
            } else {
                $MessagService.caveat("请选择一条编辑的地址信息！")
            }        
        },
        View: function () {
            $scope.AddressView.ShowView();
        }
    }
    $scope.AddressView = {
        Info: [],
        ShowView: function () {
            var adree = $scope.getSelectedRow();
            if (adree) {
                $scope.AddressView.model.show();
                $Api.MyAddress.GetbizDataMyAddressList(adree, function (rData) {
                    $scope.AddressView.Info = rData.rows[0];
                    console.log(rData)
                })
            } else {
                $MessagService.caveat("请选择一条查看的地址信息！")
            }
        },
        cancel: function () {
            $scope.AddressView.model.hide();
        }
    }

    $scope.AddressView.model = { title: "配置详情", width: 550, height: 300, buttons: { "确定": $scope.AddressView.cancel } }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.AddressList.GetAddressList();
    }
    $scope.Load();
})