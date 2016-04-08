/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../../../lib/angular-1.2.20/angular.min.js" />

app.controller("BillDetailController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $BillDetailFactory) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单新增修改操作管理");

    $scope.Module = {
        /// <summary>组件控制器</summary>
        HospitalConfig: {
            /// <summary>医生选择配置</summary>
            fixed: function (doc) {
                /// <summary>选择医生事件</summary>
                $.extend($scope.BillData, $Factory.GetDoctorMapping(doc)); $scope.Module.HospitalConfig.hide();
            }
        },
        MateriaConfig: {
            /// <summary>物资配置</summary>
            fixed: function (MateriasList) {
                $Factory.AddMaterias($Factory.GetMateriaMappings(MateriasList, $scope.BillData.detail));
            }
        }
    }

    $scope.Service = {
        /// <summary>计费管理服务</summary>
        Compute: {
            /// <summary>计算服务</summary>
            HpUnitEstPrice: function (row) {
                /// <summary>计算销售代表单价</summary>
                row.patientUnitEstPrice = parseFloat((row.hPUnitEstPrice * 1.05).toFixed(2));
            }
        },
        Submit: function () {
            /// <summary>计费单提交</summary>
            $BMSApi.BillService.Submit($scope.BillData, function (rData) {
                $MessagService.succ("计费单保存成功！");
                $scope.goLastPage();
            });
        }
    }

    //$BillDetailFactory.Get();
    var $Factory = new $BillDetailFactory($scope);
});




