function validarContenidoDeCeldas(grid) {
    /**
     * Se enviara todo el grid para poder realizar las
     * validaciones de cada celda.
     * 
     **/
    var collection = grid.get("collection");
    /**El primer foreach lo que hace es ponerle la bandera isValid=true**/
    collection.forEach(function (object) {
        //object.isValid = true;
        console.log(crearPercepcionList(object))
    })

}

function getTotalOtrosPagos(Object) {
    var total = 0.0;
}

function crearPercepcion(TipoPercepcion,Clave,Concepto,ImporteGravado,ImporteExento) {
    return {
        TipoPercepcion: TipoPercepcion,
        Clave: Clave,
        Concepto: Concepto,
        ImporteGravado: ImporteGravado,
        ImporteExento: ImporteExento
    }
}
function crearPercepcionList(object) {
    var PercepcionList = [];
    PercepcionList.push(crearPercepcion("001", "001", "Sueldo", object.Sueldo_Gravado,object.Sueldo_Exento));
    PercepcionList.push(crearPercepcion("002", "002", "Aguinaldo", object.Aguinaldo_Exento, object.Aguinaldo_Exento));
    PercepcionList.push(crearPercepcion("003", "003", "PTU", object.PTU_Exento, object.PTU_Exento));
    PercepcionList.push(crearPercepcion("004", "004", "Reembolso de Gastos Médicos Dentales y Hospitalarios", object.RGMDyH_Gravado_Exento, object.RGMDyH_Gravado_Exento));
    PercepcionList.push(crearPercepcion("005", "005", "Fondo de Ahorro", object.FDA_Exento, object.FDA_Exento));
    PercepcionList.push(crearPercepcion("006", "006", "Caja de ahorro", object.CDA_Gravado, CDA.Sueldo_Exento));
    PercepcionList.push(crearPercepcion("009", "009", "Contribuciones a Cargo del Trabajador Pagadas por el Patrón", object.CCTPP_Gravado, CDA.CCTPP_Exento));
    PercepcionList.push(crearPercepcion("010", "010", "Premios por puntualidad", object.PP_Exento, object.PP_Exento));
    PercepcionList.push(crearPercepcion("011", "011", "Prima de Seguro de vida", object.PSV_Exento, object.PSV_Exento));
    PercepcionList.push(crearPercepcion("012", "012", "Seguro de Gastos Médicos Mayores", object.SGMM_Exento, object.SGMM_Exento));
    PercepcionList.push(crearPercepcion("013", "013", "Cuotas Sindicales Pagadas por el Patrón", object.CSPPP_Exento, object.CSPPP_Exento));
    PercepcionList.push(crearPercepcion("014", "014", "Subsidios por incapacidad", object.SPI_Exento, object.SPI_Exento));
    PercepcionList.push(crearPercepcion("015", "015", "Becas para trabajadores y/o hijos", object.Becas_Exento, object.Becas_Exento));
    PercepcionList.push(crearPercepcion("019", "019", "Horas Extra", object.HE_Exento, object.HE_Exento));
    PercepcionList.push(crearPercepcion("020", "020", "Prima dominical", object.PrimaD_Exento, object.PrimaD_Exento));
    PercepcionList.push(crearPercepcion("021", "021", "Prima vacacional", object.PrimaV_Exento, object.PrimaV_Exento));
    PercepcionList.push(crearPercepcion("022", "022", "Prima por antigüedad", object.PrimaA_Exento, object.PrimaA_Exento));
    PercepcionList.push(crearPercepcion("023", "023", "Pagos por separación", object.PPS_Exento, object.PPS_Exento));
    PercepcionList.push(crearPercepcion("024", "024", "Seguro de retiro", object.SDR_Exento, object.SDR_Exento));
    PercepcionList.push(crearPercepcion("025", "025", "Indemnizaciones", object.Indeminizaciones_Exento, object.Indeminizaciones_Exento));
    PercepcionList.push(crearPercepcion("026", "026", "Reembolso por funeral", object.RPF_Exento, object.RPF_Exento));
    PercepcionList.push(crearPercepcion("027", "027", "Cuotas de seguridad social pagadas por el patrón", object.CDSSPPP_Exento, object.CDSSPPP_Exento));
    PercepcionList.push(crearPercepcion("028", "028", "Comisiones", object.Comisiones_Exento, object.Comisiones_Exento));
    PercepcionList.push(crearPercepcion("029", "029", "Vales de despensa", object.ValesD_Exento, object.ValesD_Exento));
    PercepcionList.push(crearPercepcion("030", "030", "Vales de restaurante", object.ValesR_Exento, object.ValesR_Exento));
    PercepcionList.push(crearPercepcion("031", "031", "Vales de gasolina", object.ValesG_Exento, object.ValesG_Exento));
    PercepcionList.push(crearPercepcion("032", "032", "Vales de ropa", object.ValesRopa_Exento, object.ValesRopa_Exento));
    PercepcionList.push(crearPercepcion("033", "033", "Ayuda para renta", object.AyudaRenta_Exento, object.AyudaRenta_Exento));
    PercepcionList.push(crearPercepcion("034", "034", "Ayuda para artículos escolares", object.AyudaEscolar_Exento, object.AyudaEscolar_Exento));
    PercepcionList.push(crearPercepcion("035", "035", "Ayuda para anteojos", object.AyudaAnteojos_Exento, object.AyudaAnteojos_Exento));
    PercepcionList.push(crearPercepcion("036", "036", "AyudaTransporte", object.AyudaTransporte_Exento, object.AyudaTransporte_Exento));
    PercepcionList.push(crearPercepcion("037", "037", "Ayuda para gastos de funeral", object.AyudaGF_Exento, object.AyudaGF_Exento));
    PercepcionList.push(crearPercepcion("038", "038", "Otros ingresos por salarios", object.OIPS__Exento, object.OIPS__Exento));
    PercepcionList.push(crearPercepcion("039", "039", "Jubilaciones, pensiones o haberes de retiro", object.JPHDR__Exento, object.JPHDR__Exento));
    PercepcionList.push(crearPercepcion("044", "044", "Jubilaciones, pensiones o haberes de retiro en parcialidades", object.AyudaRenta_Exento, object.AyudaRenta_Exento));



    var nomina = {
        PercecpcionList: PercepcionList
    }
    return nomina;

}
function crearDeduccionList(Object) {
}

function crearObjeto(object) {
    /**
     * Por cada trabajador registrado en nomina se tendra un 
     * objeto de tipo object con el cual construiremos el objeto
     * que se manda en el servicio de la emisión de nomina.
     * **/
    var Nomina = {
        Version: "1.2",
        TipoNomina: "O",
        FechaPago: object.FechaPago
    }
}