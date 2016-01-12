/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("FeedbackController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>反馈订单处理</summary>
    /*数据监控Begion*/
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.FeedBack.order, {
                sONo: $scope.PageData.sONo, hPCode: $scope.PageData.hPCode,
                hPCodeName: $scope.PageData.hPCodeName, wardDeptCode: $scope.PageData.wardDeptCode,
                wardDeptCodeName: $scope.PageData.wardDeptCodeName, dTCode: $scope.PageData.dTCode,
                dTCodeName: $scope.PageData.dTCodeName, isLocalName: $scope.PageData.isLocalName,
                operationDate: $scope.PageData.operationDate, operationDesc: $scope.PageData.patientDiseaseInfo
            })
            $scope.WarehouseConfig.GetList();
            $scope.MaterialsConfig.GetMaterialList($scope.PageData.feedBackProcess);
            $scope.dictionary.GetUseType();
        }
    });
    /*数据监控End*/

    $scope.FeedBack = {
        order: {},
        medMaterial: new Array(),
        attachment: {
            images: new Array(),
            remark:""
        }
    }

    $scope.dictionary = {
        /// <summary>字典对象</summary>
        UseTypeList:new Array(),
        GetUseType: function () {
            /// <summary>获取用户使用类型</summary>
            $Api.Public.GetDictionary({ dictType: "MMIUTP" }, function (rData) {
                $scope.dictionary.UseTypeList = rData;
            });
        },
        DefaultUseType: function (row) {
            /// <summary>默认使用类型</summary>
            if (!row.useType) {
                row.useType = $scope.dictionary.UseTypeList[0].id;
            }
        }
    }

    $scope.FeedBackService = {
        /// <summary>订单处理服务</summary>
        Submit: function () {
            /// <summary>订单处理提交</summary>
            $Api.SurgeryService.Process.Back($scope.FeedBack, function (rData) {
                $scope.goLastPage();
            });
        }
    }

    //医院选择配置
    $scope.HospitalConfig = {
        fixed: function (rowInfo) {
            /// <summary>医生选择事件</summary>
            $.extend($scope.FeedBack.order, {
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


    $scope.MaterialsConfig = {
        Material: new Array(),
        GetMaterialList: function (mlist) {
            /// <summary>获取物料信息</summary>
            var result = new Array();
            $.each(mlist, function (index,item) {
                var flg = true;
                $.each(result, function (mIndex, mItem) {
                    if (mItem.medMIInternalNo == item.medMIInternalNo && item.lotSerial == mItem.lotSerial) {//同批次物料
                        $.extend(mItem, {
                            actQty: mItem.actQty + item.actQty
                        });
                        return false;
                    }
                });
                if (flg) {
                    result.push($.extend(item, {
                        returnWarehouse: item.medMIWarehouse,
                        useQty:0
                    }));
                }
            });
            $scope.FeedBack.medMaterial = result;
        }
    };

    $scope.WarehouseConfig = {
        /// <summary>仓库配置信息</summary>
        WarehouseList: new Array(),
        GetList: function () {
            /// <summary>获取仓库列表</summary>
            $Api.MaterialsService.GetAllWareHouse({}, function (rData) {
                $scope.WarehouseConfig.WarehouseList = rData;
            });
        }
    }

    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                if ($scope.FeedBack.attachment.images.length > 5) {
                    $MessagService.caveat("您上传的图片超过了5张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.$apply(function () {
                                $scope.FeedBack.attachment.images.push(rData);
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
});