/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("FactureListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.FactureList = {
        info: [],
        GetFactureList: function () {
            /// <summary>获取厂家列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            $Api.BusinessData.MedManuFacture.GetManufacturerList(paramData, function (rData) {
                $scope.FactureList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        },
        Delet: function (row) {
            $scope.FactureList.info = row ? row : $scope.getSelectedRow();
            if ($scope.FactureList.info) {
                $Api.BusinessData.MedManuFacture.GetDeleteMedManuFacture($scope.FactureList.info, function (rData) {
                    $MessagService.caveat("该厂商删除成功!")
                    $scope.FactureList.GetFactureList();
                })
            } else {
                $MessagService.caveat("请选择一条数据!")
            }
        }
    }

    $scope.FactureDetail = {
        //编辑厂商信息
        Info: { validStatus: true },
        checkIs: function () {
            FactureDetail.Info.isEnable = !FactureDetail.Info.isEnable;
        },
        ShowAdd: function (row) {
            $scope.FactureDetail.model.show();
            $scope.FactureDetail.Info = row;
            $scope.FactureDetail.Info.validStatus = "Y";
            if ($scope.FactureDetail.Info.validStatus=="Y") {
                $scope.FactureDetail.Info.isEnable = true;
            }
        },
        ShowEdit: function () {
            /// <summary>厂商新增、编辑Dialog</summary>
            var FactureOpt = $scope.getSelectedRow();
            if (FactureOpt) {
                $scope.FactureDetail.model.show();
                $Api.BusinessData.MedManuFacture.GetManufacturerList({ medMnfcOrgCode: FactureOpt.medMnfcOrgCode }, function (rData) {
                    $scope.FactureDetail.Info = rData.rows[0];
                    console.log(rData)
                })
                if ($scope.FactureDetail.Info.validStatus == "Y") {
                    $scope.FactureDetail.Info.isEnable = true;
                } else {
                    $scope.FactureDetail.Info.isEnable = false;
                }
            } else {
                $MessagService.caveat("请选择一条编辑的厂商！");
            }
        },
        verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.FactureDetail.Info.medMnfcCode || !$scope.FactureDetail.Info.medMnfcCode) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            return result;
        },
        save: function () {
            /// <summary>保存编辑、新增页面</summary>
            if (!$scope.FactureDetail.Info.isEnable) {
                $scope.FactureDetail.Info.validStatus ="N";
            } else {
                $scope.FactureDetail.Info.validStatus ="Y";
            }
            console.log($scope.FactureDetail.Info)
            if ($scope.FactureDetail.verification()) {
                $Api.BusinessData.MedManuFacture.Save($scope.FactureDetail.Info, function (rData) {
                    $MessagService.succ("厂商保存成功!");
                    $scope.FactureDetail.model.hide();
                    $scope.FactureList.GetFactureList();
                })
            }
        },
        cancel: function () {
            $scope.FactureDetail.model.hide();
        }
    }

    $scope.FactureView = {
         //厂商详情
        Info: [],
        showView: function () {
            var FactureOpt = $scope.getSelectedRow();
            if (FactureOpt) {
                $scope.FactureView.model.show();
                $Api.BusinessData.MedManuFacture.GetManufacturerList({ medMnfcOrgCode: FactureOpt.medMnfcOrgCode }, function (rData) {
                    $scope.FactureView.Info = rData.rows[0];
                    console.log(rData)
                })
            } else {
                $MessagService.caveat("请选择一条查看的厂商!");
            }
        },
        cancel: function () {
            $scope.FactureView.model.hide();
        }
    }
    $scope.FactureView.model = { title: "厂商详情", width: 550, height: 300, buttons: { "确定": $scope.FactureView.cancel } }
    $scope.FactureDetail.model = { title: "厂商信息", width: 650, height: 300, buttons: { "保存": $scope.FactureDetail.save, "取消": $scope.FactureDetail.cancel } }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.FactureList.info, function (index, item) {
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
        $scope.FactureList.GetFactureList();
    }
    $scope.Load();
})