
app.controller("BillDetailController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单控制管理</summary>
    console.log("计费单管理-计费单新增修改操作管理");

    $scope.Module = {
        /// <summary>组件控制器</summary>
        HospitalConfig: {
            /// <summary>医生选择配置</summary>
            fixed: function (doc) {
                /// <summary>选择医生事件</summary>
            }
        }
    }

    $scope.Service = {
        /// <summary>计费管理服务</summary>
        Submit: function () {
            /// <summary>计费单提交</summary>

        }
    }

});



