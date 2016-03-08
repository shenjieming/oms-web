/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>货主新增</summary>
    $scope.oiPageInfo = {
        Info: { corpRegCountryCodeName: "中国", corpRegCountryCode: "CN", corpBizCountryCode: "CN", corpBizCountryCodeName: "中国" },
        Load: function (callback) {
            $scope.Server.SelectInfo();
            if ($stateParams.oiopt) {
                $scope.oiopt = $stateParams.oiopt;
                $scope.oiPageInfo.GetOiOrgDetail();
                $scope.SelectInfo.City.getCityList();
                $scope.SelectInfo.District.getDistrictList();
                $scope.SelectInfo.BizCity.getBizCityList();
                $scope.SelectInfo.BizDistrict.getBizDistrictList();

            }
        },
        GetOiOrgDetail: function () {
            /// <summary>获取货主详情</summary>
            $Api.ManageOi.GetqueryOwnerOfInventoryDetail({ orgCode: $scope.oiopt }, function (rData) {
                $scope.oiPageInfo.Info = rData;
                console.log($scope.oiPageInfo.Info)
            })
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.oiPageInfo.Info.oITypeName) {
                $MessagService.caveat("请维护该货主组织类型！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.oIName) {
                $MessagService.caveat("请维护该货主名称！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.oIShortCode) {
                $MessagService.caveat("请维护该货主货主编码(短号)！");
                result = false;
            } else if (!$scope.oiPageInfo.Info.corpRegCompanyName) {
                $MessagService.caveat("请维护该货主注册名称！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.corpRegNo) {
                $MessagService.caveat("请维护该货主注册编码！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.corpRegCurrencyCode) {
                $MessagService.caveat("请维护该货主注册币种！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.corpRegProvinceCode || !$scope.oiPageInfo.Info.corpRegCityCode || !$scope.oiPageInfo.Info.corpRegDistrictCode
                || !$scope.oiPageInfo.Info.corpRegAddress) {
                $MessagService.caveat("请维护该货主企业地址！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.corpBizProvinceCode || !$scope.oiPageInfo.Info.corpBizCityCode || !$scope.oiPageInfo.Info.corpBizDistrictCode
           || !$scope.oiPageInfo.Info.corpBizAddress) {
                $MessagService.caveat("请维护该货主运营地址！");
                result = false;
            }
            else if (!$scope.oiPageInfo.Info.contact1Name || !$scope.oiPageInfo.Info.contact1Mobile || !$scope.oiPageInfo.Info.contact1Tel
             || !$scope.oiPageInfo.Info.contact1Email || !$scope.oiPageInfo.Info.contact1Func || !$scope.oiPageInfo.Info.contact1PMsgType) {
                $MessagService.caveat("请维护一个联系人信息！");
                result = false;
            }
            return result;
        },
        Save: function () {
            /// <summary>货主组操作</summary>
            console.log($scope.oiPageInfo.Info)
            if ($scope.oiPageInfo.verification()) {
                $Api.ManageOi.Save($scope.oiPageInfo.Info, function (rData) {
                    $MessagService.succ("货主保存成功！");
                    self.location = 'index.html#/app/business/oiorganization';
                })
            }
        },
    }

    $scope.Server = {
        SelectInfo: function () {
            $scope.SelectInfo.oiType.getoiTypeList();//货主下拉
            $scope.SelectInfo.Province.getProvinceList()// 注册省份下拉
            $scope.SelectInfo.BizProvince.getBizProvinceList()// 运营省份下拉
            $scope.SelectInfo.Currency.getCurrencyList();
        }

    }



    $scope.SelectInfo = {
        oiType: {
            //货主类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>角色类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.oiType.dic.length; i++) {
                    if ($scope.SelectInfo.oiType.dic[i].id == $scope.oiPageInfo.Info.oIType) {
                        $scope.oiPageInfo.Info.oITypeName = $scope.SelectInfo.oiType.dic[i].text;
                        return;
                    }
                }
            },
            getoiTypeList: function () {
                /// <summary>获取货主类型</summary>
                $Api.Public.GetDictionary({ dictType: "OITYPE" }, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.oiType.dic = rData;
                        console.log(rData)
                    };
                });
            },
        },
        Currency: {
            dic: new Array(),
            change: function (item) {
                /// <summary>币别类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Currency.dic.length; i++) {
                    if ($scope.SelectInfo.Currency.dic[i].currencyCode == $scope.oiPageInfo.Info.corpRegCurrencyCode) {
                        $scope.oiPageInfo.Info.corpRegCurrencyCodeName = $scope.SelectInfo.Currency.dic[i].currencyName;
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
////   注册地址开启
        Province: {
            //省份类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Province.dic.length; i++) {
                    if ($scope.SelectInfo.Province.dic[i].divCode == $scope.oiPageInfo.Info.corpRegProvinceCode) {
                        $scope.oiPageInfo.Info.corpRegProvinceCodeName = $scope.SelectInfo.Province.dic[i].divName;
                        $scope.oiPageInfo.Info.corpRegCityCode = "";
                        $scope.oiPageInfo.Info.corpRegDistrictCode = "";
                        $scope.SelectInfo.City.getCityList()// 市区下拉 
                        return;
                    }
                }
            },
            getProvinceList: function () {
                /// <summary>获取省份列表</summary>
                $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) {
                        $scope.SelectInfo.Province.dic = rData.rows;
                });
            }
        },
        City: {
            //城市类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份市区修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.City.dic.length; i++) {
                    if ($scope.SelectInfo.City.dic[i].divCode == $scope.oiPageInfo.Info.corpRegCityCode) {
                        $scope.oiPageInfo.Info.corpRegCityCodeName = $scope.SelectInfo.City.dic[i].divName;
                        $scope.oiPageInfo.Info.corpRegDistrictCode = "";
                        $scope.SelectInfo.District.getDistrictList()// 市区下拉 
                        return;
                    }
                }
            },
            getCityList: function () {
                /// <summary>获取市区列表</summary>
                if ($scope.oiPageInfo.Info.corpRegProvinceCode) {
                    var option = { level: "2", parentDivCode: $scope.oiPageInfo.Info.corpRegProvinceCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.City.dic = rData.rows;
                        console.log(rData)
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
                    console.log($scope.oiPageInfo.Info.corpRegDistrictCode)
                    if ($scope.SelectInfo.District.dic[i].divCode == $scope.oiPageInfo.Info.corpRegDistrictCode) {
                        $scope.oiPageInfo.Info.corpRegDistrictCodeName = $scope.SelectInfo.District.dic[i].divName;
                        console.log($scope.oiPageInfo.Info.corpRegDistrictCodeName)
                        return;
                    }
                }
            },
            getDistrictList: function () {
                /// <summary>获取区域列表</summary>
                if ($scope.oiPageInfo.Info.corpRegCityCode && $scope.oiPageInfo.Info.corpRegProvinceCode) {
                    var option = { level: "3", parentDivCode: $scope.oiPageInfo.Info.corpRegCityCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.District.dic = rData.rows;
                    });
                } else {
                    $scope.SelectInfo.District.dic = new Array();
                }
            }
        },
///   注册地址关闭
///  运营地址开启
        BizProvince: {
            //省份类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.BizProvince.dic.length; i++) {
                    if ($scope.SelectInfo.BizProvince.dic[i].divCode == $scope.oiPageInfo.Info.corpBizProvinceCode) {
                        $scope.oiPageInfo.Info.corpBizProvinceCodeName = $scope.SelectInfo.BizProvince.dic[i].divName;
                        $scope.oiPageInfo.Info.corpBizCityCode = "";
                        $scope.oiPageInfo.Info.corpBizDistrictCode = "";
                        $scope.SelectInfo.BizCity.getBizCityList()// 市区下拉 
                        return;
                    }
                }
            },
            getBizProvinceList: function () {
                /// <summary>获取省份列表</summary>
                $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.BizProvince.dic = rData.rows;
                        console.log(rData)
                    };
                });
            }
        },
        BizCity: {
            //市区类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份市区修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.BizCity.dic.length; i++) {
                    if ($scope.SelectInfo.BizCity.dic[i].divCode == $scope.oiPageInfo.Info.corpBizCityCode) {
                        $scope.oiPageInfo.Info.corpBizCityCodeName = $scope.SelectInfo.BizCity.dic[i].divName;
                        $scope.oiPageInfo.Info.corpBizDistrictCode = "";
                        console.log($scope.oiPageInfo.Info.corpBizCityCodeName)
                        console.log($scope.oiPageInfo.Info.corpBizCityCode)
                        $scope.SelectInfo.BizDistrict.getBizDistrictList()// 市区下拉 
                        return;
                    }
                }
            },
            getBizCityList: function () {
                /// <summary>获取市区列表</summary>
                if ($scope.oiPageInfo.Info.corpBizProvinceCode) {
                    var option = { level: "2", parentDivCode: $scope.oiPageInfo.Info.corpBizProvinceCode }
                    console.log(option)
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.BizCity.dic = rData.rows;
                        console.log(rData)
                    });
                } else {
                    $scope.SelectInfo.BizCity.dic = new Array();
                }
            }
        },
        BizDistrict: {
            //区域类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>区域列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.BizDistrict.dic.length; i++) {
                    if ($scope.SelectInfo.BizDistrict.dic[i].divCode == $scope.oiPageInfo.Info.corpBizDistrictCode) {
                        $scope.oiPageInfo.Info.corpBizDistrictCodeName = $scope.SelectInfo.BizDistrict.dic[i].divName;
                        return;
                    }
                }
            },
            getBizDistrictList: function () {
                /// <summary>获取区域列表</summary>
                if ($scope.oiPageInfo.Info.corpBizCityCode && $scope.oiPageInfo.Info.corpBizProvinceCode) {
                    var option = { level: "3", parentDivCode: $scope.oiPageInfo.Info.corpBizCityCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.BizDistrict.dic = rData.rows;
                        console.log(rData)
                    });
                } else {
                    $scope.SelectInfo.BizDistrict.dic = new Array();
                }
            }
        },
////运营地址关闭
    }
    $scope.oiPageInfo.Load();
})
