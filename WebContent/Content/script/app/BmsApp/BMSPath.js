/// <reference path="../ServerConfiguration.js" />

console.log("接口控制启动");
var BMSPath = {
    /// <summary>BMSApi访问接口服务</summary>
    PublicInfo: {
        /// <summary>公共列表与详细</summary>
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

    }
}