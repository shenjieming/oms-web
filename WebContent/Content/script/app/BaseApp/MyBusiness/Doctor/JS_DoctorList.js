/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DoctorListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.DoctorList = {
        info: [],
        GetDoctorList: function () {
            /// <summary>获取我的医生列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            console.log(paramData)
            $Api.HospitalService.GetDoctors(paramData, function (rData) {
                $scope.DoctorList.info = rData;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        },
    } 
    $scope.DoctorDelect = function () {
        /// <summary>删除</summary>
        var dot = $local.getSelectedRow($scope.DoctorList.info);
        if (dot) {
            $Api.HospitalService.DeleteDoctors(dot, function (rData) {
                $MessagService.succ("该数据删除成功！");
                $scope.DoctorList.GetDoctorList();
            });
        } else {
            $MessagService.cavet("请选择一条删除的数据！")
        }
    }
    $scope.DoctorJump = {
        Add: function () {
            $state.go("app.base.mybusiness.doctoredit", { oiopt: "" });
        },
        Edit: function () {
            var docopt = $local.getSelectedRow($scope.DoctorList.info)
            if (docopt) {
                $scope.go("app.base.mybusiness.doctoredit", { dTCode: docopt.dTCode })
            } else {
              $scope.$MessagService("请选择一条需要编辑的信息")
            }      
        },
        View: function () {
            var docopt = $local.getSelectedRow($scope.DoctorList.info)
            if (docopt) {
                $scope.go("app.base.mybusiness.doctoredit", { dTCode: docopt.dTCode })
            } else {
                $scope.$MessagService("请选择一条需要编辑的信息")
            }
        }
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.DoctorList.GetDoctorList();
    }
    $scope.Load();
})