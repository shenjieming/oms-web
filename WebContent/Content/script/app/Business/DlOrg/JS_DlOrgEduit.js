/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/sys tem/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>经销商编辑页面</summary>
    $scope.dlPageInfo = {
        Info: { corpRegCountryCodeName: "中国", corpRegCountryCode: "CN", certStatus: "N" },
        Load: function (callback) {
            /// <summary>启动加载</summary>
            $scope.SelectInfo.Currency.getCurrencyList();
            if ($stateParams.dlopt) {
                //编辑该经销商
                $scope.dlopt = $stateParams.dlopt;
                $scope.dlPageInfo.GetDlOrgDetail();//货主下拉框
            }
            if ($scope.dlPageInfo.Info.certStatus == "Y") {
                // 认证按钮开关
                $scope.dlPageInfo.Info.iscertStatus = true;
            }
        },
        checkIs: function () {
            $scope.dlPageInfo.Info.iscertStatus = !$scope.dlPageInfo.Info.iscertStatus;
            $scope.dlPageInfo.Info.certStatus = $scope.dlPageInfo.Info.iscertStatus ? "Y" : "N";
        },
        GetDlOrgDetail: function () {
            /// <summary>获取经销商详情</summary>
            $Api.ManageDl.GetqueryDealerDetail({ orgCode: $scope.dlopt }, function (rData) {
                $scope.dlPageInfo.Info = rData;

                ///省市区插件 转换
                $scope.dlPageInfo.Info.deliveryProvinceCode = $scope.dlPageInfo.Info.corpRegProvinceCode;
                $scope.dlPageInfo.Info.deliveryCityCode = rData.corpRegCityCode;
                $scope.dlPageInfo.Info.deliveryDistrictCode = rData.corpRegDistrictCode;
                console.log(rData)
                if ($scope.dlPageInfo.Info.certStatus == "Y") {
                    $scope.dlPageInfo.Info.iscertStatus = true;
                } else {
                    $scope.dlPageInfo.Info.iscertStatus = false;
                }
            })
        },
        verification: function () {
            /// <summary>验证模块</summary>
            var result = true;
            if (!$scope.dlPageInfo.Info.dLName) {
                $MessagService.caveat("请维护该经销商名称！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegCompanyName) {
                $MessagService.caveat("请维护该经销商注册名称！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegNo) {
                $MessagService.caveat("请维护该经销商注册编码！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.deliveryProvinceCode || !$scope.dlPageInfo.Info.deliveryCityCode || !$scope.dlPageInfo.Info.deliveryDistrictCode || !$scope.dlPageInfo.Info.corpRegAddress) {
                $MessagService.caveat("请维护该经销商地址！");
                result = false;
            }
            else if (!$scope.dlPageInfo.Info.corpRegCurrencyCode) {
                $MessagService.caveat("请维护该经销商注册币别！");
                result = false;
            }
            return result;
        },

        Save: function () {
            /// <summary>经销商管理操作</summary>   
            console.log($scope.dlPageInfo.Info)
            if ($scope.dlPageInfo.verification()) {
                $scope.dlPageInfo.Info.corpRegProvinceCode = $scope.dlPageInfo.Info.deliveryProvinceCode;
                $scope.dlPageInfo.Info.corpRegCityCode = $scope.dlPageInfo.Info.deliveryCityCode;
                $scope.dlPageInfo.Info.corpRegDistrictCode = $scope.dlPageInfo.Info.deliveryDistrictCode;
                //认证按钮x
                if ($scope.dlPageInfo.Info.iscertStatus) {
                    $scope.dlPageInfo.Info.certStatus = "Y";
                } else {
                    $scope.dlPageInfo.Info.certStatus = "N";
                }
                $Api.ManageDl.Save($scope.dlPageInfo.Info, function (rData) {
                    $MessagService.succ("用户保存成功！");
                    $scope.goView('app.business.dlorganizationView');
                })
            }
        }
    }

    $scope.SelectInfo = {
        Currency: {
            //选择币别
            dic: new Array(),
            change: function (item) {
                /// <summary>币别类型修改事件</summary>
                for (var i = 0; i < $scope.SelectInfo.Currency.dic.length; i++) {
                    if ($scope.SelectInfo.Currency.dic[i].currencyCode == $scope.dlPageInfo.Info.corpRegCurrencyCode) {
                        $scope.dlPageInfo.Info.corpRegCurrencyCodeName = $scope.SelectInfo.Currency.dic[i].currencyName;
                        return;
                    }
                }
            },
            getCurrencyList: function () {
                /// <summary>获取币别类型</summary>
                $Api.BasisService.GetCurrencyList({}, function (rData) {
                    if (!rData.code) {
                        $scope.SelectInfo.Currency.dic = rData.rows;
                        console.log(rData)
                    };
                    if (!$scope.dlPageInfo.Info.corpRegCurrencyCode) {
                        $scope.dlPageInfo.Info.corpRegCurrencyCode = "CNY";
                    }
                });
            },
        },
    }

    $scope.dlPageInfo.Load();
})