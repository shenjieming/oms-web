/// <reference path="../ServerConfiguration.js" />


var PrintApp = angular.module('PrintApp', ["AjaxService", "LocalService", "jnDo"]);
var path = {
    //计费单明细
    billdetail: "/v1/feeNote/common/detail"
}


PrintApp.service("$PrintHelp", function ($printAjax) {
    /// <summary>打印帮助</summary>

    this.GetBillDetail = function (data, callback) {
        /// <summary>获取计费单明细</summary>
        $printAjax.PostApi(path.billdetail, data, callback);
    }
});



PrintApp.factory("$printAjax", function ($local) {
    /// <summary>OMS特殊事件服务</summary>

    var privateObjects = {
        /// <summary>私有对象</summary>
        //用户信息
        //访问地址信息
        ApiPath: ServerConfiguration.BMSPath,
        //请求头信息
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        GetQueryUrl: function (url) {
            var userData = $local.getValue("USER");
            /// <summary>获取请求的URL</summary>
            var reQ = "?token="; if (userData) { reQ += userData.token; } return privateObjects.ApiPath + url + reQ;
        },
        Exception: function (data, callback) {
            /// <summary>请求异常处理</summary>
            console.log(data); callback(data.info);
        },
        Eorr: function (data, callback) {
            /// <summary>报错处理</summary>
            console.log(data);
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

    return this;

})
