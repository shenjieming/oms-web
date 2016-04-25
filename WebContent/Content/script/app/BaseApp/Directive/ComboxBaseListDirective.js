
app.directive("ngSelectBase", function ($Api, $MessagService) {
    /// <summary>基础数据选择器</summary>
    return {
        restrict: "EA",
        templateUrl: "Content/script/app/BaseApp/Directive/ui/ngSelectBase.html?data=" + Timestamp,
        scope: { ngModel: '=' ,ngSelectBase:"=",ngParam:"="},
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.BaseList = new Array();

            var Service = {
                /// <summary>基础数据请求服务</summary>
                BaseQuseyService: function () {
                    /// <summary>基础数据请求服务</summary>
                },
                GetQueryServer: function (callback) {
                    /// <summary>获取请求服务</summary>
                    switch ($scope.ngSelectBase) {
                        //医院下拉列表
                        case "hosptail": this.BaseQuseyService = $Api.HospitalService.GetHospital; break;
                            //科室下拉列表
                        case "sections": this.BaseQuseyService = $Api.HospitalService.GetSections; break;
                            //医院下拉列表
                        case "doctors": this.BaseQuseyService = $Api.HospitalService.GetDoctors; break;
                        default: this.BaseQuseyService = $Api.HospitalService.GetHospital; break;
                    }
                }
            };

            //获取请求的基础数据访问服务，请求数据源
            Service.GetQueryServer(function () { Service.BaseQuseyService($scope.ngParam, function (data) { $scope.BaseList = data; }); });
        }
    };
});
