/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("HplListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.HospitalList = {
        info: [],
        GetHospitalList: function () {
            /// <summary>获取医院列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            console.log(paramData)
            $Api.ManaHospital.GetqueryAllHospital(paramData, function (rData) {
                $scope.HospitalList.info = rData.rows;
                $scope.Pagein.total = rData.total;
                console.log(rData)
            })
        }
    }
    $scope.HospitalJump = {
        Add: function () {
            /// <summary>医院新增</summary>
            $state.go("app.base.business.hplmanagementEduit");
        },
        Edit: function () {
            /// <summary>医院编辑</summary>
            var hplopt = $scope.getSelectedRow()
            if (hplopt) {
                $state.go("app.base.business.hplmanagementEduit", { hplopt: hplopt.hPCode });
            } else {
                $MessagService.caveat("请选择一条编辑的医院！")
            }
        },
        View: function (row) {
            /// <summary>医院详情</summary>
            var hplopt = row? row:$scope.getSelectedRow()
            if (hplopt) {
                $state.go("app.base.business.hplmanagementView", { hplopt: hplopt.hPCode });
            } else {
                $MessagService.caveat("请选择一条查看的医院！")
            }

        },
        Delet: function (row) {
            $scope.HospitalList.info = row ? row : $scope.getSelectedRow();
            console.log($scope.HospitalList.info)
            if ($scope.HospitalList.info) {
                $Api.ManaHospital.GetdeleteHospital($scope.HospitalList.info, function (rData) {
                    $MessagService.caveat("该医院删除成功!")                 
                })
            } else {
                $MessagService.caveat("请选择一条数据!")
            }
            $scope.HospitalList.GetHospitalList(t);
        },
        DepartMentList: function () {
            var dptopt = $local.getSelectedRow($scope.HospitalList.info)
            if (dptopt) {
                $state.go("app.base.business.dptmanagement", { dptopt: dptopt.hPCode });
            } else {
                $MessagService.caveat("请选择一条查看科室的医院！")
            }

        },
        QueryDLList: function () {
            /// <summary>查询医院列表</summary>
            console.log($scope.HospitalJump.SearchWhere)
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, searchValue: $scope.HospitalJump.SearchWhere });
            $scope.HospitalList.GetHospitalList();
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.HospitalJump.QueryDLList();
            }
        }
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.HospitalList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
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
        $scope.HospitalList.GetHospitalList();
    }
    $scope.Load();
})


   //"hPCode":"医院编码",
   //  "hPName":"医院名称",
   //  "hPFullName":"医院全称",
   //  "hPDesc":"医院描述",
   //  "hPLevel":"医院等级编码",
   //  "hPCountryCode":"医院所在国家",
   //  "hPProvinceCode":"医院所在省",
   //  "hPCityCode":"医院所在市",
   //  "hPDistrictCode":"医院所在区",
   //  "hPAddress":"医院地址",
   //  "hPPostcode":"医院邮编",
   //  "hPLaLongtitude":"医院坐标",
   //  "hPTel":"医院总机",
   //  "remark":"备注"，
   //"validStatus":"有效状态"