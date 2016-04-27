/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("MaterialDetailController", function ($scope, $stateParams, $state, $local, $Api, $MessagService, $FileService) {
    /// <summary>经销商物料查询</summary>
    $scope.PageData = { certMultiQty: 4, isScanSupported: "Y", disinfectionNeeded: "Y", effectiveControl: "Y", attachmentForms: [{ images: new Array() }] };

    $scope.Service = {
        /// <summary>物料管理服务</summary>
        GetDetail: function () {
            /// <summary>获取物料明细</summary>
            $Api.BusinessData.MedMaterial.GetMedMaterialItemDetail($stateParams, function (rData) {
                $scope.PageData = rData;
                console.log($scope.PageData)
                $scope.PageData.attachmentForms = [{images: new Array()}];
                $scope.PageData.attachmentForms[0].images = $scope.PageData.attachments;
            });
        },
        IsChecked: function (ischeck, model, sd) {
            /// <summary>是否对象点击</summary>
            $scope.PageData[model] = ischeck ? "Y" : "N"
        },
        Save: function () {
            /// <summary>物料信息保存</summary>
            //$scope.PageData.attachment.images = $scope.PageData.attachmentForms[0].images[0];
            $Api.BusinessData.MedMaterial.Save($scope.PageData, function () {
                $MessagService.caveat("物料保存成功！");
                setTimeout(function () {
                    $scope.goLastPage();
                },500);
            })
        }
    }
    $scope.MaterialFactoryCode = function () {
        /// <summary>物料编码和出厂编码相同</summary>
        $scope.PageData.mnfcMedMICode = $scope.PageData.medMICode;
    }
    $scope.Material = {
        //条件
        GetMedManuFactureList: function () {
            /// <summary>获取厂商</summary>
            $Api.BusinessData.MedBrand.GetQueryMedBrandDetail({ medBrandCode: $scope.PageData.medBrandCode }, function (rData) {
                console.log(rData)
                $scope.PageData.medMnfcCodeName = rData.medMnfcCodeName
            });
        }
    }
    //物料类型和应用范围联动，选择物料类型的植入物，应用范围只能选择产品线专用，选择物料类型的工具，
    //应用范围可以选择跨品牌、跨产品线、跨厂商
    $scope.SelectedInfo = {
        /// <summary>物料操作页面下拉框</summary>
        MaterialType: {
            //物料类型
            dic: new Array(),
            change: function () {
                /// <summary>物料类型和应用范围联动，选择物料类型的植入物，应用范围只能选择产品线专用，选择物料类型的工具</summary>
                for (var i = 0; i < $scope.SelectedInfo.MaterialType.dic.length; i++) {
                    if ($scope.PageData.categoryByPlatform == "IMPLANT") {
                        $scope.PageData.applyCommonType = "";
                        $scope.SelectedInfo.Generality.getGeneralityList();
                    } else {
                        $scope.PageData.applyCommonType = "";
                        $scope.SelectedInfo.Generality.getGeneralityList();
                    }
                }
            },
            getMaterialTypeList: function () {
                /// <summary>获取物料类型</summary>
                $Api.Public.GetDictionary({ dictType: "MMICTG" }, function (data) {
                    $scope.SelectedInfo.MaterialType.dic = data;
                })
            }
        },
        Generality: {
            dic: new Array(),
            getGeneralityList: function () {
                /// <summary>通用性类型修改</summary>
                $Api.Public.GetDictionary({ dictType: "MIACTP" }, function (data) {
                    if ($scope.PageData.categoryByPlatform == "IMPLANT") {
                        $scope.SelectedInfo.Generality.dic = new Array();
                        $scope.SelectedInfo.Generality.dic.push({ id: "WITHPRDL", text: "产品线专用" });
                    } else {
                        $scope.SelectedInfo.Generality.dic = data;
                        for (var i = 0; i < $scope.SelectedInfo.Generality.dic.length; i++) {
                            if ($scope.SelectedInfo.Generality.dic[i].id == "WITHPRDL") {
                                $scope.SelectedInfo.Generality.dic.splice(i, 1)
                                console.log($scope.SelectedInfo.Generality.dic)
                            }
                        }
                    }
                })
            }
        }
    }
    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {              
                if ($scope.PageData.attachmentForms[0].images.length >= 2) {
                    $MessagService.caveat("您上传的图片超过了2张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>        
                        $Api.Public.BasedaUploadFile(data, function (rData) {
                            $scope.PageData.attachmentForms[0].images.push(rData);
                        });
                    });
                } else {
                    $MessagService.caveat("您上传的不是图片！")
                }

            });
        }
    }
    //判断是编辑状态还是新增状态
    if ($stateParams.medMIInternalNo) {
        $scope.Service.GetDetail();
        $scope.SelectedInfo.Generality.getGeneralityList();
    } else {
        $scope.PageData = $.extend($scope.PageData, $stateParams)
    }
    $scope.SelectedInfo.MaterialType.getMaterialTypeList();
    //获取厂商列表
    $scope.Material.GetMedManuFactureList();
});