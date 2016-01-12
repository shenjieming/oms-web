/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("DealwithController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>订单处理</summary>

    $scope.DealService = {
        /// <summary>订单处理服务</summary>
        Submit: function () {
            /// <summary>订单处理提交</summary>
            $scope.ProductService.Deduplication();//去重
            $Api.SurgeryService.Process.Submit($scope.PageData, function (rData) {
                $scope.goLastPage();
            });
        }
    }

    $scope.AddressConfig = {
        fixed: function (rowInfo) {
            /// <summary>选择地址事件</summary> 
            $.extend($scope.PageData, {
                deliveryContact: rowInfo.contact,
                deliveryrMobile: rowInfo.mobile,
                deliveryProvinceCode: rowInfo.provinceCode,
                deliveryProvinceName: rowInfo.provinceCodeName,
                deliveryCityCode: rowInfo.cityCode,
                deliveryCityName: rowInfo.cityCodeName,
                deliveryDistrictCode: rowInfo.districtCode,
                deliveryDistrictName: rowInfo.districtCodeName,
                deliveryAddress: rowInfo.address
            });
            $scope.AddressConfig.hide();
        }
    }

    //医院选择配置
    $scope.HospitalConfig = {
        fixed: function (rowInfo) {
            /// <summary>医生选择事件</summary>
            $.extend($scope.PageData, {
                hPCode: rowInfo.hPCode,
                hPCodeName: rowInfo.hPName,
                wardDeptCode: rowInfo.wardDeptCode,
                wardDeptCodeName: rowInfo.wardDeptname,
                dTCode: rowInfo.dTCode,
                dTCodeName: rowInfo.dTName,
                isLocalName: rowInfo.isLocalName,
                hPPreferenceDesc: rowInfo.hPPreferenceDesc,
                dTOperationPreferenceDesc: rowInfo.dTOperationPreferenceDesc
            });
            $scope.HospitalConfig.hide();
        }
    };

    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                if ($scope.PageData.attachments.images.length > 5) {
                    $MessagService.caveat("您上传的图片超过了5张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.$apply(function () {
                                $scope.PageData.attachments.images.push(rData);
                            });
                        });
                    });
                } else {
                    $MessagService.caveat("您上传的不是图片！")
                }
            });
        },
        GetEventMapping: function (eventList, statusCode) {
            /// <summary>获取附件映射</summary>
            var result = { images: new Array(), remark: "" }
            $.each(eventList, function (index, event) {
                if (event.eventCode == statusCode) {
                    $.each(event.attachments, function (fileindex, item) {
                        result.remark = item.attachmentDesc;
                        var img = { id: item.attachmentId, url: item.attachmentDir }
                        if (JSON.stringify(result.images).indexOf(JSON.stringify(img)) == -1) {
                            result.images.push(img);
                        }
                    });
                    return result;
                }
            });
            return result;
        }
    }

    //产品服务
    $scope.ProductService = {};
    //产品权限
    $scope.ProductCompetence = {
        tool: false
    }

    /*数据监控Begion*/
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData.prodLns, $scope.PageData.initOrderProdlns);
            $scope.PageData.medKits = new Array();
        }
    });

    /*数据监控End*/
});