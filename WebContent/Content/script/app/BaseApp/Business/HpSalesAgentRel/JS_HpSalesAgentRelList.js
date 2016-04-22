/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("HpSalesAgentRelController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.HpSalesAgentRelList={
        info:[],
        GetHpSalesAgentRelList:function(){
            ///<summmary>医院经销商关系<summary>
            var paramData = $.extend({},$scope.Pagein);
            $Api.HpSalesAgentRelService.List(paramData,function(rData){
                    $scope.HpSalesAgentRelList.info=rData.rows;
                    $scope.Pagein.total=rData.total;
            });
        },
        DeleteHpSalesAgentRel:function(rows){
            ///<summary>医院经销商关系删除<summary>
            var rows = row ? row:$scope.getSelectedRow;
            if(rows){
                if(confirm("您确认要删除吗？")){
                    $Api.HpSalesAgentRelService.Delete(rows,function(rData){
                        $MessagService.succ("删除成功！");
                        $scope.HpSalesAgentRelList.GetHpSalesAgentRelList();
                    });
                }
            }else {
                $MessagService.caveat("请选择要删除的医院经销商关系！");
            }
        }
    },
        $scope.HpSalesAgentRelView={
            info:[],
            HpSalesAgentRelDetail:function(){
                ///<summary>医院经销商关系详情<summary>
                var param = $scope.getSelectedRow();
                if (param){
                    $scope.HpSalesAgentRelView.show();
                    $Api.HpSalesAgentRelService.View({hPCode:param.hPCode,userId:param.userID},function(rData){
                        $scope.HpSalesAgentRelView.info=rData.rows[0];
                    });
                }else{
                    $MessagService.caveat("请选择需要查询详情的医院经销商关系！");
                }
            },
            cancel:function(){
                $scope.HpSalesAgentRelView.hide();
            }
        },
        $scope.HpSalesAgentRelValid={
            validHpSalesAgentRel:function(){
                var result = true;
                if (!$scope.HpSalesAgentRelAdd.hPCode){
                    $MessagService.caveat("医院不能为空！");
                    result = false;
                }
                if (!$scope.HpSalesAgentRelAdd.userID){
                    $MessagService.caveat("销售代表不能为空");
                    result = false;
                }
            }
        },
        $scope.HpSalesAgentRelEdit={
            info:new Object(),
            HpSalesAgentRelEditView:function(){
                //<summary>医院销售代表编辑回显数据<summary>
                var param = $scope.getSelectedRow();
                if(param){
                    $Api.HpSalesAgentRelService.View({hPCode:param.hPCode,userId:param.userID},function(rDatas){
                        $scope.HpSalesAgentRelAdd.info=rDatas.rows [0];
                    });
                }else{
                    $MessagService.caveat("请选择需要编辑的数据！");
                }
            },
            HpSalesAgentRelEdit:function(){
                //<summary>医院销售代表编辑<summary>
                if(HpSalesAgentRelValid.validHpSalesAgentRel()){
                    $Api.HpSalesAgentRelService.Edit($scope.HpSalesAgentRelAdd.info,function(){
                        $MessagService("修改成功！");
                        $scope.HpSalesAgentRelList.GetHpSalesAgentRelList();
                    });
                }
            },
            cancel:function(){
                $scope.HpSalesAgentRelEdit.hide();
            }
        },
        $scope.HpSalesAgentRelAdd={
            info:new Object(),
            HpSalesAgentRelInsert:function(){
               // <summary>医院销售代表新增<summary>
                if($scope.HpSalesAgentRelValid.validHpSalesAgentRel()){
                    $Api.HpSalesAgentRelService.Insert($scope.HpSalesAgentRelAdd.info,function(rData){
                        $MessagService.succ("医院销售代表关系新增成功");
                        $scope.HpSalesAgentRelList.GetHpSalesAgentRelList();
                    });
                }
            },
        },
    $scope.Pagein = {
        pageSize: 10,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    },
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.WhZoneList.GetWhZoneList();
    },

        $scope.HpSalesAgentRelView.model = { title: "医院销售代表详情", width: 800, height: 300, buttons: { "确定": $scope.HpSalesAgentRelView.cancel } };
    $scope.HpSalesAgentRelAdd.model = { title: "医院销售代表新增", width: 800, height: 300, buttons: { "保存": $scope.HpSalesAgentRelAdd.HpSalesAgentRelInsert, "取消": $scope.HpSalesAgentRelAdd.cancel } };
    $scope.HpSalesAgentRelEdit.model = {title:"医院销售代表编辑",width:800,height:300,buttons:{"保存":$scope.HpSalesAgentRelEdit.HpSalesAgentRelEdit,"取消":$scope.HpSalesAgentRelEdit.cancel()}};
}