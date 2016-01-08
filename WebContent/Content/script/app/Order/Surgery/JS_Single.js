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
                setTimeout(function () {
                    $MessagService.succ("订单保存成功，订单号：" + rData);
                    $state.go("app.order.draft");
                }, 500);
            });
        },
        Submit: function () {
            /// <summary>提交模糊订单</summary>
            $Api.SurgeryService.Submit($scope.PageData, function (rData) {
                /// <summary>提交手术订单</summary>
                setTimeout(function () {
                    $MessagService.succ("订单提交成功");
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
                if ($scope.PageData.attachments.images.length > 5) {
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
    //产品线选择控制
    $scope.ProductlineConfig = {
        useLine: {},//使用的数据源
        deleteLine: function () {
            /// <summary>删除产品线</summary>
            $scope.PageData.prodLns.splice($scope.ProductlineConfig.useLine.index, 1);
        },
        operat: {  //操作层配置
            fixed: function (lineData) {
                /// <summary>选择产品线事件</summary>
                $scope.$apply(function () {
                    $scope.PageData.prodLns.push(lineData);//返回对象添加到列表中
                });
            }
        },
        tree: {//树配置
            CreateProLineTree: function () {
                /// <summary>创建产品线树</summary>
                var treeData = $scope.ProductlineConfig.tree.GetNewDataByProdLns();
                $scope.ProductlineConfig.tree.data = treeData;
                $scope.ProductlineConfig.useLine = $scope.ProductlineConfig.tree.data[treeData.length - 1];
            },
            GetNewDataByProdLns: function () {
                /// <summary>根据产品线获取新的树信息</summary>
                var treeData = [{ id: 0, name: "全部", isParent: true, open: true }];
                $.each($scope.PageData.prodLns, function (index,item) {
                    var brandNode = { id: item.medBrandCode, name: item.medBrandCodeName, isParent: true, pId: 0, open: true };
                    if (JSON.stringify(treeData).indexOf(JSON.stringify(brandNode)) < 0) {//判断节点是否重复
                        treeData.push(brandNode);
                    }
                    //对象复制
                    var node = item; item.id = item.medProdLnCode; item.name = item.medProdLnCodeName; item.pId = item.medBrandCode; item.index = index; item.isChecked = item.medProdLnCodeWithTool == "Y" ? true : false;
                    treeData.push(node);
                });
                return treeData;
            },
            setting: {
                data: { simpleData: { enable: true, idKey: "id", pIdKey: "pId", rootPId: 0 } },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        /// <summary>双击打开事件</summary>
                        if (!treeNode.isParent) {
                            $scope.$apply(function () {
                                $scope.ProductlineConfig.useLine = treeNode;
                            });
                        }
                    }
                }
            },
            data: [],
            obj: new Object()
        }
    };


    /*逻辑对象区域End*/

    /*数据监控区域Begion*/
    $scope.$watch("sono", function () {
        if ($scope.sono) {
            setTimeout(function () {
                $MessagService.loading("订单：" + $scope.sono + "数据获取中");
                $scope.PageService.GetDetail();
            }, 1500);
        }
    })

    $scope.$watch("PageData.sOOIOrgCode", function () {
        /// <summary>货主修改的话</summary>
        $scope.PageData.prodLns = new Array();
    });

    $scope.$watch("PageData.prodLns.length", function () {
        /// <summary>产品线发生变化</summary>
        $scope.ProductlineConfig.tree.CreateProLineTree();
    });

    $scope.$watch("ProductlineConfig.useLine.isChecked", function () {
        /// <summary>修改是否需要工具</summary>
        if ($scope.ProductlineConfig.useLine.index > -1) {
            $scope.PageData.prodLns[$scope.ProductlineConfig.useLine.index].isChecked = $scope.ProductlineConfig.useLine.isChecked;
            $scope.PageData.prodLns[$scope.ProductlineConfig.useLine.index].medProdLnCodeWithTool = $scope.ProductlineConfig.useLine.isChecked ? "Y" : "N";
        }
    });
  
    /*数据监控区域End*/
});

