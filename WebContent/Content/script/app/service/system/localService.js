﻿/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../Config.js" />
/// <summary>本地资源服务</summary>
app.service("$local", function ($MessagService) {
    /// <summary>本地服务</summary>
    this.setValue = function (key,value) {
        /// <summary>这是本地信息</summary>
        localStorage.setItem(key, JSON.stringify(value));
    }
    this.getValue = function (key) {
        /// <summary>获取本地资源保存值</summary>
        return $.parseJSON(localStorage.getItem(key));
    }

    this.getSelectedRow = function (tableData) {
        /// <summary>获取选择的行</summary>
        var result = false;
        $.each(tableData, function (index, item) { if (item.isSelected) { result = item } });
        return result;
    }

    this.CarriedSelectedRow = function (tableData,callback,notdataback) {
        /// <summary>获取表格明细，执行返回代码</summary>
        var data = this.getSelectedRow(tableData);
        if (data) {
            callback(data);
        } else {
            $MessagService.caveat("请选择一条数据...");
            if (notdataback) {
                notdataback();
            }
        }
    }
});