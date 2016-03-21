/// <reference path="../../../View/Business/Suite/SuiteEduit.html" />
/// <reference path="User/JS_Information.js" />
/// <reference path="../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../lib/Jquery/jquery-1.11.1.min.js" />

var AjaxService = angular.module('AjaxService', []);

AjaxService.factory("$AjaxHelp", function ($http, $rootScope, $local, $MessagService, $state) {
    var apiHelp = function (apipath, user) {
        var privateObjects = {
            /// <summary>私有对象</summary>
            //用户信息
            User: user,
            //访问地址信息
            ApiPath: apipath,
            //请求头信息
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            GetQueryUrl: function (url) {
                /// <summary>获取请求的URL</summary>
                var reQ = "?token="; if (privateObjects.User) { reQ += privateObjects.User.token; } return privateObjects.ApiPath + url + reQ;
            },
            Exception: function (data, callback) {
                /// <summary>请求异常处理</summary>
                switch (data.code) { case 1001: case "1001": $MessagService.eorr("网络异常,错误编码：" + data + "！"); break; case 2001: case "2001": $MessagService.eorr("您没有访问的权限！"); break; case 3001: case "3001": $MessagService.eorr("请确认您的必输项是否完整！"); break; case 4001: case "4001": $MessagService.eorr("用户信息失效，请重新登录！"); $state.go("login"); break; case 1: case "1": $MessagService.eorr(data.msg + "！"); break; case 0: case "0": callback(data.info); $MessagService.hide(1000); break; default: $MessagService.eorr("网络异常,错误编码：" + data.code + data.info + "，请联系管理员！"); }
            },
            Eorr: function (data, callback) {
                /// <summary>报错处理</summary>
                switch (data.status) { case 404: $MessagService.eorr(data.status + "错误：找不到请求的服务器，请联系网络管理员！"); break; case 400: $MessagService.eorr(data.status + "错误：无效的请求，请联系网络管理员！"); break; case 0: $MessagService.eorr(data.status + "错误：无权限的请求，请联系网络管理员！"); break; default: $MessagService.eorr(data.status + "错误：未捕获的异常，请联系网络管理员！"); break; } if (callback) { callback(data); }
            }
        }

        this.PostApi = function (url, data, success, error) {
            /// <summary>POST的形式请求接口</summary>
            var param = JSON.stringify(data);
            $.ajax({
                type: 'POST', url: privateObjects.GetQueryUrl(url), data: param, dataType: 'json', crossDomain: false, async: false, headers: privateObjects.headers, success: function (responseData, textStatus, jqXHR) {
                    /// <summary>请求完毕</summary>
                    privateObjects.Exception(responseData, success);
                },
                error: function (responseData, textStatus, errorThrown) {
                    /// <summary>请求失败</summary>
                    privateObjects.Eorr(responseData, error);
                }
            });
        }

        this.GetApi = function (url, data, success, error) {
            /// <summary>Get的形式请求接口</summary>
            $.ajax({
                type: "GET", crossDomain: false, url: privateObjects.GetQueryUrl(url), dataType: 'json', async: false, data: JSON.stringify(data), headers: privateObjects.headers, success: function (responseData, textStatus, jqXHR) {
                    /// <summary>请求完毕</summary>
                    privateObjects.Exception(responseData, success);
                }, error: function (responseData, textStatus, errorThrown) {
                    /// <summary>请求失败</summary>
                    privateObjects.Eorr(responseData, error);
                }
            });
        }

        this.FromApi = function (url, data, success, error) {
            /// <summary>附件上传</summary>
            var user = $local.getValue("USER");
            data.token = user.token;
            $.ajax({
                type: "POST", url: privateObjects.GetQueryUrl(url), dataType: 'json', data: data, crossDomain: true, success: function (responseData, textStatus, jqXHR) {
                    /// <summary>请求完毕</summary>
                    privateObjects.Exception(responseData, success);
                }, error: function (responseData, textStatus, errorThrown) {
                    /// <summary>请求失败</summary>
                    privateObjects.Eorr(responseData, error);
                }
            });
        }
    }
    return apiHelp;
});