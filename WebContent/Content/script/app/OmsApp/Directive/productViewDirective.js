/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngProductView", function ($Api, $MessagService, $local,$state) {
    /// <summary>产品信息</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngProductView.html?data=" + Timestamp,
        scope: {
            ngModel: '=',//映射对象
            ngOperat: "=",//操作对象
            ngComp: "=",//权限控制对象
            ngService:"=",//公开服务
            ngIconshow:"="//图标显示
        },
        replace: true,
        link: function ($scope,element,attrs){
            $scope.Statistic = {
                /// <summary>统计</summary>
                KitsCount: 0,//套件数
                KitMCount: 0,//套件使用物料数
                ProdLnsConunt: 0,//产品线数
                AllMaterialCount: 0,//总物料数
                AllImplantCount: 0,//总植入物数
                AllToolCount: 0,//总工具数
                ProMaterielCount: 0,//产品线物料数
                ProImplantCount: 0,//产品线植入物数
                ProToolCount: 0,//产品线工具数
                GetShowInfo: function () {
                    /// <summary>获取显示信息</summary>
                    $scope.ngComp.ShowInfo = "";
                    if ($scope.Statistic.KitsCount) {
                        $scope.ngComp.ShowInfo += " 套件：" + $scope.Statistic.KitsCount + "套（" + $scope.Statistic.KitMCount + "件）";
                    }
                    if ($scope.Statistic.AllMaterialCount) {
                        $scope.ngComp.ShowInfo += " 散件：" + $scope.Statistic.AllMaterialCount + "件（植入物：" + $scope.Statistic.AllImplantCount + "件，工具：" + $scope.Statistic.AllToolCount + "件）"
                    }
                }
            }
            var userInfo = $local.getValue("USER").userInfo;
            $scope.$watch("ngModel.prodLns.length", function () {
                /// <summary>产品线发生变化</summary>
                if ($scope.ngModel.prodLns) {
                    $scope.ProductConfig.tree.CreateProLineTree();
                    $scope.ngService.MitDeduplication();
                }
            });
            $scope.$watch("ngModel.isChangeProd", function () {
                if ($scope.ngModel.isChangeProd) {
                    $scope.ProductConfig.tree.CreateProLineTree();
                    $scope.ngService.MitDeduplication();
                    $scope.ngModel.isChangeProd = false;
                }
            });
            $scope.$watch("Statistic", function () {
                $scope.Statistic.GetShowInfo();
            })
            $scope.rowCollection = new Array();
            $scope.MedKitsConfig = {
                /// <summary>套件管理配置</summary>
                operat: {
                    fixed: function (MedKitsList) {
                        /// <summary>套件集合选择</summary>
                        $scope.ngService.MitDeduplication();
                        $scope.$apply(function () { $scope.MedKitsConfig.AddNewMedKits(MedKitsList); });
                    }
                },
                DelKit: function (index) {
                    /// <summary>删除套件</summary>
                    $scope.ngModel.medKits.splice(index, 1);
                    $scope.MedKitsConfig.GetKitCount();
                    $scope.WarehouseConfig.ChangeWHNote();
                },
                DetailView:function (row) {
                    // 套件详情
                    var medKitopt = row ?row:$local.getSelectedRow($scope.ngModel.medKits);
                    if (medKitopt){
                        $Api.SurgeryService.Process.Save($scope.ngModel, function (rData) {
                        });
                        $state.go('app.base.mybusiness.kitsview', {medKitopt: medKitopt.medKitInternalNo});
                    } else {
                        $MessagService.caveat("请选择一条查看的套件信息！");
                    }
                },
                AddNewMedKits: function (lise) {
                    /// <summary>添加新的套件</summary>
                    $.each(lise, function (index, item) {
                        var flg = true;
                        var data = $.extend(item, {
                            estZoneCode: item.zoneCode, estMedMIWarehouse: userInfo.orgCode,
                            medKitInternalNo: item.medMIInternalNo, inventory: "",
                        })
                        $.each($scope.ngModel.medKits, function (mKIndex, medKit) {
                            if (medKit.medKitInternalNo == data.medKitInternalNo
                                && data.estMedMIWarehouse == medKit.estMedMIWarehouse) {
                                medKit.reqQty += item.reqQty;
                                flg = false;
                                return false;
                            }
                        });
                        if (flg) {
                            $scope.ngModel.medKits.push(data);
                        }
                    });
                    $scope.MedKitsConfig.GetKitCount();
                    if ($scope.Competence.warehouse && $scope.Competence.operat) {
                        /// <summary>是否启动仓库</summary>
                        $scope.WarehouseConfig.GetKitInventory()
                    }
                },
                GetKitCount: function () {
                    /// <summary>获取套件数量</summary>
                    var stat = {
                        KitsCount: 0,
                        KitMCount: 0
                    }
                    var count = 0;
                    if ($scope.ngModel.medKits) {
                        $.each($scope.ngModel.medKits, function (index, item) {
                            stat.KitsCount += item.reqQty;
                            stat.KitMCount += (item.reqQty * item.medMaterialItemCouts)

                        });
                    }
                    $scope.Statistic = $.extend($scope.Statistic, stat);
                    $scope.Statistic.GetShowInfo();
                },
                useData: {}
            }
            $scope.view = {
                PageData: {},
                Sure:function () {
                    $scope.KitDetailModel.hide();
                },
            }
            //产品线选择控制
            $scope.ProductConfig = {
                operat: {
                    fixed: function (lineData) {
                        /// <summary>选择产品线事件</summary>
                        $scope.ngModel.prodLns.push(lineData);//返回对象添加到列表中
                    }
                },
                useLine: new Object(),//使用的数据源
                deleteLine: function () {
                    /// <summary>删除产品线</summary>
                    $scope.ngModel.prodLns.splice($scope.ProductConfig.useLine.index, 1);
                    $scope.ProductConfig.GetLineMaterialCount();
                },
                ChangeTool: function () {
                    /// <summary>修改是否需要工具</summary>
                    if ($scope.ProductConfig.useLine.index > -1) {
                        $scope.ngModel.prodLns[$scope.ProductConfig.useLine.index].isChecked = $scope.ProductConfig.useLine.isChecked;
                        $scope.ngModel.prodLns[$scope.ProductConfig.useLine.index].medProdLnCodeWithTool = $scope.ProductConfig.useLine.isChecked ? "Y" : "N";
                    }
                },
                GetAllMaterialCount: function () {
                    /// <summary>获取全部物料的个数</summary>
                    var stat = {
                        /// <summary>统计</summary>
                        AllMaterialCount: 0, AllImplantCount: 0, AllToolCount: 0
                    }
                    $.each($scope.ngModel.prodLns, function (index, item) {
                        $.each(item.medMaterias, function (mIndex,mItem) {
                            stat.AllMaterialCount += mItem.reqQty;
                            if (mItem.categoryByPlatform == "IMPLANT") {
                                stat.AllImplantCount += mItem.reqQty;
                            } else {
                                stat.AllToolCount += mItem.reqQty;
                            }
                        });
                    });
                    $.extend($scope.Statistic, stat);
                    $scope.MedKitsConfig.GetKitCount();
                    $scope.Statistic.GetShowInfo();
                },
                GetLineMaterialCount: function () {
                    /// <summary>获取当前产品线的物料个数</summary>
           
                    var stat = {
                        ProMaterielCount: 0, ProImplantCount: 0, ProToolCount: 0//产品线工具数
                    }
                    if (!$scope.ProductConfig.useLine.medMaterias) {
                        $scope.ProductConfig.useLine.medMaterias = new Array();
                    }
                    $.each($scope.ProductConfig.useLine.medMaterias, function (index, item) {
                        stat.ProMaterielCount += item.reqQty;
                        if (item.categoryByPlatform == "IMPLANT") {
                            stat.ProImplantCount += item.reqQty;
                        } else {
                            stat.ProToolCount += item.reqQty;
                        }
                    });
                    $.extend($scope.Statistic, stat);
                    $scope.ProductConfig.GetAllMaterialCount();
                },
                tree: {//树配置
                    CreateProLineTree: function () {
                        /// <summary>创建产品线树</summary>
                        if ($scope.ngModel.prodLns) {
                            var treeData = $scope.ProductConfig.tree.GetNewDataByProdLns();
                            $scope.ProductConfig.tree.data = treeData;
                            $scope.ProductConfig.useLine = $scope.ProductConfig.tree.data[$scope.ProductConfig.tree.data.length - 1];
                            $scope.MaterialsConfig.GetShowMaterial('');
                            $scope.ProductConfig.GetLineMaterialCount();
                        }
                    },
                    GetNewDataByProdLns: function () {
                        /// <summary>根据产品线获取新的树信息</summary>
                        var treeData = [{ id: 0, name: "散件", isParent: true, open: true }];
                        console.log($scope.ngModel.prodLns)
                        $.each($scope.ngModel.prodLns, function (index, item) {
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
                                medMaterias: item.medMaterias ? item.medMaterias : $scope.ProductConfig.tree.GetDefaultMaterial(item.medMaterialItems),
                                isChecked: item.medProdLnCodeWithTool == "Y" ? true : false
                            });
                            treeData.push(node);
                        });
                        return treeData;
                    },
                    GetDefaultMaterial: function (medMaterialItems) {
                        /// <summary>获取默认的物料信息</summary>
                        var result = new Array();
                        if (medMaterialItems) {
                            $.each(medMaterialItems, function (index, item) {
                                if (item.estMedMIWarehouse) {//判断是否存在已有仓库
                                    item.medMIWarehouse = item.estMedMIWarehouse;
                                } else { item.medMIWarehouse = item.medMIWarehouse ? item.medMIWarehouse : userInfo.orgCode }
                            });
                            result = medMaterialItems;
                        }
                        return result;
                    },
                    setting: {
                        data: { simpleData: { enable: true, idKey: "id", pIdKey: "pId", rootPId: 0 } },
                        callback: {
                            onClick: function (event, treeId, treeNode) {
                                /// <summary>双击打开事件</summary>
                                if (!treeNode.isParent) {
                                    $scope.$apply(function () {
                                        $scope.ProductConfig.useLine = $scope.ngModel.prodLns[treeNode.index];
                                        $scope.MaterialsConfig.GetShowMaterial('');
                                        $scope.ProductConfig.tree.LastNode = treeNode;
                                    });
                                }
                            }
                        }
                    },
                    data: [],
                    obj: new Object(),
                    treeId: attrs.ngProductView
                }
            };
            $scope.MaterialsConfig = {
                Material: new Array(),
                categoryByPlatform:"",
                operat: {
                    fixed: function (MaterialsList) {
                        /// <summary>确认选择物料</summary>
                        $scope.$apply(function () {
                            $scope.MaterialsConfig.GetRequtMaterial(MaterialsList, $scope.ProductConfig.useLine.medMaterias);
                            //$scope.ProductConfig.useLine.medMaterias = data;
                            $scope.ngModel.prodLns[$scope.ProductConfig.useLine.index].medMaterias = $scope.ProductConfig.useLine.medMaterias;
                            $scope.MaterialsConfig.GetShowMaterial('');
                        });
                    }
                },
                DelMaterial: function (index) {
                    /// <summary>删除物料</summary>
                    $scope.ProductConfig.useLine.medMaterias.splice(index, 1);
                    $scope.ngModel.prodLns[$scope.ProductConfig.useLine.index].medMaterias = $scope.ProductConfig.useLine.medMaterias;
                    $scope.MaterialsConfig.GetShowMaterial('');
                    $scope.ProductConfig.GetLineMaterialCount();
                    $scope.WarehouseConfig.ChangeWHNote();
                },
                GetRequtMaterial: function (MaterialsList, oldList) {
                    /// <summary>获取请求的物料</summary>
                    $.each(MaterialsList, function (index, item) {
                        if (item.reqQty > 0) {
                            oldList.push($.extend({ medMIWarehouse: userInfo.orgCode, inventory: "" }, item));
                            $scope.WarehouseConfig.ChangeWHNote();
                        }
                    });
                },
                GetShowMaterial: function (type) {
                    /// <summary>获取显示的物料</summary>
                    $scope.MaterialsConfig.Material = new Array();
                    $scope.MaterialsConfig.Deduplication();
                    $scope.MaterialsConfig.categoryByPlatform = type;
                    if ($scope.ProductConfig.useLine.medMaterias) {
                        $.each($scope.ProductConfig.useLine.medMaterias, function (index, item) {
                            if ((!type || type == item.categoryByPlatform) && item.reqQty > 0) {
                                $scope.MaterialsConfig.Material.push(item);
                            }
                        });
                    }
                    if ($scope.Competence.warehouse && $scope.Competence.operat && $scope.MaterialsConfig.Material.length > 0) {
                        /// <summary>是否启动仓库</summary>
                         $scope.WarehouseConfig.GetMedmaterialInventory()
                         var param = $scope.WarehouseConfig.GetMedmaterialParamData(medmaterial);
                         $Api.MaterialsService.GetMedmaterialInventory(param, function (rData) {
                             $scope.WarehouseConfig.AnalyticalInventory(rData, medmaterial);
                         })

                    }
                },
                Deduplication: function () {
                    /// <summary>去重</summary>
                    if ($scope.ProductConfig.useLine.medMaterias) {
                        var result = new Array();
                        $.each($scope.ProductConfig.useLine.medMaterias, function (index, item) {
                            var flg = true;
                            item.medMIWarehouse = item.medMIWarehouse ? item.medMIWarehouse : userInfo.orgCode
                            $.each(result, function (mIndex, mItem) {
                                if (item.medMIInternalNo == mItem.medMIInternalNo && item.medMIWarehouse == mItem.medMIWarehouse) {
                                    mItem.reqQty = (parseInt(item.reqQty) + parseInt(mItem.reqQty));
                                    flg = false;
                                    return true;
                                }
                            });
                            if (flg) {
                                result.push(item);
                            }
                        });
                        $scope.ProductConfig.useLine.medMaterias = result;
                        $scope.ProductConfig.GetLineMaterialCount();
                    }
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
                    /// <summary>获取套件物料库存</summary>
                    var param = $scope.WarehouseConfig.GetMedmaterialParamData(medmaterial);
                    $Api.MaterialsService.GetMedmaterialInventory(param, function (rData) {
                        $scope.WarehouseConfig.AnalyticalInventory(rData, medmaterial);
                    })
                    $scope.WarehouseConfig.ChangeWHNote();
                },
                ChangeWHNote: function () {
                    /// <summary>物料仓库分析，获取物料仓库指示</summary>
                    var WarehouseNoteArray = new Array();
                    alert(1)
                    $.each($scope.ngModel.prodLns, function (pindex, prod) {
                        /// <summary>遍历产品线</summary>
                        $.each(prod.medMaterias, function (mindex, materia) {
                            /// <summary>遍历物料</summary>
                            var flg = true;
                            /// <summary>遍历仓库结果集</summary>
                            $.each(WarehouseNoteArray, function (windex, warehouse)
                            {
                                console.log(warehouse.estMedMIWarehouse)
                                console.log(materia.medMIWarehouse)
                                if (warehouse.estMedMIWarehouse == materia.medMIWarehouse)
                                { flg = false; return false; }
                            });
                            if (flg) {
                                WarehouseNoteArray.push({
                                    estMedMIWarehouse: materia.medMIWarehouse,
                                    estMedMIWarehouseName: materia.estMedMIWarehouseName ? materia.estMedMIWarehouseName : userInfo.orgName
                                });
                            }
                        })
                    });

                    $.each($scope.ngModel.medKits, function (kindex, kit) {
                        /// <summary>遍历套件集合</summary>
                        var flg = true;
                        $.each(WarehouseNoteArray, function (windex, warehouse) {
                            console.log(kit.medMIWarehouse)
                            console.log(warehouse)
                            if (warehouse.estMedMIWarehouse == kit.medMIWarehouse)
                            { flg = false; return false; }
                        });
                        if (flg) {
                            WarehouseNoteArray.push({
                                estMedMIWarehouse: kit.estMedMIWarehouse,
                                estMedMIWarehouseName: kit.estMedMIWarehouseName ? kit.estMedMIWarehouseName : userInfo.orgName
                            });
                        }
                    });


                    $scope.ngModel.wsNotes = WarehouseNoteArray;

                },
                GetMedmaterialParamData: function (medmaterial) {
                    /// <summary>获取物料查询库存的条件</summary>
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
                    medmaterial.estMedMIWarehouseName = $scope.WarehouseConfig.GetWarehouseNameByCode(medmaterial.medMIWarehouse).name
                    return {
                        medMIInternalNo: medmaterial.medMIInternalNo,
                        warehouseCode: medmaterial.medMIWarehouse,
                        oIOrgCode: $scope.ngModel.sOOIOrgCode
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
                    $scope.WarehouseConfig.ChangeWHNote();                
                },
                GetKitParam: function (kit) {
                    /// <summary>获取套件库存条件</summary>
                    var result = new Array();
                    if (kit) {
                        result.push($scope.WarehouseConfig.StandardizationKitParam(kit));
                    } else {
                        $.each($scope.ngModel.medKits, function (index, item) {
                            if (item.estMedMIWarehouse) {
                                result.push($scope.WarehouseConfig.StandardizationKitParam(item));
                            }
                        });
                    }
                    return result;
                },
                StandardizationKitParam: function (kit) {
                    /// <summary>标准化套件请求的库存参数</summary>
                    kit.estMedMIWarehouseName = $scope.WarehouseConfig.GetWarehouseNameByCode(kit.estMedMIWarehouse).name;
                    return {
                        medKitInternalNo: kit.medKitInternalNo,
                        warehouseCode: kit.estMedMIWarehouse
                    };
                },
                KitInventory: function (data) {
                    /// <summary>解析库存</summary>
                    $.each(data, function (index, item) {
                        $.each($scope.ngModel.medKits, function (kIndex, kItem) {
                            if (item.medKitInternalNo == kItem.medKitInternalNo) {   kItem.inventory = item.inventory ? item.inventory : "0"; }
                        });
                    });
                },
                GetWarehouseNameByCode: function (code) {
                    /// <summary>根据仓库编码获取仓库名称</summary>
                    var result = { name: "未选择仓库" }
                    $.each($scope.WarehouseConfig.WarehouseList, function (index,item) {
                        if (item.id == code) {
                            result.name = item.text;
                            return false;
                        }
                    })
                    return result;
                }
            }
       
            $scope.Competence = { warehouse: true, materials: true, kits: true, tool: true, operat: true, instruction: false,wHSpecialNotes:false }
            if($scope.ngIconshow == 'offline'){
                // 图标显示
                $scope.Competence.operat=false;
            }else {
                $scope.Competence.operat=true;
            }
            //权限配置
            $.extend($scope.Competence, $scope.ngComp);
            if ($scope.Competence.warehouse && $scope.Competence.operat) {
                /// <summary>是否启动仓库</summary>
                $scope.WarehouseConfig.GetList();
            }
            $.extend($scope.ngService, {
                Deduplication: function () {
                    /// <summary>数据合并</summary>
                    this.MitDeduplication();
                    this.LineDeduplication();
                },
                LineDeduplication:function(){
                    /// <summary>产品线合并</summary>
                    $.each($scope.ngModel.prodLns, function (lineIndex, Line) {//便利产品线
                        var newMaterias = new Array();
                        $.each(Line.medMaterias, function (mIndex, materia) {
                            var flg = true;
                            $.each(newMaterias, function (index, item) {
                                if (item.medMIInternalNo == materia.medMIInternalNo && item.medMIWarehouse == materia.medMIWarehouse) {
                                    item.reqQty += materia.reqQty; return false;
                                }
                            });
                            if (flg) {
                                newMaterias.push(materia);
                            }
                        });
                        Line.medMaterias = newMaterias;
                    });
                },
                MitDeduplication: function () {
                    /// <summary>套件数据合并</summary>
                    var data = new Array();
                    if ($scope.ngModel.medKits) {
                        $.each($scope.ngModel.medKits, function (index, item) {
                            var flg = true;
                            $.each(data, function (mKIndex, medKit) {
                                if (medKit.medKitInternalNo == item.medKitInternalNo && item.estMedMIWarehouse == medKit.estMedMIWarehouse) {
                                    medKit.reqQty += item.reqQty;
                                    flg = false;
                                    return false;
                                }
                            });
                            if (flg) {
                                data.push(item);
                            }
                        });
                    }
                    $scope.ngModel.medKits = data;
                    console.log($scope.ngModel.medKits)
                }
            });
        }
    }
});