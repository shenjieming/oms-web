/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>货主新增</summary>
    $scope.oiPageInfo = {
        Info: {},
        Load: function (callback) {
            if ($stateParams.oiopt) {
                $scope.oiopt = $stateParams.oiopt;
                $scope.oiPageInfo.GetOiOrgDetail();
            }
            $scope.SelectInfo.oiType.getList();
        },
        GetOiOrgDetail: function () {
            /// <summary>获取货主详情</summary>
            $Api.ManageOi.GetqueryOwnerOfInventoryDetail({ orgCode: $scope.oiopt }, function (rData) {
                $scope.oiPageInfo.Info = rData;



                console.log($scope.oiPageInfo.Info)
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
                        console.log(rData)
                    };
                });
            }
        },      
    }
    $scope.oiPageInfo.Load();
})
