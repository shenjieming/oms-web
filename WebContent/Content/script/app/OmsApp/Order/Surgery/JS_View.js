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
        attachments: { images: new Array(), remark: "" },
        proView: new Object(),
        allCount: { implant: 0, tool: 0, all: 0 },
        Implate: new Array(),
        Tool: new Array(),
        wsNotes: new Array(),
    }

    $scope.PreViewCount = {
        //预览页面
        GetData: function () {
            $scope.PageData.proView = new Object();
            $scope.PageData.Implate = new Array();
            $scope.PageData.Tool = new Array();
            $scope.PageData.allCount.tool = 0;
            $scope.PageData.allCount.all = 0;
            $scope.PageData.allCount.implant = 0;
            $Api.SurgeryService.Process.ProView($scope.PageData, function (rData) {
                $scope.PageData.proView = rData;
                $scope.PreViewCount.CountImplantsIsSingle(rData.implants);
                $scope.PreViewCount.CountToolIsSingle(rData.tools)
            })
        },
        //植入物统计+去重
        CountImplantsIsSingle: function (implants) {
            if (implants) {
                $.each(implants, function (index, implant) {
                    $scope.PageData.allCount.all += implant.reqQty;
                    $scope.PageData.allCount.implant += implant.reqQty;
                    var flag = true;
                    $.each($scope.PageData.Implate, function (index, thisImplant) {
                        if (implant.medMIInternalNo == thisImplant.medMIInternalNo) {
                            thisImplant.reqQty += implant.reqQty;
                            flag = false;
                            return false;
                        }
                    });
                    if (flag) {
                        $scope.PageData.Implate.push(implant);
                    }
                })
            }
        },
        //工具统计+去重
        CountToolIsSingle: function (tools) {
            if (tools) {
                $.each(tools, function (index, tool) {
                    $scope.PageData.allCount.all += tool.reqQty;
                    $scope.PageData.allCount.tool += tool.reqQty;
                    var flag = true;
                    $.each($scope.PageData.Tool, function (index, thisTool) {
                        if (tool.medMIInternalNo == thisTool.medMIInternalNo) {
                            thisTool.reqQty += tool.reqQty;
                            flag = false;
                            return false;
                        }
                    });
                    if (flag) {
                        $scope.PageData.Tool.push(tool);
                    }
                })
            }
        }
    }

    $scope.View = {
        Surgery: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
        Competence: {}
    }
    $.extend($scope.View.Competence, $local.getValue("ORDERCOMP"));
    /*基础对象区域End*/
    //日期format 格式 
    function FormatDate(strTime) {
        //   var date = new Date(replace("-", "/").replace("-", "/"));         
        return strTime.getFullYear() + "-" + (strTime.getMonth() + 1) + "-" + strTime.getDate() + "  星期" + "日一二三四五六".charAt(strTime.getDay());
    }
    function FormatWeek(strTime) {
        //   var date = new Date(replace("-", "/").replace("-", "/"));
        return "星期" + "日一二三四五六".charAt(strTime.getDay());

    }
    /*逻辑对象区域Begion*/
    $scope.PageService = {
        /// <summary>页面服务</summary>
        GetDetail: function () {
            /// <summary>获取订单明细</summary>
            $Api.SurgeryService.DataSources.GetDetail({ sONo: $scope.sono }, function (rData) {
                $.extend($scope.PageData, rData);
                if ($scope.PageData.initOperationDate) {
                    $scope.PageData.DataFmtYMDW = FormatDate(new Date($scope.PageData.initOperationDate.replace("-", "/").replace("-", "/")))
                    var myDate = new Date($scope.PageData.initOperationDate)
                    $scope.DisplayWeek = FormatWeek(new Date($scope.PageData.initOperationDate.replace("-", "/").replace("-", "/")))
                }
                if ($scope.PageData.patientEntryDate) {
                    $scope.PageData.patientDateFmtYMDW = FormatDate(new Date($scope.PageData.patientEntryDate.replace("-", "/").replace("-", "/")))
                }
                if ($scope.PageData.retrieveEstDate) {
                    $scope.PageData.retrieveEstDateFmtYMDW = FormatDate(new Date($scope.PageData.retrieveEstDate.replace("-", "/").replace("-", "/")))
                }
                console.log($scope.PageData)
            });
        }
    }
    $scope.ApprovalConfig = {
        /// <summary>订单审批配置</summary>
        Operat: {
            fixed: function () {
                $scope.goLastPage();
            }
        },
        ApprovalBy: function () {
            $Api.SurgeryService.ApprovalBy($scope.PageData, function (rData) {
                $MessagService.succ($scope.PageData.sONo + "审批通过");
                $scope.goLastPage();
            })
        },
        Cancel: function () {
            if (confirm("您确认要取消" + "【" + $scope.PageData.sONo + "】" + "订单吗？")) {
                $Api.SurgeryService.Cancel($scope.PageData, function (rData) {
                    $scope.goLastPage();
                })
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
app.controller("OriginalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $OMSSpecially) {
    /// <summary>原始订单控制器</summary>
    $scope.singleProduc = {
        Service: {},
        Competence: { warehouse: false, materials: true, kits: false, tool: true, operat: false }
    }

    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                initFile: $OMSSpecially.File.GetEventMapping($scope.PageData.events, "0001_0011")
            });
            if (!$scope.PageData.initFile.images.length) {
                $scope.PageData.initFile = $OMSSpecially.File.GetEventMapping($scope.PageData.events, "0001_0001")
            }

            $.extend($scope.singleProduc, {
                prodLns: $scope.PageData.initOrderProdlns
            });
        }
    });

})
app.controller("AccurateController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $OMSSpecially) {
    /// <summary>精确订单</summary>
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                orderFile: $OMSSpecially.File.GetEventMapping($scope.PageData.events, "0020_0011")
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
        Competence: { tool: true, operat: false, wHSpecialNotes: true }
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
            result = " 物料：" + stat.AllMaterialCount + "件（植入物：" + stat.AllImplantCount + "件，工具：" + stat.AllToolCount + "件）"

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
app.controller("SingleController", function ($rootScope, $scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $AppHelp, $OMSSpecially) {
    /// <summary>手术下单下单控制器</summary>
    /*基础对象区域Begion*/
    $scope.sono = $stateParams.sono;//获取订单编号
    $scope.PageData = {
        wardDeptCode: "", initHPCode: "", initDTCode: "", patientDiseaseInfo: "",
        prodLns: new Array(),
        attachments: { images: new Array(), remark: "" },
    }
    $scope.initOperationDate = function () {
        /// <summary>获取当前手术时间</summary>
        $Api.SurgeryService.Process.GetFindUserLastOrder({}, function (rData) {
            $scope.PageData.initOperationDate = rData.initOperationDate;
        });
    }
    $scope.initOperationDate();
    //substring(0, 2);
    /*后台时间格式转换修改 YY-MM-DD (星期 几)*/
    var myDate = new Date($scope.PageData.initOperationDate)
    $scope.DisplayWeek = "  星期" + "日一二三四五六".charAt(myDate.getDay());
    //console.log($scope.PageData.DisplayWeek)
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
                $MessagService.caveat("请选择主刀医生")
                result = false
            }
            else if (!$scope.PageData.initOperationDate) {
                $MessagService.caveat("请选择手术时间")
                result = false
            } else if (!$scope.PageData.initDiseaseInfo) {
                $MessagService.caveat("请输入诊断信息")
                result = false
            } else if ($scope.PageData.prodLns.length == 0) {
                $MessagService.caveat("请至少选择一条产品线")
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
                    attachments: $OMSSpecially.File.GetEventMapping(rData.events, "0001_0001")
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
                    retrieveEstDate: $scope.PageData.retrieveEstDate, retrieveDesc: $scope.PageData.retrieveDesc,
                    //operationFeedbackRemark: $scope.PageData.operationFeedbackRemark
                },
                medMaterial: {},
                attachment: $scope.file.GetEventMapping($scope.PageData.events, "0080_0001")
            })
            $scope.WarehouseConfig.GetList();
            $scope.dictionary.GetUseType();
            $scope.MaterialsConfig.GetMaterialList($scope.PageData.feedBackProcess, $scope.PageData.feedBack);
        }
    });
    /*数据监控End*/

    $scope.FeedBack = {
        order: {},
        medMaterial: new Array(),
        notInDetail: new Array(),
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
        },

    }
    $scope.WarehouseConfig = {
        /// <summary>仓库配置信息</summary>
        WarehouseList: new Array(),
        GetList: function () {
            /// <summary>获取仓库列表</summary>
            $Api.MaterialsService.GetAllWareHouse({}, function (rData) {
                $scope.WarehouseConfig.WarehouseList = rData;
            });
        },

    }
    $scope.FeedBackService = {
        /// <summary>订单处理服务</summary>
        Submit: function () {
            //校验并添加默认数据
            console.log($scope.FeedBack)
            if ($scope.FeedBack.notInDetail.length > 0) {
                $.each($scope.FeedBack.notInDetail, function (index, item) {
                    if (item.lotSerial == null) {
                        item.lotSerial = "NOLOTINFO";//设置默认值
                    }
                    if (item.returnWarehouse == null) {
                        var currentUser = $local.getValue("USER").userInfo;
                        var warehouse = currentUser.orgCode;
                        item.returnWarehouse = warehouse;
                    }
                })
            }
            /// <summary>订单处理提交</summary>
            $Api.SurgeryService.Process.Back($scope.FeedBack, function (rData) {
                $scope.goLastPage();
            });
        },
        Save: function () {
            /// <summary>反馈单暂存</summary>
            if ($scope.FeedBack.notInDetail.length > 0) {
                $.each($scope.FeedBack.notInDetail, function (index, item) {
                    if (item.lotSerial == null) {
                        item.lotSerial = "NOLOTINFO";//设置默认值
                    }
                    if (item.returnWarehouse == null) {
                        var currentUser = $local.getValue("USER").userInfo;
                        var warehouse = currentUser.orgCode;
                        item.returnWarehouse = warehouse;
                    }
                })
            }
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

    $scope.OtherMaterialsConfig = {
        //  出库清单外物料添加
        fixed: function (OtherMaterialsList) {
            $scope.$apply(function () {
                console.log(OtherMaterialsList)
                if (OtherMaterialsList) {
                    for (var i = 0; i < OtherMaterialsList.length; i++) {
                        OtherMaterialsList[i].remark = "";
                    }
                }
                if ($scope.FeedBack.notInDetail.length > 0) {
                    var result = new Array();
                    var hash = {};
                    var allMaterials = $scope.FeedBack.notInDetail.concat(OtherMaterialsList);                  
                    for (var i = 0, elem; (elem = allMaterials[i]) != null; i++) {
                        if (hash[elem.medMIInternalNo]) {
                            $.each(result, function (index, item) {
                                // 如果 物料相同的话,合并数据
                                if (item.medMIInternalNo == elem.medMIInternalNo) {
                                    item.useQty += elem.reqQty
                                    item.reqQty="";
                                }
                            })
                        } else {
                            if(!elem.useQty){
                                elem.useQty=elem.reqQty;
                            }
                            result.push(elem);
                            hash[elem.medMIInternalNo] = true;
                        }
                    }
                    $scope.FeedBack.notInDetail = result;
                } else {
                    // 如果  物料不相同的话  添加一条数据
                    $.each(OtherMaterialsList, function (index, item) {
                        item.useQty=item.reqQty;
                        item.reqQty="";
                        $scope.FeedBack.notInDetail.push(item);
                    })
                }
                $scope.dictionary.GetUseType();
                for (var i = 0; i < $scope.FeedBack.notInDetail.length; i++) {
                    $scope.FeedBack.notInDetail[i].returnWarehouse = $scope.User.userInfo.orgCode;
                    $scope.FeedBack.notInDetail[i].useType = $scope.dictionary.UseTypeList[0].id;         
                }       
            })
        },
        DelKit: function (index) {
            $scope.FeedBack.notInDetail.splice(index, 1);
        },
        Add: function (row) {
            //克隆上一条数据
            $scope.FeedBack.notInDetail.push(
                {
                    medBrandName: row.medBrandName, medProdLnName: row.medProdLnName, medMICode: row.medMICode,
                    medMIName: row.medMIName, categoryByPlatformName: row.categoryByPlatformName, specification: row.specification,
                    lotSerial:"",useQty:1,returnWarehouse:row.returnWarehouse,
                    medMIInternalNo: row.medMIInternalNo, remark: "", useType: row.useType
                }
                )
        }
    }
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
            if (ulist.medMaterial.length) {
                // $.each(result, function (index, item) {
                //     $.each(ulist.medMaterial, function (uIndex, uItem) {
                //         if (uItem.medMIInternalNo == item.medMIInternalNo && item.lotSerial == uItem.lotSerial) {//同批次物料
                //             $.extend(item, {
                //                 useQty: uItem.useQty
                //             });
                //         }
                //     });
                // });
                $.each(ulist.medMaterial,function (uindex,item) {
                     if(item.isInSODetail=="y" ){
                         result.push(item)
                     }else if (item.isInSODetail=="N"){
                         $scope.FeedBack.notInDetail.push(item)
                     }
                });
            }

            $scope.FeedBack.medMaterial = result;
        }
    };
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
            // $scope.DealService.OutboundInstructions();
            if ($scope.DealService.Verification()) {
                $scope.ProductService.Deduplication();//去重
                $Api.SurgeryService.Process.Submit($scope.PageData, function (rData) {
                    $scope.DealService.model.hide();
                    $scope.goLastPage();
                });
            }
        },
        Verification: function () {
            var verifig = true;
            $.each($scope.PageData.prodLns, function (index, item) {
                if (!item.medMaterias.length) {
                    $MessagService.caveat("产品线：" + item.medBrandCodeName + "未配置出库物料");
                    verifig = false;
                }
            });
            $Api.SurgeryService.Process.QueryStock($scope.PageData, function (rData) {
                // 查询库存提示
                if (rData == "SOHDLMLSFR") {
                    $MessagService.caveat("该仓库物料库存不足，无法提交，请与仓库确认！")
                    verifig = false;
                } else if (rData == "SOHDLMLSNF") {
                    if (!confirm("存在不满足库存数量的套件，请问是否继续提交？")) {
                        verifig = false;
                    }
                }
            });
            return verifig;
        },
        Save: function () {
            /// <summary>订单处理保存</summary>
            $scope.ProductService.Deduplication();//去重
            $Api.SurgeryService.Process.Save($scope.PageData, function (rData) {
                $MessagService.loading("处理保存中，请稍等...");
                $scope.goLastPage();
            });
        },
        DealServicehide: function () {
            /// <summary>手术下单预览隐藏</summary>
            $scope.DealService.model.hide();
        },
        Show: function () {
            /// <summary>线上处理订单预览</summary>
            $scope.PreViewCount.GetData();
            $scope.DealService.model.show();
            //精确订单 预览显示 配送字段  key value
            if ($scope.PageData.carrierTransType == "AIR") {
                $scope.PageData.carrierTransTypeName = "航空";
            }
            else if ($scope.PageData.carrierTransType == "BUS") {
                $scope.PageData.carrierTransTypeName = "大巴";
            }
            else if ($scope.PageData.carrierTransType == "DIRECT") {
                $scope.PageData.carrierTransTypeName = "直送";
            }
            else if ($scope.PageData.carrierTransType == "EXPRESS") {
                $scope.PageData.carrierTransTypeName = "快递";
            }
            else if ($scope.PageData.carrierTransType == "PERWH") {
                $scope.PageData.carrierTransTypeName = "不限";
            }
            else if ($scope.PageData.carrierTransType == "SELFPICK") {
                $scope.PageData.carrierTransTypeName = "自提";
            }
        },
        OfflineSubmit: function () {
            /// <summary>线下处理订单提交</summary>
            if ($scope.PageData.sOOfflineHandleReasonType) {
                if ($scope.View.Competence.handleType == 'offline') {
                    $Api.SurgeryService.Process.OfflineSubmit($scope.PageData, function (rData) {
                        $scope.goLastPage();
                        $MessagService.succ("该订单处理成功！");
                    });
                }
            } else {
                $MessagService.caveat("请选择线下处理原因！");
            }
        },
        Cancel: function () {
            if (confirm("您确认要取消当前订单吗?")) {
                //调用取消接口，因不满足前置条件，无法回退，保持原状就行
                $Api.SurgeryService.Cancel($scope.PageData, function (rData) {
                    $MessagService.succ("订单取消成功！");
                    $scope.goLastPage();
                });
            }
        },
        Print: function () {
            /// <summary>显示出库单号</summary>
            if ($scope.DealService.Verification()) {
                //提交订单处理
                $Api.SurgeryService.Process.Submit($scope.PageData, function (rData) {
                    $scope.DealService.model.hide();
                });
                // 获取出库单号
                $Api.SurgeryService.DataSources.GetOutBoundList({ sONo: $scope.PageData.sONo }, function (rData) {
                    $scope.OutboundOrdermodel.show();
                    $scope.Print = rData;
                });
            };//去重
        },
        PrintCancel: function () {
            $MessagService.loading("正在处理订单信息.....");
            setTimeout(function () {
                $MessagService.loading("正在生成出库单...");
                setTimeout(function () {
                    $MessagService.loading("正在提交仓库信息...");
                    setTimeout(function () {
                        $MessagService.loading("正在生成拣货任务...");
                        setTimeout(function () {
                            $MessagService.loading("正在生成拣货单 ...");
                            setTimeout(function () {
                                $MessagService.loading("正在生成打印 ...");
                            }, 5000)
                            setTimeout(function () {
                                $scope.OutboundOrdermodel.hide();
                                window.open("http://wmstest.med-log.cn/Reports/Pages/Report.aspx?ItemPath=%2freport+project1%2fpicklist");
                                $state.go("app.oms.order.deal")
                            }, 5000);
                        }, 5000);
                    }, 5000);
                }, 5000);
            }, 5000);

        },
    }
    function FormatDate(strTime) {
        //   var date = new Date(replace("-", "/").replace("-", "/"));         
        return strTime.getFullYear() + "-" + (strTime.getMonth() + 1) + "-" + strTime.getDate() + "  星期" + "日一二三四五六".charAt(strTime.getDay());
    }
    $scope.DealService.model = {
        title: "手术下单预览", width: 960, height: 800, buttons: { "提交": $scope.DealService.Submit, "提交并打印": $scope.DealService.Print, "返回": $scope.DealService.DealServicehide, }, open: function () {
            $(".ui-dialog-title").html("订单 " + $scope.PageData.sONo + " 配货清单确认")
            $scope.OperationDate = FormatDate(new Date($scope.PageData.operationDate.replace("-", "/").replace("-", "/")))
        }
    };
    $scope.OutboundOrdermodel = { title: "出库单", width: 730, height: 200, buttons: { "确定": $scope.DealService.PrintCancel }, open: function () { $(".ui-dialog-title").html("订单 " + $scope.PageData.sONo + " ,请复制您所在仓库的出库单号用于之后的打印...") }, close: function () { $scope.goLastPage(); } };
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

    $scope.ImportTemplateServicePublic = {
        /// <summary>物料模板导入</summary>
        fixed: function (templateInfo) {
            /// <summary>确认使用模板</summary>
        }
    }
    $scope.ImportTemplateServicePrivate = {
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
    // 图标显示

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
        Service: {}, Competence: { tool: false, instruction: false, }
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
app.controller("FeedbackViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route, $OMSSpecially) {
    /// <summary>出库单</summary>
    $scope.FeedBack = { images: new Array(), remark: "" }
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        $scope.FeedBack = $OMSSpecially.File.GetEventMapping($scope.PageData.events, "0080_0011")
    })
})
app.controller("OrderDeliveryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>订单发货信息</summary>
    $scope.shipped = new Object();
    $scope.sONo = $stateParams.sONo;
    console.log($stateParams.wONo)
    if ($stateParams.wONo) {
        $scope.shipped.wONo = $stateParams.wONo;
        $scope.shipped.shipType = "outbound";
    } else {
        $scope.shipped.shipType = "order";
    }
    $scope.shipped.sONo = $scope.sONo;
    $scope.shipped.expressRemark = "运费已付";
    $scope.shipped.busSendRemark = "运费已付";
    $scope.shipped.airSendRemark = "运费已付";
    $scope.shippedSubmit = {
        Direct: function () {
            /// <summary>直送发货提交</summary>
            //alert("提交成功！")
            var result = true;
            if (!$scope.shipped.directSendMan) {
                $MessagService.caveat("请输入送货人！")
                result = false;
            }
            else if (!$scope.shipped.directSendManPhone) {
                $MessagService.caveat("请输入送货人手机！")
                result = false;
            }
            if (result) {
                $scope.shipped.carrierTransType = "DIRECT";
                $Api.SurgeryService.Process.deliverySubmit($scope.shipped, function (rData) {
                    $MessagService.caveat("提交成功")
                    $scope.goLastPage();
                });
            }
        },
        Express: function () {
            /// <summary>快递发货提交</summary>
            //alert("提交成功！")     
            var result = true;
            if (!$scope.shipped.expressCompany) {
                $MessagService.caveat("请选择快递公司！")
                result = false;
            }
            else if (!$scope.shipped.expressNumber) {
                $MessagService.caveat("请输入快递单号！")
                result = false;
            }
            if (result) {
                $scope.shipped.carrierTransType = "EXPRESS";
                $Api.SurgeryService.Process.deliverySubmit($scope.shipped, function (rData) {
                    $MessagService.caveat("提交成功")
                    $scope.goLastPage();
                });
            }
        },
        Bus: function () {
            /// <summary>大巴发货提交</summary>
            //alert("提交成功！")
            var result = true;
            if (!$scope.shipped.busNumber) {
                $MessagService.caveat("请输入车牌号！")
                result = false;
            }
            else if (!$scope.shipped.busDriverPhone) {
                $MessagService.caveat("请输入司机电话！")
                result = false;
            }
            else if (!$scope.shipped.busDriverName) {
                $MessagService.caveat("请输入司机姓名！")
                result = false;
            }
            if (result) {
                $scope.shipped.carrierTransType = "BUS";
                $Api.SurgeryService.Process.deliverySubmit($scope.shipped, function (rData) {
                    $MessagService.caveat("提交成功")
                    $scope.goLastPage();
                });
            }
        },
        Air: function () {
            /// <summary>航空发货提交</summary>
            //alert("提交成功！")
            var result = true;
            if (!$scope.shipped.airCompany) {
                $MessagService.caveat("请选择航空公司！")
                result = false;
            }
            else if (!$scope.shipped.airFlightNumber) {
                $MessagService.caveat("请输入航班号！")
                result = false;
            }
            else if (!$scope.shipped.airSendMan) {
                $MessagService.caveat("请输入送货人！")
                result = false;
            }
            else if (!$scope.shipped.airSendManPhone) {
                $MessagService.caveat("请输入送货人手机！")
                result = false;
            }
            if (result) {
                $scope.shipped.carrierTransType = "AIR";
                $Api.SurgeryService.Process.deliverySubmit($scope.shipped, function (rData) {
                    $MessagService.caveat("提交成功")
                    $scope.goLastPage();
                });
            }
        },
        Selfpick: function () {
            /// <summary>自提发货提交</summary>
            //alert("提交成功！")
            var result = true;
            if (!$scope.shipped.pickedUpMan) {
                $MessagService.caveat("请输入提货人！")
                result = false;
            }
            else if (!$scope.shipped.pickedUpManPhone) {
                $MessagService.caveat("请输入提货人手机！")
                result = false;
            }
            if (result) {
                $scope.shipped.carrierTransType = "SELFPICK";
                $Api.SurgeryService.Process.deliverySubmit($scope.shipped, function (rData) {
                    $MessagService.caveat("提交成功")
                    $scope.goLastPage();
                });
            }
        }
    }
    $scope.Cancel = {
        Direct: function () {
            /// <summary>直送发货清空</summary>       
            $scope.shipped.directSendMan = "";
            $scope.shipped.directSendManPhone = "";
            $scope.shipped.directSendRemark = "";
        },
        Express: function () {
            /// <summary>快递发货清空</summary>
            $scope.shipped.expressCompany = "";
            $scope.shipped.expressCompanyName = "";
            $scope.shipped.expressNumber = "";
            $scope.shipped.expressRemark = "";

        },
        Bus: function () {
            /// <summary>大巴发货清空</summary>
            $scope.shipped.busNumber = "";
            $scope.shipped.busDriverPhone = "";
            $scope.shipped.busDriverName = "";
            $scope.shipped.busSendRemark = "";
        },
        Air: function () {
            /// <summary>航空发货清空</summary>
            $scope.shipped.airCompany = "";
            $scope.shipped.airCompanyName = "";
            $scope.shipped.airFlightNumber = "";
            $scope.shipped.airSendMan = "";
            $scope.shipped.airSendManPhone = "";
            $scope.shipped.airSendRemark = "";
        },
        Selfpick: function () {
            /// <summary>自提发货清空</summary>
            $scope.shipped.pickedUpMan = "";
            $scope.shipped.pickedUpManPhone = "";
            $scope.shipped.pickedUpRemark = "";
        }
    }

    $scope.SelectInfo = {
        // 下拉框
        expressCompany: {
            //快递公司下拉框
            dic: new Array(),
            change: function () {
                /// <summary>快递修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.expressCompany.dic.length; i++) {
                    if ($scope.SelectInfo.expressCompany.dic[i].id == $scope.shipped.expressCompany) {
                        $scope.shipped.expressCompanyName = $scope.SelectInfo.expressCompany.dic[i].text;
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取快递公司信息</summary>
                $Api.Public.GetDictionary({ dictType: "RFNOTP", dictSubClass1: "Express" }, function (rData) {
                    $scope.SelectInfo.expressCompany.dic = rData;
                });
            },
        },
        airCompany: {
            //航空公司下拉框
            dic: new Array(),
            change: function () {
                /// <summary>航空修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.airCompany.dic.length; i++) {
                    if ($scope.SelectInfo.airCompany.dic[i].id == $scope.shipped.airCompany) {
                        $scope.shipped.airCompanyName = $scope.SelectInfo.airCompany.dic[i].text;
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取航空公司信息</summary>
                $Api.Public.GetDictionary({ dictType: "RFNOTP", dictSubClass1: "AIR" }, function (rData) {
                    $scope.SelectInfo.airCompany.dic = rData;
                });
            },
        },
    }
    $scope.SelectInfo.expressCompany.getList();
    $scope.SelectInfo.airCompany.getList();
})
app.controller("OutboundDeliveryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>出库单发货信息</summary>
    $scope.sONo = $stateParams.sONo;
    $scope.OutboundDelivery = new Object();
    $scope.OutboundDelivery.sONo = $scope.sONo;
    $Api.SurgeryService.DataSources.GetOutBoundList({ sONo: $scope.sONo }, function (rData) {
        for (var i = 0; i < rData.length; i++) {
            if (rData[i].createDate) {
                rData[i].createDate = rData[i].createDate.substring(0, 11)
            }
        }
        $scope.OutboundDelivery = rData;
    });
    $scope.goDeliveryType = function () {
        var row = $local.getSelectedRow($scope.OutboundDelivery)
        console.log(row)
        if (row) {
            $state.go("app.oms.order.orderdelivery", row)
        } else {
            $MessagService.caveat("请选择一条出库单进行发货！")
        }
    }
})