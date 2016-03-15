/// <reference path="../../lib/angular-2.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-2.2.20/angular.min.js" />
/// <reference path="../../lib/angular-2.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-2.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-2.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-2.22.2.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>货主新增</summary>
    $scope.oiPageInfo = {
        Info: { corpRegCountryCodeName: "中国", corpRegCountryCode: "CN", corpBizCountryCode: "CN", corpBizCountryCodeName: "中国" },
        Load: function (callback) {
            if ($stateParams.oiopt) {
                $scope.oiopt = $stateParams.oiopt;
                $scope.oiPageInfo.GetOiOrgDetail();
            }
            $scope.Server.SelectInfo();
        },
        GetOiOrgDetail: function () {
            /// <summary>获取货主详情</summary>
            $Api.ManageOi.GetqueryOwnerOfInventoryDetail({ orgCode: $scope.oiopt }, function (rData) {
                $scope.oiPageInfo.Info = rData;
                console.log($scope.oiPageInfo.Info)
                $scope.oiPageInfo.Info.BackPackcorpRegCapital=$scope.oiPageInfo.Info.corpRegCapital/10000
                $scope.oiPageInfo.Info.deliveryProvinceCode = rData.corpRegProvinceCode;
                $scope.oiPageInfo.Info.deliveryCityCode = rData.corpRegCityCode;
                $scope.oiPageInfo.Info.deliveryDistrictCode = rData.corpRegDistrictCode;
                $scope.oiPageInfo.deliveryProvinceCode = rData.corpBizProvinceCode;
                $scope.oiPageInfo.deliveryCityCode = rData.corpBizCityCode;
                $scope.oiPageInfo.deliveryDistrictCode = rData.corpBizDistrictCode;
            })
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.oiPageInfo.Info.oIType) {
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
            else if (!$scope.oiPageInfo.Info.deliveryProvinceCode || !$scope.oiPageInfo.Info.deliveryCityCode || !$scope.oiPageInfo.Info.deliveryDistrictCode || !$scope.oiPageInfo.Info.corpRegAddress) {
                $MessagService.caveat("请维护该货主企业地址！");
                result = false;
            }
            else if (!$scope.oiPageInfo.deliveryProvinceCode || !$scope.oiPageInfo.deliveryCityCode || !$scope.oiPageInfo.deliveryDistrictCode || !$scope.oiPageInfo.Info.corpBizAddress) {
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
                $scope.oiPageInfo.Info.corpRegCapital = $scope.oiPageInfo.Info.BackPackcorpRegCapital * 10000
                $scope.oiPageInfo.Info.corpRegProvinceCode = $scope.oiPageInfo.Info.deliveryProvinceCode;
                $scope.oiPageInfo.Info.corpRegCityCode = $scope.oiPageInfo.Info.deliveryCityCode;
                $scope.oiPageInfo.Info.corpRegDistrictCode = $scope.oiPageInfo.Info.deliveryDistrictCode;
                $scope.oiPageInfo.Info.corpBizProvinceCode = $scope.oiPageInfo.deliveryProvinceCode;
                $scope.oiPageInfo.Info.corpBizCityCode = $scope.oiPageInfo.deliveryCityCode;
                $scope.oiPageInfo.Info.corpBizDistrictCode = $scope.oiPageInfo.deliveryDistrictCode;
                $Api.ManageOi.Save($scope.oiPageInfo.Info, function (rData) {
                    $MessagService.succ("货主保存成功！");
                    $scope.goView('app.business.oiorganization');
                })
            }
        },
    }

    $scope.Server = {
        SelectInfo: function () {
            $scope.SelectInfo.oiType.getoiTypeList();//货主下拉
            $scope.SelectInfo.Currency.getCurrencyList();//币别下拉框
            $scope.SelectInfo.contact1Func.getcontact1FuncList();//联系人用途
            $scope.SelectInfo.contact1PMsgType.getcontact1PMsgTypeList(); //通讯工具
            $scope.SelectInfo.contact2Func.getcontact2FuncList();//联系人用途
            $scope.SelectInfo.contact2PMsgType.getcontact2PMsgTypeList();// 通讯工具
            $scope.SelectInfo.contact3Func.getcontact3FuncList();//联系人用途
            $scope.SelectInfo.contact3PMsgType.getcontact3PMsgTypeList(); //通讯工具
        }

    }
    $scope.SelectInfo = {
        oiType: {
            //货主类型下拉框  
            dic: new Array(),
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
            //币别下拉框
            dic: new Array(),
            getCurrencyList: function () {
                /// <summary>获取币别类型</summary>
                $Api.BasisService.GetCurrencyList({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.Currency.dic = rData.rows;
                        console.log(rData)
                    };
                    if (!$scope.oiPageInfo.Info.corpRegCurrencyCode) {
                        $scope.oiPageInfo.Info.corpRegCurrencyCode = "CNY";
                    }
                });
            },
        },
        contact1Func: {
            dic: new Array(),
            getcontact1FuncList: function () {
                /// <summary>获取第一联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact1Func.dic = rData;
                    console.log(rData)
                    if (!$scope.oiPageInfo.Info.contact1Func) {
                        $scope.oiPageInfo.Info.contact1Func = "DAL"
                    }
                })
            },
        },
        contact1PMsgType: {
            dic: new Array(),
            getcontact1PMsgTypeList: function () {
                /// <summary>获取第一联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact1PMsgType.dic = rData;
                    console.log(rData)
                    if (!$scope.oiPageInfo.Info.contact1PMsgType) {
                        $scope.oiPageInfo.Info.contact1PMsgType = "QQ"
                    }
                })
            },
        },
        contact2Func: {
            dic: new Array(),
            getcontact2FuncList: function () {
                /// <summary>获取第2联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact2Func.dic = rData;
                })
            },
        },
        contact2PMsgType: {
            dic: new Array(),
            getcontact2PMsgTypeList: function () {
                /// <summary>获取第2联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact2PMsgType.dic = rData;
                })
            },
        },
        contact3Func: {
            dic: new Array(),
            getcontact3FuncList: function () {
                /// <summary>获取第3联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact3Func.dic = rData;
                })
            },
        },
        contact3PMsgType: {
            dic: new Array(),
            getcontact3PMsgTypeList: function () {
                /// <summary>获取第3联系人通讯工具<</summary>
                $Api.Public.GetDictionary({ dictType: "PMSGTP" }, function (rData) {
                    $scope.SelectInfo.contact3PMsgType.dic = rData;
                })
            },
        },

    }
    $scope.oiPageInfo.Load();
})
