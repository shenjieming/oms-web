/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
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
                title: "收货地址选择", width: 850, height: 400, buttons: {
                    "确定": function () { var dataRow = $local.getSelectedRow($scope.Service.AddressList); if (dataRow) { $scope.$apply(function () { $scope.ngOperat.fixed(dataRow); }); } else { $MessagService.caveat("请选择一条常用地址信息！"); } }, "关闭": function () { $scope.ngOperat.hide(); }
                },
                open: function () { $.extend($scope.operat, { isEdit: true, isDetail: false }); $scope.Service.GetAddressList(); $(".ui-dialog-buttonset").show(); if (userInfo.orgType != "DL") { $scope.operat.Button = false; }; $(".ui-dialog-title").html("收货地址选择"); },
              
            };
            $scope.operat = {
                isEdit: true,//是否显示编辑信息
                isDetail: false,//是否显示明细信息
                Button: true,
                ChangeEdit: function (date) {
                    /// <summary>修改地址列表状态</summary>
                    //var address = $local.getSelectedRow($scope.Service.AddressList);
                        $.extend($scope.operat, { isDetail: true, isEdit: false });
                        var parm = $.extend({ userID: userInfo.userId }, date);
                        $Api.MyAddress.GetbizDataMyAddressDetail(parm, function (rData) {
                            $scope.Service.AddressDetail = rData;
                            $scope.Service.AddressDetail.deliveryProvinceCode = rData.provinceCode;
                            $scope.Service.AddressDetail.deliveryCityCode = rData.cityCode;
                            $scope.Service.AddressDetail.deliveryDistrictCode = rData.districtCode;
                            $(".ui-dialog-buttonset").hide();
                            $(".ui-dialog-title").html("收货地址编辑");
                        })
        
                },
                ChangeDetail: function () {
                    /// <summary>新增地址列表信息</summary>
                    $.extend($scope.operat, { isDetail: true, isEdit: false }); $(".ui-dialog-buttonset").hide(); $(".ui-dialog-title").html("收货地址新增");
                },
                List: function () {
                    /// <summary>我的地址列表返回</summary>
                    $scope.operat.isDetail = !$scope.operat.isDetail; $scope.operat.isEdit = !$scope.operat.isEdit; $scope.Service.AddressDetail = new Object(); $scope.Service.GetAddressList(); $(".ui-dialog-buttonset").show(); $(".ui-dialog-title").val("收货地址选择")
                },
                verification: function () {
                    var result = true; if (!$scope.Service.AddressDetail.contact) { result = false; $MessagService.caveat("请维护该联系人姓名！"); } else if (!$scope.Service.AddressDetail.mobile) { result = false; $MessagService.caveat("请维护该联系人号码！"); } else if (!$scope.Service.AddressDetail.deliveryProvinceCode || !$scope.Service.AddressDetail.deliveryCityCode || !$scope.Service.AddressDetail.deliveryDistrictCode || !$scope.Service.AddressDetail.address) { result = false; $MessagService.caveat("请维护该联系人地址！"); } return result;
                },
                Save: function () {
                    //我的地址保存
                    if ($scope.operat.verification()) {
                        $scope.Service.AddressDetail.provinceCode= $scope.Service.AddressDetail.deliveryProvinceCode ;
                        $scope.Service.AddressDetail.cityCode = $scope.Service.AddressDetail.deliveryCityCode;
                        $scope.Service.AddressDetail.districtCode = $scope.Service.AddressDetail.deliveryDistrictCode;
                        $Api.RepresentativeService.SaveAddress($scope.Service.AddressDetail, function (rData) {
                            $MessagService.succ("该信息保存成功！");
                            $.extend($scope.operat, { isDetail: !$scope.operat.isDetail, isEdit: !$scope.operat.isEdit });
                            $scope.Service.GetAddressList();
                            $(".ui-dialog-buttonset").show();
                            $(".ui-dialog-title").html("收货地址选择");
                            $scope.Service.AddressDetail =new Object();
                        })
                    }
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
        }
    }
});