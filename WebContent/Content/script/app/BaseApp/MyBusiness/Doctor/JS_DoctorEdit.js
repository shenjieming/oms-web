/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DoctorEditController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    $scope.DoctorPage = {
        info: { CheckIsDefaultDoctorPerUser: true, CheckIsLocal: true, },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.DoctorPage.info.hPCode) {
                $MessagService.caveat("请维护该医院名称！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.wardDeptCode) {
                $MessagService.caveat("请维护该科室名称！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.dTType) {
                $MessagService.caveat("请维护该医生类型！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.dTGrade) {
                $MessagService.caveat("请维护该医生级别！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.dTSex) {
                $MessagService.caveat("请维护该医生性别！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.dTEducation) {
                $MessagService.caveat("请维护该医院学历！");
                result = false;
            }
            return result;
        },
        Save: function () {
            if ($scope.DoctorPage.verification()) {
                $scope.DoctorPage.info.isDefaultDoctorPerUser = $scope.DoctorPage.info.CheckIsDefaultDoctorPerUser ? "Y" : "N";
                $scope.DoctorPage.info.isLocal = $scope.DoctorPage.info.CheckIsLocal ? "LOCAL" : "NOTLOCAL";
                $Api.HospitalService.SaveDoctor($scope.DoctorPage.info, function (rData) {
                    $scope.goView('app.base.mybusiness.doctor');
                    $MessagService.succ("该信息保存成功！");
                })
            }  
        },
        GetDoctorDetail: function () {
            $Api.ManaDocter.GetbizDataDoctorDetail({ dTCode: $scope.DoctorPage.info.dTCode }, function (rData) {
                $scope.DoctorPage.info = rData;
                $scope.DoctorPage.info.isDefaultDoctorPerUser = "Y" ? $scope.DoctorPage.info.isDefaultDoctorPerUser = true : $scope.DoctorPage.info.isDefaultDoctorPerUser=false;
                $scope.DoctorPage.info.isLocal = "LOCAL" ? $scope.DoctorPage.info.CheckIsLocal=true : $scope.DoctorPage.info.CheckIsLocal=false
            })
        }
    }
    $scope.ButtonService = {
        //选择按钮
        IsDefaultDoctorPerUser: function () {
            /// <summary>是否默认</summary>
            $scope.DoctorPage.info.CheckIsDefaultDoctorPerUser = !$scope.DoctorPage.info.CheckIsDefaultDoctorPerUser;           
        },
        IsLocal: function () {
            /// <summary>是否本院医生</summary>
            $scope.DoctorPage.info.CheckIsLocal = !$scope.ButtonService.CheckIsLocal;      
        }
    }
    $scope.SelectInfo = {
        //下拉框
        Hosptail: {
            dic: [],
            change: function () {
                if ($scope.DoctorPage.info.hPCode != "") {
                    $scope.SelectInfo.Department.getDepartmentList();
                }
                $scope.DoctorPage.info.wardDeptCode = ""
            },
            getHosptailList: function () {
                /// <summary>获取医院</summary>
                $Api.ManaHospital.GetqueryAllHospital({}, function (rData) {
                    $scope.SelectInfo.Hosptail.dic = rData.rows         
                })
            }
        },
        Department: {
            dic: [],
            getDepartmentList: function () {
                /// <summary>获取科室</summary>
                $Api.ManaDepartment.GetbizDataWDList({ hPCode: $scope.DoctorPage.info.hPCode }, function (rData) {
                    $scope.SelectInfo.Department.dic = rData.rows;          
                })
            }
        }
    }
    
    $scope.Load = function () {
        if ($stateParams.docopt) {
            $scope.DoctorPage.info.dTCode = $stateParams.docopt;
            $scope.DoctorPage.GetDoctorDetail();
            $scope.SelectInfo.Department.getDepartmentList();
        }
        $scope.SelectInfo.Hosptail.getHosptailList();
    }
    $scope.Load();
})