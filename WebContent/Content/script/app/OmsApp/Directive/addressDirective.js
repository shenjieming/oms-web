﻿/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngAddress", function ($Api, $MessagService, $local) {
    /// <summary>常用地址选择器</summary>
    return {
        restrict: "EA", templateUrl: "Content/script/app/OmsApp/Directive/ui/ngAddress.html?data=" + Timestamp, scope: { ngModel: '=', ngOperat: "=" }, replace: true,
        link: function ($scope, element, attrs) {
            var userInfo = $local.getValue("USER").userInfo;
            var modelConfig = {
                title: "收货地址选择", width: 750, height: 400, buttons: {
                    "确定": function () { var dataRow = $local.getSelectedRow($scope.Service.AddressList); if (dataRow) { $scope.$apply(function () { $scope.ngOperat.fixed(dataRow); }); } else { $MessagService.caveat("请选择一条常用地址信息！"); } }, "关闭": function () { $scope.ngOperat.hide(); }
                },
                open: function () { $.extend($scope.operat, { isEdit: true, isDetail: false }); $scope.Service.GetAddressList(); $(".ui-dialog-buttonset").show(); if (userInfo.orgType != "DL") { $scope.operat.Button = false; } }
            };
            $scope.operat = {
                isEdit: true,//是否显示编辑信息
                isDetail: false,//是否显示明细信息
                Button: true,
                ChangeEdit: function () {
                    /// <summary>修改地址列表状态</summary>
                    var address = $local.getSelectedRow($scope.Service.AddressList); if (address) { $.extend($scope.operat, { isDetail: true, isEdit: false }); var parm = $.extend({ userID: userInfo.userId }, address); $Api.MyAddress.GetbizDataMyAddressDetail(parm, function (rData) { $scope.Service.AddressDetail = rData; $scope.SelectInfo.Province.getProvinceList(); $scope.SelectInfo.City.getCityList(); $scope.SelectInfo.District.getDistrictList(); $scope.SelectInfo.carrierTransType.getcarrierTransTypeList(); $(".ui-dialog-buttonset").hide(); }) } else { $MessagService.caveat("请选择编辑的信息！"); }
                },
                ChangeDetail: function () {
                    /// <summary>新增地址列表信息</summary>
                    $.extend($scope.operat, { isDetail: true, isEdit: false }); $scope.SelectInfo.Province.getProvinceList(); $scope.Service.AddressDetail = new Object(); if (!$scope.Service.AddressDetail.provinceCode) { $scope.SelectInfo.City.dic = new Array(); $scope.SelectInfo.District.dic = new Array(); } $(".ui-dialog-buttonset").hide(); $scope.SelectInfo.carrierTransType.getcarrierTransTypeList();
                },
                List: function () {
                    /// <summary>我的地址列表返回</summary>
                    $scope.operat.isDetail = !$scope.operat.isDetail; $scope.operat.isEdit = !$scope.operat.isEdit; $scope.Service.GetAddressList(); $(".ui-dialog-buttonset").show();
                },
                verification: function () {
                    var result = true; if (!$scope.Service.AddressDetail.contact) { result = false; $MessagService.caveat("请维护该联系人姓名！"); } else if (!$scope.Service.AddressDetail.mobile) { result = false; $MessagService.caveat("请维护该联系人号码！"); } else if (!$scope.Service.AddressDetail.provinceCode || !$scope.Service.AddressDetail.cityCode || !$scope.Service.AddressDetail.districtCode || !$scope.Service.AddressDetail.address) { result = false; $MessagService.caveat("请维护该联系人地址！"); } return result;
                },
                Save: function () {
                    if ($scope.operat.verification()) { $Api.RepresentativeService.SaveAddress($scope.Service.AddressDetail, function (rData) { $MessagService.succ("该信息保存成功！"); $.extend($scope.operat, { isDetail: !$scope.operat.isDetail, isEdit: !$scope.operat.isEdit }); $scope.Service.GetAddressList(); $(".ui-dialog-buttonset").show(); $scope.Service.AddressDetail = new Array(); }) }
                }
            }
            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Service = {
                AddressList: new Array(), AddressDetail: new Object(), GetAddressList: function () {
                    /// <summary>获取常用地址列表</summary>
                    $Api.RepresentativeService.GetDelivery({ sOCreateBy: $scope.ngModel.sOCreateBy }, function (rData) { $scope.Service.AddressList = rData; });
                }, DelAddress: function (data) {
                    /// <summary>删除地址列表</summary>
                    var param = { lineNo: data.lineNo }; if (confirm("您确认要删除该地址吗?")) { $Api.RepresentativeService.DeleteDelivery(param, function () { $scope.Service.GetAddressList(); }); }
                }
            };
            $scope.Service.GetAddressList();
            $scope.SelectInfo = {
                Province: {
                    //省份类型下拉框  
                    dic: new Array(),
                    change: function () {
                        /// <summary>省份列表修改事件</summary>     
                        $.extend($scope.Service.AddressDetail, { cityCode: "", districtCode: "" }); $scope.SelectInfo.District.dic = new Array(); $scope.SelectInfo.City.getCityList()
                    }, getProvinceList: function () {
                        /// <summary>获取省份列表</summary>
                        $Api.BasisService.GetadmdivisionList({ level: "1" }, function (rData) { $scope.SelectInfo.Province.dic = rData.rows; });
                    }
                },
                City: {
                    //市区类型下拉框  
                    dic: new Array(), change: function () {
                        /// <summary>省份市区修改事件</summary>     
                        $.extend($scope.Service.AddressDetail, { districtCode: "" }); $scope.SelectInfo.District.getDistrictList()
                    }, getCityList: function () {
                        /// <summary>获取市区列表</summary>
                        if ($scope.Service.AddressDetail.provinceCode) { var option = { level: "2", parentDivCode: $scope.Service.AddressDetail.provinceCode }; $Api.BasisService.GetadmdivisionList(option, function (rData) { $scope.SelectInfo.City.dic = rData.rows; }); } else { $scope.SelectInfo.City.dic = new Array(); }
                    }
                },
                District: {
                    //区域类型下拉框  
                    dic: new Array(), getDistrictList: function () {
                        /// <summary>获取区域列表</summary>
                        if ($scope.Service.AddressDetail.cityCode && $scope.Service.AddressDetail.provinceCode) { var option = { level: "3", parentDivCode: $scope.Service.AddressDetail.cityCode }; $Api.BasisService.GetadmdivisionList(option, function (rData) { $scope.SelectInfo.District.dic = rData.rows; }); } else { $scope.SelectInfo.District.dic = new Array(); }
                    }
                },
                carrierTransType: {
                    //运输方式
                    dic: new Array(),
                    getcarrierTransTypeList: function () {
                        $Api.Public.GetDictionary({ dictType: "TRANTP" }, function (rData) {
                            $scope.SelectInfo.carrierTransType.dic = rData;
                            console.log(rData)
                        })
                    }
                }
            }
        }
    }
});