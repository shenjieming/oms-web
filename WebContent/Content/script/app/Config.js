/// <reference path="../../../View/Business/Suite/SuiteEduit.html" />
/// <reference path="User/JS_Information.js" />
/// <reference path="../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../lib/Jquery/jquery-1.11.1.min.js" />
var Timestamp = new Date().getTime();
var app = angular.module('ESurgeryApp', ["ngRoute", "ui.router", "ngRequire", "ui.bootstrap",
    "smart-table", "jnDo", "AjaxService",
    "OmsApp", "BaseApp", "BmsApp"]);

app.run(function ($rootScope, $state, $local, $Api, $MessagService) {
    /// <summary>系统启动事件</summary>
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, errorType) {
        /// <summary>页面开始进入</summary>
        ///TODO:用户有效性验证
        if (toState.name != "login") {
            var data = $local.getValue("USER");
            if (data) {
                console.log(toState.name + "页面启动");
            } else {
                $MessagService.caveat("用户信息过期，请重新登录..");
                event.preventDefault();
                console.log(toState.name);
                $state.go("login");
            }
        } else {
            //若是登陆页面的话，并且存在用户信息的话，直接进入登陆页面
            var data = $local.getValue("USER");
            if (data) {
                event.preventDefault();
                $state.go("app.home");
            }
        }
    });


})
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>页面配置信息</summary>
    $stateProvider
        .state("app", {
            abstract: true,
            url: "/app",
            views: {
                "": {
                    templateUrl: "View/layout.html?data=" + Timestamp,
                    controller: "masterController"
                }
            },
            loadJs: [
                "Content/script/app/OmsApp/Directive/areaDirective.js",
                "Content/script/app/OmsApp/Directive/materialsTemplateDirective.js",
                "Content/script/app/OmsApp/Directive/materialsImportTemplateDirective.js",
                "Content/script/app/OmsApp/Directive/cargoOwnerDirective.js",
                "Content/script/app/OmsApp/Directive/doctorsDirective.js",
                "Content/script/app/OmsApp/Directive/productLineDirective.js",
                "Content/script/app/OmsApp/Directive/productViewDirective.js",
                "Content/script/app/OmsApp/Directive/addressDirective.js",
                "Content/script/app/OmsApp/Directive/orderOperatDriective.js",
                "Content/script/app/OmsApp/Directive/medKitsDirective.js",
                "Content/script/app/OmsApp/Directive/materialsDriective.js"
            ],
            resolve: app.resolve
        })
        .state("app.home", {
            url: "/home",
            cache: false,
            templateUrl: "View/Home.html?data=" + Timestamp,
            controller: "HomeController"
        })
        .state("app.my", {
            url: "/my",
            cache: false,
            templateUrl: "View/User/Information.html?data=" + Timestamp,
            controller: "InformationController",
            loadJs: ["Content/script/app/User/JS_Information.js"],
            resolve: app.resolve
        })
        .state("app.sys", {
            url: "/sys",
            template: "<div ui-view></div>"
        })
        .state("app.sys.info", {
            url: "/info",
            cache: false,
            templateUrl: "View/System/CurrentUserInfo.html?data=" + Timestamp
        })
        .state("login", {
            url: "/login",
            cache: false,
            templateUrl: "View/System/SignIn.html",
            controller: "SignInController",
            loadJs: ["Content/script/app/ProgramApp/System/JS_SignIn.js"],
            resolve: app.resolve
        });
    $urlRouterProvider.otherwise("/login");
});

//app.resolve = {
//    deps: ["$ocLazyLoad", function (a) {

//        return a.load(this.self.loadJs)
//    }]
//}

app.resolve = {
    /// <summary>resolve事件处理</summary>
    deps: function ($q) {
        /// <summary>deps事件处理</summary>
        var delay = $q.defer();
        var jsList = this.self.loadJs;
        for (var i = 0; i < jsList.length; i++) {
            $.getScript(jsList[i], function () {
                delay.resolve();
            });
        }
        return delay.promise;
    }
}
app.controller("HomeController", function ($scope, $state, $MenuService, $local, $MessagService, $Api, $window) {
    /// <summary>首页控制器</summary>
    var classList = ["one", "three", "four", "five", "six"];
    $scope.homeClass = classList[0];
    var index = 0;
    setInterval(function () {
        index++;
        if (index > classList.length - 1) {
            index = 0
        }
        $scope.$apply(function () {
            $scope.homeClass = classList[index];
        });
    }, 3000);
});
app.controller("masterController", function ($scope, $state, $MenuService, $local, $MessagService, $Api, $window) {
    /// <summary>模板信息控制器</summary>
    $scope.fold = false;
    $scope.view = { header: "View/MasterPages/header.html?data=" + Timestamp, footer: "View/MasterPages/footer.html?data=" + Timestamp, menu: "View/MasterPages/menu.html?data=" + Timestamp }
    $scope.User = $local.getValue("USER");
    console.log($scope.User);
    $scope.AdjustmentFold = function () {
        /// <summary>调整折叠</summary>
        $scope.fold = !$scope.fold;
    }
    $scope.includes = function (data) {
        return $state.includes(data);//获取菜单路径
    }
    $scope.menuList = $MenuService;//菜单信息列表
    $scope.goView = function (name, param) {
        /// <summary>前往页面</summary>
        $MessagService.loading("页面信息获取中，请稍等...");
        $state.go(name, param);
    }

    $scope.goLastPage = function () {
        /// <summary>返回上一页</summary>
        $window.history.back();
    }

    $scope.SignOut = function () {
        /// <summary>登出</summary>
        var LoginOut = function () { $local.setValue("USER", null); $scope.goView("login"); }; try { $Api.AccountService.LoginOut({}, LoginOut); } catch (e) { LoginOut(); }
    }

    $scope.Comp = function (code) {
        /// <summary>菜单权限控制</summary>
        //判断菜单是否有权限
        if (ServerConfiguration.IsDevelop) { return true; } else { return JSON.stringify($scope.User.functionInfo).indexOf(code) > -1; }
    }
});
app.controller("employeeController", function ($scope, $state, $MenuService, $local, $MessagService, $Api) {
    /// <summary>个人信息控制器</summary>
    $scope.msgBox = {};


    $scope.modifyPwd = {
        pwsInfo: {},
        show: function () {
            /// <summary>显示修改密码的信息</summary>
            $scope.modifyPwd.pwsInfo = { oldPassword: "", newPassword: "", verifyPassword: "" };  $scope.modifyPwd.dialog.show()
        },
        verify: function () {
            /// <summary>验证密码的有效性</summary>
            var result = true; if (!$scope.modifyPwd.pwsInfo.oldPassword || !$scope.modifyPwd.pwsInfo.newPassword || !$scope.modifyPwd.pwsInfo.verifyPassword) { result = false; } else if (($scope.modifyPwd.pwsInfo.oldPassword == $scope.modifyPwd.pwsInfo.newPassword) || ($scope.modifyPwd.pwsInfo.verifyPassword != $scope.modifyPwd.pwsInfo.newPassword)) { result = false; } return result;
        },
        dialog: {
                title: $scope.User.userInfo.userName + "修改密码", width: 500,
                buttons: {
                "保存": function () {
                    /// <summary>保存修改的密码</summary>
                    $MessagService.loading("服务器请求中，请稍等..."); if ($scope.modifyPwd.verify()) { $Api.AccountService.ModifyPassword($scope.modifyPwd.pwsInfo, function (rData) { $MessagService.caveat("密码修改成功！"); $scope.modifyPwd.dialog.hide(); }); } else { $MessagService.eorr("验证无效，请重新输入！"); }
                }, "取消": function () { $scope.modifyPwd.dialog.hide(); }
            }
        }
    }
});