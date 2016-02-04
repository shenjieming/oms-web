/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.directive("ngDoctors", function ($Api, $MessagService, $local) {
    /// <summary>医生选择</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/Directive/ui/ngDoctors.html?data=" + Timestamp,
        scope: {
            ngModel: '=',
            ngOperat: "="
        },
        replace: true,
        link: function ($scope, element, attrs) {
            var userInfo = $local.getValue("USER").userInfo;
            var modelConfig = {
                title: "医生选择", width: 750, height: 300, buttons: {
                    "确定": function () {
                        var doctData = $local.getSelectedRow($scope.Service.DoctorsList);
                        if (doctData) {
                            $scope.$apply(function () {
                                $scope.ngOperat.fixed(doctData);
                               
                            });
                        } else {
                            $MessagService.caveat("请选择一条医生信息！");
                        }
                    },
                    "关闭": function () {
                        $scope.ngOperat.hide();
                    }
                },
                open: function () {
                    $scope.Service.GetDoctors();
                },
                close: function () {
                    $.extend($scope.operat, { isEdit: true, isDetail: false })
                }
            }
            $scope.operat = {
                isEdit: true,//是否显示编辑信息
                isDetail:false,//是否显示明细信息
                ChangeEdit: function () {
                    /// <summary>修改编辑状态</summary>
                    $scope.operat.isEdit = !$scope.operat.isEdit;
                },
                ChangeDetail: function () {
                    /// <summary>修改明细信息</summary>
                    $scope.operat.isDetail = !$scope.operat.isDetail;
                },
                ShowDetail: function () {
                    /// <summary>显示明细</summary>
                    $scope.operat.isDetail = true;
                }
                
            }


            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Service = {
                DoctorsList:new Array(),
                GetDoctors: function () {
                    /// <summary>获取常用医生</summary>
                    $Api.HospitalService.GetDoctors($scope.ngModel, function (rData) {
                        $scope.Service.DoctorsList = rData;
                    });
                },
                DelDoctor: function (data) {
                    /// <summary>删除医生</summary>
                    var param = { userID: userInfo.userId, dTCode: data.dTCode }
                    $Api.HospitalService.DeleteDoctors(param, function () {
                        /// <summary>删除选择删除的医生</summary>
                        $scope.Service.GetDoctors();
                    });
                }
            };

        }
    }
});