/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("OrderViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>手术下单下单控制器</summary>
    /*基础对象区域Begion*/
    $scope.sono = $stateParams.sono;//获取订单编号
    $scope.PageData = {
        wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "",
        prodLns: new Array(),
        attachments: { images: new Array(), remark: "" }
    }

    $scope.View = {
        Surgery: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
        Competence: {}
    }
    $.extend($scope.View.Competence, $local.getValue("ORDERCOMP"));
    /*基础对象区域End*/

    /*逻辑对象区域Begion*/
    $scope.PageService = {
        /// <summary>页面服务</summary>
        GetDetail: function () {
            /// <summary>获取订单明细</summary>
            $Api.SurgeryService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) { $.extend($scope.PageData, rData); });
        }
    }
    $scope.ApprovalConfig = {
        /// <summary>订单审批配置</summary>
        Operat: {
            fixed: function () {
                $scope.goLastPage();
            }
        },
        Model: { sONo: $scope.sono }
    }
    $scope.SignConfig = {
        /// <summary>订单审批配置</summary>
        Operat: { fixed: function () { $scope.goLastPage(); } }
    }
    $scope.EventFilter = function () {
        /// <summary>图片过滤</summary>
        if ($scope.PageData.events) {
            $.each($scope.PageData.events, function (eIndex, event) {
                event.images = new Array();
                $.each(event.attachments, function (index, att) {
                    event.images.push({ url: att.attachmentDir })
                    event.remark = att.attachmentDesc
                });
            });
        }
    }

    /*逻辑对象区域End*/

    /*数据监控区域Begion*/
    $scope.$watch("sono", function () {
        if ($scope.sono) {
            $MessagService.loading("订单：" + $scope.sono + "数据获取中");
            $scope.PageService.GetDetail();
            $scope.EventFilter();
        }
    })



    $scope.file = {
        /// <summary>附件控制器</summary>
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
    /*数据监控区域End*/


    })
app.controller("OriginalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>原始订单控制器</summary>
        $scope.singleProduc = {
            Service: {},
            Competence: { warehouse: false, materials: true, kits: false, tool: true, operat: false }
        }

        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.PageData, {
                    initFile: $scope.file.GetEventMapping($scope.PageData.events, "0001_0011")
                });
                if (!$scope.PageData.initFile.images.length) {
                    $scope.PageData.initFile = $scope.file.GetEventMapping($scope.PageData.events, "0001_0001")
                }

                $.extend($scope.singleProduc, {
                    prodLns: $scope.PageData.initOrderProdlns
                });
            }
        });

    })
app.controller("AccurateController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>精确订单</summary>
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.PageData, {
                    orderFile: $scope.file.GetEventMapping($scope.PageData.events, "0020_0011")
                });

                setTimeout(function () {
                    $.extend($scope.AccurProduct.data, {
                        medKits: $scope.PageData.orderKits,
                        prodLns: $scope.PageData.orderProdlns
                    });
                });
            }
        });



        $scope.MaterialsConfig = {
            Material: new Array(),
            GetShowMaterial: function (type) {
                /// <summary>获取显示的物料</summary>
                $scope.MaterialsConfig.Material = new Array();
                $.each($scope.AccProductConfig.useLine.medMaterialItems, function (index, item) {
                    if (!type || type == item.categoryByPlatform) {
                        $scope.MaterialsConfig.Material.push(item);
                    }
                });
            }
        };


        $scope.AccurProduct = {
            data: new Object(),
            Service: {},
            Competence: { tool: false, operat: false }
        }

    })
app.controller("LibraryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route) {
        /// <summary>出库单</summary>
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            $scope.LibraryService.DeliveryAnalysis();
        });

        $scope.LivraryConfig = {
            Operat: {
                fixed: function () {
                    $MessagService.loading("订单：" + $scope.sono + "数据获取中");
                    $scope.PageService.GetDetail();
                    $scope.LibraryService.DeliveryAnalysis();
                }
            },
            Order: {},
            OBSign: function (order) {
                /// <summary>出库单签收</summary>
                $scope.LivraryConfig.Order = order;
                $scope.LivraryConfig.Operat.show();
            }
        }

        $scope.LibraryService = {
            /// <summary>出库单服务</summary>
            DeliveryAnalysis: function () {
                /// <summary>出库单分析</summary>
                if ($scope.PageData.outBounds) {
                    $.each($scope.PageData.outBounds, function (item, Bounds) {
                        var Material = $scope.LibraryService.MaterialAnalysis(Bounds);
                        $.extend(Bounds, { Material: Material, ShowInfo: $scope.LibraryService.GetShowInfo(Material) })
                    });
                }
            },
            GetShowInfo: function (list) {
                /// <summary>获取显示的出库单分析信息</summary>
                var result = "";
                var stat = {
                    /// <summary>统计</summary>
                    AllMaterialCount: 0, AllImplantCount: 0, AllToolCount: 0
                }
                $.each(list, function (index, mItem) {
                    stat.AllMaterialCount += mItem.reqQty;
                    if (mItem.categoryByPlatform == "IMPLANT") {
                        stat.AllImplantCount += mItem.reqQty;
                    } else {
                        stat.AllToolCount += mItem.reqQty;
                    }

                });
                result = " 物料" + stat.AllMaterialCount + "件(植入物" + stat.AllImplantCount + "件，工具" + stat.AllToolCount + "件）"

                return result;
            },
            MaterialAnalysis: function (Bounds) {
                /// <summary>物料分析</summary>
                var result = new Array();
                var prodLinList = $scope.LibraryService.ProductLineAnalysis(Bounds.obProdLns);
                var mitList = $scope.LibraryService.MitAnalysis(Bounds.obKits);

                $.each(prodLinList, function (index, item) {
                    $scope.LibraryService.DataSourceMerge(item, result);
                });
                $.each(mitList, function (index, item) {
                    $scope.LibraryService.DataSourceMerge(item, result);
                });
                return result;
            },
            DataSourceMerge: function (mat, data) {
                /// <summary>数据源合并</summary>
                if (mat.medMICode) {
                    var flg = true;
                    $.each(data, function (index, item) {
                        if (item.medMICode == mat.medMICode) {
                            flg = false;
                            item.reqQty += mat.reqQty;
                        }
                    });
                    if (flg) {
                        data.push(mat);
                    }
                }
            },
            ProductLineAnalysis: function (prodLin) {
                /// <summary>产品线分析</summary>
                var result = new Array();
                $.each(prodLin, function (index, line) {
                    $.each(line.obMedMateriaItems, function (mIndex, med) {
                        result.push(med);
                    })
                })
                return result;
            },
            MitAnalysis: function (MitList) {
                /// <summary>套件分析</summary>
                var result = new Array();
                $.each(MitList, function (index, mit) {
                    $.each(mit.outBoundKitDetails, function (mIndex, mat) {
                        result.push($.extend(mat, { reqQty: parseInt(mat.partQty) * parseInt(mit.reqQty) }));
                    });
                });
                return result;
            }
        }
    })
app.controller("SingleController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $AppHelp) {
    /// <summary>手术下单下单控制器</summary>
        /*基础对象区域Begion*/
        $scope.sono = $stateParams.sono;//获取订单编号
        $scope.PageData = {
            wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "",
            initOperationDate: $AppHelp.Data.GetDate(-1, null, "start"),
            prodLns: new Array(),
            attachments: { images: new Array(), remark: "" }
        }
        /*基础对象区域End*/
        /*逻辑对象区域Begion*/
        $scope.PageService = {
            /// <summary>页面服务</summary>
            Verification: function () {
                var result = true;
                if (!$scope.PageData.deliveryContact) {
                    $MessagService.caveat("请选择收货地址")
                    result = false
                } else if (!$scope.PageData.iniitCarrierTransType) {
                    $MessagService.caveat("请选择配送方式")
                    result = false
                } else if (!$scope.PageData.initDTCodeName) {
                    $MessagService.caveat("请选择手术医生信息")
                    result = false
                }
                else if (!$scope.PageData.initOperationDate) {
                    $MessagService.caveat("请选择手术时间")
                    result = false
                } else if (!$scope.PageData.initDiseaseInfo) {
                    $MessagService.caveat("请输入患者诊断信息")
                    result = false
                } else if ($scope.PageData.prodLns.length == 0) {
                    $MessagService.caveat("请选择产品线")
                    result = false
                }
                return result
            },
            Save: function () {
                /// <summary>下单保存</summary>
                if ($scope.PageService.Verification()) {
                    $Api.SurgeryService.Save($scope.PageData, function (rData) {
                        /// <summary>保存手术订单</summary>
                        $MessagService.succ("订单保存成功，订单号：" + rData);
                        setTimeout(function () {
                            $state.go("app.oms.order.draft");
                        }, 500);
                    });
                }
            },
            Submit: function () {
                /// <summary>提交模糊订单</summary>
                if ($scope.PageService.Verification()) {
                    $Api.SurgeryService.Submit($scope.PageData, function (rData) {
                        /// <summary>提交手术订单</summary>
                        $MessagService.succ("订单" + rData + "提交成功");
                        setTimeout(function () {
                            $state.go("app.oms.order.orderlist");
                        }, 500);
                    });
                }
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
                    initWardDeptCode: rowInfo.wardDeptCode,
                    initWardDeptCodeName: rowInfo.wardDeptname,
                    initDTCode: rowInfo.dTCode,
                    initDTCodeName: rowInfo.dTName,
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
                    deliveryCityName: rowInfo.cityCodeName, deliveryDistrictCode: rowInfo.districtCode, deliveryDistrictName: rowInfo.districtCodeName, deliveryAddress: rowInfo.address, iniitCarrierTransType: rowInfo.carrierTransType
                });
                $scope.AddressConfig.hide();
            },
            GetDefault: function () {
                /// <summary>获取默认地址</summary>
                //$Api.RepresentativeService.GetDefaultaddress({}, function (address) {
                //    if (address) {
                //        $.extend($scope.PageData, {
                //            deliveryContact: address.contact, deliveryrMobile: address.mobile, deliveryProvinceCode: address.provinceCode, deliveryProvinceName: address.provinceCodeName, deliveryCityCode: address.cityCode,
                //            deliveryCityName: address.cityCodeName, deliveryDistrictCode: address.districtCode, deliveryDistrictName: address.districtCodeName, deliveryAddress: address.address, iniitCarrierTransType: address.carrierTransType
                //        });
                //    }
                //});
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
            } else {
                $scope.AddressConfig.GetDefault();
            }
        })

        $scope.$watch("PageData.sOOIOrgCode", function () {
            /// <summary>货主修改的话</summary>
            if ($scope.PageData.prodLns.length) {
                $MessagService.caveat("货主发生变化，产品线已重置...")
            }
            $scope.PageData.prodLns = new Array();
        });

        /*数据监控区域End*/
    })
app.controller("FeedbackController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>反馈订单处理</summary>
        /*数据监控Begion*/
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.FeedBack, {
                    order: {
                        sONo: $scope.PageData.sONo, hPCode: $scope.PageData.hPCode,
                        hPCodeName: $scope.PageData.hPCodeName, wardDeptCode: $scope.PageData.wardDeptCode,
                        wardDeptCodeName: $scope.PageData.wardDeptCodeName, dTCode: $scope.PageData.dTCode,
                        dTCodeName: $scope.PageData.dTCodeName, isLocalName: $scope.PageData.isLocalName,
                        operationDate: $scope.PageData.operationDate, operationDesc: $scope.PageData.patientDiseaseInfo,
                        patientName: $scope.PageData.patientName, patientSex: $scope.PageData.patientSex, patientAge: $scope.PageData.patientAge,
                        patientEntryDate: $scope.PageData.patientEntryDate, patientHPNo: $scope.PageData.patientHPNo,
                        patientWard: $scope.PageData.patientWard, patientRoom: $scope.PageData.patientRoom, patientBedNo: $scope.PageData.patientBedNo,
                        retrieveEstDate: $scope.PageData.retrieveEstDate, retrieveDesc: $scope.PageData.retrieveDesc
                    },
                    medMaterial: {},
                    attachment: $scope.file.GetEventMapping($scope.PageData.events, "0080_0001")
                })
                $scope.WarehouseConfig.GetList();
                $scope.MaterialsConfig.GetMaterialList($scope.PageData.feedBackProcess, $scope.PageData.feedBack);
                $scope.dictionary.GetUseType();
            }
        });
        /*数据监控End*/

        $scope.FeedBack = {
            order: {},
            medMaterial: new Array(),
            attachment: {
                images: new Array(),
                remark: ""
            }
        }

        $scope.dictionary = {
            /// <summary>字典对象</summary>
            UseTypeList: new Array(),
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
            },
            Save: function () {
                /// <summary>反馈单暂存</summary>
                $Api.SurgeryService.Process.BackSave($scope.FeedBack, function (rData) {
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
            GetMaterialList: function (mlist, ulist) {
                /// <summary>获取物料信息</summary>
                var result = new Array();
                $.each(mlist, function (index, item) {
                    var flg = true;
                    item.BrandRowPan = 1;
                    item.isBrandRowPan = true;
                    item.ProdLineRowPan = 1;
                    item.isProdLineRowPan = true;
                    $.each(result, function (mIndex, mItem) {
                        if (item.medBrandCode == mItem.medBrandCode && mItem.isBrandRowPan) {
                            mItem.BrandRowPan++;
                            item.isBrandRowPan = false;
                        }

                        if (item.medProdLnCode == mItem.medProdLnCode && mItem.isProdLineRowPan) {
                            mItem.ProdLineRowPan++;
                            item.isProdLineRowPan = false;
                        }
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
                            useQty: 0
                        }));
                    }
                });
                $.each(result, function (index, item) {
                    $.each(ulist, function (uIndex, uItem) {
                        if (uItem.medMIInternalNo == item.medMIInternalNo && item.lotSerial == uItem.lotSerial) {//同批次物料
                            $.extend(item, {
                                useQty: uItem.useQty
                            });
                        }
                    });
                });
                $scope.FeedBack.medMaterial = result;
            }
        }
       

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
    })
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
            },
            Save: function () {
                /// <summary>订单处理保存</summary>
                $scope.ProductService.Deduplication();//去重
                $Api.SurgeryService.Process.Save($scope.PageData, function (rData) {
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
                    deliveryAddress: rowInfo.address,
                    carrierTransType: rowInfo.carrierTransType,
                    newNgArea: true
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
                    if ($scope.PageData.attachments.images.length >= 5) {
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
                console.log(eventList)
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

        $scope.TemplateService = {
            /// <summary>物料模板选择</summary>
            fixed: function (templateInfo) {
                /// <summary>确认使用模板</summary>
            }
        }

        $scope.ImportTemplateService = {
            /// <summary>物料模板导入</summary>
            fixed: function (templateInfo) {
                /// <summary>确认使用模板</summary>
            }
        }

        //产品服务
        $scope.ProductService = {};
        //产品权限
        $scope.ProductCompetence = {
            tool: false, instruction: true
        }

        /*数据监控Begion*/
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.PageData, {
                    prodLns: $scope.PageData.orderProdlns,
                    attachments: $scope.file.GetEventMapping($scope.PageData.events, "0020_0001")
                });

                setTimeout(function () {
                    $scope.$apply(function () {
                        $.extend($scope.PageData, {
                            medKits: $scope.PageData.orderKits
                        });
                    });
                }, 10);
            }
        });

        /*数据监控End*/
    })
app.controller("AdditionalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>订单追加</summary>

        $scope.AdditionalServiice = {
            /// <summary>出库单追加服务</summary>
            Submit: function () {
                /// <summary>提交追加出库单</summary>
                $Api.SurgeryService.Process.Add($scope.PageData, function (rData) {
                    $scope.goLastPage();
                });
            }
        }
        $scope.AddProduct = {
            Service: {}, Competence: { tool: false, instruction: true }
        }

        /*数据监控Begion*/
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            $scope.PageData.prodLns = new Array();
        });
        /*数据监控End*/
    })
app.controller("AddEventController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>订单处理</summary>
        $scope.Event = { eventCode: "", attachments: { remark: "", images: new Array() } }
        /*数据监控Begion*/
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.Event, {
                    sONo: $scope.PageData.sONo,
                    eventCode: "", remark: "", PostEvent: $scope.View.Competence.apply ? $Api.SurgeryService.Process.FeedBackApply : $Api.SurgeryService.Process.AddEvent
                });
                $scope.EventService.GetEventCode();
            }
        });
        /*数据监控End*/
        $scope.EventService = {
            /// <summary>订单处理服务</summary>
            EventList: new Array(),
            Submit: function () {
                /// <summary>订单处理提交</summary>
                $scope.Event.PostEvent($scope.Event, function (rData) {
                    $scope.goLastPage();
                });
            },
            GetEventCode: function () {
                /// <summary>获取事件编码</summary>
                $Api.Public.GetEventList({}, function (rData) {
                    $scope.EventService.EventList = rData;
                });
            }
        }
        $scope.file = {
            /// <summary>附件控制器</summary>
            Upload: function (files) {
                /// <summary>上传事件</summary>
                $.each(files, function (index, item) {
                    if ($scope.Event.attachments.images.length >= 5) {
                        $MessagService.caveat("您上传的图片超过了5张。")
                        return false;
                    }
                    if (item.type.indexOf("image") > -1) {
                        $FileService.ReaderFiles(item, function (data) {
                            /// <summary>文件读取</summary>
                            $Api.Public.UploadFile(data, function (rData) {
                                $scope.$apply(function () {
                                    $scope.Event.attachments.images.push(rData);
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
    })
app.controller("FeedbackViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route) {
        /// <summary>出库单</summary>
        $scope.FeedBack = { images: new Array(), remark: "" }
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            $scope.FeedBack = $scope.file.GetEventMapping($scope.PageData.events, "0080_0011")
        })
    })