/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../Config.js" />
/// <summary>外部接口调用服务</summary>
var OMSApiService = angular.module('OMSApiService', []);

OMSApiService
    .service("$Api", function ($AccountService, $UserService, $RoleService, $MenuApiService,
        $BindService, $GruopService, $BasisService, $SurgeryService, $StockService, $MaterialsService, $MedKitService,
        $OrganizationService, $RepresentativeService, $HospitalService, $BrandService, $BusinessData, $ManageDl, $ManaDocter,
        $ManaDepartment, $ProductLine, $MyAddress, $MyDoctor, $OrderRout, $AgentProduct, $ManaEvent, $ManageOi, $ManaHospital,
        $ManaWareHouse, $ManageOIDLRel, $PublicService,$WhZoneService) {
        return {
            AccountService: $AccountService,
            UserService: $UserService,
            RoleService: $RoleService,
            MenuService: $MenuApiService,
            BindService: $BindService,
            GruopService: $GruopService,
            BasisService: $BasisService,
            SurgeryService: $SurgeryService,
            StockService: $StockService,
            MaterialsService: $MaterialsService,
            MedKitService: $MedKitService,
            OrganizationService: $OrganizationService,
            RepresentativeService: $RepresentativeService,
            HospitalService: $HospitalService,
            BrandService: $BrandService,
            BusinessData: $BusinessData,
            ManageDl: $ManageDl,
            ManaDocter: $ManaDocter,
            ManaDepartment: $ManaDepartment,
            ProductLine: $ProductLine,
            MyAddress: $MyAddress,
            MyDoctor: $MyDoctor,
            OrderRout: $OrderRout,
            AgentProduct: $AgentProduct,
            ManaEvent: $ManaEvent,
            ManageOi: $ManageOi,
            ManaHospital: $ManaHospital,
            ManaWareHouse: $ManaWareHouse,
            ManageOIDLRel: $ManageOIDLRel,
            WhZone:$WhZoneService,
            Public: $PublicService
        }
    });
