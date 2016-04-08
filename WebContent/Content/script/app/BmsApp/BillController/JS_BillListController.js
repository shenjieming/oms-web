/// <reference path="../Config.js" />
/// <reference path="../BMSPath.js" />
/// <reference path="../../../lib/jnDo_1.0/jnDo_1.0.js" />

app.controller("BillController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams) {
    /// <summary>计费单管理</summary>
    console.log("计费管理主程序运行");
    $scope.title = "";
    $scope.Integrated = {
        //计费单列表
        BillList: new Array(),
        DataQuery: function (data) {
            /// <summary>时间日期查询</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, createDateBegin: data.StartDay, createDateEnd: data.EndDay }); $scope.Integrated.GetBillList();
        },
        ClearWhere: function () {
            /// <summary>清空查询条件</summary>
            $.extend($scope.Pagein, { pageIndex: 1, searchValue: null, createDateBegin: null, createDateEnd: null });
        },
        GetBillList: function (param, isNew) {
            /// <summary>获取计费单列表</summary>
            $scope.Integrated.BillList = new Array(); if (isNew) { $scope.Integrated.ClearWhere() }; var paramData = $.extend($scope.Pagein, param); $BMSApi.PublicInfoService.GetBillList(paramData, function (getResult) { $scope.Pagein.total = getResult.total; $scope.Integrated.BillList = getResult.rows; });
        }
    };
   
    $scope.PageControl = {
        /// <summary>页面控制</summary>
        //页面权限控制
        Competence: { modify: false,approval: false },
        GoPageBySedRow: function (callback) {
            /// <summary>根据选择的列表调整页面</summary>
            $local.CarriedSelectedRow($scope.Integrated.BillList, callback);
        },
        ModifyBill: function () {
            /// <summary>修改计费单</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.detail", row); });
        },
        ApprovalBill: function () {
            /// <summary>审批订单</summary>
            this.GoPageBySedRow(function (row) { $scope.goView("app.bms.bill.view", row); });
        },
        ViewBillByRow: function (row) {
            /// <summary>根据选中的行</summary>
            $scope.goView("app.bms.bill.view", row);
        },
        ViewBill: function () {
            /// <summary>查看订单详情</summary>
            this.GoPageBySedRow(this.ViewBillByRow);
        }
    }

    /// <summary>分页配置信息对象</summary>
    $scope.Pagein = { pageSize: 10, createDateBegin: null, createDateEnd: null, pageIndex: 1, callbake: function () { $scope.Integrated.GetBillList(); } }
});
app.controller("BillInfoController", function ($scope, $state, $local, $BMSApi, $MessagService, $stateParams, $BillDetailFactory) {
    /// <summary>计费单详情</summary>
    console.log("计费单管理-计费单详情管理");
    $scope.PageData = {};
    $scope.BillData = { detail: new Array() };

    $scope.QueryService = {
        /// <summary>查询服务</summary>
        GetOrderInfo: function () {
            /// <summary>获取订单明细</summary>
            $BMSApi.PublicInfoService.GetPendingDetail($stateParams, function (orderInfo) { $.extend($scope.PageData, orderInfo); if (!$stateParams.hOFNNo) { $.extend($scope.BillData, $Factory.GetOrderMapping(orderInfo)); } });
        },
        GetBillInfo: function () {
            /// <summary>获取计费单明细</summary>
            $BMSApi.PublicInfoService.GetBillDetail($stateParams, function (billInfo) {
                $.extend($scope.BillData, billInfo)
            });
        }
    }
    
    var $Factory = new $BillDetailFactory($scope);
    if ($stateParams.sONo) { $scope.QueryService.GetOrderInfo(); }

    if ($stateParams.hOFNNo) { $scope.QueryService.GetBillInfo(); }
});


app.factory("$BillDetailFactory", function ($BMSApi) {
    /// <summary>订单信息服务工厂</summary>
    var $BillDetailFactory = function (scope) {
        var $scope = scope;

        this.GetDoctorMapping = function (doc) {
            /// <summary>获取医生模型映射</summary>
            return { hPCode: doc.hPCode, hPCodeName: doc.hPName, wardDeptCode: doc.wardDeptCode, wardDeptCodeName: doc.wardDeptname, dTCode: doc.dTCode, dTCodeName: doc.dTName };
        }
        this.GetMateriaMappings = function (materias, aims) {
            /// <summary>获取物资映射信息</summary>
            var result = new Array(); $.each(materias, function (index, materia) { result.push($.extend(materia, { qty: materia.reqQty, dHMMName: materia.medMaterialFullName, dHMMSpecification: materia.medMaterialSpecification, dHMMMaterials: materia.medMaterialMaterials, hPUnitEstPrice: parseFloat(materia.medMaterialPrice), patientUnitEstPrice: (parseFloat(materia.medMaterialPrice) * 1.05) })); }); return result;
        }
        this.GetOrderMapping = function (orderInfo) {
            /// <summary>获取订单映射</summary>
            return { sONo: orderInfo.sONo, createDate: orderInfo.createDate, statusName: orderInfo.statusName, deliveryProvinceName: orderInfo.deliveryProvinceName, deliveryCityName: orderInfo.deliveryCityName, deliveryDistrictName: orderInfo.deliveryDistrictName, deliveryAddress: orderInfo.deliveryAddress, deliveryContact: orderInfo.deliveryContact, deliveryrMobile: orderInfo.deliveryrMobile, dLOrgCode: orderInfo.soCreateOrgCode, hPCode: orderInfo.hPCode, hPCodeName: orderInfo.hPCodeName, wardDeptCode: orderInfo.wardDeptCode, wardDeptCodeName: orderInfo.wardDeptCodeName, dTCode: orderInfo.dTCode, dTCodeName: orderInfo.dTCodeName, operationDate: orderInfo.operationDate, operationOperationRoom: orderInfo.operationOperationRoom, operationFeedbackRemark: orderInfo.operationFeedbackRemark, patientHPNo: orderInfo.patientHPNo, patientWard: orderInfo.patientWard, patientRoom: orderInfo.patientRoom, patientBedNo: orderInfo.patientBedNo, patientName: orderInfo.patientName, patientSex: orderInfo.patientSex, patientAge: orderInfo.patientAge, patientAddress: orderInfo.patientAddress, patientTel: orderInfo.patientTel, patientRemark: orderInfo.patientRemark, patientDiseaseInfo: orderInfo.patientDiseaseInfo, patientEntryDate: orderInfo.patientEntryDate }
        }
        this.AddMaterias = function (materias) {
            /// <summary>批量添加物料信息</summary>
            if (!$scope.BillData.detail) { $scope.BillData.detail = new Array(); } $.each(materias, function (index, materia) { var flg = true; $.each($scope.BillData.detail, function (i, data) { if (materia.dHMedMaterialInternalNo == data.dHMedMaterialInternalNo) { data.qty += materia.qty; flg = false; return false; } }); if (flg) { $scope.BillData.detail.push(materia); } });
        }
    }
    return $BillDetailFactory;
});

