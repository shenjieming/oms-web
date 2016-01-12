/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("SingleController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>手术下单下单控制器</summary>
    /*基础对象区域Begion*/
    $scope.sono = $stateParams.sono;//获取订单编号
    $scope.PageData = {
        wardDeptCode: "", initHPCode: "", initDTCode: "",patientDiseaseInfo:"",
        prodLns: new Array(),
        attachments: { images: new Array(), remark: "" }
    }
  
    /*基础对象区域End*/

    /*逻辑对象区域Begion*/
    $scope.PageService = {
        /// <summary>页面服务</summary>
        Save: function () {
            /// <summary>下单保存</summary>
            $Api.SurgeryService.Save($scope.PageData, function (rData) {
                /// <summary>保存手术订单</summary>
                $MessagService.succ("订单保存成功，订单号：" + rData);
                setTimeout(function () {
                    $state.go("app.order.draft");
                }, 500);
            });
        },
        Submit: function () {
            /// <summary>提交模糊订单</summary>
            $Api.SurgeryService.Submit($scope.PageData, function (rData) {
                /// <summary>提交手术订单</summary>
                $MessagService.succ("订单" + rData + "提交成功");
                setTimeout(function () {
                    $state.go("app.order.orderlist");
                }, 500);
            });
        },
        GetDetail: function () {
            /// <summary>获取订单明细</summary>
            $Api.SurgeryService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) {
                $.extend($scope.PageData, rData);
                $.extend($scope.PageData, {
                    prodLns: rData.initOrderProdlns,
                    attachments: $scope.file.GetEventMapping(rData.events, "0001_0001")
                });
            });
        }
    }


    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                if ($scope.PageData.attachments.images.length >= 5) {
                    $MessagService.caveat("您上传的图片超过了5张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.PageData.attachments.images.push(rData);
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

    //医院选择配置
    $scope.HospitalConfig = {
        fixed: function (rowInfo) {
            /// <summary>医生选择事件</summary>
            $.extend($scope.PageData, {
                initHPCode: rowInfo.hPCode,
                initHPCodeName: rowInfo.hPName,
                initWardDeptCode:rowInfo.wardDeptCode,
                initWardDeptCodeName:rowInfo.wardDeptname,
                initDTCode: rowInfo.dTCode,
                initDTCodeName:rowInfo.dTName,
                initIsLocalName: rowInfo.isLocalName,
                initHPPreferenceDesc: rowInfo.hPPreferenceDesc,
                initDTOperationPreferenceDesc: rowInfo.dTOperationPreferenceDesc
            });
            $scope.HospitalConfig.hide();
        }
    };
    //地址选择配置
    $scope.AddressConfig = {
        fixed: function (rowInfo) {
            /// <summary>选择地址事件</summary> 
            $.extend($scope.PageData, {
                deliveryContact: rowInfo.contact, deliveryrMobile: rowInfo.mobile, deliveryProvinceCode: rowInfo.provinceCode, deliveryProvinceName: rowInfo.provinceCodeName, deliveryCityCode: rowInfo.cityCode,
                deliveryCityName: rowInfo.cityCodeName, deliveryDistrictCode: rowInfo.districtCode, deliveryDistrictName: rowInfo.districtCodeName, deliveryAddress: rowInfo.address
            });
            $scope.AddressConfig.hide();
        }
    };


    //产品服务
    $scope.ProductService = {};
    //产品权限
    $scope.ProductCompetence = {
        kits: false, warehouse: false
    }

    /*逻辑对象区域End*/

    /*数据监控区域Begion*/
    $scope.$watch("sono", function () {
        if ($scope.sono) {
            $MessagService.loading("订单：" + $scope.sono + "数据获取中");
            setTimeout(function () {
                $scope.PageService.GetDetail();
            }, 1000);
        }
    })

    $scope.$watch("PageData.sOOIOrgCode", function () {
        /// <summary>货主修改的话</summary>
        $scope.PageData.prodLns = new Array();
    });
  
    /*数据监控区域End*/
});

