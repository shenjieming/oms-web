/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />
app.controller("LibraryController", function ($scope, $state, $local, $Api, $MessagService, $stateParams, $FileService, $route) {
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

            $.each(prodLinList, function (index,item) {
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
});