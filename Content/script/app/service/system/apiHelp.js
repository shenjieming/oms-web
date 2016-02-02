app.factory("$ApiHelp", function ($http, $rootScope, $local,$MessagService) {
    var factory = {
        PostApi: function (url, data, success, error) {
            /// <summary>POST的形式请求接口</summary>
            var reQ = "?token=";
            var user = $local.getValue("USER");
            if (user) {
                reQ += user.token;
            }
            var param =  JSON.stringify(data);
            $.ajax({
                type: 'POST',
                url: $rootScope.BASE_URL + url + reQ,
                data: param,
                dataType: 'json',
                crossDomain: false,
                async:false,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function (responseData, textStatus, jqXHR) {
                    /// <summary>请求完毕</summary>
                    if (success) {
                        console.log(responseData);
                        success(responseData, textStatus, jqXHR);
                    }
                },
                error: function (responseData, textStatus, errorThrown) {
                    /// <summary>请求失败</summary>
                    $MessagService.eorr("网络连接不上，请联系网络管理员！")
                    if (!responseData.code) {
                        if (error) {
                            error(responseData, textStatus, errorThrown);
                        }
                    }
                }
            });

        },
        GetApi: function (url, data, success, error) {
            /// <summary>Get的形式请求接口</summary>
            var reQ = "?token=";
            var user = $local.getValue("USER");
            if (user) {
                reQ += user.token;
            }
            $.ajax({
                type: "GET",
                crossDomain: false,
                url: $rootScope.BASE_URL + url + reQ,
                dataType: 'json',
                async:false,
                data: JSON.stringify(data),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function (data, header, config, status) {
                    /// <summary>请求完毕</summary>
                    if (success) {
                        console.log(data);
                        success(data, header, config, status);
                    }
                }, error: function (data, header, config, status) {
                    /// <summary>请求失败</summary>
                    if (error) {
                        error(data, header, config, status);

                    }
                }
            });
        },
        FromApi: function (url, data, success, error) {
            /// <summary>附件上传</summary>
            var user = $local.getValue("USER");
            data.token = user.token;
            $.ajax({
                type: "POST",
                url: $rootScope.BASE_URL + url,
                dataType: 'json',
                data: data,
                crossDomain: true,
                success: function (RequtData, header, config, status) {
                    /// <summary>请求完毕</summary>
                    if (success) {
                        console.log(data);
                        success(RequtData, header, config, status);
                    }
                }, error: function (data, header, config, status) {
                    /// <summary>请求失败</summary>
                    if (error) {
                        error(data, header, config, status);

                    }
                }
            });
        }
    }
    return factory;
})