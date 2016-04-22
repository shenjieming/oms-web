/// <reference path="../ServerConfiguration.js" />

console.log("接口控制启动");
var ApiPath = {
    /// <summary>Api访问接口服务</summary>
    Account: {
        /// <summary>用户地址</summary>
        //Web登陆
        pcLogin: "/v2/login/pcLogin",
        //登出系统
        loginOut: "/v2/login/loginOut",
        //获取验证码
        getIdentifyCode: "/v2/login/getIdentifyCode",
        //修改密码
        modifypwd: "/v2/user/modifypwd",
        //获取登陆用户信息
        findCurrentUserInfo: "/v2/user/findCurrentUserInfo",
        //登陆日志查询
        loginAccountLogSearch: "/v2/baseData/loginAccountLogSearch",
        //获取指定用户信息
        findUserInfo: "/v2/user/findUserInfo"
    },
    Surgery: {
        /// <summary>手术订单信息接口地址</summary>
        //订单暂存
        save: "/v2/order/surgery/createOrder/save",
        //订单提交
        submit: "/v2/order/surgery/createOrder/submit",
        //订单详情
        detail: "/v2/order/surgery/createOrder/detail",
        Process: {
            /// <summary>手术订单处理地址</summary>
            //接受手术订单
            receive: "/v2/common/order/receive",
            //暂存手术订单
            save: "/v2/common/order/process/save",
            //提交手术订单
            submit: "/v2/common/order/process/submit",
            //追加配货单提交
            addOB: "/v2/common/order/process/addOB",
            //事件添加
            addevent: "/v2/common/order/addEvent",
            //返库申请
            feedBackApply: "/v2/common/order/feedBackApply",
            //订单返库
            back: "/v2/order/commintReturnWareHouseOrder",
            //反馈单暂存
            backsave: "/v2/order/temporarySaveReturnWareHouseOrder",
            //上一次手术信息（获取服务器端手术时间）
            findUserLastOrder:"/v2/common/order/findUserLastOrder",
            //预览
            proView:"/v2/common/order/proview",
        },
        Approval: {
            /// <summary>订单审批</summary>
            //审批通过
            checkYes: "/v2/common/order/checkYes",
            //审批不通过
            checkNo: "/v2/common/order/checkNo",
            //订单取消
            cancel: "/v2/common/order/cancel"
        },
        //订单状态
        findOrderStatus:"/v2/common/order/findOrderStatus", 
        Sign: {
            /// <summary>订单签收</summary>
            //订单签收
            orderSign: "/v2/common/order/orderSign",
            //配货单签收
            OBSign: "/v2/common/order/OBSign"
        },
        //订单数据源
        DataSources: {
            //查询历史下单记录
            orderList: "/v2/common/order/list",
            //综合查询列表
            IntegratedOrderInquiry: "/v2/common/order/queryOrderList",
            //出库单查询列表
            outBoundList:"/v2/common/order/outBoundList",
        }

    },
    Stock: {
        /// <summary>备货订单信息接口地址</summary>
        //备货暂存
        save: "/v2/order/stock/createOrder/save",
        //备货提交
        submit: "/v2/order/stock/createOrder/submit",
        //备货详情
        detail: "/v2/order/stock/createOrder/detail",
        Process: {
            /// <summary>备货订单处理地址</summary>
            //接受备货订单
            receive: "/v2/common/order/receive",
            //暂存备货订单
            save: "/v2/common/stock/process/save",
            //提交备货订单
            submit: "/v2/common/stock/process/submit",
            //事件添加
            addevent: "/v2/common/order/addEvent"
        },
        Approval: {
            /// <summary>订单审批</summary>
            //审批通过
            checkYes: "/v2/common/order/checkYes",
            //审批不通过
            checkNo: "/v2/common/order/checkNo",
            //订单取消
            cancel: "/v2/common/order/cancel"
        },
        Sign: {
            /// <summary>订单签收</summary>
            //订单签收
            orderSign: "/v2/common/order/orderSign",
            //配货单签收
            OBSign: "/v2/common/order/OBSign"
        },
        //订单数据源
        DataSources: {
            //查询历史下单记录
            stockList: "/v2/common/order/list",
            //综合查询列表
            IntegratedStockInquiry: "/v2/common/order/queryOrderList",
        }

    },
    Organization: {
        /// <summary>组织相关地址</summary>
        //获取货主列表
        cargoOwner: "/v2/order/common/createOrder/oiComboxList",
        //货主下拉框（物料选择）
        ownerListMaterial: "/v2/order/common/oiMedMaterialComboxList"
    },
    Hospital: {
        /// <summary>医院相关地址</summary>
        //获取医院选择列表
        hospital: "/v2/order/common/createOrder/hosptailComboxList",
        //科室列表查询
        sections: "/v2/order/common/createOrder/wardDepartmentComboxList",
        //医生列表查询
        doctors: "/v2/order/common/createOrder/oftenUseDoctorsList",
        //添加常用医生
        addDoctors: "/v2/order/common/createOrder/quickAddOfenUseDoctoryAdd",
        //修改医生信息
        modifyDoctors: "/v2/order/common/createOrder/quickAddOfenUseDoctoryModify",
        //删除医生信息
        deleteDoctors: "/v2/order/common/createOrder/deletDoctorSalesAgentRel"

    },
    Area: {
        /// <summary>地区信息地址</summary>

    },
    Representative: {
        /// <summary>销售代表信息地址</summary>
        //收货地址
        shipping: "/v2/order/common/createOrder/findDefaultReceiveAddress",
        //默认地址
        defaultaddress: "/v2/order/common/createOrder/findDefaultReceiveAddressList",
        //常用收货地址
        delivery: "/v2/order/common/createOrder/findReceiveAddressList",
        //添加常用收货地址
        addDelivery: "/v2/order/common/createOrder/receiveAddressAdd",
        //修改常用收货地址
        modifyDelivery: "/v2/order/common/createOrder/receiveAddressModify",
        //删除常用收货地址
        deleteDelivery: "/v2/order/common/createOrder/receiveAddressDel"
    },
    User: {
        /// <summary>用户信息地址</summary>
        //添加用户
        userAdd: "/v2/basedataUser/userAdd",
        //用户账户修改
        userAccountModify: "/v2/basedataUser/userAccountModify",
        //用户列表
        userList: "/v2/basedataUser/userList",
        //用户详情
        userAccountDetail: "/v2/basedataUser/userAccountDetail",
        /// <summary>账户操作地址</summary>
        //启动用户
        userEnable: "/v2/basedataUser/accountEnable",
        //禁用用户
        userDisable: "/v2/basedataUser/accountDisable",
        //锁定用户
        userLock: "/v2/basedataUser/accountLock",
        //解锁用户
        userUnlock: "/v2/basedataUser/accountUnlock",
        //部门下拉列表
        userOrgcode: "/v2/basedataUser/findUserCanCreateUserOrgCode",
        //新增用户组织类型
        userAddOrgTpye: "/v2/basedataUser/userAddOrgTypeCombox",
        //新增用户组织名称
        userAddOrg: "/v2/basedataUser/userAddOrgCombox",
        //新增用户可选角色
        userAddRole: "/v2/basedataUser/userAddRoleCombox",
    },
    Role: {
        /// <summary>角色地址</summary>
        //添加角色
        roleAdd: "/v2/basedataRole/roleAdd",
        //角色列表
        roleList: "/v2/basedataRole/roleList",
        //角色详情
        roleDetail: "/v2/basedataRole/roleDetail",
        //角色信息修改
        roleModify: "/v2/basedataRole/roleModify",
        //启动角色
        roleEnable: "/v2/basedataRole/roleEnable",
        //禁用角
        roleDisbale: "/v2/basedataRole/roleDisbale"
    },
    Menu: {
        /// <summary>菜单地址</summary>
        //菜单列表
        menuList: "/v2/basedataMenu/menuList",
        //菜单明细：
        menuDetail: "/v2/basedataMenu/menuDetail",
        //添加菜单
        menuAdd: "/v2/basedataMenu/menuAdd",
        //菜单修改
        menuModify: "/v2/basedataMenu/menuModify",
        //启用功能菜单
        menuEnable: "/v2/basedataMenu/menuEnable",
        //禁用功能菜单
        menuDisable: "/v2/basedataMenu/menuDisable"
    },
    Bind: {
        /// <summary>数据绑定接口</summary>
        //角色菜单绑定
        roleBondMenu: "/v2/basedataRole/roleBondMenu",
        //角色取消绑定菜单
        roleUnbandMenu: "/v2/basedataUser/roleUnbandMenu"
    },
    Gruop: {
        /// <summary>分组信息接口</summary>
        //查询经销商权限组
        DlOdDataShareTeamSearch: "/v2/user/DlOdDataShareTeamSearch",
        //经销商权限组详细
        DlOdDataShareTeamDetail: "/v2/user/DlOdDataShareTeamDetail",
        //添加经销商权限组
        DlOdDataShareTeamAdd: "/v2/user/DlOdDataShareTeamAdd",
        //删除经销商权限组
        DlOdDataShareTeamDelete: "/v2/user/DlOdDataShareTeamDelete",
        //修改经销商权限组
        DlOdDataShareTeamModify: "/v2/user/DlOdDataShareTeamModify",
        //启动经销商权限组
        DlOdDataShareTeamStatusEnable: "/v2/user/DlOdDataShareTeamStatusEnable",
        //禁用经销商权限组
        DlOdDataShareTeamStatusDisable: "/v2/user/DlOdDataShareTeamStatusDisable"
    },
    Basis: {
        /// <summary>基础信息请求就扣</summary>
        //国家信息查询
        countryInfoSearch: "/v2/baseData/countryInfoSearch",
        //行政区域查询
        admdivisionInfoSearchs: "/v2/baseData/admDivisionInfoSearch",
        //语言信息查询
        languageInfoSearch: "/v2/baseData/languageInfoSearch",
        //币别信息查询
        currencyInfoSearch: "/v2/baseData/currencyInfoSearch",
        //数据字典查询
        dictInfoSearch: "/v2/baseData/dictInfoSearch",
        //事件编码查询
        eventCodeInfoSearch: "/v2/baseData/eventCodeInfoSearch"
    },
    Brand: {
        /// <summary>品牌信息接口地址</summary>
        //品牌信息
        brandList: "/v2/order/common/createOrder/medBrandComboxList",
        //产品线信息
        productLine: "/v2/order/common/createOrder/productLineComboxList",
        //产品线类型
        productLineType: "/v2/order/common/createOrder/productLineTypeComboxList"
    },
    Materials: {
        /// <summary>我的物料信息接口</summary>
        //查询仓库
        findAllWareHouse: "/v2/order/common/findAllWareHouse",
        //查询物料信息
        searchMedMaterialItem: "/v2/template/common/searchMedMaterialItem",
        //物料模板详情查询
        searchTemplateDetail: "/v2/template/searchTemplateDetail",
        //模板维护
        searchTemplate: "/v2/template/searchTemplate",
        //查询物料库存
        MedmaterialItemInventory: "/v2/wms/queryMedmaterialItemInventory",
        //添加模板
        addTemplate: "/v2/template/addTemplate",
        //修改模板
        updateTemplate: "/v2/template/updateTemplate",
        //删除模板
        deleteTemplate: "/v2/template/deleteTemplate"
    },
    MedKit: {
        /// <summary>我的物料套件</summary>
        //套件列表查询
        searchHMedKit: "/v2/template/common/searchHMedKit",
        //套件详细查询
        searchHMedKitDetail: "/v2/template/common/searchHMedKitDetail",
        //查询套件粗存
        queryKitInventory: "/v2/wms/queryKitInventory",
        //获取套件修改
        updateHMedKit: "/v2/template/common/updateHMedKit",
        //获取套件删除
        deleteHMedKit: "/v2/template/common/deleteHMedKit",
        //获取套件添加
        insertHMedKit: "/v2/template/common/insertHMedKit",
    },
    BusinessData: {
        /// <summary>业务数据基础管理</summary>
        //厂商列表
        MedManuFacture: {
            //厂商列表
            queryMedManufacture: "/v2/bizData/queryAllMedManuFacture",
            //厂商新增
            addMedManuFacture: "/v2/bizData/addMedManuFacture",
            //厂商编辑
            updateMedManuFacture: "/v2/bizData/updateMedManuFacture",
            //厂商删除
            deleteMedManuFacture: "/v2/bizData/deleteMedManuFacture",
            //厂商下拉框
            medManuFactureCommboxList: "/v2/bizData/medManuFactureCommboxList"
        },
        //品牌列表
        MedBrand: {
            //品牌列表
            queryAllMedBrand: "/v2/bizData/queryAllMedBrand",
            //品牌详情
            queryMedBrandDetail: "/v2/bizData/queryMedBrandDetail",
            //品牌添加
            addMedBrand: "/v2/bizData/addMedBrand",
            //品牌修改
            updateMedBrand: "/v2/bizData/updateMedBrand",
            //品牌删除
            deleteMedBrand: "/v2/bizData/deleteMedBrand",
        },
        //物料列表
        MedMaterial: {
            //物料列表
            searchMedMaterialItem: "/v2/template/common/searchMedMaterialItem",
            //物料添加
            saveMedMaterialItem: "/v2/template/common/saveMedMaterialItem",
            //物料删除
            deleteMedMaterialItem: "/v2/template/common/deleteMedMaterialItem",
            //物料详情
            searchMedMaterialItemDetail: "/v2/template/common/searchMedMaterialItemDetail",
            //物料修改
            updateMedMaterialItem: "/v2/template/common/updateMedMaterialItem"
        },
        //仓库列表
        Warehouse: {
            //获取仓库列表
            queryWareHouse: "/v2/bizData/queryWareHouse",
            //获取仓库详情
            queryWareHouseDetail: "/v2/bizData/queryWareHouseDetail",
        },
        //库区
        Reservoir: {
            //获取库区列表
            queryAllWhzone: "/v2/bizData/whzone/queryAllWhzone",
            //库区编辑
            whZoneEduit:"/v2/bizData/whzone/update",
            //库区新增
            whZoneAdd:"/v2/bizData/whzone/insert",
            //库区删除
            whZoneDelete:"/v2/bizData/whzone/delete",
        },
        MedJournal: {
            //平台信息列表
            queryAllPlatForm: "/v2/bizData/queryAllPlatForm",
            //平台信息编辑
            updatePlatForm: "/v2/bizData/updatePlatForm",
        },
        /// <summary>获取厂商编码查询品牌</summary>
        queryBrandByManufacture: "/v2/basebusinessdata/common/queryBrandByManufacture"
    },
    /////// 业务基础数据
    ManageDl: {
        //经销商列表
        queryAllDealer: "/v2/bizData/queryAllDealer",
        //经销商详情
        queryDealerDetail: "/v2/bizData/queryDealerDetail",
        //经销商修改
        updateDealer: "/v2/bizData/updateDealer",
        //经销商新增
        addDealer: "/v2/bizData/addDealer",
        //经销商删除
        deleteDealer: "/v2/bizData/deleteDealer",
    },
    DLHostptailRel: {
        //医院经销商关系列表
        query: "/v2/bizDataDL/dlhprel/query",
        //医院经销商关系详情
        queryDetail: "/v2/bizDataDL/dlhprel/queryDetail",
    },
    ManageOIDLRel: {
        //货主经销商关系列表
        queryAllOIDLRel: "/v2/bizData/queryAllOIDLRel",
        //货主经销商关系认证
        deleteOwnerOfInventory: "/v2/bizData/queryOIDLRelDetail",
        //货主经销商关系详情
        oidlRelCrtsts: "/v2/bizData/oidlRelCrtsts",
    },
    ManageOi: {
        //货主组织管理列表
        queryAllOwnerOfInventory: "/v2/bizData/queryAllOwnerOfInventory",
        //货主组织管理详情
        queryOwnerOfInventoryDetail: "/v2/bizData/queryOwnerOfInventoryDetail",
        //货主组织管理新增
        addOwnerOfInventory: "/v2/bizData/addOwnerOfInventory",
        //货主组织管理修改
        updateOwnerOfInventory: "/v2/bizData/updateOwnerOfInventory",
        //货主组织管理删除
        deleteOwnerOfInventory: "/v2/bizData/deleteOwnerOfInventory",
    },
    ManaHospital: {
        //医院列表
        queryAllHospital: "/v2/bizData/queryAllHospital",
        //医院新增
        addHospital: "/v2/bizData/addHospital",
        //医院编辑
        updateHospital: "/v2/bizData/updateHospital",
        //医院删除
        deleteHospital: "/v2/bizData/deleteHospital",
    },
    ManaDocter: {
        //医生管理列表
        bizDataDoctorList: "/v2/bizDataDL/bizDataDoctorList",
        //医生管理详细
        bizDataDoctorDetail: "/v2/bizDataDL/bizDataDoctorDetail",
        //医生管理新增
        bizDataDoctorAdd: "/v2/bizDataDL/bizDataDoctorAdd",
        //医生管理修改
        bizDataDoctorModify: "/v2/bizDataDL/bizDataDoctorModify",
        //医生管理禁用
        bizDataDoctorDisable: "/v2/bizDataDL/bizDataDoctorDisable",
        //医生管理启用
        bizDataDoctorEnable: "/v2/bizDataDL/bizDataDoctorEnable",
    },
    ManaEvent: {
        //经销商事件通知配置列表
        queryAllDlsoEventNoTificationCfg: "/v2/bizData/queryAllDlsoEventNoTificationCfg",
        //经销商事件通知配置新增
        addDlsoEventNoTificationCfg: "/v2/bizData/addDlsoEventNoTificationCfg",
        //经销商事件通知配置修改
        updateDlsoEventNoTificationCfg: "/v2/bizData/updateDlsoEventNoTificationCfg",
        //经销商事件通知配置删除
        deleteDlsoEventNoTificationCfg: "/v2/bizData/deleteDlsoEventNoTificationCfg",
        //订单事件下拉框
        queryEventCode: "/v2/bizData/queryEventCode",
    },
    ManaDepartment: {

        //科室管理列表
        bizDataWDList: "/v2/bizDataDL/bizDataWDList",
        //科室管理详细
        bizDataWDDetail: "/v2/bizDataDL/bizDataWDDetail",
        //科室管理新增
        bizDataWDAdd: "/v2/bizDataDL/bizDataWDAdd",
        //科室管理修改
        bizDataWDModify: "/v2/bizDataDL/bizDataWDModify",
        //科室管理禁用
        bizDataWDDisable: "/v2/bizDataDL/bizDataWDDisable",
        //科室管理启用
        bizDataWDEnable: "/v2/bizDataDL/bizDataWDEnable",
    },
    ManaWareHouse: {
        //仓库列表
        queryWareHouse: "/v2/bizData/queryWareHouse",
        //仓库详情
        queryWareHouseDetail: "/v2/bizData/queryWareHouseDetail",
        //仓库新增
        addWareHouse: "/v2/bizData/addWareHouse",
        //仓库编辑
        updateWareHouse: "/v2/bizData/updateWareHouse",
    },
    AgentProduct: {
        //代理产品列表
        bizDataOIDLMedBrandAgentRelList: "/v2/bizDataDL/bizDataOIDLMedBrandAgentRelList",
        //代理产品新增
        bizDataOIDLMedBrandAgentRelAdd: "/v2/bizDataDL/bizDataOIDLMedBrandAgentRelAdd",
        //代理产品修改
        bizDataOIDLMedBrandAgentRelModify: "/v2/bizDataDL/bizDataOIDLMedBrandAgentRelModify",
        //代理产品禁用
        bizDataOIDLMedBrandAgentRelDisbale: "/v2/bizDataDL/bizDataOIDLMedBrandAgentRelDisbale",
        //代理产品启用
        bizDataOIDLMedBrandAgentRelEnable: "/v2/bizDataDL/bizDataOIDLMedBrandAgentRelEnable",
    },
    OrderRout: {
        //订单仓库路由列表
        queryOdwhCfg: "/v2/bizData/queryOdwhCfg",
        //订单仓库路由新增
        addOdwhCfg: "/v2/bizData/addOdwhCfg",
        //订单仓库路由修改
        updateOdwhCfg: "/v2/bizData/updateOdwhCfg",
        //货主下拉框（所有货主）
        findOICombox:"/v2/bizData/findOICombox", 
        // 获取货主下的经销商
        findDLByOIOrgCodeCombox: "/v2/bizData/findDLByOIOrgCodeCombox",
        
    },
    productLine: {
        //产品线管理
        //产品线列表
        query: "/v2/bizData/productLine/query",
        //产品线新增
        insert: "/v2/bizData/productLine/insert",
        //产品线修改
        update: "/v2/bizData/productLine/update",
        //产品线删除
        delect: "/v2/bizData/productLine/delete",
    },
    MyAddress: {
        //我的地址列表
        bizDataMyAddressList: "/v2/bizDataDL/bizDataMyAddressList",
        //地址详情
        bizDataMyAddressDetail: "/v2/bizDataDL/bizDataMyAddressDetail",
        //地址新增
        bizDataMyAddressAdd: "/v2/bizDataDL/bizDataMyAddressAdd",
        //地址修改
        bizDataMyAddressModify: "/v2/bizDataDL/bizDataMyAddressModify",
        //地址删除
        bizDataMyAddressDelete: "/v2/bizDataDL/bizDataMyAddressDelete",
    },
    MyDoctor: {
        //我的医生列表
        doctorSalesAgentRelList: "/v2/bizDataDL/doctorSalesAgentRelList",
        //我的医生详情
        doctorSalesAgentRelDetail: "/v2/bizDataDL/doctorSalesAgentRelDetail",
        //我的医生新增
        doctorSalesAgentRelAdd: "/v2/bizDataDL/doctorSalesAgentRelAdd",
        //我的医生修改
        doctorSalesAgentRelModify: "/v2/bizDataDL/doctorSalesAgentRelModify",
        //我的医生删除
        doctorSalesAgentRelDelete: "/v2/bizDataDL/doctorSalesAgentRelDelete",
    },
    Public: {
        /// <summary>公开通用接口</summary>
        //数据字典
        dictionary: "/v2/common/dict/list",
        //业务附加上传
        upload: "/v2/upload/biz",
        //基础数据附件上传
        basedataload: "/v2/upload/basedata",
        //事件选择列表
        event: "/v2/common/order/eventComboxList",
        //通用-全部医院下拉列表(下拉框)-查询经销商医院关系表
        hosptailComboxListByDLHPRel: "/v2/hosptailComboxListByDLHPRel",
        //货主下拉框(下拉框)-物料使用
        oiMedMaterialComboxList: "/v2/order/common/oiMedMaterialComboxList",
    }
}