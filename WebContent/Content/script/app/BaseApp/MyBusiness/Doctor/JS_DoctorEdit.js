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
            if (!$scope.DoctorPage.info.hPName) {
                $MessagService.caveat("请维护该医院名称！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.hPFullName) {
                $MessagService.caveat("请维护该医院全称！");
                result = false;
            }
            else if (!$scope.DoctorPage.info.hPLevel) {
                $MessagService.caveat("请维护该医院等级编码！");
                result = false;
            }
            return result;
        },
        Save: function () {
            $Api.RepresentativeService.SaveAddress($scope.Service.AddressDetail, function (rData) {

            })
        }

    }
    $scope.ButtonService = {
        //选择按钮
        IsDefaultDoctorPerUser: function () {
            $scope.DoctorPage.info.CheckIsDefaultDoctorPerUser = !$scope.DoctorPage.info.CheckIsDefaultDoctorPerUser
        },
        IsLocal: function () {
            $scope.DoctorPage.info.CheckIsLocal = !$scope.ButtonService.CheckIsLocal
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
                    console.log(rData)
                })
            }
        },
        Department: {
            dic: [],
            getDepartmentList: function () {
                /// <summary>获取科室</summary>
                $Api.ManaDepartment.GetbizDataWDList({ hPCode: $scope.DoctorPage.info.hPCode }, function (rData) {
                    $scope.SelectInfo.Department.dic = rData.rows;
                    console.log(rData)
                })
            }
        }
    }
    $scope.SelectInfo.Hosptail.getHosptailList();
})


////保存
//$Api.HospitalService.SaveDoctor
////修改
//$Api.ManaDocter.GetbizDataDoctorDetail
//app.base.mybusiness.doctoredit
//app.base.mybusiness.doctorview  dTCode