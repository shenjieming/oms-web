/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("WhZoneListController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.WhZoneList = {
        info: [],
        GetWhZoneList: function () {
            /// <summary>获取库区列表</summary>
            var paramData = $.extend({}, $scope.Pagein);
            $Api.WhZone.GetWhZoneList(paramData, function (rData) {
                $scope.WhZoneList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        },
        DeleteWhzone: function (row) {
            $scope.WhZoneList.info = row ? row : $scope.getSelectedRow();
            if ($scope.WhZoneList.info) {
                if(confirm("您确认要删除当前库区吗？")) {
                    $Api.WhZone.DeleteWhzone($scope.WhZoneList.info, function (rData) {
                        $MessagService.succ("删除库区成功");
                        $scope.WhZoneList.GetWhZoneList();
                    })
                }
            } else {
                $MessagService.caveat("请选择一条库区信息");
                $scope.WhZoneList.GetWhZoneList();
            }
        }

    },
    $scope.WhzoneView={
        info:[],
        GETWhzoneView:  function(){
            ///<summary>库区详情<summary>
            var whZoneOpt = $scope.getSelectedRow();
            if(whZoneOpt){
                $scope.WhzoneView.model.show();
                $Api.WhZone.GETWhzoneView({medMIWarehouse:whZoneOpt.medMIWarehouse,zoneCode:whZoneOpt.zoneCode},function(rData){
                    $scope.WhzoneView.info=rData.rows[0];
                });
            }else{
                $MessagService.caveat("请选择一条需要查看的详情的仓库！");
            }
        },
        cancel:function(){
            $scope.WhzoneView.model.hide();
        },
    },
        //添加和编辑参数校验
        $scope.WhzoneValid={
            ValidWhzoneInsert:function(){
                var result = true;
                if (!$scope.WhzoneInsert.info.medMIWarehouse){
                    $MessagService.caveat("请选择仓库！");
                    result=false;
                }
                if (!$scope.WhzoneInsert.info.zoneCode){
                    $MessagService.caveat("库区编码不能为空");
                    result=false;
                }
                if(!$scope.WhzoneInsert.info.zoneName){
                    $MessagService.caveat("库区名称不能为空");
                    result=false;
                }
                return result;
            },
        }
    $scope.WhzoneInsert={
        info:new Object(),
        GETInsertWhzone:function(){
            ///<summary>库区新增<summary>
            if ($scope.WhzoneValid.ValidWhzoneInsert()){
                $Api.WhZone.WhzoneInsert($scope.WhzoneInsert.info,function(rData){
                    $MessagService.succ("库区添加成功！");
                    $scope.WhzoneInsert.model.hide();
                    $scope.WhZoneList.GetWhZoneList();
                });
            }
        },
        cancel:function(){
            $scope.WhzoneInsert.model.hide();
        },
        showInsert:function(){
            $scope.SelectInfo.Whouse.getWhoseList();
            $scope.WhzoneInsert.model.show();
        },
    }
    ///<summary>库区编辑<summary>
    $scope.WhzoneEdit={
        info:new Object(),
        GETWhzoneEditView:function(){
            var whzone = $scope.getSelectedRow();
            if(whzone){
                $scope.SelectInfo.Whouse.getWhoseList();
                $scope.WhzoneEdit.model.show();
                ///<summary>选中的库区详情<summary>
                $Api.WhZone.GETWhzoneView({medMIWarehouse:whzone.medMIWarehouse,zoneCode:whzone.zoneCode},function(rData){
                    $scope.WhzoneEdit.info=rData.rows[0];
                });
            }else {
                $MessagService.caveat("请选择需要编辑的仓库");
            }
        },
        cancel:function(){
            $scope.WhzoneEdit.model.hide();
        },
        editShow:function(){
            $scope.SelectInfo.Whouse.getWhoseList();
            $scope.WhzoneEdit.model.show();
        },
        WhzoneEdit:function(){
            if ($scope.WhzoneValid.ValidWhzoneInsert()){
                $Api.WhZone.WhzoneEdit($scope.WhzoneEdit.info,function(rData){
                    $MessagService.succ("库区修改成功！");
                    $scope.WhzoneEdit.model.hide();
                    $scope.WhZoneList.GetWhZoneList();
                });
            }
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
        $scope.WhZoneList.GetWhZoneList();
    },

        $scope.WhzoneView.model = { title: "库区详情", width: 800, height: 300, buttons: { "确定": $scope.WhzoneView.cancel } };
    $scope.WhzoneEdit.model = { title: "库区信息", width: 800, height: 300, buttons: { "保存": $scope.WhzoneEdit.WhzoneEdit, "取消": $scope.WhzoneEdit.cancel } };
    $scope.WhzoneInsert.model = { title: "库区信息", width: 800, height: 300, buttons: { "保存": $scope.WhzoneInsert.GETInsertWhzone, "取消": $scope.WhzoneInsert.cancel } };
    $scope.SelectInfo = {
        Whouse: {
            dic: new Array(),
            getWhoseList:function(){
                $Api.BusinessData.Warehouse.GetQueryWareHouse({}, function (rData) {
                    $scope.SelectInfo.Whouse.dic = rData.rows;
                })
            }
        }
    }
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each($scope.WhZoneList.info, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        });
        return result;
    }
    $scope.Load();
})