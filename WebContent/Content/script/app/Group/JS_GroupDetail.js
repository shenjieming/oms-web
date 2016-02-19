/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("GroupDetailController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    $scope.GroupUserList = {
        info: { isEnable: false, dLOrgCode: "" },
        cancel: function () {
            $scope.GroupUserList.model.hide();
        },
        show: function () {
            /// <summary>群组用户列表显示</summary>
            $scope.apiLoad.GroupInfo();
            $scope.GroupUserList.model.show();
        },
        save: function () {
            /// <summary>保存群组用户列表</summary>   
            //去重  
            $scope.$apply(function () {
                var user = true;
                $.each(result, function (row, item) {
                    $.each($scope.GroupDetail.info, function (index, item) {
                        item.userID = item.userID ? item.userID : item.userId
                        if (result[row].userID == $scope.GroupDetail.info[index].userID) {
                            $MessagService.caveat("该成员已存在");
                            result = [];
                            $scope.GroupUserList.model.hide();
                            user = false;
                            return true;
                        }                       
                    })
                    if (user) {
                        item.userMobile = item.loginMobileNo
                        $scope.GroupDetail.List.push(item);                    
                    }
                })
                result = [];
                $scope.GroupUserList.model.hide();
                $scope.GroupDetail.info = $scope.GroupDetail.List;
            }) 
        },
        delGroup: function (index) {
            /// <summary>删除组成员</summary>CallResult
            console.log(index)
            $scope.GroupDetail.info.splice(index,1);
        },
    }
    var result = new Array();
    $scope.CallResult = function (row) {
        /// <summary>用户操作状态控制</summary>
        if (row.isClick) {
            result.push(row);
        } else {
            //不勾选删除
            for (var i = 0; i < result.length; i++) {
                if (row == result[i]) {
                    result.splice(i, 1)
                }
            }
        }
    }
   //获取接口列表
    $scope.apiLoad = {
        GroupInfo: function () {
            $Api.UserService.GetUserList($scope.Pagein, function (rData) {
                /// <summary>经销商用户列表</summary>
                $scope.GroupUserList.info = rData.rows;
                $scope.Pagein.total = rData.total;
            })
        },
        GroupDetail: function () {
            /// <summary>获取群组详细</summary>
            $Api.GruopService.GetGroupDetail({ teamCode: $scope.GroupDetail.GroupInfo.teamCode }, function (rData) {
                $scope.GroupDetail.detail = rData;
                $scope.GroupDetail.info = rData.member;
                console.log(rData.member)
                $scope.GroupDetail.List = $scope.GroupDetail.info;
            })
        }
    }
    // 经销商组成员 
    var GrouupList = new Array;
    $scope.GroupUserList.model = {
        title: "群组成员", width: 650, height: 300, buttons: {
            "确定": $scope.GroupUserList.save, "取消": $scope.GroupUserList.cancel
        }
    }
    $scope.GroupDetail = {
        info: [],
        List: [],
        detail: { member: [] },
        verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.GroupDetail.detail.teamName) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            return result;
        },
        saveGroup: function () {
            /// <summary>组成员保存</summary> 
            if ($scope.GroupDetail.verification()) {
                $scope.GroupDetail.detail.dLOrgCode = $scope.User.userInfo.userId;
                $scope.GroupDetail.detail.member = [];
                //组成员编辑
                console.log($scope.GroupDetail.detail)

                for (var i = 0; i < $scope.GroupDetail.info.length; i++) {
                    if (!$scope.GroupDetail.info[i].userID) {
                        $scope.GroupDetail.detail.member.push({ userID: $scope.GroupDetail.info[i].userId, teamMemberDesc: $scope.GroupDetail.info[i].teamMemberDesc })
                    } else {
                        $scope.GroupDetail.detail.member.push({ userID: $scope.GroupDetail.info[i].userID, teamMemberDesc: $scope.GroupDetail.info[i].teamMemberDesc })
                    }
                }
                $Api.GruopService.Save($scope.GroupDetail.detail, function (rData) {
                    $MessagService.succ("群组信息保存成功！");
                    self.location = 'index.html#/app/comp/group/list';
                })
                console.log($scope.GroupDetail.detail)
            }
        }
    }
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    }
    $scope.Load = function () {
        //启动群组列表
        $scope.GroupDetail.GroupInfo = [];
        if ($stateParams.teamCodeId) {
            //传群组编码
            $scope.GroupDetail.GroupInfo.teamCode = $stateParams.teamCodeId;
            $scope.apiLoad.GroupDetail();
        }
        $scope.apiLoad.GroupInfo();
    }
    $scope.Load()
})