OMSApiService
    .factory("$ApiService", function ($local, $AjaxHelp) {
        /// <summary>OMSApi请求服务配置</summary>
        var apiHelp = new $AjaxHelp(ServerConfiguration.OMSPath); return apiHelp;
    })
    .factory("$AccountService", function ($MessagService, $ApiService) {
        /// <summary>账户操作服务管理</summary>
        return {
            Login: function (data, callback) {
                /// <summary>用户登陆</summary>
                $ApiService.PostApi(ApiPath.Account.pcLogin, data, callback);
            },
            LoginOut: function (data, callback, eorr) {
                /// <summary>用户登出</summary>
                $ApiService.PostApi(ApiPath.Account.loginOut, data, callback,eorr);
            },
            ModifyPassword: function (data, callback) {
                /// <summary>修改密码</summary>
                $ApiService.PostApi(ApiPath.Account.modifypwd, data, callback);
            },
            GetIdentifyCode: function (data, callback) {
                /// <summary>获取验证码</summary>
                $ApiService.PostApi(ApiPath.Account.getIdentifyCode, data, callback);
            },
            CurrentUserInfo: function (data, callback) {
                /// <summary>获取当前用户的信息</summary>
                $ApiService.PostApi(ApiPath.Account.findCurrentUserInfo, data, callback);
            },
            GetLoginAccountLog: function (data, callback) {
                /// <summary>登陆日志查询</summary>
                $ApiService.PostApi(ApiPath.Account.loginAccountLogSearch, data, callback);
            },
            GetFindUserInfo: function (data, callback) {
                /// <summary>//获取指定用户信息</summary>
                $ApiService.PostApi(ApiPath.Account.findUserInfo, data, callback);
            }
        }
    })
    .factory("$WhZoneService",function($MessagService,$ApiService){
        return{
                //库区管理
            GetWhZoneList: function (data, callback) {
                    /// <summary>获取库区信息</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.Reservoir.queryAllWhzone, data, callback);
            },
            DeleteWhzone:function(data,callback){
                //<summary>库区删除<summary>
                $ApiService.PostApi(ApiPath.BusinessData.Reservoir.whZoneDelete,data,callback);
            },
            GETWhzoneView:function(data,callback){
                //<summary>库区详情<summary>
                $ApiService.PostApi(ApiPath.BusinessData.Reservoir.queryAllWhzone,data,callback);
            },
            WhzoneInsert:function(data,callback){
                //<summary>库区新增<summary>
                $ApiService.PostApi(ApiPath.BusinessData.Reservoir.whZoneAdd,data,callback);
            },
            WhzoneEdit:function(data,callback){
                //<summary>库区编辑<summary>
                $ApiService.PostApi(ApiPath.BusinessData.Reservoir.whZoneEduit,data, callback);
            },
        }
    })
    .factory("$UserService", function ($MessagService, $ApiService) {
        /// <summary>用户服务管理</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存用户信息</summary>
                if (data.loginAccountId) {//存在loginAccountId编辑
                    this.ModifyUserAccount(data, callback);
                } else {//不存在loginAccountId新增角色
                    this.AddUser(data, callback);
                }
            },
            AddUser: function (data, callback) {
                /// <summary>添加用户</summary>
                $ApiService.PostApi(ApiPath.User.userAdd, data, callback);
            },
            ModifyUserAccount: function (data, callback) {
                /// <summary>用户账户修改</summary>
                $ApiService.PostApi(ApiPath.User.userAccountModify, data, callback);
            },
            GetUserList: function (data, callback) {
                /// <summary>获取用户列表</summary>
                $ApiService.PostApi(ApiPath.User.userList, data, callback);
            },
            GetUserInfo: function (data, callback) {
                /// <summary>获取用户的信息</summary>
                $ApiService.PostApi(ApiPath.User.userAccountDetail, data, callback);
            },
            EnableUser: function (data, callback) {
                /// <summary>启用用户</summary>
                $ApiService.PostApi(ApiPath.User.userDisable, data, callback);
            },
            DisableUser: function (data, callback) {
                /// <summary>禁用用户</summary>
                $ApiService.PostApi(ApiPath.User.userDisable, data, callback);
            },
            ModifyUserState: function (data, callback) {
                /// <summary>修改用户锁定的状态</summary>
                if (data.isEnable) {
                    $ApiService.PostApi(ApiPath.User.userLock, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.User.userUnlock, data, callback);
                }
            },

            LockUser: function (data, callback) {
                /// <summary>锁定用户</summary>
                $ApiService.PostApi(ApiPath.User.userLock, data, callback);
            },
            UnlockUser: function (data, callback) {
                /// <summary>解锁用户</summary>
                $ApiService.PostApi(ApiPath.User.userUnlock, data, callback);
            },
            OrgCodeList: function (data, callback) {
                /// <summary>部门下拉框</summary>
                $ApiService.PostApi(ApiPath.User.userOrgcode, data, callback);
            },
            userAddOrgTpye: function (data, callback) {
                /// <summary>//新增用户组织类型</summary>
                $ApiService.PostApi(ApiPath.User.userAddOrgTpye, data, callback);
            },
            userAddOrg: function (data, callback) {
                /// <summary>//新增用户组织名称</summary>
                $ApiService.PostApi(ApiPath.User.userAddOrg, data, callback);
            },
            userAddRole: function (data, callback) {
                /// <summary>//新增用户可选角色</summary>
                $ApiService.PostApi(ApiPath.User.userAddRole, data, callback);
            }
        }
    })
    .factory("$RoleService", function ($MessagService, $ApiService) {
        /// <summary>角色操作服务管理</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存角色信息</summary>
                if (data.roleId) {//存在roleId编辑
                    this.ModifyRole(data, callback);
                } else {//不存在roleId新增角色
                    this.RoleAdd(data, callback);
                }
            },
            RoleAdd: function (data, callback) {
                /// <summary>角色新增</summary>
                $ApiService.PostApi(ApiPath.Role.roleAdd, data, callback);
            },
            GetRoleList: function (data, callback) {
                /// <summary>获取角色的列表</summary>    
                $ApiService.PostApi(ApiPath.Role.roleList, data, callback);
            },
            GetRoleDetail: function (data, callback) {
                /// <summary>获取角色明细</summary>
                $ApiService.PostApi(ApiPath.Role.roleDetail, data, callback);
            },
            ModifyRole: function (data, callback) {
                /// <summary>修改用户信息</summary>
                $ApiService.PostApi(ApiPath.Role.roleModify, data, callback);
            },
            ModifyRoleState: function (data, callback) {
                /// <summary>修改角色的状态</summary>
                if (!data.isEnable) {
                    $ApiService.PostApi(ApiPath.Role.roleEnable, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.Role.roleDisbale, data, callback);
                }
            },
            RoleEnable: function (data, callback) {
                /// <summary>启动角色</summary>
                $ApiService.PostApi(ApiPath.Role.roleEnable, data, callback);
            },
            RoleDisbale: function (data, callback) {
                /// <summary>禁用角色</summary>
                $ApiService.PostApi(ApiPath.Role.roleDisbale, data, callback);
            }
        };
    })
    .factory("$MenuApiService", function ($MessagService, $ApiService) {
        /// <summary>菜单服务管理</summary>
        return {
            GetMenuList: function (data, callback) {
                /// <summary>获取菜单列表</summary>
                $ApiService.PostApi(ApiPath.Menu.menuList, data, callback);
            },
            GetMenuDetail: function (data, callback) {
                /// <summary>获取菜单明细</summary>
                $ApiService.PostApi(ApiPath.Menu.menuDetail, data, callback);
            },
            AddMenu: function (data, callback) {
                /// <summary>添加菜单</summary>
                $ApiService.PostApi(ApiPath.Menu.menuAdd, data, callback);
            },
            ModifyMenu: function (data, callback) {
                /// <summary>修改菜单信息</summary>
                $ApiService.PostApi(ApiPath.Menu.menuModify, data, callback);
            },
            EnableMenu: function (data, callback) {
                /// <summary>菜单启用</summary>
                $ApiService.PostApi(ApiPath.Menu.menuEnable, data, callback);
            },
            DisableMenu: function (data, callback) {
                /// <summary>菜单禁用</summary>
                $ApiService.PostApi(ApiPath.Menu.menuDisable, data, callback);
            }
        }
    })
    .factory("$BindService", function ($MessagService, $ApiService) {
        /// <summary>绑定服务管理</summary>
        return {
            RoleBondMenu: function (data, callback) {
                /// <summary>角色绑定菜单</summary>
                $ApiService.PostApi(ApiPath.Bind.roleBondMenu, data, callback);
            },
            RoleUnbandMenu: function (data, callback) {
                /// <summary>角色解绑菜单</summary>
                $ApiService.PostApi(ApiPath.Bind.roleUnbandMenu, data, callback);
            }
        }
    })
    .factory("$GruopService", function ($MessagService, $ApiService) {
        /// <summary>分组服务管理</summary>
        return {
            Save: function (data, callback) {
                if (data.teamCode) {//存在teamCode编辑
                    this.ModifyGroup(data, callback);
                } else {//不存在teamCode新增角色
                    this.AddGroup(data, callback);
                }
            },
            GetGroupList: function (data, callback) {
                /// <summary>获取分组列表</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamSearch, data, callback);
            },
            GetGroupDetail: function (data, callback) {
                /// <summary>获取分组明细</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamDetail, data, callback);
            },
            AddGroup: function (data, callback) {
                /// <summary>添加分组</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamAdd, data, callback);
            },
            ModifyGroup: function (data, callback) {
                /// <summary>修改群组</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamModify, data, callback);
            },
            EnableGroup: function (data, callback) {
                /// <summary>启用分组</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamStatusEnable, data, callback);
            },
            DisableGroup: function (data, callback) {
                /// <summary>禁用分组</summary>
                $ApiService.PostApi(ApiPath.Gruop.DlOdDataShareTeamStatusDisable, data, callback);
            }
        }
    })
    .factory("$BasisService", function ($MessagService, $ApiService) {
        /// <summary>基础信息服务管理</summary>
        return {
            GetCountryList: function (data, callback) {
                /// <summary>获取国家信息</summary>
                $ApiService.PostApi(ApiPath.Basis.countryInfoSearch, data, callback);
            },
            GetadmdivisionList: function (data, callback) {
                /// <summary>获取行政区域信息</summary>
                $ApiService.PostApi(ApiPath.Basis.admdivisionInfoSearchs, data, callback);
            },
            GetLanguageList: function (data, callback) {
                /// <summary>获取语言列表</summary>
                $ApiService.PostApi(ApiPath.Basis.languageInfoSearch, data, callback);
            },
            GetCurrencyList: function (data, callback) {
                /// <summary>获取币别列表</summary>
                $ApiService.PostApi(ApiPath.Basis.currencyInfoSearch, data, callback);
            },
            GetEventCodeList: function (data, callback) {
                /// <summary>Description</summary>
                $ApiService.PostApi(ApiPath.Basis.eventCodeInfoSearch, data, callback);
            },
            GetDictionaryList: function (data, callback) {
                /// <summary>获取字典列表</summary>
                $ApiService.PostApi(ApiPath.Basis.dictInfoSearch, data, callback);
            }
        }
    })
    .factory("$SurgeryService", function ($MessagService, $ApiService) {
        /// <summary>手术订单服务</summary>
        return {
            findOrderStatus: function (data, callback) {
                /// <summary>获取订单状态</summary>
                $ApiService.PostApi(ApiPath.Surgery.findOrderStatus, data, callback);
            },
            Save: function (data, callback) {
                /// <summary>手术订单保存</summary>
                $MessagService.loading("手术订单保存中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.save, data, callback);
            },
            Submit: function (data, callback) {
                /// <summary>手术订单提交</summary>
                $MessagService.loading("手术订单提交中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.submit, data, callback);
            },
            Approval: function (data, callback) {
                /// <summary>订单审批</summary>
                $MessagService.loading("订单审批中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.Approval[data.operat], data, callback);
            },
            ApprovalBy: function (data, callback) {
                /// <summary>批准审批</summary>
                $MessagService.loading("批准审批中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.Approval.checkYes, data, callback);
            },
            RejectApproval: function (data, callback) {
                /// <summary>拒绝审批</summary>
                $MessagService.loading("拒绝审批中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.Approval.checkNo, data, callback);
            },
            Cancel: function (data, callback) {
                /// <summary>取消审批</summary>
                $MessagService.loading("订单取消中，请稍等...");
                $ApiService.PostApi(ApiPath.Surgery.Approval.cancel, data, callback);
            },
            Sign: {
                /// <summary>订单签收</summary>
                orderSign: function (data, callback) {
                    $MessagService.loading("订单签收中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.Sign.orderSign, data, callback);
                },
                OBSign: function (data, callback) {
                    /// <summary>配货单签收</summary>
                    $MessagService.loading("配货单签收中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.Sign.OBSign, data, callback);
                }
            },
            Process: {
                /// <summary>手术订单处理操作接口管理</summary>
                Receive: function (data, callback) {
                    /// <summary>接受处理手术订单</summary>
                    $MessagService.loading("订单接受处理中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.Process.receive, data, callback);
                },
                Save: function (data, callback) {
                    /// <summary>手术订单暂存</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.save, data, callback);
                },
                Submit: function (data, callback) {
                    /// <summary>手术订单处理提交</summary>
                    $MessagService.loading("处理提交中，请稍等...");
                    var verifig = true;
                    //$.each(data.prodLns, function (index, item) {
                    //    if (!item.medMaterias.length) {
                    //        $MessagService.caveat("产品线：" + item.medBrandCodeName + "未配置出库物料");
                    //        verifig = false;
                    //        return true;
                    //    }
                    //});
                    //$.each(data.medKits, function (index,item) {
                    //    /// <summary>检测套件是否满足库存条件</summary>
                    //    if (item.reqQty > item.inventory) {
                    //        if (!confirm("存在不满足库存数量的套件，请问是否继续提交？")) {
                    //            verifig = false;
                    //        }
                    //        return false;
                    //    }
                    //})

                    if (verifig) {
                        $ApiService.PostApi(ApiPath.Surgery.Process.submit, data, callback);
                    }
                },
                OfflineSubmit: function(data, callback){
                    $MessagService.loading("处理提交中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.Process.offlineSubmit, data, callback);
                },
                Add: function (data, callback) {
                    /// <summary>配货订单追加提交</summary>
                    $MessagService.loading("配货单追加中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.Process.addOB, data, callback);
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.addevent, data, callback);
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.addevent, data, callback);
                },
                FeedBackApply: function (data, callback) {
                    /// <summary>返库申请</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.feedBackApply, data, callback);
                },
                Back: function (data, callback) {
                    /// <summary>订单返库</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.back, data, callback);
                },
                GetFindUserLastOrder: function (data, callback) {
                    /// <summary>//上一次手术信息（获取服务器端手术时间）</summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.findUserLastOrder, data, callback);
                },
                ProView:function (data,callback) {
                    ///<summary>预览页面<summary>
                    $ApiService.PostApi(ApiPath.Surgery.Process.proView,data,callback);
                }
            },
            DataSources: {
                /// <summary>手术订单数据源</summary>
                GetOrderList: function (data, callback) {
                    /// <summary>获取综合下单历史记录</summary>
                    $MessagService.loading("数据列表获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.DataSources.orderList, data, callback);
                },
                GetDetail: function (data, callback) {
                    /// <summary>获取订单明细</summary>
                    $MessagService.loading("手术订单信息获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.detail, data, callback);
                },
                GetIntegratedOrderInquiry: function (data, callback) {
                    /// <summary>综合订单查询列表</summary>
                    $MessagService.loading("综合订单信息获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Surgery.DataSources.IntegratedOrderInquiry, data, callback);
                },
                GetOutBoundList: function (data, callback) {
                    /// <summary>出库单查询列表</summary>
                    console.log(data)
                    $ApiService.PostApi(ApiPath.Surgery.DataSources.outBoundList, data, callback);
                },
            }
        }
    })
    .factory("$StockService", function ($MessagService, $ApiService) {
        /// <summary>备货订单服务</summary>
        return {
            Save: function (data, callback) {
                /// <summary>手术订单保存</summary>
                $MessagService.loading("备货订单保存中，请稍等...");
                $ApiService.PostApi(ApiPath.Stock.save, data, callback);
            },
            Submit: function (data, callback) {
                /// <summary>手术订单提交</summary>
                $MessagService.loading("备货订单提交中，请稍等...");
                $ApiService.PostApi(ApiPath.Stock.submit, data, callback);
            },
            Approval: function (data, callback) {
                /// <summary>订单审批</summary>
                $MessagService.loading("订单审批中，请稍等...");
                $ApiService.PostApi(ApiPath.Stock.Approval[data.operat], data, callback);
            },
            Sign: {
                /// <summary>订单签收</summary>
                orderSign: function (data, callback) {
                    $MessagService.loading("订单签收中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.Sign.orderSign, data, callback);
                },
                OBSign: function (data, callback) {
                    /// <summary>配货单签收</summary>
                    $MessagService.loading("配货单签收中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.Sign.OBSign, data, callback);
                }
            },
            Process: {
                /// <summary>备货订单处理操作接口管理</summary>
                Receive: function (data, callback) {
                    /// <summary>接受处理备货订单</summary>
                    $MessagService.loading("订单接受处理中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.Process.receive, data, callback);
                },
                Save: function (data, callback) {
                    /// <summary>备货订单暂存</summary>
                    $MessagService.loading("处理保存中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.Process.save, data, callback);
                },
                Submit: function (data, callback) {
                    /// <summary>备货订单处理提交</summary>
                    $MessagService.loading("处理提交中，请稍等...");
                    var verifig = true;
                    $.each(data.prodLns, function (index, item) {
                        if (!item.medMaterias.length) {
                            $MessagService.caveat("产品线：" + item.medBrandCodeName + "未配置出库物料");
                            verifig = false;
                            return true;
                        }
                    });
                    if (verifig) {
                        $ApiService.PostApi(ApiPath.Stock.Process.submit, data, callback);
                    }
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    $ApiService.PostApi(ApiPath.Stock.Process.addevent, data, callback);
                },
                AddEvent: function (data, callback) {
                    /// <summary>添加事件</summary>
                    $ApiService.PostApi(ApiPath.Stock.Process.addevent, data, callback);
                }
            },
            DataSources: {
                /// <summary>备货单数据源</summary>
                GetStockList: function (data, callback) {
                    /// <summary>获取综合下单历史记录</summary>
                    $MessagService.loading("数据列表获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.DataSources.stockList, data, callback);
                },
                GetDetail: function (data, callback) {
                    /// <summary>获取订单明细</summary>
                    $MessagService.loading("备货订单信息获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.detail, data, callback);
                },
                GetIntegratedStockInquiry: function (data, callback) {
                    /// <summary>综合订单查询列表</summary>
                    $MessagService.loading("综合订单信息获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.Stock.DataSources.IntegratedStockInquiry, data, callback);
                }
            }
        };
    })
    .factory("$MaterialsService", function ($MessagService, $ApiService) {
        /// <summary>物料信息服务管理</summary>
        return {
            GetAllWareHouse: function (data, callback) {
                /// <summary>获取全部的仓库信息</summary>
                $MessagService.loading("仓库加载中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.findAllWareHouse, data, callback);
            },
            GetMaterialsList: function (data, callback) {
                /// <summary>获取物料信息列表</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.searchMedMaterialItem, data, callback);
            },
            GetMaterialsTemplateDateil: function (data, callback) {
                /// <summary>获取物料模板列表</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.searchTemplateDetail, data, callback);
            },
            GetMaterialsTemplateList: function (data, callback) {
                /// <summary>获取物料模板</summary>
                $MessagService.loading("数据列表获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.searchTemplate, data, callback);
            },
            SaveTemplate: function (data, callback) {
                /// <summary>保存物料模板</summary>
                if (data.tmplSODetailID) {
                    this.UpdateTemplate(data, callback);
                } else {
                    this.AddTemplate(data, callback);
                }
            },
            AddTemplate: function (data, callback) {
                /// <summary>添加模板</summary>
                $MessagService.loading("模板添加中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.addTemplate, data, callback);
            },
            UpdateTemplate: function (data, callback) {
                $MessagService.loading("模板更新中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.updateTemplate, data, callback);
            },
            DeleteTemplate: function (data, callback) {
                $MessagService.loading("模板删除中，请稍等...");
                $ApiService.PostApi(ApiPath.Materials.deleteTemplate, data, callback);
            },
            GetMedmaterialInventory: function (data, callback) {
                /// <summary>获取物料库存</summary>
                $ApiService.PostApi(ApiPath.Materials.MedmaterialItemInventory, data, callback);
            }
        };
    })
    .factory("$MedKitService", function ($MessagService, $ApiService) {
        /// <summary>套件信息服务管理</summary>
        return {
            GetMedKitList: function (data, callback) {
                /// <summary>获取我的套件列表</summary>
                $ApiService.PostApi(ApiPath.MedKit.searchHMedKit, data, callback);
            },
            GetMedKitDetail: function (data, callback) {
                /// <summary>获取我的套件详情</summary>
                $ApiService.PostApi(ApiPath.MedKit.searchHMedKitDetail, data, callback);
            },
            GetKitInventory: function (data, callback) {
                /// <summary>查询套件库存</summary>
                $ApiService.PostApi(ApiPath.MedKit.queryKitInventory, data, callback);
            },
            UpdateHMedKit: function (data, callback) {
                /// <summary>更新套件</summary>
                $ApiService.PostApi(ApiPath.MedKit.updateHMedKit, data, callback);
            },
            DeleteHMedKit: function (data, callback) {
                /// <summary>删除套件</summary>
                $ApiService.PostApi(ApiPath.MedKit.deleteHMedKit, data, callback);
            },
            InsertHMedKit: function (data, callback) {
                /// <summary>新增套件</summary>
                $ApiService.PostApi(ApiPath.MedKit.insertHMedKit, data, callback);
            },
            Save: function (data, callback) {
                /// <summary>保存套件</summary>
                if (data.medKitInternalNo) {
                    this.UpdateHMedKit(data, callback);
                } else {
                    this.InsertHMedKit(data, callback);
                }
            }
        };
    })
    .factory("$OrganizationService", function ($MessagService, $ApiService) {
        /// <summary>组织信息服务管理</summary>
        return {
            GetCargoOwner: function (data, callback) {
                /// <summary>获取货主信息列表</summary>
                $ApiService.PostApi(ApiPath.Organization.cargoOwner, data, callback);
            },
            GetOwnerList: function (data, callback) {
                /// <summary>获取货主信息列表（物料）</summary>
                $ApiService.PostApi(ApiPath.Organization.ownerListMaterial, data, callback);
            }
        };
    })
    .factory("$RepresentativeService", function ($MessagService, $ApiService) {
        /// <summary>销售代表信息服务管理</summary>
        return {
            SaveAddress: function (data, callback) {
                if (data.lineNo) {
                    $ApiService.PostApi(ApiPath.Representative.modifyDelivery, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.Representative.addDelivery, data, callback);
                }
            },
            GetShipping: function (data, callback) {
                /// <summary>获取收货地址</summary>
                $ApiService.PostApi(ApiPath.Representative.shipping, data, callback);
            },
            GetDelivery: function (data, callback) {
                /// <summary>获取常用收货地址</summary>
                $ApiService.PostApi(ApiPath.Representative.delivery, data, callback);
            },
            AddDelivery: function (data, callback) {
                /// <summary>添加常用收货地址</summary>
                $ApiService.PostApi(ApiPath.Representative.addDelivery, data, callback);
            },
            ModifyDelivery: function (data, callback) {
                /// <summary>修改常用收货地址</summary>
                $ApiService.PostApi(ApiPath.Representative.modifyDelivery, data, callback);
            },
            DeleteDelivery: function (data, callback) {
                /// <summary>删除常用地址</summary>
                $ApiService.PostApi(ApiPath.Representative.deleteDelivery, data, callback);
            }
        }
    })
    .factory("$HospitalService", function ($MessagService, $ApiService) {
        /// <summary>医院信息管理服务</summary>
        return {
            SaveDoctor: function (data, callback) {
                /// <summary>保存常用医生</summary>
                if (data.dTCode) {
                    $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorModify, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.Hospital.addDoctors, data, callback);
                }
            },
            GetHospital: function (data, callback) {
                /// <summary>获取医院信息列表</summary>
                $MessagService.loading("医院信息获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Hospital.hospital, data, callback);
            },
            GetSections: function (data, callback) {
                /// <summary>获取科室信息列表</summary>
                $ApiService.PostApi(ApiPath.Hospital.sections, data, callback);
            },
            GetDoctors: function (data, callback) {
                /// <summary>获取常用医生列表</summary>
                $ApiService.PostApi(ApiPath.Hospital.doctors, data, callback);
            },
            AddDoctors: function (data, callback) {
                /// <summary>添加常用医生列表</summary>
                $ApiService.PostApi(ApiPath.Hospital.addDoctors, data, callback);
            },
            ModifyDoctors: function (data, callback) {
                /// <summary>修改常用医生信息</summary>
                $ApiService.PostApi(ApiPath.Hospital.modifyDoctors, data, callback);
            },
            DeleteDoctors: function (data, callback) {
                /// <summary>删除常用医生列表</summary>
                $ApiService.PostApi(ApiPath.Hospital.deleteDoctors, data, callback);
            }
        }
    })
    .factory("$BrandService", function ($MessagService, $ApiService) {
        /// <summary>品牌信息接口</summary>
        return {
            GetBrandList: function (data, callback) {
                /// <summary>获取产品线列表</summary>
                $ApiService.PostApi(ApiPath.Brand.brandList, data, callback);
            },
            GetProductLineType: function (data, callback) {
                /// <summary>获取产品线类型</summary>
                $ApiService.PostApi(ApiPath.Brand.productLineType, data, callback);
            },
            GetProductLine: function (data, callback) {
                /// <summary>产品线选择</summary>
                $ApiService.PostApi(ApiPath.Brand.productLine, data, callback);
            }
        };
    })
    .factory("$BusinessData", function ($MessagService, $ApiService) {
        /// <summary>业务基础数据接口</summary>  
        return {
            MedManuFacture: {
                // （物料）厂商
                Save: function (data, callback) {
                    /// <summary>保存厂商信息</summary>
                    if (data.medMnfcOrgCode) {
                        $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.updateMedManuFacture, data, callback);
                    } else {
                        $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.addMedManuFacture, data, callback);
                    }
                },
                GetManufacturerList: function (data, callback) {
                    /// <summary>获取厂商列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.queryMedManufacture, data, callback);
                },
                GetAddMedManuFacture: function (data, callback) {
                    /// <summary>新增厂商列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.addMedManuFacture, data, callback);
                },
                GetUpdateMedManuFacture: function (data, callback) {
                    /// <summary>编辑厂商列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.updateMedManuFacture, data, callback);
                },
                GetDeleteMedManuFacture: function (data, callback) {
                    /// <summary>删除厂商列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.deleteMedManuFacture, data, callback);
                },
                GetMedManuFactureCommboxList: function (data, callback) {
                    /// <summary>//厂商下拉框</summary>
                    $MessagService.loading("厂商信息获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.BusinessData.MedManuFacture.medManuFactureCommboxList, data, callback);
                }
            },
            MedBrand: {
                //(物料)品牌
                GetQueryAllMedBrand: function (data, callback) {
                    /// <summary>获取品牌列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedBrand.queryAllMedBrand, data, callback);
                },
                GetQueryMedBrandDetail: function (data, callback) {
                    /// <summary>获取品牌详情</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedBrand.queryMedBrandDetail, data, callback);
                },
                GetAddMedBrand: function (data, callback) {
                    /// <summary>添加品牌</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedBrand.addMedBrand, data, callback);
                },
                GetDeleteMedBrand: function (data, callback) {
                    /// <summary>删除品牌</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedBrand.deleteMedBrand, data, callback);
                },
                GetUpdateMedBrand: function (data, callback) {
                    /// <summary>修改品牌</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedBrand.updateMedBrand, data, callback);
                },
            },
            MedMaterial: {
                //(物料事件)
                SaveMedMaterialItem: function (data, callback) {
                    /// <summary>物料添加</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.saveMedMaterialItem, data, callback);
                },
                DeleteMedMaterialItem: function (data, callback) {
                    /// <summary>物料删除</summary>
                    $MessagService.loading("数据获取中，请稍等...");
                    $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.deleteMedMaterialItem, data, callback);
                },
                GetMedMaterialItemDetail: function (data, callback) {
                    /// <summary>物料详情</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.searchMedMaterialItemDetail, data, callback);
                },
                UpdateMedMaterialItem: function (data, callback) {
                    /// <summary>物料修改</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.updateMedMaterialItem, data, callback);
                },
                Save: function (data, callback) {
                    $MessagService.loading("数据保存中，请稍等...");
                    if (data.medMIInternalNo) {
                        $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.updateMedMaterialItem, data, callback);
                    } else {
                        $ApiService.PostApi(ApiPath.BusinessData.MedMaterial.saveMedMaterialItem, data, callback);
                    }
                }
            },
            MedJournal: {
                //用户登录日志
                GetQueryAllPlatForm: function (data, callback) {
                    /// <summary>获取登录日志列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedJournal.queryAllPlatForm, data, callback);
                },
                GetUpdatePlatForm: function (data, callback) {
                    /// <summary>编辑登录日志列表</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.MedJournal.updatePlatForm, data, callback);
                }
            },
            Warehouse: {
                //仓库管理
                GetQueryWareHouse: function (data, callback) {
                    /// <summary>获取仓库信息</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.Warehouse.queryWareHouse, data, callback);
                },
                GetQueryWareHouseDetail: function (data, callback) {
                    /// <summary>获取仓库详情</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.Warehouse.queryWareHouseDetail, data, callback);
                }
            },
            Reservoir: {
                //库区管理
                AueryAllWhzone: function (data, callback) {
                    /// <summary>获取库区信息</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.Reservoir.queryAllWhzone, data, callback);
                },
                GetSearchHMedKitDetail: function (data, callback) {
                    /// <summary>获取库区信息</summary>
                    /// <summary>套件详情</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.searchHMedKitDetail, data, callback);
                },
            },
            ManSuite: {
                //套件管理
                GetSearchHMedKit: function (data, callback) {
                    /// <summary>获取库区信息</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.searchHMedKit, data, callback);
                },
                GetSearchHMedKitDetail: function (data, callback) {
                    /// <summary>套件详情</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.searchHMedKitDetail, data, callback);
                },
                GetUpdateHMedKit: function (data, callback) {
                    /// <summary>套件修改</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.updateHMedKit, data, callback);
                },
                GetDeleteHMedKit: function (data, callback) {
                    /// <summary>套件删除</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.deleteHMedKit, data, callback);
                },
                GetInsertHMedKit: function (data, callback) {
                    /// <summary>套件添加</summary>
                    $ApiService.PostApi(ApiPath.BusinessData.ManSuite.insertHMedKit, data, callback);
                },
            },
            GetBrandList: function (data, callback) {
                /// <summary>获取厂商编码查询品牌</summary>
                $ApiService.PostApi(ApiPath.BusinessData.queryBrandByManufacture, data, callback);
            }
        }
    })
    .factory("$ManageDl", function ($MessagService, $ApiService) {
        /// <summary>业务数据经销商管理</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存经销商信息</summary>
                if (data.orgCode) {//存在orgCode编辑
                    $ApiService.PostApi(ApiPath.ManageDl.updateDealer, data, callback);
                } else {//不存在orgCode新增
                    $ApiService.PostApi(ApiPath.ManageDl.addDealer, data, callback);
                }
            },
            GetqueryAllDealer: function (data, callback) {
                /// <summary>经销商列表</summary>
                $ApiService.PostApi(ApiPath.ManageDl.queryAllDealer, data, callback);
            },
            GetqueryDealerDetail: function (data, callback) {
                /// <summary>经销商详情</summary>
                $ApiService.PostApi(ApiPath.ManageDl.queryDealerDetail, data, callback);
            },
            GetupdateDealer: function (data, callback) {
                /// <summary>经销商修改</summary>
                $ApiService.PostApi(ApiPath.ManageDl.updateDealer, data, callback);
            },
            GetaddDealer: function (data, callback) {
                /// <summary>经销商新增</summary>
                $ApiService.PostApi(ApiPath.ManageDl.addDealer, data, callback);
            },
            GetdeleteDealer: function (data, callback) {
                /// <summary>经销商删除</summary>
                $ApiService.PostApi(ApiPath.ManageDl.deleteDealer, data, callback);
            },
            DLHostptailRel: {
                Getquery: function (data, callback) {
                    /// <summary>医院经销商关系列表</summary>
                    $ApiService.PostApi(ApiPath.DLHostptailRel.query, data, callback);
                },
                GetqueryDetail: function (data, callback) {
                    /// <summary>医院经销商关系详情</summary>
                    $ApiService.PostApi(ApiPath.DLHostptailRel.queryDetail, data, callback);
                },
            }
        }
    })
    .factory("$ManaDocter", function ($MessagService, $ApiService) {
        /// <summary>医生管理信息</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存医生信息</summary>
                if (data.dTCode) {
                    $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorModify, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorAdd, data, callback);
                }
            },
            SwitchButton: function (data, callback) {
                /// <summary>医生启用禁用开关</summary>
                if (data.isEnable) {
                    $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorEnable, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorDisable, data, callback);
                }
            },
            GetbizDataDoctorList: function (data, callback) {
                /// <summary>获取医生列表</summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorList, data, callback);
            },
            GetbizDataDoctorDetail: function (data, callback) {
                /// <summary>获取医生详细</summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorDetail, data, callback);
            },
            GetbizDataDoctorAdd: function (data, callback) {
                /// <summary>获取医生新增</summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorAdd, data, callback);
            },
            GetbizDataDoctorModify: function (data, callback) {
                /// <summary>获取医生修改 </summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorModify, data, callback);
            },
            GetbizDataDoctorDisable: function (data, callback) {
                /// <summary>禁用医生列表</summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorDisable, data, callback);
            },
            GetbizDataDoctorEnable: function (data, callback) {
                /// <summary>启用医院列表</summary>
                $ApiService.PostApi(ApiPath.ManaDocter.bizDataDoctorEnable, data, callback);
            },
        }
    })
    .factory("$ManaDepartment", function ($MessagService, $ApiService) {
        /// <summary>科室管理</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存科室信息</summary>
                console.log(data)
                if (data.wardDeptCode) {
                    $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDModify, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDAdd, data, callback);
                }
            },
            SwitchButton: function (data, callback) {
                /// <summary>科室启用禁用开关</summary>
                if (data.isEnable) {
                    $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDEnable, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDDisable, data, callback);
                }
            },
            GetbizDataWDList: function (data, callback) {
                /// <summary>获取科室列表</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDList, data, callback);
            },
            GetbizDataWDDetail: function (data, callback) {
                /// <summary>获取科室详情</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDDetail, data, callback);
            },
            GetbizDataWDAdd: function (data, callback) {
                /// <summary>科室新增</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDAdd, data, callback);
            },
            GetbizDataWDModify: function (data, callback) {
                /// <summary>科室管理修改</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDModify, data, callback);
            },
            GetbizDataWDDisable: function (data, callback) {
                /// <summary>科室禁用</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDDisable, data, callback);
            },
            GetbizDataWDEnable: function (data, callback) {
                /// <summary>科室启用</summary>
                $ApiService.PostApi(ApiPath.ManaDepartment.bizDataWDEnable, data, callback);
            },
        }
    })
    .factory("$ProductLine", function ($MessagService, $ApiService) {
        /// <summary>产品线管理</summary>
        return {
            Getquery: function (data, callback) {
                /// <summary>产品线列表</summary>
                $ApiService.PostApi(ApiPath.productLine.query, data, callback);
            },
            Getinsert: function (data, callback) {
                /// <summary>产品线新增</summary>
                $ApiService.PostApi(ApiPath.productLine.insert, data, callback);
            },
            Getupdate: function (data, callback) {
                /// <summary>产品线修改</summary>
                $ApiService.PostApi(ApiPath.productLine.update, data, callback);
            },
            Getdelect: function (data, callback) {
                /// <summary>产品线删除</summary>
                $ApiService.PostApi(ApiPath.productLine.delect, data, callback);
            }
        }
    })
    .factory("$MyAddress", function ($MessagService, $ApiService) {
        /// <summary>我的地址</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存我的地址信息</summary>
                if (data.lineNo) {
                    $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressModify, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressAdd, data, callback);
                }
            },
            GetbizDataMyAddressList: function (data, callback) {
                /// <summary>我的地址列表</summary>
                $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressList, data, callback);
            },
            GetbizDataMyAddressDetail: function (data, callback) {
                /// <summary>我的地址详情</summary>
                $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressDetail, data, callback);
            },
            GetbizDataMyAddressAdd: function (data, callback) {
                /// <summary>我的地址新增</summary>
                $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressAdd, data, callback);
            },
            GetbizDataMyAddressModify: function (data, callback) {
                /// <summary>我的地址修改</summary>
                $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressModify, data, callback);
            },
            GetbizDataMyAddressDelete: function (data, callback) {
                /// <summary>我的地址删除</summary>
                $ApiService.PostApi(ApiPath.MyAddress.bizDataMyAddressDelete, data, callback);
            }
        }
    })
    .factory("$MyDoctor", function ($MessagService, $ApiService) {
        /// <summary>我的医生</summary>
        return {
            GetdoctorSalesAgentRelList: function (data, callback) {
                /// <summary>我的医生列表</summary>
                $ApiService.PostApi(ApiPath.MyDoctor.doctorSalesAgentRelList, data, callback);
            },
            GetdoctorSalesAgentRelDetail: function (data, callback) {
                /// <summary>我的医生详情</summary>
                $ApiService.PostApi(ApiPath.MyDoctor.doctorSalesAgentRelDetail, data, callback);
            },
            GetdoctorSalesAgentRelAdd: function (data, callback) {
                /// <summary>我的医生新增</summary>
                $ApiService.PostApi(ApiPath.MyDoctor.doctorSalesAgentRelAdd, data, callback);
            },
            GetdoctorSalesAgentRelModify: function (data, callback) {
                /// <summary>我的医生修改</summary>
                $ApiService.PostApi(ApiPath.MyDoctor.doctorSalesAgentRelModify, data, callback);
            },
            GetdoctorSalesAgentRelDelete: function (data, callback) {
                /// <summary>我的医生删除</summary>
                $ApiService.PostApi(ApiPath.MyDoctor.doctorSalesAgentRelDelete, data, callback);
            },
        }
    })
    .factory("$OrderRout", function ($MessagService, $ApiService) {
        /// <summary>订单路由管理</summary>
        return {
            GetqueryOdwhCfg: function (data, callback) {
                /// <summary>订单路由列表</summary>
                $ApiService.PostApi(ApiPath.OrderRout.queryOdwhCfg, data, callback);
            },
            GetaddOdwhCfg: function (data, callback) {
                /// <summary>订单路由新增</summary>
                $ApiService.PostApi(ApiPath.OrderRout.addOdwhCfg, data, callback);
            },
            GetupdateOdwhCfg: function (data, callback) {
                /// <summary>订单路由修改</summary>
                $ApiService.PostApi(ApiPath.OrderRout.updateOdwhCfg, data, callback);
            },

            GetfindDLByOIOrgCodeCombox: function (data, callback) {
                /// <summary>获取获取货主下的经销商</summary>
                $ApiService.PostApi(ApiPath.OrderRout.findDLByOIOrgCodeCombox, data, callback);
            },
            GetfindOICombox: function (data, callback) {
                /// <summary>获取所有货主</summary>
                $ApiService.PostApi(ApiPath.OrderRout.findOICombox, data, callback);
            }

        }
    })
    .factory("$AgentProduct", function ($MessagService, $ApiService) {
        /// <summary>代理产品管理</summary>
        return {
            GetbizDataOIDLMedBrandAgentRelList: function (data, callback) {
                /// <summary>代理产品管理列表</summary>
                $ApiService.PostApi(ApiPath.AgentProduct.bizDataOIDLMedBrandAgentRelList, data, callback);
            },
            GetbizDataOIDLMedBrandAgentRelAdd: function (data, callback) {
                /// <summary>代理产品管理新增</summary>
                $ApiService.PostApi(ApiPath.AgentProduct.bizDataOIDLMedBrandAgentRelAdd, data, callback);
            },
            GetbizDataOIDLMedBrandAgentRelModify: function (data, callback) {
                /// <summary>代理产品管理修改</summary>
                $ApiService.PostApi(ApiPath.AgentProduct.bizDataOIDLMedBrandAgentRelModify, data, callback);
            },
            GetbizDataOIDLMedBrandAgentRelDisbale: function (data, callback) {
                /// <summary>代理产品管理禁用</summary>
                $ApiService.PostApi(ApiPath.AgentProduct.bizDataOIDLMedBrandAgentRelDisbale, data, callback);
            },
            GetbizDataOIDLMedBrandAgentRelEnable: function (data, callback) {
                /// <summary>代理产品管理启用</summary>
                $ApiService.PostApi(ApiPath.AgentProduct.bizDataOIDLMedBrandAgentRelEnable, data, callback);
            },
        }
    })
    .factory("$ManaEvent", function ($MessagService, $ApiService) {
        /// <summary>经销商事件通知配置</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存经销商信息</summary>
                if (data.dLOrgCode && data.sOEventCode) {
                    $ApiService.PostApi(ApiPath.ManaEvent.updateDlsoEventNoTificationCfg, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaEvent.addDlsoEventNoTificationCfg, data, callback);
                }
            },
            GetqueryAllDlsoEventNoTificationCfg: function (data, callback) {
                /// <summary>经销商事件通知配置列表</summary>
                $ApiService.PostApi(ApiPath.ManaEvent.queryAllDlsoEventNoTificationCfg, data, callback);
            },
            GetaddDlsoEventNoTificationCfg: function (data, callback) {
                /// <summary>经销商事件通知配置新增</summary>
                $ApiService.PostApi(ApiPath.ManaEvent.addDlsoEventNoTificationCfg, data, callback);
            },
            GetupdateDlsoEventNoTificationCfg: function (data, callback) {
                /// <summary>经销商事件通知配置修改</summary>
                $ApiService.PostApi(ApiPath.ManaEvent.updateDlsoEventNoTificationCfg, data, callback);
            },
            GetdeleteDlsoEventNoTificationCfg: function (data, callback) {
                /// <summary>经销商事件通知配置删除</summary>
                $ApiService.PostApi(ApiPath.ManaEvent.deleteDlsoEventNoTificationCfg, data, callback);
            },
            GetqueryEventCode: function (data, callback) {
                /// <summary>经销商事件下拉框</summary>
                $ApiService.PostApi(ApiPath.ManaEvent.queryEventCode, data, callback);
            },
        }
    })
    .factory("$ManageOi", function ($MessagService, $ApiService) {
        /// <summary>货主组织管理</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存货主组织管理信息</summary>
                if (data.orgCode) {//存在orgCode编辑
                    $ApiService.PostApi(ApiPath.ManageOi.updateOwnerOfInventory, data, callback);
                } else {//不存在orgCode新增
                    $ApiService.PostApi(ApiPath.ManageOi.addOwnerOfInventory, data, callback);
                }
            },
            GetqueryAllOwnerOfInventory: function (data, callback) {
                /// <summary>货主列表</summary>
                $ApiService.PostApi(ApiPath.ManageOi.queryAllOwnerOfInventory, data, callback);
            },
            GetqueryOwnerOfInventoryDetail: function (data, callback) {
                /// <summary>获取货主详情</summary>
                $ApiService.PostApi(ApiPath.ManageOi.queryOwnerOfInventoryDetail, data, callback);
            },
            GetaddOwnerOfInventory: function (data, callback) {
                /// <summary>货主新增</summary>
                $ApiService.PostApi(ApiPath.ManageOi.addOwnerOfInventory, data, callback);
            },
            GetupdateOwnerOfInventory: function (data, callback) {
                /// <summary>货主修改</summary>
                $ApiService.PostApi(ApiPath.ManageOi.updateOwnerOfInventory, data, callback);
            },
            GetdeleteOwnerOfInventory: function (data, callback) {
                /// <summary>货主删除</summary>
                $ApiService.PostApi(ApiPath.ManageOi.deleteOwnerOfInventory, data, callback);
            },
        }
    })
    .factory("$ManaHospital", function ($MessagService, $ApiService) {
        /// <summary>医院管理信息</summary>
        return {
            Save: function (data, callback) {
                /// <summary>保存医院信息</summary>
                if (data.hPCode) {
                    $ApiService.PostApi(ApiPath.ManaHospital.updateHospital, data, callback);
                } else {
                    $ApiService.PostApi(ApiPath.ManaHospital.addHospital, data, callback);
                }
            },
            GetqueryAllHospital: function (data, callback) {
                /// <summary>获取医院列表</summary>
                $ApiService.PostApi(ApiPath.ManaHospital.queryAllHospital, data, callback);
            },
            GetaddHospital: function (data, callback) {
                /// <summary>获取医院新增</summary>
                $ApiService.PostApi(ApiPath.ManaHospital.addHospital, data, callback);
            },
            GetupdateHospital: function (data, callback) {
                /// <summary>获取医院编辑</summary>
                $ApiService.PostApi(ApiPath.ManaHospital.updateHospital, data, callback);
            },
            GetdeleteHospital: function (data, callback) {
                /// <summary>获取医院删除</summary>
                $ApiService.PostApi(ApiPath.ManaHospital.deleteHospital, data, callback);
            },
        }
    })
    .factory("$ManaWareHouse", function ($MessagService, $ApiService) {
        return {
            //仓库管理
            Save: function (data, callback) {
                /// <summary>保存仓库信息</summary>
                if (data.orgCode) {//存在orgCode编辑
                    $ApiService.PostApi(ApiPath.ManaWareHouse.updateWareHouse, data, callback);
                } else {//不存在orgCode新增
                    $ApiService.PostApi(ApiPath.ManaWareHouse.addWareHouse, data, callback);
                }
            },
            GetqueryWareHouse: function (data, callback) {
                /// <summary>仓库列表</summary>
                $ApiService.PostApi(ApiPath.ManaWareHouse.queryWareHouse, data, callback);
            },
            GetqueryWareHouseDetail: function (data, callback) {
                /// <summary>仓库详情</summary>
                $ApiService.PostApi(ApiPath.ManaWareHouse.queryWareHouseDetail, data, callback);
            },
            GetaddWareHouse: function (data, callback) {
                /// <summary>仓库新增</summary>
                $ApiService.PostApi(ApiPath.ManaWareHouse.addWareHouse, data, callback);
            },
            GetupdateWareHouse: function (data, callback) {
                /// <summary>仓库编辑</summary>
                $ApiService.PostApi(ApiPath.ManaWareHouse.updateWareHouse, data, callback);
            },
        }
    })
    .factory("$ManageOIDLRel", function ($MessagService, $ApiService) {
        return {
            //货主经销商关系
            GetqueryAllOIDLRel: function (data, callback) {
                /// <summary>货主经销商关系列表</summary>
                $ApiService.PostApi(ApiPath.ManageOIDLRel.queryAllOIDLRel, data, callback);
            },
            GetdeleteOwnerOfInventory: function (data, callback) {
                /// <summary>货主经销商关系认证</summary>
                $ApiService.PostApi(ApiPath.ManageOIDLRel.oidlRelCrtsts, data, callback);
            },
            GetoidlRelCrtsts: function (data, callback) {
                /// <summary>货主经销商关系详情</summary>
                $ApiService.PostApi(ApiPath.ManageOIDLRel.queryOIDLRelDetail, data, callback);
            }
        }
    })
    .factory("$PublicService", function ($MessagService, $ApiService) {
        return {
            /// <summary>通用公开接口</summary>
            GetDictionary: function (data, callback) {
                /// <summary>获取数据字典类型</summary>
                $MessagService.loading("数据获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Public.dictionary, data, callback);
            },
            UploadFile: function (data, callback) {
                /// <summary>上传附件</summary>
                $MessagService.loading("附件上传中，请稍等...");
                $ApiService.FromApi(ApiPath.Public.upload, data, function (rData) {
                    if (!rData.code) {
                        callback(rData);
                        $MessagService.hide(1000);
                    } else {
                        $MessagService.eorr("网络异常，请联系管理员！");
                    }
                });
            },
            BasedaUploadFile: function (data, callback) {
                /// <summary>基础数据上传附件</summary>
                $MessagService.loading("附件上传中，请稍等...");
                $ApiService.FromApi(ApiPath.Public.basedataload, data, function (rData) {
                    if (!rData.code) {
                        callback(rData);
                        $MessagService.hide(1000);
                    } else {
                        $MessagService.eorr("网络异常，请联系管理员！");
                    }
                });;
            },
            GetEventList: function (data, callback) {
                /// <summary>获取事件选择列表</summary>
                $MessagService.loading("数据获取中，请稍等...");
                $ApiService.PostApi(ApiPath.Public.event, data, callback);
            },
            GetHosptailComboxListByDLHPRel: function (data, callback) {
                /// <summary>//通用-全部医院下拉列表(下拉框)-查询经销商医院关系表</summary>
                $ApiService.PostApi(ApiPath.Public.hosptailComboxListByDLHPRel, data, callback);
            },
            GetOiMedMaterialComboxList: function (data, callback) {
                /// <summary>//货主下拉框(下拉框)-物料使用</summary>
                $ApiService.PostApi(ApiPath.Public.oiMedMaterialComboxList, data, callback);
            }
        }
    })
