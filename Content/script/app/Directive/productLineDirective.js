/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngProductline", function ($Api, $MessagService) {
    /// <summary>产品线选择</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngProductline.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngCargoModel:"=",
            ngOperat: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var modelConfig = {
                title: "选择产品线", width: 650, height: 300, buttons: {
                    "确定": function () {
                        if ($scope.ngOperat.verification() && $scope.ngOperat.repeat()) {
                            $scope.$apply(function () {
                                $scope.ngOperat.fixed($scope.prodLn);
                                $scope.ngOperat.hide();
                                //数据清空
                                $scope.prodLn = new Object();
                                $scope.Server.Brand = null;
                                $scope.prodLn.isChecked = true; $scope.prodLn.medProdLnCodeWithTool = "Y";
                            });
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                },
                verification: function () {
                    /// <summary>验证用户选择</summary>
                    var result = false;
                    if ($scope.prodLn.medProdLnCode) {
                        $.each($scope.Server.ProductLineList, function (index, item) {
                            if (item.id == $scope.prodLn.medProdLnCode) {
                                $scope.prodLn.medProdLnCodeName = item.text
                            }
                        });
                        $scope.prodLn.medMaterias = new Array();
                        result = true;
                    } else {
                        $MessagService.caveat("请选择一条产品线信息！");
                    }
                    return result;
                },
                repeat: function () {
                    /// <summary>检查产品线是否重复</summary>
                    var result = true;
                    $.each($scope.ngModel, function (index,item) {
                        if (item.medProdLnCode == $scope.prodLn.medProdLnCode) {
                            $MessagService.caveat("当前产品线已被选择，请选择其他产品线！");
                            result = false;
                        }
                    });
                    return result;
                }
            }
            

            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Server = {
                /// <summary>插件服务</summary>
                BrandList: new Array(),
                ProductLineTypeList: new Array(),
                ProductLineList:new Array(),
                GetBrandList: function (code) {
                    /// <summary>获取品牌列表</summary>
                    $scope.prodLn.medBrandCode = "";
                    if (code) {
                        $Api.BrandService.GetBrandList({ oIOrgCode: code, sOCreateByOrgCode: attrs.ngProductline }, function (rData) {//获取当前货主下的品牌
                            $scope.Server.BrandList = rData;
                        });
                    } else {//不存在货主的情况下
                        $scope.Server.BrandList = new Array();
                        return false;
                    }
                },
                GetProductLineType: function (code) {
                    /// <summary>获取产品线类型</summary>
                    $scope.prodLn.medProdLineType = "";
                    if (code) {
                        $Api.BrandService.GetProductLineType({ oIOrgCode: code }, function (rData) {
                            $scope.Server.ProductLineTypeList = rData;
                        });
                    } else {//不存在品牌的情况下
                        $scope.Server.ProductLineTypeList = new Array();
                    }
                },  
                GetProductLineList: function () {
                    /// <summary>获取产品线信息</summary>
                    $scope.prodLn.medProdLnCode = "";
                    if ($scope.Server.Brand) {
                        $scope.prodLn.medBrandCode = $scope.Server.Brand.id;
                        $scope.prodLn.medBrandCodeName = $scope.Server.Brand.text;

                        $Api.BrandService.GetProductLine({
                            oIOrgCode: $scope.ngCargoModel,
                            medBrandCode: $scope.prodLn.medBrandCode,
                            includeMedProdLn: $scope.Server.Brand.param,
                            medProdLnTypeCode: $scope.prodLn.medProdLineType
                        }, function (rData) {
                            $scope.Server.ProductLineList = rData;
                        });
                    } else {
                        /// <summary>不存在产品线类型的情况下</summary>
                        $scope.Server.ProductLineList = new Array();
                    }
                },
                ChaneIsTool: function () {
                    /// <summary>修改是否需要工具</summary>
                    $scope.prodLn.isChecked = !$scope.prodLn.isChecked;
                }
            }
            $scope.prodLn = {
                /// <summary>产品线情况</summary> 
                isChecked: true,//是否是用工具
                medProdLnCodeWithTool:"Y",//默认带工具
                medBrandCode: "",//产品线品牌
                medProdLineType: "",//产品线类型
                medProdLnCode: "",//产品线编码
                remark: ""//产品线备注
            }
            $scope.$watch("ngCargoModel", function () {
                /// <summary>货主修改事件</summary>
                $scope.Server.GetBrandList($scope.ngCargoModel);
                $scope.Server.GetProductLineType($scope.ngCargoModel);
            });

            $scope.$watch("prodLn.isChecked", function () {
                /// <summary>是否带工具修改事件</summary>
                $scope.prodLn.medProdLnCodeWithTool = $scope.prodLn.isChecked ? "Y" : "N";
            });
        }
    }
}); 