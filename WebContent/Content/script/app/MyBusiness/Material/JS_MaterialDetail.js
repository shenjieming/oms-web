/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("MaterialController", function ($scope, $state, $local, $Api, $MessagService, $FileService) {
    /// <summary>经销商物料查询</summary>
    $scope.Service = {
        /// <summary>物料管理服务</summary>
        Add: function () {
            /// <summary>添加物料</summary>
            $scope.PageData = {
                oIOrgCodeName: $scope.Material.options.oIOrgCodeName,
                oIOrgCode: $scope.Material.options.oIOrgCode,
                medBrandCode: $scope.Material.options.medBrandCode,
                medBrandCodeName: $scope.Material.options.medBrandCodeName,
                medProdLnCode: $scope.Material.options.medProdLnCode,
                medProdLnCodeName: $scope.Material.options.medProdLnCodeName,
                certMultiQty: 4, isScanSupported: "Y", disinfectionNeeded: "Y", effectiveControl: "Y",
                attachments: { images: new Array(), remark: "" }
            };
            this.IsEdit(true);
        },
        Save: function () {
            /// <summary>物料信息保存</summary>
            $Api.BusinessData.MedMater.Save($scope.PageData, function () {
                alert("保存成功！");
            })
        },
        IsChecked: function (ischeck, model, sd) {
            /// <summary>是否对象点击</summary>
            $scope.PageData[model] = ischeck ? "Y" : "N"
        }
    }


    $scope.PageData = {};

    $scope.Material = {
        //条件
        options: {},
        MedManuFactureList: new Array(),
        GetMedManuFactureList: function () {
            /// <summary>获取厂商列表</summary>
            $Api.BusinessData.MedManuFacture.GetMedManuFactureCommboxList({}, function (rData) {
                $scope.Material.MedManuFactureList = rData;
            });
        }
    }


    $scope.file = {
        /// <summary>附件控制器</summary>
        Upload: function (files) {
            /// <summary>上传事件</summary>
            $.each(files, function (index, item) {
                if ($scope.PageData.attachments.images.length >= 5) {
                    $MessagService.caveat("您上传的图片超过了5张。")
                    return false;
                }
                if (item.type.indexOf("image") > -1) {
                    $FileService.ReaderFiles(item, function (data) {
                        /// <summary>文件读取</summary>
                        $Api.Public.UploadFile(data, function (rData) {
                            $scope.PageData.attachments.images.push(rData);
                        });
                    });
                } else {
                    $MessagService.caveat("您上传的不是图片！")
                }

            });
        }
    }

});