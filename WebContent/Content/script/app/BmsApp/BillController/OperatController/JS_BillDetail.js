/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../../../lib/angular-1.2.20/angular.min.js" />

app.controller("BillDetailController", function ($scope, $state,$Api, $local, $BMSApi, $MessagService, $stateParams, $BillDetailFactory, $FileService) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单新增修改操作管理");

    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) { if ($scope.BillData.images.length >= 5) { $MessagService.caveat("您上传的图片超过了5张。"); return false; } if (item.type.indexOf("image") > -1) { $FileService.ReaderFiles(item, function (data) { $Api.Public.UploadFile(data, function (rData) { $scope.BillData.images.push(rData); }); }); } else { $MessagService.caveat("您上传的不是图片！"); } });
        }
    }

    $scope.Module = {
        /// <summary>组件控制器</summary>
        HospitalConfig: {
            /// <summary>医生选择配置</summary>
            fixed: function (doc) {
                /// <summary>选择医生事件</summary>
                $.extend($scope.BillData, $scope.$Factory.GetDoctorMapping(doc)); $scope.Module.HospitalConfig.hide();
            }
        },
        MateriaConfig: {
            /// <summary>物资配置</summary>
            fixed: function (MateriasList) {
                $scope.$Factory.AddMaterias(MateriasList, $scope.BillData.detail);
            }
        }
    }

    $scope.Service = {
        /// <summary>计费管理服务</summary>
        Compute: {
            /// <summary>计算服务</summary>
            HpUnitEstPrice: function (row) {
                /// <summary>计算销售代表单价</summary>
                row.patientUnitEstPrice = parseFloat((row.hPUnitEstPrice * 1.05).toFixed(2)); row.patientUnitPrice = parseFloat((row.hPUnitPrice * 1.05).toFixed(2));
            }
        },
        Submit: function () {
            /// <summary>计费单提交</summary>
            $BMSApi.BillService.Submit($scope.BillData, function (rData) { $MessagService.succ("计费单" + rData + "保存成功");; $scope.goLastPage(); });
        }
    }
});




