/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("WareHouseEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>仓库新增</summary>
    $scope.whPageInfo = {
        Info: {wHCountryCode:"CN",wHCountryCodeName:"中国",wHWithOrderCenter:"Y"},
        Load: function (callback) {
            if ($stateParams.whopt) {
                $scope.whopt = $stateParams.whopt;
                $scope.whPageInfo.GetWherehouseDetail();
            }
            if ($scope.whPageInfo.Info.wHWithOrderCenter=="Y") {
                $scope.whPageInfo.Info.iswHWithOrderCenter = true;
            }
            $scope.Server.SelectInfo();
        },
        GetWherehouseDetail: function () {
            /// <summary>获取仓库详情</summary>
            $Api.ManaWareHouse.GetqueryWareHouseDetail({ orgCode: $scope.whopt }, function (rData) {
                $scope.whPageInfo.Info = rData;
                console.log($scope.whPageInfo.Info)
                if ($scope.whPageInfo.Info.wHWithOrderCenter == "Y") {
                    $scope.whPageInfo.Info.iswHWithOrderCenter = true;
                } else {
                    $scope.whPageInfo.Info.iswHWithOrderCenter = false;
                }
                $scope.whPageInfo.Info.deliveryProvinceCode = rData.wHProvinceCode;
                $scope.whPageInfo.Info.deliveryCityCode = rData.wHCityCode;
                $scope.whPageInfo.Info.deliveryDistrictCode = rData.wHDistrictCode;
            })
        },
        isCheck: function(){
            $scope.whPageInfo.Info.iswHWithOrderCenter = !$scope.whPageInfo.Info.iswHWithOrderCenter;
            $scope.whPageInfo.Info.iswHWithOrderCenter = $scope.whPageInfo.Info.iswHWithOrderCenter ? "Y" : "N";
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.whPageInfo.Info.wHName) {
                $MessagService.caveat("请维护该仓库名称！");
                result = false;
            }
            else if (!$scope.whPageInfo.Info.wHProvinceCode || !$scope.whPageInfo.Info.wHCityCode || !$scope.whPageInfo.Info.wHDistrictCode || !$scope.whPageInfo.Info.wHAddress) {
                $MessagService.caveat("请维护该仓库地址！");
                result = false;
            } else if (!$scope.whPageInfo.Info.contact1Name || !$scope.whPageInfo.Info.contact1Mobile || !$scope.whPageInfo.Info.contact1Tel ||
                !$scope.whPageInfo.Info.contact1Email || !$scope.whPageInfo.Info.contact1Func || !$scope.whPageInfo.Info.contact1PMsgType) {
                $MessagService.caveat("请维护该仓库联系人信息！");
                result = false;
            }
            return result;
        },
        Save: function () {
            /// <summary>仓库组操作</summary>
            if ($scope.whPageInfo.verification()) {
                $scope.whPageInfo.Info.wHProvinceCode = $scope.whPageInfo.Info.deliveryProvinceCode;
                $scope.whPageInfo.Info.wHCityCode = $scope.whPageInfo.Info.deliveryCityCode;
                $scope.whPageInfo.Info.wHDistrictCode = $scope.whPageInfo.Info.deliveryDistrictCode;
                $Api.ManaWareHouse.Save($scope.whPageInfo.Info, function (rData) {
                    $MessagService.succ("仓库保存成功！");
                    $scope.goView('app.base.business.whmanagement');
                })
            }
        },
    }


    $scope.Server = {
        SelectInfo: function () {
            $scope.SelectInfo.contact1Func.getcontact1FuncList();//联系人用途
            $scope.SelectInfo.contact1PMsgType.getcontact1PMsgTypeList(); //通讯工具
            $scope.SelectInfo.contact2Func.getcontact2FuncList();//联系人用途
            $scope.SelectInfo.contact2PMsgType.getcontact2PMsgTypeList();// 通讯工具
            $scope.SelectInfo.contact3Func.getcontact3FuncList();//联系人用途
            $scope.SelectInfo.contact3PMsgType.getcontact3PMsgTypeList(); //通讯工具
        }
    }

    $scope.SelectInfo = {
        contact1Func: {
            dic: new Array(),
            getcontact1FuncList: function () {
                /// <summary>获取第一联系人用途类型</summary>
                $Api.Public.GetDictionary({ dictType: "CTCFUN" }, function (rData) {
                    $scope.SelectInfo.contact1Func.dic = rData;
                    console.log(rData)
                    if (!$scope.whPageInfo.Info.contact1Func) {
                        $scope.whPageInfo.Info.contact1Func = "DAL"
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
                    if (!$scope.whPageInfo.Info.contact1PMsgType) {
                        $scope.whPageInfo.Info.contact1PMsgType = "QQ"
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

    //$scope.SelectInfo = {
    //    Province: {
    //        //省份类型下拉框  
    //        dic: new Array(),
    //        change: function (item) {
    //            /// <summary>省份列表修改事件</summary>
    //            for (var i = 0; i < $scope.SelectInfo.Province.dic.length; i++) {
    //                if ($scope.SelectInfo.Province.dic[i].divCode == $scope.whPageInfo.Info.wHProvinceCode) {
    //                    $scope.whPageInfo.Info.wHProvinceCodeName = $scope.SelectInfo.Province.dic[i].divName;
    //                    $scope.whPageInfo.Info.wHCityCode = "";
    //                    $scope.whPageInfo.Info.wHDistrictCode = "";
    //                    $scope.SelectInfo.City.getCityList()// 市区下拉 
    //                    return;
    //                }
    //            }
    //        },
    //        getProvinceList: function () {
    //            /// <summary>获取省份列表</summary>
    //            $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) {
    //                if (!rData.code) {
    //                    $scope.SelectInfo.Province.dic = rData.rows;
    //                    console.log(rData)
    //                };
    //            });
    //        }
    //    },
    //    City: {
    //        //市区类型下拉框  
    //        dic: new Array(),
    //        change: function (item) {
    //            /// <summary>省份市区修改事件</summary>
    //            for (var i = 0; i < $scope.SelectInfo.City.dic.length; i++) {
    //                console.log($scope.whPageInfo.Info.wHCityCode)
    //                if ($scope.SelectInfo.City.dic[i].divCode == $scope.whPageInfo.Info.wHCityCode) {
    //                    $scope.whPageInfo.Info.wHCityCodeName = $scope.SelectInfo.City.dic[i].divName;
    //                    $scope.whPageInfo.Info.wHDistrictCode = "";
    //                    $scope.SelectInfo.District.getDistrictList()// 市区下拉 
    //                    return;
    //                }
    //            }
    //        },
    //        getCityList: function () {
    //            /// <summary>获取市区列表</summary>
    //            if ($scope.whPageInfo.Info.wHProvinceCode) {
    //                var option = { level: "2", parentDivCode: $scope.whPageInfo.Info.wHProvinceCode }
    //                $Api.BasisService.GetadmdivisionList(option, function (rData) {
    //                    $scope.SelectInfo.City.dic = rData.rows;
    //                    console.log(rData)
    //                });
    //            } else {
    //                $scope.SelectInfo.City.dic = new Array();
    //            }
    //        }
    //    },
    //    District: {
    //        //区域类型下拉框  
    //        dic: new Array(),
    //        change: function (item) {
    //            /// <summary>区域列表修改事件</summary>
    //            for (var i = 0; i < $scope.SelectInfo.District.dic.length; i++) {
    //                if ($scope.SelectInfo.District.dic[i].divCode == $scope.whPageInfo.Info.wHDistrictCode) {
    //                    $scope.whPageInfo.Info.wHDistrictCodeName = $scope.SelectInfo.District.dic[i].divName;
    //                    return;
    //                }
    //            }
    //        },
    //        getDistrictList: function () {
    //            /// <summary>获取区域列表</summary>
    //            if ($scope.whPageInfo.Info.wHCityCode && $scope.whPageInfo.Info.wHProvinceCode) {
    //                var option = { level: "3", parentDivCode: $scope.whPageInfo.Info.wHCityCode }
    //                $Api.BasisService.GetadmdivisionList(option, function (rData) {
    //                    $scope.SelectInfo.District.dic = rData.rows;
    //                    console.log(rData)
    //                });
    //            } else {
    //                $scope.SelectInfo.District.dic = new Array();
    //            }
    //        }
    //    },
    //}
    $scope.whPageInfo.Load();
})
