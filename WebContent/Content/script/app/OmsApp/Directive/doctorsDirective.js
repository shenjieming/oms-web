/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
OmsApp.directive("ngDoctors", function ($Api, $MessagService, $local) {
    /// <summary>医生选择</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/OmsApp/Directive/ui/ngDoctors.html?data=" + Timestamp,
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
                    $.extend($scope.operat, { isEdit: true, isDetail: false })
                    $scope.Service.GetDoctors();
                },
            }
            $scope.operat = {
                isEdit: true,//是否显示编辑信息
                isDetail:false,//是否显示明细信息
                ChangeEdit: function () {
                    /// <summary>修改医生状态</summary>
                    var doctoropt = $local.getSelectedRow($scope.Service.DoctorsList)
                    if (doctoropt) {
                        $scope.operat.isEdit = !$scope.operat.isEdit;
                        $scope.operat.isDetail = !$scope.operat.isDetail;
                        $Api.ManaDocter.GetbizDataDoctorDetail({ dTCode: doctoropt.dTCode }, function (rData) {
                            $scope.Service.DoctorsDetail = rData;
                            console.log(rData)
                            $scope.SelectInfo.Doctor.getDoctorList();
                            $scope.SelectInfo.Department.getDepartmentList();
                            if ($scope.Service.DoctorsDetail.isLocal == "LOCAL") {
                                $scope.Service.DoctorsDetail.isLocalCheck = true;
                            }
                        });
                        $(".ui-dialog-buttonset").hide();
                    } else {
                        $MessagService.caveat("请选择一条编辑的医院！");
                    }

                },
                ChangeDetail: function () {
                    /// <summary>新增医生信息</summary>
                    $scope.operat.isDetail = !$scope.operat.isDetail;
                    $scope.operat.isEdit = !$scope.operat.isEdit;
                    $scope.Service.DoctorsDetail = new Object;
                    $(".ui-dialog-buttonset").hide();
                    if (!$scope.Service.DoctorsDetail.hPCode) {
                        $scope.SelectInfo.Department.dic = new Array();
                    }
                    console.log($scope.Service.DoctorsDetail)
                    console.log($scope.SelectInfo.Department.dic)
                    $scope.Service.DoctorsDetail.isLocalCheck = true;
                    $scope.SelectInfo.Doctor.getDoctorList();
                  
                },
                ListView: function () {
                    /// <summary>我的医生列表隐藏</summary>
                    //$scope.operat.isEdit = true;
                    //$scope.operat.isDetail = !$scope.operat.isDetail;
                    $scope.ngOperat.hide();
     
                },
                List: function () {
                    /// <summary>我的医生列表返回</summary>
                    $scope.operat.isDetail = !$scope.operat.isDetail;
                    $scope.operat.isEdit = !$scope.operat.isEdit;
                    $scope.Service.GetDoctors();
                    $(".ui-dialog-buttonset").show();
                },
                verification: function () {
                    var result = true;
                    if (!$scope.Service.DoctorsDetail.hPCode) {
                        result = false;
                        $MessagService.caveat("请维护该医生所在医院！");
                    }
                    else if (!$scope.Service.DoctorsDetail.wardDeptCode) {
                        result = false;
                        $MessagService.caveat("请维护该医生所在科室！");
                    }
                    else if (!$scope.Service.DoctorsDetail.dTName) {
                        result = false;
                        $MessagService.caveat("请维护该医生姓名！");
                    }
                    return result;
                },
                Save: function () {
                    if ($scope.operat.verification()) {
                        $scope.Service.DoctorsDetail.isLocal = $scope.Service.DoctorsDetail.isLocalCheck ? "LOCAL" : "UNLOCAL"
                        console.log($scope.Service.DoctorsDetail)
                        $Api.HospitalService.SaveDoctor($scope.Service.DoctorsDetail, function (rData) {
                            $MessagService.succ("该信息保存成功！");
                            $scope.operat.isDetail = !$scope.operat.isDetail;
                            $scope.operat.isEdit = !$scope.operat.isEdit;
                            $scope.Service.GetDoctors();
                            $scope.Service.DoctorsDetail = [];
                            $(".ui-dialog-buttonset").show();
                        })
                    }                   
                },
                ShowDetail: function () {
                    /// <summary>显示明细</summary>
                    $scope.operat.isDetail = true;
                    $scope.Service.GetDoctors();
                }
                
            }


            $scope.ngOperat = $.extend(modelConfig, $scope.ngOperat);
            $scope.Service = {
                isLocalCheck: function () {
                    $scope.Service.DoctorsDetail.isLocalCheck = !$scope.Service.DoctorsDetail.isLocalCheck;

                },
                DoctorsList: new Array(),
                DoctorsDetail: new Object,
                GetDoctors: function () {
                    /// <summary>获取常用医生</summary>
                    console.log($scope.ngModel)
                    $Api.HospitalService.GetDoctors($scope.ngModel, function (rData) {
                        $scope.Service.DoctorsList = rData;
                        console.log(rData)
                    });
                },
                DelDoctor: function (data) {
                    /// <summary>删除医生</summary>
                    var param = { userID: userInfo.userId, dTCode: data.dTCode }
                    $Api.HospitalService.DeleteDoctors(param, function () {
                        /// <summary>删除选择删除的医生</summary>
                        $scope.Service.GetDoctors();
                    });
                },
            };
            $scope.SelectInfo = {
                Doctor: {
                    dic: [],
                    change: function () {
                        console.log($scope.Service.DoctorsDetail.hPCode)
                        if ($scope.Service.DoctorsDetail.hPCode!="") {
                            $scope.SelectInfo.Department.getDepartmentList();                           
                        }
                        $scope.Service.DoctorsDetail.wardDeptCode = ""
                    },
                    getDoctorList: function () {
                        /// <summary>获取医院</summary>
                        console.log()
                        $Api.HospitalService.GetHospital($scope.ngModel, function (rData) {
                            $scope.SelectInfo.Doctor.dic = rData
                            console.log(rData)
                        })
                    }
                },
                Department: {
                    dic: [],
                    getDepartmentList: function () {
                        /// <summary>获取科室</summary>
                        $Api.HospitalService.GetSections({ hPCode: $scope.Service.DoctorsDetail.hPCode }, function (rData) {
                            $scope.SelectInfo.Department.dic = rData
                      
                        })
                    }
                }
            }
        }
    }
});