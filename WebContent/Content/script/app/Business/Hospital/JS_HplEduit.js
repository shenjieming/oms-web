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
            $scope.SelectInfo.Province.getProvinceList();
            if ($stateParams.hplopt) {
                $scope.hplopt = $stateParams.hplopt;
                $scope.HplPageInfo.GetDlOrgDetail();
                $scope.SelectInfo.City.getCityList();
                $scope.SelectInfo.District.getDistrictList();
            }

        },
        checkIs: function () {
            $scope.HplPageInfo.Info.isEnable = !$scope.HplPageInfo.Info.isEnable
        },
        GetDlOrgDetail: function () {
            /// <summary>获取医院详情</summary>
            $Api.ManaHospital.GetqueryAllHospital({ hPCode: $scope.hplopt }, function (rData) {
                $scope.HplPageInfo.Info = rData.rows[0];
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
            else if (!$scope.HplPageInfo.Info.hPProvinceCode || !$scope.HplPageInfo.Info.hPCityCode || !$scope.HplPageInfo.Info.hPDistrictCode) {
                $MessagService.caveat("请维护该医院地址！");
                result = false;
            }
            return result;
        },
        Save: function () {
            /// <summary>医院组操作</summary>)
            if ($scope.HplPageInfo.verification()) {
                console.log($scope.HplPageInfo.Info)
                $Api.ManaHospital.Save($scope.HplPageInfo.Info, function (rData) {
                    $MessagService.succ("医院保存成功！");
                    self.location = 'index.html#/app/business/hplmanagement';
                })
            }
        },
    }
    $scope.SelectInfo = {
        Province: {
            //省份类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Province.dic.length; i++) {
                    if ($scope.SelectInfo.Province.dic[i].postcode == $scope.HplPageInfo.Info.hPProvinceCode) {
                        $scope.HplPageInfo.Info.hPProvinceCodeName = $scope.SelectInfo.Province.dic[i].divName;
                        $scope.HplPageInfo.Info.hPDistrictCode = "";
                        $scope.HplPageInfo.Info.hPCityCode = "";
                        $scope.SelectInfo.City.getCityList()// 市区下拉 
                        return;
                    }
                }
            },
            getProvinceList: function () {
                /// <summary>获取省份列表</summary>
                $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) {
                    $scope.SelectInfo.Province.dic = rData.rows;
                    console.log(rData)
                });
            }
        },
        City: {
            //市区类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>市区修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.City.dic.length; i++) {
                    if ($scope.SelectInfo.City.dic[i].divCode == $scope.HplPageInfo.Info.hPCityCode) {
                        $scope.HplPageInfo.Info.hPCityCodeName = $scope.SelectInfo.City.dic[i].divName;
                        $scope.HplPageInfo.Info.hPDistrictCode = "";
                        $scope.SelectInfo.District.getDistrictList()// 市区下拉 
                        return;
                    }
                }
            },
            getCityList: function () {
                /// <summary>获取市区列表</summary>
                if ($scope.HplPageInfo.Info.hPProvinceCode) {
                    var option = { level: "2", parentDivCode: $scope.HplPageInfo.Info.hPProvinceCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.City.dic = rData.rows;
                        console.log(rData.rows)
                    });
                } else {
                    $scope.SelectInfo.City.dic = new Array();
                }
            }
        },
        District: {
            //区域类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>区域列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.District.dic.length; i++) {
                    if ($scope.SelectInfo.District.dic[i].divCode == $scope.HplPageInfo.Info.hPDistrictCode) {
                        $scope.HplPageInfo.Info.hPDistrictCodeName = $scope.SelectInfo.District.dic[i].divName;
                        return;
                    }
                }
            },
            getDistrictList: function () {
                /// <summary>获取区域列表</summary>
                if ($scope.HplPageInfo.Info.hPCityCode && $scope.HplPageInfo.Info.hPProvinceCode) {
                    var option = { level: "3", parentDivCode: $scope.HplPageInfo.Info.hPCityCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.District.dic = rData.rows;
                    });
                } else {
                    $scope.SelectInfo.District.dic = new Array();
                }
            }
        },
    }
    $scope.HplPageInfo.Load();
})