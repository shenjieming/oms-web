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

    $scope.MedKitsConfig = {
        operat: {
            fixed: function (MedKitsList) {
                /// <summary>套件集合选择</summary>
                $scope.$apply(function () { $scope.MedKitsConfig.AddNewMedKits(MedKitsList); });
            }
        },
        AddNewMedKits: function (lise) {
            /// <summary>添加新的套件</summary>
            $.each(lise, function (index, item) {
                var flg = true;
                $.each($scope.PageData.medKits, function (mKIndex, medKit) {
                    if (medKit.medKitInternalNo == item.medKitInternalNo) {
                        medKit.reqQty += medKit.reqQty;
                        flg = false;
                    }
                });
                if (flg) {
                    $scope.PageData.medKits.push($.extend(item, { estZoneCode: item.zoneCode, estMedMIWarehouse: "", medKitInternalNo: item.medMIInternalNo, inventory: "", estMedMIWarehouse: "" }));
                }
            });
        },
        useData: {}
    }
    //产品线选择控制
    $scope.ProductConfig = {
        operat: {
            fixed: function (lineData) {
                /// <summary>选择产品线事件</summary>
                $scope.$apply(function () {
                    $scope.PageData.prodLns.push(lineData);//返回对象添加到列表中
                });
            }
        },
        useLine: {},//使用的数据源
        deleteLine: function () {
            /// <summary>删除产品线</summary>
            $scope.PageData.prodLns.splice($scope.ProductConfig.useLine.index, 1);
        },
        tree: {//树配置
            CreateProLineTree: function () {
                /// <summary>创建产品线树</summary>
                var treeData = $scope.ProductConfig.tree.GetNewDataByProdLns();
                $scope.ProductConfig.tree.data = treeData;
                $scope.ProductConfig.useLine = $scope.ProductConfig.tree.data[treeData.length - 1];
                $scope.MaterialsConfig.GetShowMaterial();
            },
            GetNewDataByProdLns: function () {
                /// <summary>根据产品线获取新的树信息</summary>
                var treeData = [{ id: 0, name: "散件", isParent: true, open: true }];
                $.each($scope.PageData.prodLns, function (index, item) {
                    var brandNode = { id: item.medBrandCode, name: item.medBrandCodeName, isParent: true, pId: 0, open: true };
                    if (JSON.stringify(treeData).indexOf(JSON.stringify(brandNode)) < 0) {//判断节点是否重复
                        treeData.push(brandNode);
                    }
                    //对象复制
                    var node = $.extend(item, {
                        id: item.medProdLnCode,
                        name: item.medProdLnCodeName,
                        pId: item.medBrandCode,
                        index: index,
                        medMaterias: item.medMaterias ? item.medMaterias : (item.medMaterialItems ? item.medMaterialItems : new Array()),
                        isChecked: item.medProdLnCodeWithTool == "Y" ? true : false
                    });
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
                                $scope.ProductConfig.useLine = $scope.PageData.prodLns[treeNode.index];
                                $scope.MaterialsConfig.GetShowMaterial();
                                $scope.ProductConfig.tree.LastNode = treeNode;
                            });
                        }
                    }
                }
            },
            data: [],
            obj: new Object()
        }
    };

    $scope.MaterialsConfig = {
        Material:new Array(),
        operat: {
            fixed: function (MaterialsList) {
                /// <summary>确认选择物料</summary>
                $scope.$apply(function () {
                    var data = $scope.MaterialsConfig.GetRequtMaterial(MaterialsList, $scope.ProductConfig.useLine.medMaterias);
                    $scope.ProductConfig.useLine.medMaterias = data;
                    $scope.PageData.prodLns[$scope.ProductConfig.useLine.index].medMaterias = $scope.ProductConfig.useLine.medMaterias;
                    $scope.MaterialsConfig.GetShowMaterial();
                });
            }
        },
        GetRequtMaterial: function (MaterialsList,oldList) {
            /// <summary>获取请求的物料</summary>
            var result = new Array();
            $.each(MaterialsList, function (index, item) {
                if (item.reqQty > 0) {
                    result.push($.extend({ medMIWarehouse: "", inventory: "" }, item));
                }
            });
            return result;
        },
        GetShowMaterial: function (type) {
            /// <summary>获取显示的物料</summary>
            $scope.MaterialsConfig.Material = new Array();
            $.each($scope.ProductConfig.useLine.medMaterias, function (index, item) {
                if ((!type || type == item.categoryByPlatform) && item.reqQty > 0) {
                    $scope.MaterialsConfig.Material.push(item);
                }
            })

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
        },
        GetMedmaterialInventory: function (medmaterial) {
            /// <summary>获取物料库存</summary>
            var param = $scope.WarehouseConfig.GetMedmaterialParamData(medmaterial);
            $Api.MaterialsService.GetMedmaterialInventory(param, function (rData) { $scope.WarehouseConfig.AnalyticalInventory(rData, medmaterial); })
        },
        GetMedmaterialParamData: function (medmaterial) {
            var paramData = new Array();
            if (medmaterial) {
                paramData.push($scope.WarehouseConfig.StandardizationMedmaterialParam(medmaterial));
            } else {
                $.each($scope.ProductConfig.useLine.medMaterias, function (index, item) {
                    if (item.medMIWarehouse) {
                        paramData.push($scope.WarehouseConfig.StandardizationMedmaterialParam(item));
                    }
                });
            }
            return paramData;
        },
        StandardizationMedmaterialParam: function (medmaterial) {
            /// <summary>标准化物料条件参数</summary>
            return {
                medMIInternalNo: medmaterial.medMIInternalNo,
                warehouseCode: medmaterial.medMIWarehouse,
                oIOrgCode: $scope.PageData.sOOIOrgCode
            };
        },
        AnalyticalInventory: function (invData) {
            /// <summary>解析库存</summary>
            $.each(invData, function (index, item) {
                $.each($scope.ProductConfig.useLine.medMaterias, function (mIndex, mItem) {
                    if (mItem.medMIInternalNo == item.medMIInternalNo) {
                        mItem.inventory = item.inventory ? item.inventory : "0";
                        return false;
                    }
                });
            });
        },
        GetKitInventory: function (kit) {
            /// <summary>获取套件库存</summary>
            var paramData = $scope.WarehouseConfig.GetKitParam(kit);
            $Api.MedKitService.GetKitInventory(paramData, $scope.WarehouseConfig.KitInventory);
        },
        GetKitParam: function (kit) {
            /// <summary>获取泰安库存条件</summary>
            var result = new Array();
            if (kit) {
                result.push($scope.WarehouseConfig.StandardizationKitParam(kit));
            } else {
                $.each($scope.PageData.medKits, function (index, item) {
                    if (item.estMedMIWarehouse) {
                        result.push($scope.WarehouseConfig.StandardizationKitParam(item));
                    }
                });
            }
            return result;
        },
        StandardizationKitParam: function (kit) {
            /// <summary>标准化套件请求的库存参数</summary>
            return {
                medKitInternalNo:kit.medKitInternalNo,
                warehouseCode: kit.estMedMIWarehouse
            };
        },
        KitInventory: function (data) {
            /// <summary>解析库存</summary>
            $.each(data, function (index,item) {
                $.each($scope.PageData.medKits, function (kIndex, kItem) {
                    if (item.medKitInternalNo == kItem.medKitInternalNo) {
                        kItem.inventory = item.inventory ? item.inventory : "0";
                    }
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


    /*数据监控Begion*/
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $scope.WarehouseConfig.GetList();
            $.extend($scope.PageData.prodLns, $scope.PageData.initOrderProdlns);
            $scope.PageData.medKits = new Array();
        }
    });

    $scope.$watch("PageData.prodLns.length", function () {
        /// <summary>产品线发生变化</summary>
        $scope.ProductConfig.tree.CreateProLineTree();
    });

    /*数据监控End*/
});