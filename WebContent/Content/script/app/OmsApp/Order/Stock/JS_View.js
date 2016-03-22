﻿/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("StockViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>备货下单下单控制器</summary>
        /*基础对象区域Begion*/
        $scope.sono = $stateParams.sono;//获取订单编号
        $scope.PageData = {
            wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "",
            prodLns: new Array(),
            attachments: { images: new Array(), remark: "" }
        }

        $scope.View = {
            Surgery: "View/Order/Stock/View/SingleView.html?data=" + Timestamp,
            Competence: {}
        }
        $.extend($scope.View.Competence, $local.getValue("ORDERCOMP"));
        /*基础对象区域End*/

        /*逻辑对象区域Begion*/
        $scope.PageService = {
            /// <summary>页面服务</summary>
            GetDetail: function () {
                /// <summary>获取订单明细</summary>
                $Api.StockService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) { $.extend($scope.PageData, rData); });
            }
        }


        $scope.ApprovalConfig = {
            /// <summary>订单审批配置</summary>
            Operat: { fixed: function () { $scope.goLastPage(); } },
            Model: { sONo: $scope.sono }
        }
        $scope.SignConfig = {
            /// <summary>订单审批配置</summary>
            Operat: { fixed: function () { $scope.goLastPage(); } }
        }
        $scope.EventFilter = function () {
            /// <summary>图片过滤</summary>
            $.each($scope.PageData.events, function (eIndex, event) {
                event.images = new Array();
                $.each(event.attachments, function (index, att) {
                    event.images.push({ url: att.attachmentDir })
                    event.remark = att.attachmentDesc
                });
            });
        }

        /*逻辑对象区域End*/

        /*数据监控区域Begion*/
        $scope.$watch("sono", function () {
            if ($scope.sono) {
                $MessagService.loading("订单：" + $scope.sono + "数据获取中");
                $scope.PageService.GetDetail();
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
app.controller("StockController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
        /// <summary>订单操作控制器</summary>
        var userData = $local.getValue("USER");
        /*页面操作Begion*/
        $scope.GetRowGoPage = function (view, callback) {
            /// <summary>Description</summary>
            var rowData = $local.getSelectedRow($scope.Integrated.StockList);
            if (rowData) {
                if (callback) {
                    callback(rowData);
                } else {
                    $state.go(view, { sono: rowData.sONo });
                }
            } else {
                $MessagService.caveat("请选择一条订单数据！");
            }
        }

        $scope.ProcessingOrders = function (sono) {
            /// <summary>处理订单</summary>
            $local.setValue("ORDERCOMP", { dealwith: true });
            $state.go("app.stock.dealpage", { sono: sono });
        }

        $scope.Additional = function () {
            /// <summary>追加出库单</summary>
            $scope.GetRowGoPage("app.order.additional");
        }

        $scope.addStock = function () {
            /// <summary>添加备货下单</summary>
            $state.go("app.stock.single");
        }

        $scope.editStock = function (sono) {
            /// <summary>编辑手术订单</summary>
            $scope.GetRowGoPage("app.stock.single");
        }

        $scope.ApprovalStock = function (sono) {
            /// <summary>审批手术订单</summary>
            $local.setValue("ORDERCOMP", { approval: true });
            $scope.GetRowGoPage("app.stock.view");
        }

        $scope.SignStock = function (sono) {
            /// <summary>签收备货订单</summary>
            $local.setValue("ORDERCOMP", { sign: true });
            $scope.GetRowGoPage("app.stock.view");
        }

        $scope.DealStock = function () {
            /// <summary>处理备货订单</summary>
            $scope.GetRowGoPage(null, function (rowData) {
                if (rowData.status == "SOSTS00060") {//已处理订单的话
                    if (rowData.sOHandleBy == userData.userInfo.userId) {
                        $scope.ProcessingOrders(rowData.sONo);
                    } else {
                        $MessagService.caveat("当前订单已被" + rowData.sOHandleByName + "处理中！");
                    }
                } else {
                    $Api.StockService.Process.Receive({ sONo: rowData.sONo, opt: "INSTK_PROCESS_RECEIVE" }, function () {
                        $MessagService.loading("订单处理启动中...");
                        setTimeout(function () { $scope.ProcessingOrders(rowData.sONo) }, 1000);
                    });
                }
            });
        }

        $scope.ApplyBack = function (sono) {
            /// <summary>申请返库</summary>
            $local.setValue("ORDERCOMP", { apply: true });
            $scope.GetRowGoPage("app.order.addevent");
        }

        $scope.OrderBack = function (sono) {
            /// <summary>订单返库处理</summary>
            $local.setValue("ORDERCOMP", {});
            $scope.GetRowGoPage("app.order.fback");
        }

        $scope.showViewDetail = function (sono) {
            /// <summary>查看备货订单</summary>
            $local.setValue("ORDERCOMP", {});
            $scope.GetRowGoPage("app.stock.view");
        }
        $scope.showView = function (sono) {
            /// <summary>查看备货订单</summary>
            $local.setValue("ORDERCOMP", {});
            $state.go("app.stock.view", { sono: sono });
        }

        /*页面操作End*/

        /*页面列表Begion*/
        $scope.Pagein = {
            /// <summary>分页配置信息对象</summary>
            pageSize: 10,
            pageIndex: 1,
            callbake: function () {
                $scope.Integrated.GetStockList();
            }
        }

        $scope.Integrated = {
            StockList: new Array(),
            GetStockList: function (param) {
                /// <summary>获取我的订单数据列表</summary>
                $MessagService.loading("备货订单信息获取中，请稍等...");
                var paramData = $.extend($scope.Pagein, param);
                var GetList = $Api.StockService.DataSources.GetStockList;
                if (!paramData.opt) {
                    GetList = $Api.StockService.DataSources.GetIntegratedStockInquiry;
                }
                GetList(paramData, function (rData) {
                    $scope.Pagein.total = rData.total;
                    $scope.Integrated.StockList = rData.rows;
                });
            }
        }

        /*页面列表End*/

        /*页面权限Begion*/
        $scope.Competence = {
            modify: false,
            submit: false,
            approval: false,
            sign: false,
            dealwith: false,
            apply: false,
            back: false,
            append: false,
        }

        $scope.ListCompetence = {
            /// <summary>列表权限</summary>
            sONo: true, initMedProdLnCodeName: true
        }

        /*页面权限End*/
    })
app.controller("StockSingleController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>备货下单控制器</summary>
        /*基础对象区域Begion*/
        $scope.sono = $stateParams.sono;//获取订单编号
        $scope.PageData = { wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "", prodLns: new Array(), attachments: { images: new Array(), remark: "" } }
        //产品服务
        $scope.ProductService = {};
        //产品权限
        $scope.ProductCompetence = {
            kits: false, warehouse: false
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
                } else if (!$scope.PageData.deliveryReqArrivalDate) {
                    $MessagService.caveat("请输入送达要求")
                    result = false
                } else if ($scope.PageData.prodLns.length == 0) {
                    $MessagService.caveat("请选择产品线")
                    result = false
                } else if ($scope.PageData.prodLns[0].medMaterias.length == 0) {
                    $MessagService.caveat("请添加物料")
                    result = false
                }
                return result
            },
            Save: function () {
                /// <summary>下单保存</summary>
                $Api.StockService.Save($scope.PageData, function (rData) {
                    /// <summary>保存备货订单</summary>
                    setTimeout(function () {
                        $MessagService.succ("订单保存成功，订单号：" + rData);
                        $state.go("app.stock.draft");
                    }, 500);
                });
            },
            Submit: function () {
                /// <summary>提交模糊订单</summary> 	
                $Api.StockService.Submit($scope.PageData, function (rData) {
                    /// <summary>提交备货订单</summary>
                    setTimeout(function () {
                        $MessagService.succ("订单" + rData + "提交成功");
                        $state.go("app.stock.list");
                    }, 500);
                });
            },
            GetDetail: function () {
                /// <summary>获取订单明细</summary>
                $Api.StockService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) {
                    $.extend($scope.PageData, rData);
                    $.extend($scope.PageData, {
                        prodLns: rData.initOrderProdlns,
                        attachments: $scope.file.GetEventMapping(rData.events, "0001_0002")
                    });
                });
            }
        }


        $scope.file = {
            /// <summary>附件控制器</summary>
            Upload: function (files) {
                /// <summary>上传事件</summary>
                $.each(files, function (index, item) {
                    console.log($scope.PageData.attachments.images.length)
                    if ($scope.PageData.attachments.images.length >= 5) {
                        $MessagService.caveat("您上传的图片超过了5张!")
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
                $Api.RepresentativeService.GetDefaultaddress({}, function (address) {
                    if (address) {
                        $.extend($scope.PageData, {
                            deliveryContact: address.contact, deliveryrMobile: address.mobile, deliveryProvinceCode: address.provinceCode, deliveryProvinceName: address.provinceCodeName, deliveryCityCode: address.cityCode,
                            deliveryCityName: address.cityCodeName, deliveryDistrictCode: address.districtCode, deliveryDistrictName: address.districtCodeName, deliveryAddress: address.address, iniitCarrierTransType: address.carrierTransType
                        });
                    }
                });
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
            } else {
                $scope.AddressConfig.GetDefault();
            }
        })
        $scope.$watch("PageData.sOOIOrgCode", function () {
            /// <summary>货主修改的话</summary>
            if ($scope.PageData.sOOIOrgCode) {
                if ($scope.PageData.prodLns.length) {
                    $MessagService.caveat("货主发生变化，产品线已重置...");
                }
                $scope.PageData.prodLns = new Array();
            }
        });


        /*数据监控区域End*/
    })
app.controller("StockOriginalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>原始订单控制器</summary>
        $scope.singleProduc = {
            Service: {},
            Competence: { warehouse: false, materials: true, kits: false, tool: true, operat: false }
        }

        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.PageData, {
                    initFile: $scope.file.GetEventMapping($scope.PageData.events, "0001_0012")
                });
                if (!$scope.PageData.initFile.images.length) {
                    $scope.PageData.initFile = $scope.file.GetEventMapping($scope.PageData.events, "0001_0002")
                }

                $.extend($scope.singleProduc, {
                    prodLns: $scope.PageData.initOrderProdlns
                });
            }
        });

    })
app.controller("StockAccurateController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
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
app.controller("StockLibraryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route) {
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
                        $.extend(Bounds, { Material: $scope.LibraryService.MaterialAnalysis(Bounds) })
                    });
                }
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
app.controller("StockDealwithController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>订单处理</summary>

        $scope.DealService = {
            /// <summary>订单处理服务</summary>
            Submit: function () {
                /// <summary>订单处理提交</summary>
                $scope.ProductService.Deduplication();//去重
                $Api.StockService.Process.Submit($scope.PageData, function (rData) {
                    $scope.goLastPage();
                });
            }
        }

        $scope.TemplateService = {}

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
                    carrierTransType: rowInfo.carrierTransType
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
            tool: false,
            instruction: true
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
    })
app.controller("StockAdditionalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
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
app.controller("StockAddEventController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
        /// <summary>订单处理</summary>
        $scope.Event = { eventCode: "", attachments: { remark: "", images: new Array() } }

        /*数据监控Begion*/
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            if ($scope.PageData.sONo) {
                $.extend($scope.Event, {
                    sONo: $scope.PageData.sONo,
                    eventCode: "", remark: "", PostEvent: $scope.View.Competence.apply ? $Api.SurgeryService.Process.FeedBackApply : $Api.SurgeryService.Process.AddEvent
                })
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
                    $scope.AddEventService.EventList = rData;
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
app.controller("StockFeedbackViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route) {
        /// <summary>出库单</summary>
        $scope.FeedBack = { images: new Array(), remark: "" }
        $scope.$watch("PageData.sONo", function () {
            /// <summary>获取数据信息</summary>
            $scope.FeedBack = $scope.file.GetEventMapping($scope.PageData.events, "0080_0011")

        });
    });