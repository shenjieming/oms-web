/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("GroupDetailController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {

    $scope.a = function () {
        alert("请在群组成员列表中编辑成员！")
    }
    $scope.GroupUserList = [];
    $scope.GroupDetail = {
        GroupInfo: [],
        UserDetail: [],
        nameList: new Array,  //组成员
        nameDetail: new Array, //成员描述
        GetUserName: function () {
            /// <summary>获取组成员姓名</summary>
                $Api.UserService.GetUserList($scope.Pagein, function (rData) {
                    $scope.GroupUserList = rData.rows;
                    console.log(rData.rows)
                    $scope.Pagein.total = rData.total;
                });           
        },
        GetUserDesc: function () {
            /// <summary>获取组成员详情</summary>
            if ($scope.selectNameList.dic.loginAccountId) {
                $Api.UserService.GetUserInfo({ loginAccountId: $scope.selectNameList.dic.loginAccountId }, function (rData) {
                    $scope.GroupDetail.UserDetail = rData;
                    console.log(rData)
                });
            }
            else { $MessagService.caveat("请选择一条操作数据！"); }
        },
        GetGroupDetail: function () {
            console.log($scope.GroupDetail.GroupInfo)
            $Api.GruopService.GetGroupDetail({ teamCode: $scope.GroupDetail.GroupInfo.teamCode }, function (rData) {
                $scope.GroupDetail.GroupInfo = rData.team;
                console.log(rData)
                for (var i = 0; i < rData.member.length; i++) {
                    $scope.GroupDetail.nameList.push(rData.member[i].userName)
                    $scope.GroupDetail.nameDetail.push(rData.member[i].teamMemberDesc)
                    $scope.selectNameList.doc.push({ userID: rData.member[i].userId, teamMemberDesc: rData.member[i].teamMemberDesc })
                }
                //$scope.GroupDetail.GroupInfo.member= $scope.selectNameList.doc = rData.member
                $scope.GroupDetail.GroupInfo.member = $scope.selectNameList.doc
                console.log($scope.selectNameList.doc)
                $scope.GroupDetail.GetUserName();
            });
        },
        verification: function () {
            /// <summary>验证</summary>
            var result = true;
            if (!$scope.GroupDetail.GroupInfo.teamName || !$scope.GroupDetail.GroupInfo.member) {
                $MessagService.caveat("数据不完整，请将数据填写完整！");
                result = false;
            }
            return result;
        },
        saveGroup: function () {
            /// <summary>保存用户组信息</summary>  
            console.log($scope.GroupDetail.GroupInfo)
            if ($scope.GroupDetail.verification()) {
                //$MessagService.loading("群组信息保存中，请稍等...");
                $Api.GruopService.Save($scope.GroupDetail.GroupInfo, function (rData) {
                    self.location = 'index.html#/app/comp/group/list';
                    $MessagService.succ("群组信息保存成功！")
                });
            }
        },
    }
    // - -！！！？？（@——@）
    $scope.getSelectedRow = function () {
        /// <summary>获取选择的行</summary> 
        var result = false;
        $.each($scope.GroupUserList, function (index, item) {
            if (item.isSelected) {
                result = item;
            }
        })
        return result;
    }
    //群组成员操作信息   
    //    member:[{
    //        userId:xx((必填))
    //        teamMemberDesc:xx
    //},{
    //    userId:xx((必填))
    //    teamMemberDesc:xx
    //}]
    $scope.selectNameList = {
        dic: [],
        nameDetail: [], //组成员Id
        nameList: [],  //组成员姓名
        namedesc: [],  //组成员描述
        quchonglist: [],
        doc: [], //member{userId;teamMemberDesc}
        addNameList: function () {
            //增加组用户
            $scope.selectNameList.dic = $scope.getSelectedRow();
            $scope.GroupDetail.GetUserDesc();
            if ($scope.selectNameList.dic) {
                $scope.selectNameList.nameDetail = $scope.GroupDetail.UserDetail.userId;
                $scope.selectNameList.nameList = $scope.GroupDetail.UserDetail.userName;
                $scope.selectNameList.namedesc = $scope.GroupDetail.UserDetail.userJobDesc;
                $scope.selectNameList.doc.push({ userID: $scope.selectNameList.nameDetail, teamMemberDesc: $scope.selectNameList.namedesc })
                $scope.GroupDetail.nameList.push($scope.selectNameList.nameList)
                $scope.GroupDetail.nameDetail.push($scope.selectNameList.namedesc)
                $scope.GroupDetail.GroupInfo.member = $scope.selectNameList.doc;
            } else {
                $MessagService.caveat("请选择一条新增数据！");
            }
            console.log($scope.GroupDetail.GroupInfo)
        },
        deletNameList: function () {
            //删除
            $scope.selectNameList.dic = $scope.getSelectedRow();
            if (!$scope.selectNameList.doc) {
                $MessagService.caveat("该组成员中没有删除内容！");
            }            
            else if ($scope.selectNameList.dic) {
                for (var i = 0; i < $scope.selectNameList.doc.length; i++) {      
                    if ($scope.selectNameList.dic.loginAccountId == $scope.GroupDetail.GroupInfo.member[i].userID) {
                        $scope.GroupDetail.nameList.splice(i, 1)
                        $scope.GroupDetail.nameDetail.splice(i, 1)
                        $scope.selectNameList.doc.splice(i, 1)
                        $scope.GroupDetail.GroupInfo.member = $scope.selectNameList.doc;
                    }
                }
            } else {
                $MessagService.caveat("请选择一条删除数据！");
            }
        }
    };
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
        $scope.GroupDetail.GroupInfo.teamCode = $stateParams.teamCodeId;
        if ($scope.GroupDetail.GroupInfo.teamCode) {
            $scope.GroupDetail.GetGroupDetail();
        } else {
            $scope.GroupDetail.GetUserName();//成员信息          
        }
    }
    $scope.Load()
})