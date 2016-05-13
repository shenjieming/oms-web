
app.directive("ngSelectBase", function ($Api, $MessagService) {
    /// <summary>基础数据选择器</summary>
    return {
        restrict: "A",
        templateUrl: "Content/script/app/BaseApp/Directive/ui/ngSelectBase.html?data=" + Timestamp,
        scope: { ngModel: '=' ,ngSelectBase:"=",ngParam:"="},
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.BaseList = new Array();
            $scope.Service = {
                /// <summary>基础数据请求服务</summary>
                BaseQuseyService: function () { },
                GetQueryServer: function (callback) {
                    /// <summary>获取请求服务</summary>
                    if (!$scope.ngParam) { $scope.ngParam = {}; }
                    switch ($scope.ngSelectBase) {
                        //医院下拉列表
                        case "hosptail": this.BaseQuseyService = $Api.HospitalService.GetHospital; break;
                            //科室下拉列表
                        case "sections": this.BaseQuseyService = $Api.HospitalService.GetSections; break;
                            //医院下拉列表
                        case "doctors": this.BaseQuseyService = $Api.HospitalService.GetDoctors; break;
                        default: this.BaseQuseyService = $Api.HospitalService.GetHospital; break;
                    }8
                    callback();
                }
            };

            //获取请求的基础数据访问服务，请求数据源
            $scope.Service.GetQueryServer(function () { $scope.Service.BaseQuseyService($scope.ngParam, function (data) { $scope.BaseList = data; $scope.ngModel = data[0].id }); });
        }
    };
});
