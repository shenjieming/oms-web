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
            $MessagService.show = function (model,isshow) {
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
                $scope.ngModel = $.extend($scope.ngModel, { modal: true, autoOpen: false});
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
    .directive("ngFile", function () {
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
                    if ($scope.ngModel.Upload) {
                        $scope.ngModel.Upload(upFiles);
                    }
                });
            }
        };
    })
    .directive("ngImg", function () {
        /// <summary>图片展示控件</summary>
        return {
            restrict: "EA",
            templateUrl: pathConfig + "ui/ngImg.html",
            scope: {
                ngModel: '=',
            },
            replace: true,
            link: function ($scope, element, attrs) {
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
                ngComp:"="//权限
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
                ngDatatime:"=",
            },
            replace: true,
            link: function ($scope, element, attrs) {
                var options = $.extend({
                    format: "Y/m/d H:00:00",
                    onClose: function () {
                        setTimeout(function () {
                            $scope.$apply(function () { $scope.ngModel = $(element).val(); });
                        }, 500);
                    }
                }, $scope.ngDatatime);
                $(element).datetimepicker(options);

            }
        };
    })
    .directive("ngTree", function () {
        /// <summary>多选控件</summary>
        return {
            restrict: "EA",
            template: "<div class='ztree'></div>",
            scope: {
                ngModel: '=',
                ngSetting: '=',
                ngData:"="
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