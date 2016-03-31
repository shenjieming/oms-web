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
            $Api.RepresentativeService.GetDelivery(paramData, function (rData) {
                $scope.AddressList.info = rData;
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

    $scope.AddressDetail = {
        Info: { countryCode: "CN", countryCodeName: "中国" },
        ShowAdd: function (row) {
            $scope.AddressDetail.model.show();
            $scope.AddressDetail.Info = row;
            $scope.AddressDetail.Info.isDefaultPerAddressType = "Y";
            $scope.AddressDetail.Info.userID = $scope.User.userInfo.userId;
            $scope.AddressDetail.Info.countryCode = "CN";
            $scope.AddressDetail.Info.countryCodeName = "中国";
            if ($scope.AddressDetail.Info.isDefaultPerAddressType == "Y") {
                $scope.AddressDetail.Info.checkisDefaultPerAddressType = true;
            }

            $scope.Server.List();
        },
        ShowEdit: function () {
            var adree = $scope.getSelectedRow();
            if (adree) {
                $scope.AddressDetail.model.show();
                $scope.AddressDetail.Info.countryCode = "CN";
                $scope.AddressDetail.Info.countryCodeName = "中国";
                $scope.AddressDetail.Info.userID = $scope.User.userInfo.userId;
                $Api.MyAddress.GetbizDataMyAddressList(adree, function (rData) {
                    $scope.AddressDetail.Info = rData.rows[0];
                    console.log(rData)
                })
                $scope.Server.List();
                if ($scope.AddressDetail.Info.isDefaultPerAddressType == "Y") {
                    $scope.AddressDetail.Info.checkisDefaultPerAddressType = true;
                } else {
                    $scope.AddressDetail.Info.checkisDefaultPerAddressType = false;
                }


            } else {
                $MessagService.caveat("请选择一条编辑的地址信息！")
            }
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.AddressDetail.Info.provinceCode || !$scope.AddressDetail.Info.cityCode || !$scope.AddressDetail.Info.districtCode) {
                $MessagService.caveat("请维护地址信息！");
                result = false;
            }
            else if (!$scope.AddressDetail.Info.contact) {
                $MessagService.caveat("请维护该用户姓名！");
                result = false;
            }
            else if (!$scope.AddressDetail.Info.mobile) {
                $MessagService.caveat("请维护该用户手机！");
                result = false;
            }
            else if (!$scope.AddressDetail.Info.carrierTransType) {
                $MessagService.caveat("请维护该用户送货方式！");
                result = false;
            }
            return result;
        },
        Save: function () {
            console.log($scope.AddressDetail.Info)
            if ($scope.AddressDetail.verification()) {
                $scope.AddressDetail.Info.isDefaultPerAddressType = $scope.AddressDetail.Info.checkisDefaultPerAddressType ? "Y" : "N";
                $Api.RepresentativeService.SaveAddress($scope.AddressDetail.Info, function (rData) {
                    $MessagService.succ("该信息保存成功！");
                    $scope.AddressList.GetAddressList();
                })
            }

            $scope.AddressDetail.model.hide();
        },
        cancel: function () {
            $scope.AddressDetail.model.hide();
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
    $scope.AddressDetail.model = { title: "配置模板", width: 800, height: 300, buttons: { "保存": $scope.AddressDetail.Save, "取消": $scope.AddressDetail.cancel } }
    $scope.Server = {
        List: function () {
            $scope.SelectInfo.Province.getProvinceList();
            $scope.SelectInfo.City.getCityList();
            $scope.SelectInfo.District.getDistrictList();
            $scope.SelectInfo.CarrierTransType.getCarrierTransTypeList();
            $scope.SelectInfo.AddressType.getAddressTypeList();

        }
    }
    /// 下拉框开启
    $scope.SelectInfo = {
        Province: {
            //省份类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>省份列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Province.dic.length; i++) {
                    if ($scope.SelectInfo.Province.dic[i].divCode == $scope.AddressDetail.Info.provinceCode) {
                        $scope.AddressDetail.Info.provinceCodeName = $scope.SelectInfo.Province.dic[i].divName;
                        $scope.AddressDetail.Info.cityCode = "";
                        $scope.AddressDetail.Info.districtCode = "";
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
                /// <summary>省份市区修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.City.dic.length; i++) {
                    console.log($scope.AddressDetail.Info.cityCode)
                    if ($scope.SelectInfo.City.dic[i].divCode == $scope.AddressDetail.Info.cityCode) {
                        $scope.AddressDetail.Info.cityCodeName = $scope.SelectInfo.City.dic[i].divName;
                        $scope.AddressDetail.Info.districtCode = "";
                        $scope.SelectInfo.District.getDistrictList()// 市区下拉 
                        return;
                    }
                }
            },
            getCityList: function () {
                /// <summary>获取市区列表</summary>
                if ($scope.AddressDetail.Info.provinceCode) {
                    var option = { level: "2", parentDivCode: $scope.AddressDetail.Info.provinceCode }
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
                    if ($scope.SelectInfo.District.dic[i].divCode == $scope.AddressDetail.Info.districtCode) {
                        $scope.AddressDetail.Info.districtCodeName = $scope.SelectInfo.District.dic[i].divName;
                        return;
                    }
                }
            },
            getDistrictList: function () {
                /// <summary>获取区域列表</summary>
                if ($scope.AddressDetail.Info.cityCode && $scope.AddressDetail.Info.provinceCode) {
                    var option = { level: "3", parentDivCode: $scope.AddressDetail.Info.cityCode }
                    $Api.BasisService.GetadmdivisionList(option, function (rData) {
                        $scope.SelectInfo.District.dic = rData.rows;
                        console.log(rData)
                    });
                } else {
                    $scope.SelectInfo.District.dic = new Array();
                }
            }
        },
        CarrierTransType: {
            dic: new Array(),
            change: function (item) {
                /// <summary>区域列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.CarrierTransType.dic.length; i++) {
                    if ($scope.SelectInfo.CarrierTransType.dic[i].id == $scope.AddressDetail.Info.carrierTransType) {
                        $scope.AddressDetail.Info.carrierTransTypeName = $scope.SelectInfo.CarrierTransType.dic[i].text;
                        return;
                    }
                }
            },
            getCarrierTransTypeList: function () {
                $Api.Public.GetDictionary({ dictType: "TRANTP" }, function (rData) {
                    $scope.SelectInfo.CarrierTransType.dic = rData;
                    console.log(rData)
                })
            }
        },
        AddressType: {
            dic: new Array(),
            change: function (item) {
                /// <summary>区域列表修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.AddressType.dic.length; i++) {
                    if ($scope.SelectInfo.AddressType.dic[i].id == $scope.AddressDetail.Info.addressType) {
                        $scope.AddressDetail.Info.addressTypeName = $scope.SelectInfo.AddressType.dic[i].text;
                        return;
                    }
                }
            },
            getAddressTypeList: function () {
                $Api.Public.GetDictionary({ dictType: "ADDRTP" }, function (rData) {
                    $scope.SelectInfo.AddressType.dic = rData;
                    console.log(rData)
                })
            }
        }

    }
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