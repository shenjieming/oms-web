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
            $Api.MyDoctor.GetdoctorSalesAgentRelList(paramData, function (rData) {
                $scope.DoctorList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        },
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.DoctorList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    $scope.DoctorDetailAdd = {
        Info: [],
        ShowAdd: function (row) {
            $scope.DoctorDetailAdd.Info = row;
            $scope.DoctorDetailAdd.model.show();
            $scope.DoctorDetailAdd.Info.userName = $scope.User.userInfo.userName;
            $scope.DoctorDetailAdd.Info.userID = $scope.User.userInfo.userId;
            $scope.SelectInfo.dTCode.getdTCodeList();
        },
        cancel: function () {
            $scope.DoctorDetailAdd.model.hide()
        },
        Save: function () {
            $Api.MyDoctor.GetdoctorSalesAgentRelAdd($scope.DoctorDetailAdd.Info, function (rData) {
                $MessagService.succ("该记录保存成功！");
                $scope.DoctorDetailAdd.model.hide()
                $scope.DoctorList.GetDoctorList();
            });
        }
    }
    $scope.DoctorDetail = {
        Info: [],
        ShowEdit: function () {
            var dot = $scope.getSelectedRow();
            if (dot) {
                $Api.MyDoctor.GetdoctorSalesAgentRelDetail(dot, function (rData) {
                    $scope.DoctorDetail.Info = rData;
                    $scope.DoctorDetail.Info.userName = $scope.User.userInfo.userName;
                    $scope.DoctorDetail.Info.userID = $scope.User.userInfo.userId;
                    $scope.DoctorDetail.model.show();
                    $scope.SelectInfo.dTName.getdTCodeList();
                    console.log(rData)
                });
            } else {
                $MessagService.cavet("请选择一条编辑的数据！")
            }
        },
        cancel: function () {
            $scope.DoctorDetail.model.hide()
        },
        Save: function () {
            $Api.MyDoctor.GetdoctorSalesAgentRelModify($scope.DoctorDetail.Info, function (rData) {
                $MessagService.succ("该记录保存成功！");
                $scope.DoctorDetail.model.hide()
                $scope.DoctorList.GetDoctorList();
            });
        }
    }
    $scope.DoctorView = {
        Info: [],
        ShowView: function () {
            var dot = $scope.getSelectedRow();
            if (dot) {
                $Api.MyDoctor.GetdoctorSalesAgentRelDetail(dot, function (rData) {
                    $scope.DoctorView.Info = rData;
                    console.log(rData)
                    $scope.DoctorView.model.show();
                });
            } else {
                $MessagService.cavet("请选择一条查看的数据！")
            }
        },
        cancel: function () {
            $scope.DoctorView.model.hide()
        }
    }
    $scope.DoctorDetail.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.DoctorDetail.Save, "取消": $scope.DoctorDetail.cancel } }
    $scope.DoctorDetailAdd.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.DoctorDetailAdd.Save, "取消": $scope.DoctorDetailAdd.cancel } }
    $scope.DoctorView.model = { title: "品牌详情", width: 550, height: 300, buttons: { "确定": $scope.DoctorView.cancel } }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.DoctorDelect = function () {
        /// <summary>删除</summary>
        var dot = $scope.getSelectedRow();
        if (dot) {
            $Api.MyDoctor.GetdoctorSalesAgentRelDelete(dot, function (rData) {
                $MessagService.succ("该数据删除成功！");
                $scope.DoctorList.GetDoctorList();
            });
        } else {
            $MessagService.cavet("请选择一条删除的数据！")
        }
    }
    /// 下拉框
    $scope.SelectInfo = {
        dTCode:{
            dic: [],
            change: function (item) {
                for (var i = 0; i < $scope.SelectInfo.dTCode.dic.length; i++) {
                    if ($scope.SelectInfo.dTCode.dic[i].dTCode == $scope.DoctorDetailAdd.Info.dTCode) {
                        $scope.DoctorDetailAdd.Info.dTCodeName = $scope.SelectInfo.dTCode.dic[i].dTName;
                        return;
                    }
                }
            },
            getdTCodeList: function (){
                $Api.ManaDocter.GetbizDataDoctorList({}, function (rData) {
                    $scope.SelectInfo.dTCode.dic = rData.rows;
                        console.log(rData)
                });
            },
        },
        dTName: {
            dic: [],
            change: function (item) {
                for (var i = 0; i < $scope.SelectInfo.dTName.dic.length; i++) {
                    if ($scope.SelectInfo.dTName.dic[i].dTCode == $scope.DoctorDetail.Info.dTCode) {
                        $scope.DoctorDetail.Info.dTCodeName = $scope.SelectInfo.dTName.dic[i].dTName;
                        return;
                    }
                }
            },
            getdTCodeList: function () {
                $Api.ManaDocter.GetbizDataDoctorList({}, function (rData) {
                    $scope.SelectInfo.dTName.dic = rData.rows;
                    console.log(rData)
                });
            },
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.DoctorList.GetDoctorList();
    }
    $scope.Load();
})