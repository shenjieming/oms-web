/// <reference path="../ServerConfiguration.js" />

console.log("接口控制启动");
var BMSPath = {
    /// <summary>BMSApi访问接口服务</summary>
    PublicInfo: {
        /// <summary>公共列表与详细</summary>
        //待计费列表
        pendinglist: "/v1/feeNote/waitFeeNote/list",
        //待计费明细
        pendingdetail: "/v1/feeNote/waitFeeNote/detail",
        //计费单列表
        billlist: "/v1/feeNote/common/list",
        //计费单明细
        billdetail: "/v1/feeNote/common/detail",
        //对账单列表
        reconciliationlist: "/v1/soa/common/list",
        //对账单明细
        reconciliationdetail: "/v1/soa/common/detail",
        //发票列表
        invoicelist: "/v1/invoice/common/list",
        //发票明细
        invoicedetail: "/v1/invoice/common/detail"
    },
    BillManage: {
        /// <summary>订单管理</summary>
        //订单计费
        doFee: "/v1/feeNote/waitFeeNote/doFee",
        //计费单打印
        print: "/v1/feeNote/waitFeeNote/print",
        //计费单修改
        modify: "/v1/feeNote/hasFeeNote/modify",
        //计费单作废
        disable: "/v1/feeNote/hasFeeNote/disable",
        //计费单审核
        check: "/v1/feeNote/waitCheck/check",
        //计费单反审核
        antiCheck: "/v1/feeNote/hasChecked/antiCheck"
    },
    ReconciliationManage: {
        /// <summary>对账管理</summary>
        //计费单对账
        doSoa: "/v1/soa/mySoa/doSoa",
        //对账单打印
        print: "/v1/soa/mySoa/print",
        //对账单主表修改
        Modify: "/v1/soa/hasSoa/soaModify",
        //对账单从表修改
        FNDModify: "/v1/soa/hasSoa/soaFNDModify",
        //对账单从表新增
        FNDAdd: "/v1/soa/hasSoa/soaFNDAdd",
        //对账单从表删除
        FNDDelete: "/v1/soa/hasSoa/soaFNDDelete",
        //对账单作废
        disabale: "/v1/soa/hasSoa/soaDisabale",
        //对账单审批
        check: "/v1/soa/waitCheck/check",
        //对账单反审批
        antiCheck: "/v1/soa/hasChecked/antiCheck",
    },
    InvoiceManage: {
        /// <summary>发票管理</summary>

    },
    Base: {
        /// <summary>基础数据管理</summary>
        //物资列表
        materiallist: "/v1/feeNote/materialList"
    }
}