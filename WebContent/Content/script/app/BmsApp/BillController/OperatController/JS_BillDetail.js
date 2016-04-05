/// <reference path="../../../Config.js" />
/// <reference path="../../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../../../lib/angular-1.2.20/angular.min.js" />

app.controller("BillDetailController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $BillDetailFactory) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单新增修改操作管理");


    var OperatService = function () {
        /// <summary>内部操作服务</summary>
        this.GetMaterias = function () {
            /// <summary>获取物料信息</summary>

        }
    }

    $scope.Module = {
        /// <summary>组件控制器</summary>
        HospitalConfig: {
            /// <summary>医生选择配置</summary>
            fixed: function (doc) {
                /// <summary>选择医生事件</summary>
                $.extend($scope.BillData, {
                    hPCode: doc.hPCode, hPCodeName: doc.hPName, wardDeptCode: doc.wardDeptCode, wardDeptCodeName: doc.wardDeptname, dTCode: doc.dTCode, dTCodeName: doc.dTName
                });
                $scope.Module.HospitalConfig.hide();
            }
        },
        MateriaConfig: {
            /// <summary>物资配置</summary>
            fixed: function (MateriasList) {
                OperatService().GetMaterias(MateriasList);
            }
        }
    }

    $scope.Service = {
        /// <summary>计费管理服务</summary>
        Submit: function () {
            /// <summary>计费单提交</summary>

        }
    }

    //$BillDetailFactory.Get();
});

app.factory("$BillDetailFactory", function () {
    /// <summary></summary>
    return {
        Get: function () {
            alert("dd");
        }
    };
});


