/// <reference path="../Jquery/jquery-1.4.4.min.js" />
/// <reference path="../angular-1.2.20/angular.js" />
/// <reference path="script/jquery.ztree.all-3.5.min.js" />
/// <reference path="script/jn_Src.min.js" />
var pathConfig = "Content/script/lib/jnDo_1.0/";
angular.module('jnDo', [])
    .directive("ngBox", function ($MessagService) {
        /// <summary>提示框控件</summary>
        return {
            restrict: "EA",
            template: "<div class=\"j_msgbox_wrap\" >" +
                        "<span class=\"j_msgbox\">" +
                        "<span class=\"ico_clear\"></span>" +
                        "<span class=\"{{ngModel.ico}}\" name='class'></span><span name='msg'>{{ngModel.msg}}</span><span class=\"ico_end\"></span>" +
                        "</span>" +
                        "</div>",
            scope: {
                ngModel: '=',
            },
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.ngModel = $MessagService.model;
                $MessagService.hide = function (time) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $(element).hide()
                        });
                    }, time);
                };

                $MessagService.show = function (model, isshow) {
                    /// <summary>显示提示信息窗口</summary>
                    $scope.ngModel = model ? model : $scope.ngModel;
                    $(element).find("[name='msg']").text($scope.ngModel.msg);
                    $(element).find("[name='class']").attr("class", $scope.ngModel.ico);
                    $(element).show();
                    if (!isshow) {
                        $MessagService.hide(1500);
                    }
                }
                $MessagService.caveat = function (msg) {
                    /// <summary>警告信息</summary>
                    $scope.ngModel.msg = msg ? msg : $scope.ngModel.msg;
                    $scope.ngModel.ico = $MessagService.ico.hits;
                    $MessagService.show($scope.ngModel);
                }
                $MessagService.eorr = function (msg) {
                    /// <summary>报错信息窗口</summary>
                    $scope.ngModel.msg = msg ? msg : $scope.ngModel.msg;
                    $scope.ngModel.ico = $MessagService.ico.fail;
                    $MessagService.show($scope.ngModel);
                }
                $MessagService.succ = function (msg) {
                    /// <summary>成功信息窗口</summary>
                    $scope.ngModel.msg = msg ? msg : $scope.ngModel.msg;
                    $scope.ngModel.ico = $MessagService.ico.succ;
                    $MessagService.show($scope.ngModel);
                }
                $MessagService.loading = function (msg) {
                    /// <summary>显示等待窗口</summary>
                    $scope.ngModel.msg = msg ? msg : $scope.ngModel.msg;
                    $scope.ngModel.ico = $MessagService.ico.loading;
                    $MessagService.show($scope.ngModel, true);
                }

            }
        };
    })
    .directive("ngDialog", function () {
        /// <summary>弹出层控件</summary>
        return {
            restrict: "E",
            scope: {
                ngModel: '=',
            },
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.ngModel = $.extend($scope.ngModel, { modal: true, autoOpen: false });
                $scope.$watch("ngModel", function () {
                    /// <summary>监控模型对象</summary>
                    $(element).dialog($scope.ngModel);
                })
                $scope.ngModel.show = function () {
                    /// <summary>显示弹出层</summary>
                    $(element).dialog("open");
                }
                $scope.ngModel.hide = function () {
                    /// <summary>隐藏弹出层</summary>
                    $(element).dialog("close");
                }
            }
        };
    })
    .directive("ngFile", function ($MessagService) {
        /// <summary>文件上传控件</summary>
        return {
            restrict: "EA",
            template: " <input type=\"file\" class='j_file' />",
            scope: {
                ngModel: '=',
            },
            replace: true,
            link: function ($scope, element, attrs) {
                $(element).change(function () {
                    /// <summary>上传附件后处理</summary>
                    var upFiles = this.files;
                    if ($scope.ngModel && $scope.ngModel.Upload) {
                        $scope.ngModel.Upload(upFiles);
                    } else {
                        $MessagService.caveat("未找到文件的数据分析函数！");
                    }
                });
            }
        };
    })
    .directive("ngImg", function () {
        /// <summary>图片展示控件</summary>
        return {
            restrict: "EA",
            templateUrl: pathConfig + "ui/ngImg.html?data=" + Timestamp,
            scope: {
                ngModel: '=',
                ngComp: "="//权限
            },
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.Service = {
                    Comp: { delImg: false },
                    Del: function (index) {
                        /// <summary>删除图片</summary>
                        $scope.ngModel.splice(index, 1);
                    }
                }

                $.extend($scope.Service.Comp, $scope.ngComp);//权限配置
                initPhotoSwipeFromDOM(element);
            }
        };
    })
    .directive("ngImgList", function () {
        /// <summary>图片展示控件</summary>
        return {
            restrict: "EA",
            templateUrl: pathConfig + "ui/ngImgList.html?data=" + Timestamp,
            scope: {
                ngModel: '=',
                ngComp: "="//权限
            },
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.Service = {
                    Comp: { delImg: false },
                    Del: function (index) {
                        /// <summary>删除图片</summary>
                        $scope.ngModel.splice(index, 1);
                    }
                }

                $.extend($scope.Service.Comp, $scope.ngComp);//权限配置

                initPhotoSwipeFromDOM(element);
            }
        };
    })
    .directive("ngDatatime", function () {
        /// <summary>时间控件</summary>
        return {
            restrict: "EA",
            scope: {
                ngModel: '=',
                ngDatatime: "=",
            },
            replace: true,
            link: function ($scope, element, attrs) {
                var options = $.extend({
                    format: "Y-m-d H:00:00",
                    onClose: function () {
                        $scope.ngModel = $(element).val();
                        setTimeout(function () {
                            $scope.$apply(function () { $scope.ngModel = $(element).val(); });
                        });
                    }
                }, $scope.ngDatatime);
                $(element).datetimepicker(options);

            }
        };
    })
    .directive("ngShowData", function () {
        /// <summary>显示日期控件</summary>
        return {
            restrict: 'EA',
            template: " <label class=\"input-group\" style=\"display: inline-table;width:180px;\">" +
                                        "<input type=\"text\" class=\"form-control\" placeholder=\"请选择时间\" style=\"padding:8px;\" ng-datatime=\"\" ng-model=\"ngModel\">" +
                                        "<span class=\"input-group-addon\"><i class=\"fa fa-calendar\"></i></span>" +
                                    "</div>",
            scope: { ngShowData: '=', ngModel: '=' }, //模型对象
            replace: true,
            link: function ($scope, element, attrs) {
                /// <summary>初始化事件</summary>

            }
        }
    })
    .directive("ngTree", function () {
        /// <summary>多选控件</summary>
        return {
            restrict: "EA",
            template: "<div class='ztree'></div>",
            scope: {
                ngModel: '=',
                ngSetting: '=',
                ngData: "="
            },
            replace: true,
            link: function ($scope, element, attrs) {
                var $treeObj = $.fn.zTree.init($(element), $scope.ngSetting, $scope.ngData);
                $scope.ngModel = $treeObj;
                $scope.$watch("ngData", function () {
                    $treeObj = $.fn.zTree.init($(element), $scope.ngSetting, $scope.ngData);
                    $scope.ngModel = $treeObj;
                })
            }
        };
    })
    .directive("ngNeardata", function ($AppHelp) {
        /// <summary>近期控件</summary>
        return {
            restrict: 'EA',
            template: "<span class=\"input-group\" style=\"line-height:35px;\">" +
                    "<a href=\"javascript:void()\" ng-click=\"Service.GetClickData(false)\">全部</a>  &nbsp;" +
                    "<a href=\"javascript:void()\" ng-click=\"Service.GetClickData(7)\">近一周</a>  &nbsp;" +
                    "<a href=\"javascript:void()\" ng-click=\"Service.GetClickData(30)\">近一个月</a> &nbsp;" +
                    "<a href=\"javascript:void()\" ng-click=\"Service.GetClickData(365)\">近一年</a> &nbsp;" +
                "</span>",
            scope: { ngNeardata: '=' }, //模型对象
            replace: true,
            link: function ($scope, element, attrs) {
                /// <summary>初始化事件</summary>

                $scope.Service = {
                    GetClickData: function (start) {
                        /// <summary>获取点击的天数</summary>
                        var data = { StartDay: "", EndDay: "" };
                        //全部的话不需要传递时间参数
                        if (start) { data = { StartDay: $AppHelp.Data.GetDate(start, 0, "start"), EndDay: $AppHelp.Data.GetDate(0, 0, "end"), } }
                        if ($scope.ngNeardata) { $scope.ngNeardata(data) }
                    }
                }
            }
        }
    })
    .directive("ngPagein", function () {
        /// <summary>分页控件插件</summary>
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: { ngModel: '=' }, //模型对象
            replace: true,
            link: function ($scope, element, attrs) {
                /// <summary>初始化事件</summary>


                var init = function (pageInfo) {
                    $(element).smartpaginator({
                        totalrecords: pageInfo.totalrecords,   //pageCount
                        recordsperpage: pageInfo.recordsperpage,  //pageSize
                        theme: pageInfo.theme,
                        initval: pageInfo.index,         //显示页面
                        onchange: function (newpage, startindex, endindex) {
                            /// <summary>分页事件</summary>
                            $scope.ngModel.pageIndex = newpage;
                            loadData(newpage, startindex + 1, endindex);
                            if ($scope.ngModel.callbake && $scope.ngModel.total) {
                                /// <summary>分页调整完毕，返回相应事件</summary>
                                $scope.ngModel.callbake(newpage, startindex ? startindex : 1, endindex ? endindex : $scope.ngModel.pageSize);
                            }
                        }

                    });

                    if ($scope.ngModel) {
                        $scope.ngModel.ReLoad = function () {
                            loadData(1);
                            $scope.ngModel.callbake();
                        }
                    }
                }
                var loadData = function (index, startindex, endindex) {
                    /// <summary>数据读取</summary>
                    init({
                        totalrecords: $scope.ngModel.total,
                        recordsperpage: $scope.ngModel.pageSize,
                        index: index
                    });
                }



                $scope.$watch("ngModel.pageSize", function (newValue, oldValue, $scope) {
                    /// <summary>监控pagesize的变化</summary>
                    loadData(1);
                });
                $scope.$watch("ngModel.total", function (newValue, oldValue, $scope) {
                    /// <summary>监控pagecount的变化</summary>
                    loadData($scope.ngModel.pageIndex);
                });
            }
        }
    })
    .directive("ngSlide", function () {
        /// <summary>动态显示隐藏</summary>
        return {
            restrict: 'EA',
            scope: { ngSlide: '=' }, //模型对象
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.$watch("ngSlide", function () {
                    if ($scope.ngSlide) {
                        $(element).slideDown()
                    }
                    else {
                        $(element).slideUp()
                    }
                });


            }
        }
    })
    .service("$MessagService", function () {
        this.model = { ico: "ico_clear", msg: "数据加载中..." };
        this.ico = {
            /// <summary>图标信息</summary>
            loading: "ico_loading", succ: "ico_succ", fail: "ico_fail", hits: "ico_hits"
        }
    })
    .service("$FileService", function () {
        /// <summary>文件信息服务</summary>
        var service = {
            ReaderFiles: function (data, callback) {
                /// <summary>读取分析文件</summary>
                var reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = function (e) {
                    var result = { file: this.result, name: data.name, size: data.size, type: data.type }
                    callback(result);
                }
            }
        }
        return service;
    })
    .service("$AppHelp", function ($MessagService) {
        /// <summary>应用程序帮助</summary>
        var AppHelpService = {
            ///<summary>应用程序帮助工具类</summary>
            Tool: {
                ToBack: function (url) {
                    ///<summary>返回上一页</summary>  
                    if (url) { window.location.href = url; } else { window.location.href = document.referrer; }
                },
                GetQueryString: function (name) {
                    ///<summary>获取URL里面的数据</summary>
                    ///<param name="name" type="string">URL数据里面的参数名</param>
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); var r = decodeURI(window.location.search.substr(1)).match(reg); if (r != null) { return unescape(r[2]); } return null;
                },
                StrToJson: function (str) {
                    ///<summary>将字符串对象转换成json对象</summary>
                    ///<param name="str" type="string">转换的字符串</param>
                    try { return eval("(" + str + ")"); } catch (e) { return null; }
                },
                ContrastList: function (obj, toObj) {
                    ///<summary>判断数据是否相同</summary>
                    if (obj && obj.length > 0) { var flg = false; for (var i = 0; i < obj.length; i++) { if (obj[i] == toObj) { flg = true; break; } } return flg; } else { return true; }
                }
            },
            Data: {
                ///<summary>时间处理</summary>
                DataToStr: function (data, type) {
                    ///<summary>将时间转换成字符串格式</summary>
                    ///<param name="data" type="data">转换成字符串形式的日期</param>
                    var myYear = data.getFullYear(); var myMonth = data.getMonth(); var myDay = data.getDate(); var myHours = data.getHours();
                    var myMinute = data.getMinutes(); var mySecond = data.getSeconds();
                    //如果月份大于12 ，年加1，月份减12
                    if (myMonth > 12) { myYear++; myMonth = myMonth - 12; }
                    //如果天数大于28并且是2月份的话 如果天大于30的话，4,6,9,11月返回三十,其他时间返回31
                    if (myDay > 28 && myMonth == 1) {
                        //闰年 天数为29 平年天数为28 
                        if (((myYear % 4 == 0) && (myYear % 100 != 0)) || (myYear % 400 == 0)) { myDay = 29; } else { myDay = 28; }
                    }
                    else if (myDay > 30) { switch (myMonth) { case 4: case 6: case 9: case 11: myDay = 30; break; default: myDay = 31; break; } }
                    switch (type) {
                        //返回年和月的形式
                        case "1": return myYear + "-" + (myMonth + 1); break;
                            //返回全时间格式，精确到秒
                        case "2": return myYear + "-" + (myMonth + 1) + "-" + myDay + " " + myHours + ":" + myMinute + ":" + mySecond; break;
                            //返回全时间格式，精确到小时
                        case "3": return myYear + "-" + (myMonth + 1) + "-" + myDay + " " + myHours + ":00:00"; break;
                            //开始时间
                        case "start": return myYear + "-" + (myMonth + 1) + "-" + myDay + " 00:00:00"; break;
                            //结束时间
                        case "end": return myYear + "-" + (myMonth + 1) + "-" + myDay + " 23:59:59"; break;
                        case "unique": return myYear + "" + (myMonth + 1) + "" + myDay + "" + myHours + "" + myMinute + "" + mySecond; break;
                            //默认情况
                        default: return myYear + "-" + (myMonth + 1) + "-" + myDay; break;
                    }
                },
                GetDate: function (day, newData, type, Minutes) {
                    ///<summary>获取日期</summary>
                    ///<param name="day" type="int" >差异天数，整数为往前推，负数为往后推</param>
                    ///<param name="newData" type="data">要算的差异天数,空则为当前时间</param>
                    ///<param name="type" type="string">返回的时间string类型</param>
                    ///<param name="Minutes" type="int">差异分钟数，整数为往前推，负数为往后推,空则没有差异时间</param>
                    var myDate = new Date();
                    //如果算差异天使不为空的话，日期对象用差异天数的对象的数值
                    if (newData) { myDate = new Date(Date.parse(newData.replace(/-/g, '/'))); }
                    //如果差异天数是0，并且没有差异分钟数的话
                    if (day == 0 && !Minutes) { return AppHelpService.Data.DataToStr(myDate, type); }
                    else {
                        //算差异时间标准时
                        var Difference = day * 1000 * 60 * 60 * 24;
                        //如果差异分钟数存在
                        if (Minutes) { Difference = Difference + (Minutes * 1000 * 60); } var data1 = Date.parse(myDate.getFullYear() + "/" + (parseInt(myDate.getMonth()) + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()); var dat = new Date(data1 - Difference); return AppHelpService.Data.DataToStr(dat, type);
                    }
                },
                GetDifferenceData: function (data1, data2) {
                    ///<summary>获取时间之间的差异</summary>
                    ///<param name="data1" type="Datastring">参照时间</param>
                    ///<param name="data2" type="Datastring">对比时间</param>
                    if (data2) { var ReferenceTime = Date.parse(data1.replace(/-/g, '/')); var temp = data2 ? data2 : (new Date()).getDate(); var ContrastTime = Date.parse(data2.replace(/-/g, '/')); var newData = ReferenceTime - ContrastTime; return (newData / 60 / 1000); } else { return 0; }
                }
            }
        }

        return AppHelpService;
    })