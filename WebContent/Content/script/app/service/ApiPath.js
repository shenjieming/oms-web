
console.log("接口控制启动");
var ApiPath = {
    /// <summary>Api访问接口服务</summary>
    //Path: "http://192.168.0.130:8080/oms-api",
    //Path: "http://192.168.1.84:8081/oms-api",
    Path: "http://omsapiv2.med-log.cn:8081/oms-api",
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
            back: "/v2/order/commintReturnWareHouseOrder"
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
            orderList: "/v2/common/order/list",
            //综合查询列表
            IntegratedOrderInquiry: "/v2/common/order/queryOrderList",
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
        MedmaterialItemInventory: "/v2/wms/queryMedmaterialItemInventory"
    },
    MedKit: {
        /// <summary>我的物料套件</summary>
        //套件列表查询
        searchHMedKit: "/v2/template/common/searchHMedKit",
        //套件详细查询
        searchHMedKitDetail: "/v2/template/common/searchHMedKitDetail",
        //查询套件粗存
        queryKitInventory: "/v2/wms/queryKitInventory"
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
        MedMater: {
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
            queryAllWhzone: "/v2/bizData/queryAllWhzone",
        },
        //套件管理
        ManSuite: {
            //获取套件列表
            searchHMedKit: "/v2/template/common/searchHMedKit",
            //获取套件详情
            searchHMedKitDetail: "/v2/template/common/searchHMedKitDetail",
            //获取套件修改
            updateHMedKit: "/v2/template/common/updateHMedKit",
            //获取套件删除
            deleteHMedKit: "/v2/template/common/deleteHMedKit",
            //获取套件添加
            insertHMedKit: "/v2/template/common/insertHMedKit",
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
    Public: {
        /// <summary>公开通用接口</summary>
        //数据字典
        dictionary: "/v2/common/dict/list",
        //附加上传
        upload: "/v2/upload/biz",
        //事件选择列表
        event: "/v2/common/order/eventComboxList"
    }
}