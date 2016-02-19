/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>货主新增</summary>
    $scope.oiPageInfo = {
        Info: {},
        Load: function (callback) {
            if ($stateParams.oiopt) {
                $scope.oiopt = $stateParams.oiopt;
                $scope.oiPageInfo.GetDlOrgDetail();
            }
        },
        GetDlOrgDetail: function () {
            /// <summary>获取货主详情</summary>
            $Api.ManageOi.GetqueryOwnerOfInventoryDetail({ orgCode: $scope.opt }, function (rData) {
                $scope.oiPageInfo.Info = rData;
                console.log(rData)
            })
        },
        Save: function () {
            /// <summary>货主组操作</summary>
            console.log($scope.oiPageInfo.Info)
            $Api.ManageOi.Save($scope.oiPageInfo.Info, function (rData) {
                $MessagService.succ("货主保存成功！");
                self.location = 'index.html#/app/business/oiorganization';
            })
        },
    }
    $scope.SelectInfo = {
        oiType: {
            //货主类型下拉框  
            dic: new Array(),
            change: function (item) {
                /// <summary>角色类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.oiType.dic.length; i++) {
                    if ($scope.SelectInfo.oiType.dic[i].id == $scope.oiPageInfo.Info.oIType) {
                        $scope.oiPageInfo.Info.oITypeName = $scope.SelectInfo.oiType.dic[i].text;
                        return;
                    }
                }
            },
            getList: function () {
                /// <summary>获取货主类型</summary>
                $Api.OrganizationService.GetOwnerList({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.oiType.dic = rData;
                    };
                });
            }
        },      
    }
    $scope.oiPageInfo.Load();
})
{     "orgCode":"组织机构编码",
    //"oITypeName":"货主类型",    
    //"oIShortCode":"货主编码",   
    ////"oIName"："货主名称",   
    //"oIFullName":"货主全称",   
    //"oIDesc":"货主描述",     corpRe
    //"oIType":"货主类型",   
    //"remark":"备注",    
    //"corpRegNo":"企业注册信息--企业注册号",     
    //"corpRegCompanyName":"企业注册信息--企业名称", 
    //"corpRegLegalRep"："企业注册信息-法人代表",  
    // "corpRegCurrencyCode":"企业注册信息--币别",      
    //"corpRegCapital":"企业注册信息-资本", 
    //"corpRegTaxNo":"企业注册信息--税号", 
    //"corpRegCurrencyCodeName":"币别名称",  
    //"validStatusName":"有效性"， 
     "corpRegBizScope":"企业注册信息-经营范围",
    "corpRegCountryCodeName":"企业注册信息---所在国家名称",  
    "corpRegProvinceCodeName":"企业注册信息--所在省名称",    
    "corpRegCityCodeName":"企业注册信息--所在市名称",       
    "corpRegDistrictCodeName":"企业注册信息--所在区名称",
    "corpRegCountryCode":"企业注册信息--企业所在国家编码",    
    "corpRegProvinceCode":"企业注册信息--企业所在省",    
    "corpRegCityCode":"企业注册信息--企业所在市",   
    "corpRegDistrictCode":"企业注册信息--企业所在区",  
    "corpRegAddress":"企业注册信息--业地址",           
    "contact1Func":"联系人1用途",      
    "contact1Name":"联系人1名称",   
    "contact1Email"："联系人邮箱",    
    "contact1Mobile":"联系人手机",  
    "contact1Tel":"联系人电话",    
    "contact1PMsgType":"联系人1-即时通信工具类型",   
    "contact1PMsgNo":"联系人1-即时通信号"，   
    "contact2Func":"联系人2用途",    
    "contact2Name":"联系人2名称",   
    "contact2Email":"联系人2邮箱",     
    "contact2Mobile":"联系人2手机",   
    "contact2Tel":"联系人2电话",     
    "contact2PMsgType":"联系人2-即时通信工具类型",  
    "contact2PMsgNo":"联系人1-即时通信号"，   
    "contact3Func":"联系人3--用途",   
    "contact3Name":"联系人3--名称",     
    "contact3Email":"联系人3--邮箱"   
    "contact3Mobile":"联系人3--手机",     
    "contact3Tel":"联系人3--电话"，    
    "contact3PMsgType":"联系人3-即时通信工具类型",   
    "contact3PMsgNo"："联系人3-即时通信号",  
    "contact1FuncName":"联系人1--用途名称",   
    "contact1PMsgTypeName":"联系人1--即时通讯类型名称",    
    "Contact2FuncName":"联系人2--用途名称",       
    "contact2PMsgTypeName":"联系人2--即时通讯类型名称",      
    "contact3FuncName":"联系人3--用途"，   
    "contact3PMsgTypeName":"联系人3--即时通讯类型名称"

           
    "corpBizCountryCode":"企业经营信息-所在国家",    
    "corpBizProvinceCode":"企业经营信息-所在省",  
    "corpBizCityCode":"企业经营信息-所在市",    
    "corpBizDistrictCode":"企业经营信息-所在区",    
    "corpBizAddress":"企业经营信息-地址",    
    "corpBizPostcode":"企业经营信息-邮政编码",  
    "corpBizCountryCodeName":"企业运营信息--所在国家",   
    "corpBizProvinceCodeName":"企业运营信息--所在省名称",   
    "corpBizCityCodeName":"企业运营信息--所在市名称",    
    "corpBizDistrictCodeName":"企业运营信息--所在区名称",      
    "createByName":"创建人"，       
    "updateByName":"修改人"， }

