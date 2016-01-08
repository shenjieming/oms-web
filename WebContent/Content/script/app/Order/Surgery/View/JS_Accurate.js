/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("AccurateController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>精确订单</summary>
    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                orderFile: $scope.file.GetEventMapping($scope.PageData.events, "0020_0011")
            });
            $scope.AccProductConfig.tree.CreateProLineTree();
        }
    });


    //产品线选择控制
    $scope.AccProductConfig = {
        useLine: {},//使用的数据源
        tree: {//树配置
            CreateProLineTree: function () {
                /// <summary>创建产品线树</summary>
                var treeData = $scope.AccProductConfig.tree.GetNewDataByProdLns();
                $scope.AccProductConfig.tree.data = treeData;
                if (treeData.length > 1) {
                    $scope.AccProductConfig.useLine = $scope.AccProductConfig.tree.data[treeData.length - 1];
                    $scope.MaterialsConfig.GetShowMaterial();
                }
            },
            GetNewDataByProdLns: function () {
                /// <summary>根据产品线获取新的树信息</summary>
                var treeData = [{ id: 0, name: "散件", isParent: true, open: true }];
                $.each($scope.PageData.orderProdlns, function (index, item) {
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
                                $scope.AccProductConfig.useLine = treeNode;
                                $scope.MaterialsConfig.GetShowMaterial();
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

});