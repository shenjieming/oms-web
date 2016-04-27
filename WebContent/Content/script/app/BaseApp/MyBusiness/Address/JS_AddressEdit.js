/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("AddressEditController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>我的地址编辑</summary>
    $scope.AddressDetail = {
        info: { checkisDefaultPerAddressType: true},
        checkIs: function () {
            $scope.AddressDetail.info.checkisDefaultPerAddressType = !$scope.AddressDetail.info.checkisDefaultPerAddressType;
            },
        Save: function () {
            /// <summary> 用户保存</summary>
            $scope.AddressDetail.info.provinceCode = $scope.AddressDetail.info.deliveryProvinceCode;
            $scope.AddressDetail.info.cityCode = $scope.AddressDetail.info.deliveryCityCode;
            $scope.AddressDetail.info.districtCode = $scope.AddressDetail.info.deliveryDistrictCode;
            $scope.AddressDetail.info.userID = $scope.User.userInfo.userId;
            console.log($scope.AddressDetail.info.checkisDefaultPerAddressType)
            $scope.AddressDetail.info.isDefaultPerAddressType = $scope.AddressDetail.info.checkisDefaultPerAddressType ? "Y" : "N";      
            console.log($scope.AddressDetail.info.isDefaultPerAddressType)
            if ($scope.verification()) {
                $Api.MyAddress.Save($scope.AddressDetail.info, function (rData) {
                    $MessagService.caveat(" 该用户保存成功!");
                    $scope.goLastPage();
                })
            }
        }
    }
    $scope.GetListServer = {
        // 获取接口服务
        AddressView: function () {
            // 接口详情
            $Api.MyAddress.GetbizDataMyAddressList({ userID: $scope.User.userInfo.userId, lineNo: $stateParams.addopt }, function (rData) {
                $scope.AddressDetail.info = rData.rows[0];
                console.log(rData)
                if ($scope.AddressDetail.info.isDefaultPerAddressType == "Y") {
                    $scope.AddressDetail.info.checkisDefaultPerAddressType = true;
                } else {
                    $scope.AddressDetail.info.checkisDefaultPerAddressType = false;
                }
                $scope.AddressDetail.info.deliveryProvinceCode = $scope.AddressDetail.info.provinceCode;
                $scope.AddressDetail.info.deliveryCityCode = $scope.AddressDetail.info.cityCode;
                $scope.AddressDetail.info.deliveryDistrictCode = $scope.AddressDetail.info.districtCode;
            })
        }
    }
    $scope.verification = function () {
        var result = true;
        if (!$scope.AddressDetail.info.contact) {
            $MessagService.caveat("请输入联系人姓名!");
            result = false
        }
        else if (!$scope.AddressDetail.info.mobile) {
            $MessagService.caveat("请输入联系人手机号码!");
            result = false
        }
        else if (!$scope.AddressDetail.info.carrierTransType) {
            $MessagService.caveat("请选择配送方式!");
            result = false
        }
        else if (!$scope.AddressDetail.info.addressType) {
            $MessagService.caveat("请选择地址类型!");
            result = false
        }
        else if (!$scope.AddressDetail.info.deliveryProvinceCode || !$scope.AddressDetail.info.deliveryCityCode || !$scope.AddressDetail.info.deliveryDistrictCode) {
            $MessagService.caveat("请输入联系人地址!");
            result = false
        }
        return result;
    }

    $scope.load = function () {
        if ($stateParams.addopt) {
            $scope.GetListServer.AddressView();
        }
    }
    $scope.load();
})