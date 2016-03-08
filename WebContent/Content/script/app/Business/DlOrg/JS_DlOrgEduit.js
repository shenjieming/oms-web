/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/sys tem/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>经销商新增</summary>
    $scope.dlPageInfo = {
        Info: { corpRegCountryCodeName: "中国", corpRegCountryCode: "CN", certStatus:"Y"},
        Load: function (callback) {
            $scope.SelectInfo.Province.getProvinceList();
            $scope.SelectInfo.Currency.getCurrencyList();
            if ($stateParams.dlopt) {
                $scope.dlopt = $stateParams.dlopt;
                $scope.dlPageInfo.GetDlOrgDetail();
                $scope.SelectInfo.City.getCityList();
                $scope.SelectInfo.District.getDistrictList();
            }
            if ($scope.dlPageInfo.Info.certStatus=="Y") {
                $scope.dlPageInfo.Info.iscertStatus = true;
            }
        },
        checkIs: function () {
            $scope.dlPageInfo.Info.iscertStatus = !$scope.dlPageInfo.Info.iscertStatus;
        },
        GetDlOrgDetail: function () {
            /// <summary>获取经销商详情</summary>
            $Api.ManageDl.GetqueryDealerDetail({ orgCode: $scope.dlopt }, function (rData) {
                $scope.dlPageInfo.Info = rData;
                console.log(rData)
                if ($scope.dlPageInfo.Info.certStatus == "Y") {
                    $scope.dlPageInfo.Info.iscertStatus = true;
                } else {
                    $scope.dlPageInfo.Info.iscertStatus = false;
                }
            })
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.dlPageInfo.Info.dLName) {
                $MessagService.caveat("请维护该经销商名称！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegCompanyName) {
                $MessagService.caveat("请维护该经销商注册名称！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegNo) {
                $MessagService.caveat("请维护该经销商注册编码！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegProvinceCode || !$scope.dlPageInfo.Info.corpRegCityCode || !$scope.dlPageInfo.Info.corpRegProvinceCode || !$scope.dlPageInfo.Info.corpRegAddress) {
                $MessagService.caveat("请维护该经销商地址！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegCurrencyCode) {
                $MessagService.caveat("请维护该经销商注册币别！");
                result = false;
            }
            return result;
        },

        Save: function () {
            /// <summary>经销商组操作</summary>
            console.log($scope.dlPageInfo.Info)
            if ($scope.dlPageInfo.verification()) {
                if ($scope.dlPageInfo.Info.iscertStatus) {
                    $scope.dlPageInfo.Info.certStatus = "Y";
                } else {
                    $scope.dlPageInfo.Info.certStatus = "N";
                }
                $Api.ManageDl.Save($scope.dlPageInfo.Info, function (rData) {
                    $MessagService.succ("用户保存成功！");
                    self.location = 'index.html#/app/business/dlorganization';
                })
            }
        },
    }
    $scope.SelectInfo = {
        Currency: {
            dic: new Array(),
            change: function (item) {
                /// <summary>币别类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Currency.dic.length; i++) {
                    if ($scope.SelectInfo.Currency.dic[i].currencyCode == $scope.dlPageInfo.Info.corpRegCurrencyCode) {
                        $scope.dlPageInfo.Info.corpRegCurrencyCodeName = $scope.SelectInfo.Currency.dic[i].currencyName;
                        return;
                    }
                }
            },
            getCurrencyList: function () {
                /// <summary>获取币别类型</summary>
                $Api.BasisService.GetCurrencyList({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.Currency.dic = rData.rows;
                        console.log(rData)
                    };
                });
            },
        },
        Province: {
            //省份类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Province.dic.length; i++) {
                    if ($scope.SelectInfo.Province.dic[i].divCode == $scope.dlPageInfo.Info.corpRegProvinceCode) {
                        $scope.dlPageInfo.Info.corpRegProvinceCodeName = $scope.SelectInfo.Province.dic[i].divName;
                        $scope.dlPageInfo.Info.corpRegCityCode = "";
                        $scope.dlPageInfo.Info.corpRegDistrictCode = "";
                        $scope.SelectInfo.City.getCityList()// 市区下拉 
                        return;
                    }
                }
            },
            getProvinceList: function () {
                /// <summary>获取省份列表</summary>
                $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.Province.dic = rData.rows;
                    };
                });
            }
        },
        City: {
            //城市类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份市区修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.City.dic.length; i++) {
                    if ($scope.SelectInfo.City.dic[i].divCode == $scope.dlPageInfo.Info.corpRegCityCode) {
                        $scope.dlPageInfo.Info.corpRegCityCodeName = $scope.SelectInfo.City.dic[i].divName;
                        $scope.dlPageInfo.Info.corpRegDistrictCode = "";
                        $scope.SelectInfo.District.getDistrictList()// 市区下拉 
                        return;
                    }
                }
            },
            getCityList: function () {
                /// <summary>获取市区列表</summary>
                if ($scope.dlPageInfo.Info.corpRegProvinceCode) {
                    var option = { level: "2", parentDivCode: $scope.dlPageInfo.Info.corpRegProvinceCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.City.dic = rData.rows;
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
                    if ($scope.SelectInfo.District.dic[i].divCode == $scope.dlPageInfo.Info.corpRegDistrictCode) {
                        $scope.dlPageInfo.Info.corpRegDistrictCodeName = $scope.SelectInfo.District.dic[i].divName;
                        return;
                    }
                }
            },
            getDistrictList: function () {
                /// <summary>获取区域列表</summary>
                if ($scope.dlPageInfo.Info.corpRegCityCode && $scope.dlPageInfo.Info.corpRegProvinceCode) {
                    var option = { level: "3", parentDivCode: $scope.dlPageInfo.Info.corpRegCityCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.District.dic = rData.rows;
                    });
                } else {
                    $scope.SelectInfo.District.dic = new Array();
                }
            }
        },
    }
    $scope.dlPageInfo.Load();
})