/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../Config.js" />
/// <summary>外部接口调用服务</summary>
app.service("$Api", function ($http, $local, $ApiHelp, $MessagService) {
    var service = {
        Post: function (url, param, callback) {
            $ApiHelp.PostApi(url, param, function (data) {
                /// <summary>请求数据处理</summary>
                if (!data.code) {
                    callback(data.info);
                    $MessagService.hide(1000);
                }
                else if (data.code == "1001") {
                    $MessagService.eorr("网络异常！");
                }
                else if (data.code == "2001") {
                    $MessagService.eorr("您没有访问的权限！");
                }
                else if (data.code == "3001") {
                    $MessagService.eorr("必输项没有输入完整！");
                }
                else if (data.code == "4001") {
                    $MessagService.eorr("用户信息失效，请重新登录！");
                }
                else {
                    $MessagService.eorr("网络异常，请联系管理员！");
                }
            });
        },
        Get: $ApiHelp.GetApi,
        From:$ApiHelp.FromApi,
        AccountService: {
            /// <summary>账户操作服务管理</summary>
            Login: function (data, callback) {
                /// <summary>用户登陆</summary>
                service.Post(ApiPath.Account.pcLogin, data, callback);
            },
            ModifyPassword: function (data, callback) {
                /// <summary>修改密码</summary>
                service.Post(ApiPath.Account.modifypwd, data, callback);
            },
            GetIdentifyCode: function (data, callback) {
                /// <summary>获取验证码</summary>
                service.Post(ApiPath.Account.getIdentifyCode, data, callback);
            },
            CurrentUserInfo: function (data, callback) {
                /// <summary>获取当前用户的信息</summary>
                service.Post(ApiPath.Account.findCurrentUserInfo, data, callback);
            },
            GetLoginAccountLog: function (data, callback) {
                /// <summary>登陆日志查询</summary>
                service.Post(ApiPath.Account.loginAccountLogSearch, data, callback);
            }
        },
        UserService: {
            /// <summary>用户服务管理</summary>
            Save: function (data, callback) {
                /// <summary>保存用户信息</summary>
                if (data.loginAccountId) {//存在loginAccountId编辑
                    service.UserService.ModifyUserAccount(data, callback);
                } else {//不存在loginAccountId新增角色
                    service.UserService.AddUser(data, callback);
                }
            },
            AddUser: function (data, callback) {
                /// <summary>添加用户</summary>
                service.Post(ApiPath.User.userAdd, data, callback);
            },
            ModifyUserAccount: function (data, callback) {
                /// <summary>用户账户修改</summary>
                service.Post(ApiPath.User.userAccountModify, data, callback);
            },
            GetUserList: function (data, callback) {
                /// <summary>获取用户列表</summary>
                service.Post(ApiPath.User.userList, data, callback);
            },
            GetUserInfo: function (data, callback) {
                /// <summary>获取用户的信息</summary>
                service.Post(ApiPath.User.userAccountDetail, data, callback);
            },
            EnableUser: function (data, callback) {
                /// <summary>启用用户</summary>
                service.Post(ApiPath.User.userDisable, data, callback);
            },
            DisableUser: function (data, callback) {
                /// <summary>禁用用户</summary>
                service.Post(ApiPath.User.userDisable, data, callback);
            },
            ModifyUserState: function (data, callback) {
                /// <summary>修改角色的状态</summary>
                if (data.isEnable) {
                    service.Post(ApiPath.User.userEnable, data, callback);
                } else {
                    service.Post(ApiPath.User.userDisable, data, callback);
                }
            },

            LockUser: function (data, callback) {
                /// <summary>锁定用户</summary>
                service.Post(ApiPath.User.userLock, data, callback);
            },
            UnlockUser: function (data, callback) {
                /// <summary>解锁用户</summary>
                service.Post(ApiPath.User.userUnlock, data, callback);
            },
            OrgCodeList: function (data, callback) {
                /// <summary>部门下拉框</summary>
                service.Post(ApiPath.User.userOrgcode, data, callback);
            }
        },
        RoleService: {
            /// <summary>角色操作服务管理</summary>
            Save: function (data, callback) {
                /// <summary>保存角色信息</summary>
                if (data.roleId) {//存在roleId编辑
                    service.RoleService.ModifyRole(data, callback);
                } else {//不存在roleId新增角色
                    service.RoleService.RoleAdd(data, callback);
                }
            },
            RoleAdd: function (data, callback) {
                /// <summary>角色新增</summary>
                service.Post(ApiPath.Role.roleAdd, data, callback);
            },
            GetRoleList: function (data, callback) {
                /// <summary>获取角色的列表</summary>    
                service.Post(ApiPath.Role.roleList, data, callback);
            },
            GetRoleDetail: function (data, callback) {
                /// <summary>获取角色明细</summary>
                service.Post(ApiPath.Role.roleDetail, data, callback);
            },
            ModifyRole: function (data, callback) {
                /// <summary>修改用户信息</summary>
                service.Post(ApiPath.Role.roleModify, data, callback);
            },
            ModifyRoleState: function (data, callback) {
                /// <summary>修改角色的状态</summary>
                if (data.isEnable) {
                    service.Post(ApiPath.Role.roleEnable, data, callback);
                } else {
                    service.Post(ApiPath.Role.roleDisbale, data, callback);
                }
            },
            RoleEnable: function (data, callback) {
                /// <summary>启动角色</summary>
                service.Post(ApiPath.Role.roleEnable, data, callback);
            },
            RoleDisbale: function (data, callback) {
                /// <summary>关闭角色</summary>
                service.Post(ApiPath.Role.roleDetail, data, callback);
            }
        },
        MenuService: {
            /// <summary>菜单服务管理</summary>
            GetMenuList: function (data, callback) {
                /// <summary>获取菜单列表</summary>
                service.Post(ApiPath.Menu.menuList, data, callback);
            },
            GetMenuDetail: function (data, callback) {
                /// <summary>获取菜单明细</summary>
                service.Post(ApiPath.Menu.menuDetail, data, callback);
            },
            AddMenu: function (data, callback) {
                /// <summary>添加菜单</summary>
                service.Post(ApiPath.Menu.menuAdd, data, callback);
            },
            ModifyMenu: function (data, callback) {
                /// <summary>修改菜单信息</summary>
                service.Post(ApiPath.Menu.menuModify, data, callback);
            },
            EnableMenu: function (data, callback) {
                /// <summary>菜单启用</summary>
                service.Post(ApiPath.Menu.menuEnable, data, callback);
            },
            DisableMenu: function (data, callback) {
                /// <summary>菜单禁用</summary>
                service.Post(ApiPath.Menu.menuDisable, data, callback);
            }
        },
        BindService: {
            /// <summary>绑定服务管理</summary>
            RoleBondMenu: function (data, callback) {
                /// <summary>角色绑定菜单</summary>
                service.Post(ApiPath.Bind.roleBondMenu, data, callback);
            },
            RoleUnbandMenu: function (data, callback) {
                /// <summary>角色解绑菜单</summary>
                service.Post(ApiPath.Bind.roleUnbandMenu, data, callback);
            }
        },
        GruopService: {
            /// <summary>分组服务管理</summary>
            Save: function (data, callback) {
                if (data.teamCode) {//存在teamCode编辑
                    service.GruopService.ModifyGroup(data, callback);
                } else {//不存在teamCode新增角色
                    service.GruopService.AddGroup(data, callback);
                }
            },
            GetGroupList: function (data, callback) {
                /// <summary>获取分组列表</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamSearch, data, callback);
            },
            GetGroupDetail: function (data, callback) {
                /// <summary>获取分组明细</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamDetail, data, callback);
            },
            AddGroup: function (data, callback) {
                /// <summary>添加分组</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamAdd, data, callback);
            },
            ModifyGroup: function (data, callback) {
                /// <summary>修改群组</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamModify, data, callback);
            },
            EnableGroup: function (data, callback) {
                /// <summary>启用分组</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamStatusEnable, data, callback);
            },
            DisableGroup: function (data, callback) {
                /// <summary>禁用分组</summary>
                service.Post(ApiPath.Gruop.DlOdDataShareTeamStatusDisable, data, callback);
            }
        },
        BasisService: {
            /// <summary>基础信息服务管理</summary>
            GetCountryList: function (data, callback) {
                /// <summary>获取国家信息</summary>
                service.Post(ApiPath.Basis.countryInfoSearch, data, callback);
            },
            GetadmdivisionList: function (data, callback) {
                /// <summary>获取行政区域信息</summary>
                service.Post(ApiPath.Basis.admdivisionInfoSearchs, data, callback);
            },
            GetLanguageList: function (data, callback) {
                /// <summary>获取语言列表</summary>
                service.Post(ApiPath.Basis.languageInfoSearch, data, callback);
            },
            GetCurrencyList: function (data, callback) {
                /// <summary>获取币别列表</summary>
                service.Post(ApiPath.Basis.currencyInfoSearch, data, callback);
            },
            GetEventCodeList: function (data, callback) {
                /// <summary>Description</summary>
                service.Post(ApiPath.Basis.eventCodeInfoSearch, data, callback);
            },
            GetDictionaryList: function (data, callback) {
                /// <summary>获取字典列表</summary>
                service.Post(ApiPath.Basis.dictInfoSearch, data, callback);
            }
        },
        SurgeryService: {
            /// <summary>手术订单服务</summary>
            Save: function (data, callback) {
                /// <summary>手术订单保存</summary>
                $MessagService.loading("手术订单保存中，请稍等...");
                service.Post(ApiPath.Surgery.save, data, callback);
            },
            Submit: function (data, callback) {
                /// <summary>手术订单提交</summary>
                $MessagService.loading("手术订单提交中，请稍等...");
                service.Post(ApiPath.Surgery.submit, data, callback);
            },
            Approval: function (data, callback) {
                /// <summary>订单审批</summary>
                $MessagService.loading("订单审批中，请稍等...");
                service.Post(ApiPath.Surgery.Approval[data.operat], data, callback);
            },
            Sign: {
                /// <summary>订单签收</summary>
                orderSign: function (data, callback) {
                    $MessagService.loading("订单签收中，请稍等...");
                    service.Post(ApiPath.Surgery.Sign.orderSign, data, callback);
                },
                OBSign: function (data, callback) {
                    /// <summary>配货单签收</summary>
                    $MessagService.loading("配货单签收中，请稍等...");
                    service.Post(ApiPath.Surgery.Sign.OBSign, data, callback);
                }
            },
            Process: {
                /// <summary>手术订单处理操作接口管理</summary>
                Receive: function (data, callback) {
                    /// <summary>接受处理手术订单</summary>
                    $MessagService.loading("订单接受处理中，请稍等...");
                    service.Post(ApiPath.Surgery.Process.receive, data, callback);
                },
                Save: function (data, callback) {
                    /// <summary>手术订单暂存</summary>
                    $MessagService.loading("处理保存中，请稍等...");
                    service.Post(ApiPath.Surgery.Process.save, data, callback);
                },
                Submit: function (data, callback) {
                    /// <summary>手术订单处理提交</summary>
                    $MessagService.loading("处理提交中，请稍等...");
                    service.Post(ApiPath.Surgery.Process.submit, data, callback);
                },
                Add: function (data, callback) {
                    /// <summary>配货订单追加提交</summary>
                    $MessagService.loading("配货单追加中，请稍等...");
                    service.Post(ApiPath.Surgery.Process.addOB, data, callback);
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    service.Post(ApiPath.Surgery.Process.addevent, data, callback);
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    service.Post(ApiPath.Surgery.Process.addevent, data, callback);
                },
                FeedBackApply: function (data, callback) {
                    /// <summary>返库申请</summary>
                    service.Post(ApiPath.Surgery.Process.feedBackApply, data, callback);
                },
                Back: function (data, callback) {
                    /// <summary>订单返库</summary>
                    service.Post(ApiPath.Surgery.Process.back, data, callback);
                }
            },
            DataSources: {
                /// <summary>手术订单数据源</summary>
                GetOrderList: function (data, callback) {
                    /// <summary>获取综合下单历史记录</summary>
                    $MessagService.loading("数据列表获取中，请稍等...");
                    service.Post(ApiPath.Surgery.DataSources.orderList, data, callback);
                },
                GetDetail: function (data, callback) {
                    /// <summary>获取订单明细</summary>
                    $MessagService.loading("手术订单信息获取中，请稍等...");
                    service.Post(ApiPath.Surgery.detail, data, callback);
                }
            }
        },
        MaterialsService: {
            /// <summary>物料信息服务管理</summary>
            GetAllWareHouse: function (data, callback) {
                /// <summary>获取全部的仓库信息</summary>
                $MessagService.loading("仓库加载中，请稍等...");
                service.Post(ApiPath.Materials.findAllWareHouse, data, callback);
            },
            GetMaterialsList: function (data, callback) {
                /// <summary>获取物料信息列表</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                service.Post(ApiPath.Materials.searchMedMaterialItem, data, callback);
            },
            GetMaterialsTemplateDateil: function (data, callback) {
                /// <summary>获取物料模板列表</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                service.Post(ApiPath.Materials.searchTemplateDetail, data, callback);
            },
            GetMaterialsTemplateList: function (data, callback) {
                /// <summary>获取物料模板</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                service.Post(ApiPath.Materials.searchTemplate, data, callback);
            },
            GetMedmaterialInventory: function (data, callback) {
                /// <summary>获取物料库存</summary>
                service.Post(ApiPath.Materials.MedmaterialItemInventory, data, callback);
            }
        },
        MedKitService: {
            /// <summary>套件信息服务管理</summary>
            GetMedKitList: function (data, callback) {
                /// <summary>获取我的套件列表</summary>
                service.Post(ApiPath.MedKit.searchHMedKit, data, callback);
            },
            GetMedKitDetail: function (data, callback) {
                /// <summary>获取我的套件详情</summary>
                service.Post(ApiPath.MedKit.searchHMedKitDetail, data, callback);
            },
            GetKitInventory: function (data, callback) {
                /// <summary>查询套件库存</summary>
                service.Post(ApiPath.MedKit.queryKitInventory, data, callback);
            }
        },
        OrganizationService: {
            /// <summary>组织信息服务管理</summary>
            GetCargoOwner: function (data, callback) {
                /// <summary>获取货主信息列表</summary>
                service.Post(ApiPath.Organization.cargoOwner, data, callback);
            }
        },
        RepresentativeService: {
            /// <summary>销售代表信息服务管理</summary>
            GetShipping: function (data, callback) {
                /// <summary>获取收货地址</summary>
                service.Post(ApiPath.Representative.shipping, data, callback);
            },
            GetDelivery: function (data, callback) {
                /// <summary>获取常用收货地址</summary>
                service.Post(ApiPath.Representative.delivery, data, callback);
            },
            AddDelivery: function (data, callback) {
                /// <summary>添加常用收货地址</summary>
                service.Post(ApiPath.Representative.addDelivery, data, callback);
            },
            ModifyDelivery: function (data, callback) {
                /// <summary>修改常用收货地址</summary>
                service.Post(ApiPath.Representative.modifyDelivery, data, callback);
            },
            DeleteDelivery: function (data, callback) {
                /// <summary>删除常用地址</summary>
                service.Post(ApiPath.Representative.deleteDelivery, data, callback);
            }
        },
        HospitalService: {
            /// <summary>医院信息管理服务</summary>
            GetHospital: function (data, callback) {
                /// <summary>获取医院信息列表</summary>
                $MessagService.loading("医院信息获取中，请稍等...");
                service.Post(ApiPath.Hospital.hospital, data, callback);
            },
            GetSections: function (data, callback) {
                /// <summary>获取科室信息列表</summary>
                service.Post(ApiPath.Hospital.sections, data, callback);
            },
            GetDoctors: function (data, callback) {
                /// <summary>获取常用医生列表</summary>
                service.Post(ApiPath.Hospital.doctors, data, callback);
            },
            AddDoctors: function (data, callback) {
                /// <summary>添加常用医生列表</summary>
                service.Post(ApiPath.Hospital.addDoctors, data, callback);
            },
            ModifyDoctors: function (data, callback) {
                /// <summary>修改常用医生信息</summary>
                service.Post(ApiPath.Hospital.modifyDoctors, data, callback);
            },
            DeleteDoctors: function (data, callback) {
                /// <summary>删除常用医生列表</summary>
                service.Post(ApiPath.Hospital.deleteDoctors, data, callback);
            }
        },
        BrandService: {
            /// <summary>品牌信息接口</summary>
            GetBrandList: function (data, callback) {
                /// <summary>获取产品线列表</summary>
                service.Post(ApiPath.Brand.brandList, data, callback);
            },
            GetProductLineType: function (data, callback) {
                /// <summary>获取产品线类型</summary>
                service.Post(ApiPath.Brand.productLineType, data, callback);
            },
            GetProductLine: function (data, callback) {
                /// <summary>产品线选择</summary>
                service.Post(ApiPath.Brand.productLine, data, callback);
            }
        },
        Public: {
            /// <summary>通用公开接口</summary>
            GetDictionary: function (data, callback) {
                /// <summary>获取数据字典类型</summary>
                $MessagService.loading("数据获取中，请稍等...");
                service.Post(ApiPath.Public.dictionary, data, callback);
            },
            UploadFile: function (data, callback) {
                /// <summary>上传附件</summary>
                $MessagService.loading("附件上传中，请稍等...");
                service.From(ApiPath.Public.upload, data, function (rData) {
                    if (!rData.code) {
                        callback(rData.info);
                        $MessagService.hide(1000);
                    } else {
                        $MessagService.eorr("网络异常，请联系管理员！");
                    }
                });
            },
            GetEventList: function (data, callback) {
                /// <summary>获取事件选择列表</summary>
                $MessagService.loading("数据获取中，请稍等...");
                service.Post(ApiPath.Public.event, data, callback);
            }
        }
    };
    return service;
});