/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngOrderApproval", function ($Api, $MessagService, $local) {
    /// <summary>订单审批</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/order/ngApproval.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngOperat:"="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                operat: "", eventReasonDesc: new Array()
            }
            var modelConfig = {
                title: "拒绝申请", width: 650, height: 300, buttons: {
                    "确定": function () {
                        $.extend($scope.Service, $scope.ngModel);
                        $scope.Service.eventReasonDesc = $(".box-80").val();
                        $Api.SurgeryService.RejectApproval($scope.Service, function (rData) {
                            $scope.ngOperat.fixed($scope.Service);
                            $scope.ngOperat.hide();
                        });
                    },
                    "关闭": function () {
                        $(".box-80").val("");
                        $scope.ngOperat.hide();
                    },                    
                },
                open: function () {
                    $scope.SelectInfo.GetSofarrList();
                    $(".ui-dialog-title").html("拒绝申请")
                }
            }
            $.extend($scope.ngOperat, modelConfig);
            $scope.SelectInfo = {
                dic: new Array(),             
                change: function () {
                    for (var i = 0; i < $scope.SelectInfo.dic.length; i++) {
                        if ($scope.SelectInfo.dic[i].id == $scope.Service.operat) {
                           a=( $scope.SelectInfo.dic[i].text);                            
                           $(".box-80").val($(".box-80").val() + " " + a)
                            return
                        }
                    }
                    //$scope.Service.operat.push($)
                },
                GetSofarrList: function () {
                    /// <summary>获取订单审批拒绝原因</summary>
                    $Api.Public.GetDictionary({ dictType:"SOFARR" }, function (rData) {
                        $scope.SelectInfo.dic = rData;
                    })
                }
            }

        }
    };
});

app.directive("ngSign", function ($Api, $MessagService, $local) {
    /// <summary>订单签收</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/order/ngSign.html",
        scope: {
            ngModel: '=',
            ngOperat:"="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                sONo: $scope.ngModel.sONo, isNomal: "Y", soType: "OPER", remark: ""
            }
            var modelConfig = {
                title: "订单签收", width: 650, height: 300, buttons: {
                    "确定": function () {
                        $Api.SurgeryService.Sign.orderSign($scope.Service, function (rData) {
                            $scope.ngOperat.fixed($scope.Service);
                            $scope.ngOperat.hide();
                        });
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                },
                open: function () {
                    $scope.Service.remark = "外包装完好，确认签收";
                    $.extend($scope.Service, $scope.ngModel);
                }
            }
            $.extend($scope.ngOperat, modelConfig);
        }
    };
});

app.directive("ngObSign", function ($Api, $MessagService, $local) {
    /// <summary>订单签收</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/order/ngSign.html",
        scope: {
            ngModel: '=',
            ngOperat: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.Service = {
                sONo: $scope.ngModel.sONo, isNomal: "Y", soType: "OPER", remark: ""
            }
            var modelConfig = {
                title: "出库单签收", width: 650, height: 300, buttons: {
                    "确定": function () {
                        $.extend($scope.Service, $scope.ngModel);
                        $Api.SurgeryService.Sign.OBSign($scope.Service, function (rData) {
                            $scope.ngOperat.fixed($scope.Service);
                            $scope.ngOperat.hide();
                        });
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                }
            }
            $.extend($scope.ngOperat, modelConfig);
        }
    };
});

app.directive("ngSummary", function ($Api, $MessagService, $local) {
    /// <summary>订单返库申请</summary>
    return {
        restrict: "EA",
        template: " <div class=\"ProgressBar control-group\">"+
            "<span class=\"event\" ng-class=\"Class\"></span>" +
        "</div>",
        scope: {
            ngModel: '='
        },
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.$watch("ngModel", function () {
                if ($scope.ngModel) {
                    $scope.Class = $scope.ngModel.length > 0 ? $scope.ngModel[0].toCustomerSummaryDesc  : "order";
                }
            })
        }
    };
});

//app.directive("ngOrderBack", function ($Api, $MessagService, $local) {
//    /// <summary>订单返库</summary>
//    return {
//        restrict: "EA",
//        templateUrl: "Content/script/app/Directive/ui/ngCargoOwner.html",
//        scope: {
//            ngModel: '='
//        },
//        replace: true,
//        link: function ($scope, element, attrs) {
//        }
//    };
//});

