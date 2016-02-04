/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MatManDetailController", function ($scope, $state, $local, $Api, $MessagService, $FileService, $stateParams) {
    /// <summary>物料编辑</summary>

    $scope.MatManInfo = {attachment:{ images: new Array(), remark:"" },attachmentForm:{ images: new Array(), remark: "" },
        medMnfcOrgCode: "", attachmentForm: "", attachment: "", medMaterialItem: {
        oIOrgCode: "", mnfcMedMIFullName: "", medBrandName: "",
        isScanSupported: true, disinfectionNeeded: true, effectiveControl: true, specification: true,
        }
    };
    $scope.MatManDetails= {
        Load: function (callback) {
            $scope.SelectList.Vendor.GetVendorList(),
            $scope.SelectList.own.GetOwnerList()
            $scope.MatID = $stateParams.MatID;
            console.log($scope.MatID)
            if ($scope.MatID) {
                $scope.MatManApi.GetMatManDetail();
            }
        },
    }
    $scope.MatManApi = {
        //获取物料相关API接口
        GetMatManDetail: function () {
            /// <summary>物料详情</summary>
            $Api.BusinessData.MedMater.GetSearchMedMaterialItemDetail({ medMIInternalNo: $scope.MatID}, function (rdata) {
                $scope.MatManInfo.medMaterialItem = rdata;
                console.log(rdata)
            })
        }
    }
    $scope.imgList = { images: new Array(), remark: "" }
    $scope.imgFromList = { images: new Array(), remark: "" }
    $scope.ButtonList = {
        //按钮下拉框集合
        changeisScan: function () {
            /// <summary>扫描按钮</summary>
            //"isScanSupported": "是否支持扫描",
            $scope.MatManInfo.medMaterialItem.isScanSupported = !$scope.MatManInfo.medMaterialItem.isScanSupported;
        },
        changeisSendAway: function () {
            /// <summary>产品送消情况</summary>
            //"disinfectionNeeded": "产品是否需要送消",
            $scope.MatManInfo.medMaterialItem.disinfectionNeeded = !$scope.MatManInfo.medMaterialItem.disinfectionNeeded;
        },
        changeisValidity: function () {
            /// <summary>产品有效期使用情况</summary>
            //"effectiveControl": "产品有效期是否适用",
            $scope.MatManInfo.medMaterialItem.effectiveControl = !$scope.MatManInfo.medMaterialItem.effectiveControl;
        },
        changeisSpecification: function () {
            /// <summary>物料规格</summary>
            $scope.MatManInfo.medMaterialItem.specification = !$scope.MatManInfo.medMaterialItem.specification
        }
    }
    $scope.SelectList = {
        //下拉框集合
        own: {   // 货主
            dic: [],
            change: function (item) {
                /// <summary>货主修改事件</summary>
                for (var i = 0; i < $scope.SelectList.own.dic.length; i++) {
                    if ($scope.SelectList.own.dic[i].id == $scope.MatManInfo.medMaterialItem.oIOrgCode) {
                        $scope.MatManInfo.medMaterialItem.oIOrgName = $scope.SelectList.own.dic[i].text;
                        return;
                    }
                }
            },
            GetOwnerList: function () {
                $Api.OrganizationService.GetOwnerList({}, function (rdata) {
                    /// <summary>获取货主数据</summary>
                    console.log(rdata)
                    $scope.SelectList.own.dic = rdata;
                })
            },
        }, 
        Vendor: {//厂商
            dic: [],
            change: function (item) {
                /// <summary>厂商信息修改事件</summary>
                for (var i = 0; i < $scope.SelectList.Vendor.dic.length; i++) {
                    ////"mnfcMedMIFullName": "厂家-物料全称",  //"mnfcMedMIName": "厂家-物料名称",//"mnfcMedMICode": "厂家-物料编码",
                    ////"mnfcMedMIFullNameEN": "厂家-物料英文全称",//"mnfcMedMINameEN": "厂家-物料英文名称",
                    if ($scope.SelectList.Vendor.dic[i].medMnfcOrgCode == $scope.MatManInfo.medMnfcOrgCode) {
                        $scope.MatManInfo.medMaterialItem.mnfcMedMIName = $scope.SelectList.Vendor.dic[i].medMnfcName;
                        $scope.MatManInfo.medMaterialItem.mnfcMedMINameEN = $scope.SelectList.Vendor.dic[i].medMnfcNameEN;
                        //$scope.MatManInfo.medMaterialItem.mnfcMedMIFullNameEN = $scope.SelectList.Vendor.dic[i].medMnfcFullNameEN;
                        //$scope.MatManInfo.medMaterialItem.mnfcMedMIFullName = $scope.SelectList.Vendor.dic[i].medMnfcFullName;
                        $scope.SelectList.BrandList.GetBrandList();
                        return;
                    }
                }
            },
            GetVendorList: function () {
                $Api.BusinessData.MedManuFacture.GetManufacturerList({ validStatus: "Y" }, function (rdata) {
                    /// <summary>获取厂商数据</summary>
                    $scope.SelectList.Vendor.dic = rdata.rows;
                })
            }
        },
        BrandList: {//品牌线
            dic: [],
            change: function (item) {
                /// <summary>品牌修改事件</summary>
                for (var i = 0; i < $scope.SelectList.BrandList.dic.length; i++) {
                    if ($scope.SelectList.BrandList.dic[i].id == $scope.MatManInfo.medMaterialItem.medMnfcCode) {
                        $scope.MatManInfo.medMaterialItem.medMnfcName = $scope.SelectList.BrandList.dic[i].text;
                        console.log(1)
                        $scope.SelectList.productList.GetProductList();
                    }
                }
            },
            GetBrandList: function () {
                $scope.MatManInfo.medMaterialItem.medMnfcCode = "";
                if ($scope.MatManInfo.medMnfcOrgCode) {
                    /// <summary>暂时写</summary>
                    $Api.BrandService.GetBrandList({ oIOrgCode: $scope.MatManInfo.medMaterialItem.oIOrgCode }, function (rdata) {
                        /// <summary>获取品牌线</summary>
                        $scope.SelectList.BrandList.dic = rdata;
                        console.log(rdata)
                    })
                } else {
                    $scope.SelectList.BrandList.dic = new Array();
                }
            },
        },
        productList: {//产品线
            dic: [],
            change: function (item) {
                /// <summary>品牌修改事件</summary>
                //"medProdLnCode": "产品线编码", 
                for (var i = 0; i < $scope.SelectList.productList.dic.length; i++) {
                    if ($scope.SelectList.productList.dic[i].id == $scope.MatManInfo.medMaterialItem.medMaterName) {
                        $scope.MatManInfo.medMaterialItem.medMaterName = $scope.SelectList.productList.dic[i].text;
                    }
                }
            },
            GetProductList: function () {
                if ($scope.MatManInfo.medMaterialItem.oIOrgCode && $scope.MatManInfo.medMaterialItem.medMnfcCode) {
                    var opt = { oIOrgCode: $scope.MatManInfo.medMaterialItem.oIOrgCode, medBrandCode: $scope.MatManInfo.medMaterialItem.medMnfcCode }
                    $Api.BrandService.GetProductLine(opt, function (rdata) {
                        /// <summary>获取品牌线</summary>
                        console.log(rdata)
                        $scope.SelectList.productList.dic = rdata;
                    })
                }
                else {
                    $scope.SelectList.productList.dic = new Array();
                }
            },
        },
    }
    $scope.VendorView = {
        //选择厂商列表
        show: function () {
            $scope.VendorPage.show();
        },
        saveVendor: function () {
            $scope.VendorPage.hide();
        },
        canal: function () {
            $scope.VendorPage.hide();
        }
    }
    $scope.save = function () {
        console.log($scope.MatManInfo)
        $MessagService.loading("物料信息保存中，请稍等...");
        $Api.BusinessData.MedMater.Save($scope.MatManInfo, function (rdata) {
            $MessagService.caveat("物料保存成功！");
            self.location = 'index.html#/app/business/material';
        })
    };
    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                $scope.MatManInfo.attachment = $scope.imgList;
                if ($scope.MatManInfo.attachment.images.length >= 1) {
                    $MessagService.caveat("请您选择图片详情...")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.MatManInfo.attachment.images.push(rData);
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
                    $.each(event.attachment, function (fileindex, item) {
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
    $scope.filed = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                $scope.MatManInfo.attachmentForm = $scope.imgFromList;
                console.log($scope.MatManInfo.attachmentForm)
               
                if ($scope.MatManInfo.attachmentForm.images.length >= 5) {
                    $MessagService.caveat("请您选择图片详情...")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.MatManInfo.attachmentForm.images.push(rData);
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
                    $.each(event.attachment, function (fileindex, item) {
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

    $scope.VendorPage = { title: "厂商信息", width: 550, height: 300, buttons: { "确定": $scope.VendorView.saveVendor, } }
    $scope.MatManDetails.Load();
})
//"medMaterialItem：[{  "standard": "产品标准",     1
//"standardCode3": "产品标准编码3",       1
//"standardCode2": "产品标准编码2",        1
//"medMICode": "物料编码",           1
//"remark": "备注",//            1
//"standardCode1": "产品标准编码1",       1
//"medMIFullNameEN": "物料英文全称",    1
//"registryNo": "产品注册证号",           1
//"standardCode1Source": "产品标准编码1来源",        1
//"Platform": "物料类型",             1
//"model": "产品型号说明",        1
//"direction": "产品方向",         1
//"medMIName": "物料名称",          1
//"medMINameEN": "物料英文名称",     1
//"applyCommonType": "应用通用性类型",      1
//"standardCode3Source": "产品标准码来源3",             1
//"specification": "规格",              1
//"medMIUserDefineClass2": "自定义分类二",      1
//"materials": "产品材料说明",              1
//"medMIUserDefineClass3": "自定义分类三",        1
//"certMultiQty": 合格证联数 ,           1
//"medMIUnit": "物料单位",             1
//"medMIUserDefineClass1": "自定义分类一",        1
//"medMIFullName": "物料全称",        1
//"useInfo": "产品使用说明",         1
//"standardCode2Source": "产品标准编码2号来源",         1
//"medMICodeScanned": "扫瞄编码"}]      1
