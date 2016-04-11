/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("HplEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>医院新增</summary>
    $scope.HplPageInfo = {
        Info: { hPCountryCode: "CN", hPCountryCodeName: "中国" },
        Load: function (callback) {
            if ($stateParams.hplopt) {
                $scope.hplopt = $stateParams.hplopt;
                $scope.HplPageInfo.GetDlOrgDetail();
            }
            $scope.SelectInfo.Hosptail.getHosptailList();
        },
        checkIs: function () {
            $scope.HplPageInfo.Info.isEnable = !$scope.HplPageInfo.Info.isEnable
        },
        GetDlOrgDetail: function () {
            /// <summary>获取医院详情</summary>
            $Api.ManaHospital.GetqueryAllHospital({ hPCode: $scope.hplopt }, function (rData) {
                $scope.HplPageInfo.Info = rData.rows[0];
                $scope.HplPageInfo.Info.deliveryProvinceCode = rData.rows[0].hPProvinceCode;
                $scope.HplPageInfo.Info.deliveryCityCode = rData.rows[0].hPCityCode;
                $scope.HplPageInfo.Info.deliveryDistrictCode = rData.rows[0].hPDistrictCode;
                console.log($scope.HplPageInfo.Info)
            })
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.HplPageInfo.Info.hPName) {
                $MessagService.caveat("请维护该医院名称！");
                result = false;
            }
            else if (!$scope.HplPageInfo.Info.hPFullName) {
                $MessagService.caveat("请维护该医院全称！");
                result = false;
            }
            else if (!$scope.HplPageInfo.Info.hPLevel) {
                $MessagService.caveat("请维护该医院等级编码！");
                result = false;
            }
            else if (!$scope.HplPageInfo.Info.deliveryCityCode || !$scope.HplPageInfo.Info.deliveryDistrictCode || !$scope.HplPageInfo.Info.deliveryProvinceCode || !$scope.HplPageInfo.Info.hPAddress) {
                $MessagService.caveat("请维护该医院地址！");
                result = false;
            }
            return result;
        },
        Save: function () {
            /// <summary>医院组操作</summary>)
            if ($scope.HplPageInfo.verification()) {
                $scope.HplPageInfo.Info.hPProvinceCode = $scope.HplPageInfo.Info.deliveryProvinceCode;
                $scope.HplPageInfo.Info.hPCityCode = $scope.HplPageInfo.Info.deliveryCityCode;
                $scope.HplPageInfo.Info.hPDistrictCode = $scope.HplPageInfo.Info.deliveryDistrictCode;
                console.log($scope.HplPageInfo.Info)
                $Api.ManaHospital.Save($scope.HplPageInfo.Info, function (rData) {
                    $MessagService.succ("医院保存成功！");
                    $scope.goView('app.base.business.hplmanagement')
                })
            }
        },
    }
    $scope.SelectInfo = {
        Hosptail: {
            dic: new Array(),
            getHosptailList:function(){
                $Api.Public.GetDictionary({ dictType: "HSPLVL" }, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData;
                })
            }        
        }
    }
    $scope.HplPageInfo.Load();
})