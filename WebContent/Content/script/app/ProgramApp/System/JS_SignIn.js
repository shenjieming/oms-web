

/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
app.controller("SignInController", function ($scope, $state, $local, $Api, $MessagService) {
    $scope.SignData = {};
    $scope.Landed = function () {
        /// <summary>登陆系统</summary>
        if ($scope.verification()) {
            $MessagService.loading("登陆中，请稍等...");
            $Api.AccountService.Login($scope.SignData, function (rObj) {
                $MessagService.succ("登陆成功，进入系统中...");
                $local.setValue("USER", rObj);
                console.log($local.getValue("USER"));
                setTimeout(function () {
                    $scope.$apply(function () {
                        $state.go('app.home');
                    });
                }, 500)
            }, function () { });
        }
        $.extend($scope.SignData, { password: "" });//输入完毕，密码清空
    }

    $scope.keyUp = function (e) {
        /// <summary>键盘事件</summary>
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.Landed();
        }
    }
    $scope.verification = function () {
        /// <summary>验证</summary>
        var result = true;
        if (!$scope.SignData.loginName) {
            $MessagService.caveat("用户名不能为空，请输入用户名！");
            result = false;
        } else if (!$scope.SignData.password) {
            $MessagService.caveat("密码不能为空，请输入密码！");
            result = false;
        }
        return result;
    }

});