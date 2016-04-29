/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("BrandListController", function ($scope, $state, $local, $Api, $MessagService) {

    /// <summary>品牌列表</summary>
    $scope.BandJump = {};
    $scope.BrandList = {
        info:new Array(),
        Brand:{
            GetBrandList: function () {
                /// <summary>获取品牌列表</summary>
                var opt = $.extend({ medBrandCode: $scope.BrandList.medBrandCode }, $scope.Pagein);
                $Api.BusinessData.MedBrand.GetQueryAllMedBrand(opt, function (rData) {
                    $scope.BrandList.info = rData.rows;
                    $scope.BrandList.Brand.dic = rData.rows;
                    $scope.Pagein.total = rData.total;
                })
            },
        },
        SearchBrand: {
            dic: new Array(),
            GetBrandList: function () {
                /// <summary>获取品牌列表</summary>
                $Api.BusinessData.MedBrand.GetQueryAllMedBrand({ medMnfcCode: $scope.BrandList.medMnfcCode }, function (rData) {
                    $scope.BrandList.SearchBrand.dic = rData.rows;
                })
            },
        },
        Facture: {
            dic: new Array(),
            Change: function () {
                $scope.Pagein.medMnfcCode = $scope.BrandList.medMnfcCode;
                $scope.BrandList.Brand.GetBrandList();
                $scope.BrandList.SearchBrand.GetBrandList();
                $scope.BrandList.medBrandCode = "";
            },
            GetFacture: function () {
                /// <summary>厂商下拉框</summary>
                $Api.BusinessData.MedManuFacture.GetMedManuFactureCommboxList({}, function (rData) {
                    $scope.BrandList.Facture.dic = rData;
                    console.log(rData)
                     
                })
            }
        },
        QueryDLList: function () {
            /// <summary>查询品牌列表</summary>
            $scope.Pagein = $.extend($scope.Pagein, { pageIndex: 1, searchValue: $scope.BandJump.SearchWhere });
            var opt = $.extend({}, $scope.Pagein);
            $Api.BusinessData.MedBrand.GetQueryAllMedBrand(opt, function (rData) {
                $scope.BrandList.info = rData.rows;
                $scope.BrandList.Brand.dic = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        },
        UpEnter: function (e) {
            /// <summary>点击回车事件</summary>
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.BrandList.QueryDLList();
            }
        }
      
    }
    $scope.UpperCase = function () {
        /// <summary>小写转大写</summary>
        if ($scope.BrandDetailAdd.Info.medBrandCode) {
            $scope.BrandDetailAdd.Info.medBrandCode = $scope.BrandDetailAdd.Info.medBrandCode.toUpperCase()
        }      
    }
    $scope.BrandDetail = {
        // 品牌编辑
        Info:new Object(),
        ShowEdit: function () {
            var opt = $local.getSelectedRow($scope.BrandList.info);
            if (opt) {
                $Api.BusinessData.MedBrand.GetQueryMedBrandDetail({ medBrandCode: opt.medBrandCode }, function (rData) {
                    $scope.BrandDetail.Info = rData;
                    $scope.BrandDetail.model.show();
                })         
            }else{
                $MessagService.caveat("请选择编辑的品牌信息！")
            }
         
        },
        cancel: function () {
            $scope.BrandDetail.model.hide();
        },
        BrandNameSynchronization: function () {
            $scope.BrandDetailAdd.Info.medBrandFullName = $scope.BrandDetailAdd.Info.medBrandName;
        },
        Verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.BrandDetail.Info.medBrandName) {
                result = false;
                $MessagService.caveat("请输入品牌名称")
            }
            else if (!$scope.BrandDetail.Info.medBrandCode) {
                    result = false;
                $MessagService.caveat("请输入品牌编码")
            }
            return result;
        },
        Save: function () {
            if ($scope.BrandDetail.Verification()) {
                $Api.BusinessData.MedBrand.GetUpdateMedBrand($scope.BrandDetail.Info, function (rData) {
                    $MessagService.succ("该品牌保存成功！");
                    $scope.BrandList.Brand.GetBrandList();
                    $scope.BrandDetail.model.hide();
                })
            }
        },        
    }

    $scope.BrandView = {
        // 品牌详情
        Info: [],
        ShowView: function () {
            var opt = $local.getSelectedRow($scope.BrandList.info);
            if (opt) {
                $Api.BusinessData.MedBrand.GetQueryMedBrandDetail({ medBrandCode: opt.medBrandCode }, function (rData) {
                    $scope.BrandView.Info = rData;
                    $scope.BrandView.model.show();
                })
            } else {
                $MessagService.caveat("请选择查看的品牌信息！")
            }
        },
        cancel: function () {
            $scope.BrandView.model.hide();
        }

    }
    $scope.BrandDetailAdd = {
        Info: new Object(),
        ShowAdd: function (row) {
            /// <summary>品牌新增</summary>
            $scope.BrandDetailAdd.Info = row;
            $scope.BrandDetailAdd.model.show();
        },
        cancel: function () {
            $scope.BrandDetailAdd.model.hide();
        },
        Verification: function () {
            var result = true;
            if (!$scope.BrandDetailAdd.Info.medBrandName) {
                $MessagService.caveat("请输入品牌名称")
                result = false;
            }
            else if (!$scope.BrandDetailAdd.Info.medBrandCode) {
                $MessagService.caveat("请输入品牌编码")
                result = false;
            }
            return result;
        },
        Save: function () {
            console.log($scope.BrandDetailAdd.Info)
            if ($scope.BrandDetailAdd.Info.medBrandFullName == null) {
                $scope.BrandDetailAdd.Info.medBrandFullName = $scope.BrandDetailAdd.Info.medBrandName
            }
            if ($scope.BrandDetailAdd.Verification()) {
                $Api.BusinessData.MedBrand.GetAddMedBrand($scope.BrandDetailAdd.Info, function (rData) {
                    $MessagService.succ("该品牌保存成功！")
                    $scope.BrandList.Brand.GetBrandList();
                    $scope.BrandDetailAdd.model.hide();
                })
            }
        },
    },


    $scope.BrandView.model = { title: "品牌详情", width: 550, height: 300, buttons: { "确定": $scope.BrandView.cancel } }
    $scope.BrandDetail.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.BrandDetail.Save, "取消": $scope.BrandDetail.cancel } }
    $scope.BrandDetailAdd.model = { title: "品牌信息", width: 650, height: 300, buttons: { "保存": $scope.BrandDetailAdd.Save, "取消": $scope.BrandDetailAdd.cancel } }


    $scope.BrandDelet = function () {
        $scope.BrandList.info = $local.getSelectedRow($scope.BrandList.info);
        if ($scope.BrandList.info) {
            if (confirm("您确认要删除当前品牌吗?")) {
                $Api.BusinessData.MedBrand.GetDeleteMedBrand($scope.BrandList.info, function (rData) {
                    $MessagService.succ("该品牌删除成功！")
                    $scope.BrandList.Brand.GetBrandList();
                })
            }else( $scope.BrandList.Brand.GetBrandList())
        } else {
            $MessagService.caveat("请选择一条删除的品牌！")
        }
    }
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.BrandList.Brand.GetBrandList();
        $scope.BrandList.Facture.GetFacture();
        $scope.BrandList.SearchBrand.GetBrandList();
    }
    $scope.Load();
})