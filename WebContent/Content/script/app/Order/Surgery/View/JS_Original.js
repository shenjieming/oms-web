/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("OriginalController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService) {
    /// <summary>原始订单控制器</summary>
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

    //产品线选择控制
    $scope.ProductlineConfig = {
        useLine: {},//使用的数据源
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
                $.each($scope.PageData.initOrderProdlns, function (index, item) {
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

    $scope.$watch("PageData.sONo", function () {
        /// <summary>获取数据信息</summary>
        if ($scope.PageData.sONo) {
            $.extend($scope.PageData, {
                initFile: $scope.file.GetEventMapping($scope.PageData.events, "0001_0011")
            });
            $scope.ProductlineConfig.tree.CreateProLineTree();
        }
    });

});