function validarContenidoDeCeldas(grid) {
    /**
     * Se enviara todo el grid para poder realizar las
     * validaciones de cada celda.
     * 
     **/
    var collection = grid.get("collection");
    /**El primer foreach lo que hace es ponerle la bandera isValid=true**/
    var store = grid.get("store");
    var filter = new collection.Filter();//Se crea un filtro nuevo
    var filtroValido = filter.eq('isValid.bandera', true);
    var filtroInvalido = filter.eq('isValid.bandera', false);
    var validos = collection.filter(filtroValido);
    var invalidos = collection.filter(filtroInvalido);
    grid.set('collection', invalidos);
    validos.forEach(function (object) {
        //object.isValid = true;
        //console.log(crearObjetoPeticion(object))
        console.log(object);
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
    if (object.Sueldo_Gravado != 0.0 | object.Sueldo_Exento!=0.0)
        PercepcionList.push(crearPercepcion("001", "001", "Sueldo", object.Sueldo_Gravado, object.Sueldo_Exento));
    if (object.Aguinaldo_Gravado != 0.0 | object.Aguinaldo_Exento!=0.0)
        PercepcionList.push(crearPercepcion("002", "002", "Aguinaldo", object.Aguinaldo_Gravado, object.Aguinaldo_Exento));
    if (object.PTU_Exento != 0.0 | object.PTU_Gravado!=0.0)
        PercepcionList.push(crearPercepcion("003", "003", "PTU", object.PTU_Gravado, object.PTU_Exento));
    if (object.RGMDyH_Gravado != 0.0 | object.RGMDyH_Exento!=0.0)
        PercepcionList.push(crearPercepcion("004", "004", "Reembolso de Gastos Médicos Dentales y Hospitalarios", object.RGMDyH_Gravado, object.RGMDyH_Exento));
    if (object.FDA_Exento != 0.0 | object.FDA_Gravado)
        PercepcionList.push(crearPercepcion("005", "005", "Fondo de Ahorro", object.FDA_Gravado, object.FDA_Exento));
    if (object.CDA_Gravado != 0.0 | object.CDA_Exento!=0.0)
        PercepcionList.push(crearPercepcion("006", "006", "Caja de ahorro", object.CDA_Gravado, object.CDA_Exento));
    if (object.CCTPP_Gravado != 0.0 | object.CCTPP_Exento!=0.0)
        PercepcionList.push(crearPercepcion("009", "009", "Contribuciones a Cargo del Trabajador Pagadas por el Patrón", object.CCTPP_Gravado, object.CCTPP_Exento));
    if (object.PP_Exento != 0.0 | object.PP_Gravado!=0.0)
        PercepcionList.push(crearPercepcion("010", "010", "Premios por puntualidad", object.PP_Gravado, object.PP_Exento));
    if (object.PSV_Exento != 0.0 | object.PSV_Gravado!=0.0)
        PercepcionList.push(crearPercepcion("011", "011", "Prima de Seguro de vida", object.PSV_Gravado, object.PSV_Exento));
    if (object.SGMM_Gravado != 0.0 | object.SGMM_Exento!=0.0)
        PercepcionList.push(crearPercepcion("012", "012", "Seguro de Gastos Médicos Mayores", object.SGMM_Gravado, object.SGMM_Exento));
    if (object.CSPPP_Gravado != 0.0 | object.CSPPP_Exento!=0.0)
        PercepcionList.push(crearPercepcion("013", "013", "Cuotas Sindicales Pagadas por el Patrón", object.CSPPP_Gravado, object.CSPPP_Exento));
    if (object.SPI_Gravado != 0.0 | object.SPI_Exento!=0.0)
        PercepcionList.push(crearPercepcion("014", "014", "Subsidios por incapacidad", object.SPI_Gravado, object.SPI_Exento));
    if (object.Becas_Gravado != 0.0 | object.Becas_Exento!=0.0)
        PercepcionList.push(crearPercepcion("015", "015", "Becas para trabajadores y/o hijos", object.Becas_Gravado, object.Becas_Exento));
    if (object.HE_Gravado != 0.0 | object.HE_Exento)
        PercepcionList.push(crearPercepcion("019", "019", "Horas Extra", object.HE_Gravado, object.HE_Exento));
    if (object.PrimaD_Gravado != 0.0 | object.PrimaD_Exento!=0.0)
        PercepcionList.push(crearPercepcion("020", "020", "Prima dominical", object.PrimaD_Gravado, object.PrimaD_Exento));
    if (object.PrimaV_Gravado != 0.0 | object.PrimaV_Exento!=0.0)
        PercepcionList.push(crearPercepcion("021", "021", "Prima vacacional", object.PrimaV_Gravado, object.PrimaV_Exento));
    if (object.PrimaA_Gravado != 0.0 | object.PrimaA_Exento!=0.0)
        PercepcionList.push(crearPercepcion("022", "022", "Prima por antigüedad", object.PrimaA_Gravado, object.PrimaA_Exento));
    if (object.PPS_Gravado != 0.0 | object.PPS_Exento!=0.0)
        PercepcionList.push(crearPercepcion("023", "023", "Pagos por separación", object.PPS_Gravado, object.PPS_Exento));
    if (object.SDR_Gravado != 0.0 | object.SDR_Exento!=0.0)
        PercepcionList.push(crearPercepcion("024", "024", "Seguro de retiro", object.SDR_Gravado, object.SDR_Exento));
    if (object.Indeminizaciones_Gravado != 0.0 | object.Indeminizaciones_Exento!=0.0)
        PercepcionList.push(crearPercepcion("025", "025", "Indemnizaciones", object.Indeminizaciones_Gravado, object.Indeminizaciones_Exento));
    if (object.RPF_Gravado != 0.0 | object.RPF_Exento!=0.0)
        PercepcionList.push(crearPercepcion("026", "026", "Reembolso por funeral", object.RPF_Gravado, object.RPF_Exento));
    if (object.CDSSPPP_Gravado != 0.0 | object.CDSSPPP_Exento!=0.0)
        PercepcionList.push(crearPercepcion("027", "027", "Cuotas de seguridad social pagadas por el patrón", object.CDSSPPP_Gravado, object.CDSSPPP_Exento));
    if (object.Comisiones_Gravado != 0.0 | object.Comisiones_Exento!=0.0)
        PercepcionList.push(crearPercepcion("028", "028", "Comisiones", object.Comisiones_Gravado, object.Comisiones_Exento));
    if (object.ValesD_Gravado != 0.0 | object.ValesD_Exzento!=0.0)
        PercepcionList.push(crearPercepcion("029", "029", "Vales de despensa", object.ValesD_Gravado, object.ValesD_Exento));
    if (object.ValesR_Gravado != 0.0 | object.ValesR_Exento!=0.0)
        PercepcionList.push(crearPercepcion("030", "030", "Vales de restaurante", object.ValesR_Gravado, object.ValesR_Exento));
    if (object.ValesG_Gravado != 0.0 | object.ValesG_Exento!=0.0)
        PercepcionList.push(crearPercepcion("031", "031", "Vales de gasolina", object.ValesG_Gravado, object.ValesG_Exento));
    if (object.ValesRopa_Gravado != 0.0 | object.ValesRopa_Exento!=0.0)
        PercepcionList.push(crearPercepcion("032", "032", "Vales de ropa", object.ValesRopa_Gravado, object.ValesRopa_Exento));
    if (object.AyudaRenta_Gravado != 0.0 | object.AyudaRenta_Exento!=0.0)
        PercepcionList.push(crearPercepcion("033", "033", "Ayuda para renta", object.AyudaRenta_Gravado, object.AyudaRenta_Exento));
    if (object.AyudaEscolar_Gravado != 0.0 | object.AyudaEscolar_Exento!=0.0)
        PercepcionList.push(crearPercepcion("034", "034", "Ayuda para artículos escolares", object.AyudaEscolar_Gravado, object.AyudaEscolar_Exento));
    if (object.AyudaAnteojos_Gravado != 0.0 | object.AyudaAnteojos_Exento!=0.0)
        PercepcionList.push(crearPercepcion("035", "035", "Ayuda para anteojos", object.AyudaAnteojos_Gravado, object.AyudaAnteojos_Exento));
    if (object.AyudaTransporte_Gravado != 0.0 | object.AyudaTransporte_Exento!=0.0)
        PercepcionList.push(crearPercepcion("036", "036", "AyudaTransporte", object.AyudaTransporte_Gravado, object.AyudaTransporte_Exento));
    if (object.AyudaGF_Gravado != 0.0 | object.AyudaGF_Exento!=0.0)
        PercepcionList.push(crearPercepcion("037", "037", "Ayuda para gastos de funeral", object.AyudaGF_Gravado, object.AyudaGF_Exento));
    if (object.OIPS__Gravado != 0.0 | object.OIPS__Exento!=0.0)
        PercepcionList.push(crearPercepcion("038", "038", "Otros ingresos por salarios", object.OIPS__Gravado, object.OIPS__Exento));
    if (object.JPHDR__Gravado != 0.0 | object.JPHDR__Exento!=0.0)
        PercepcionList.push(crearPercepcion("039", "039", "Jubilaciones, pensiones o haberes de retiro", object.JPHDR__Gravado, object.JPHDR__Exento));
    if (object.JPHDRParciales_Gravado != 0.0 | object.JPHDRParciales_Exento!=0.0)
        PercepcionList.push(crearPercepcion("044", "044", "Jubilaciones, pensiones o haberes de retiro en parcialidades", object.JPHDRParciales_Gravado, object.JPHDRParciales_Exento));
    if (object.IEAOTV_Gravado != 0.0 | object.IEAOTV_Exento!=0.0)
        PercepcionList.push(crearPercepcion("045", "045", "Ingresos en acciones o títulos valor que representan bienes", object.IEAOTV_Gravado, object.IEAOTV_Exento));
    if (object.IAAS_Gravado != 0.0 | object.IAAS_Exento!=0.0)
        PercepcionList.push(crearPercepcion("046", "046", "Ingresos asimilados a salarios", object.IAAS_Gravado, object.IAAS_Exento));
    if (object.Alimentacion_Gravado != 0.0 | object.Alimentacion_Exento!=0.0)
        PercepcionList.push(crearPercepcion("047", "047", "Alimentación", object.Alimentacion_Gravado, object.Alimentacion_Exento));
    if (object.Habitacion_Gravado != 0.0 | object.Habitacion_Exento!=0.0)
        PercepcionList.push(crearPercepcion("048", "048", "Habitación", object.Habitacion_Gravado, object.Habitacion_Exento));
    if (object.PAsistecia_Gravado != 0.0 | object.PAsistecia_Exento!=0.0)
        PercepcionList.push(crearPercepcion("049", "049", "Premios por asistencia", object.PAsistecia_Gravado, object.PAsistecia_Exento));

    var nomina = {
        PercecpcionList: PercepcionList
    }
    return nomina;

}

function crearDeduccion(TipoDeduccion, Clave, Concepto, Importe) {
    return {
        TipoPercepcion: TipoDeduccion,
        Clave: Clave,
        Concepto: Concepto,
        Importe: Importe
    }
} 

function crearDeduccionList(object) {
    DeduccionList = [];
    if (object.ImporteSeguridadSocial!=0.0)
        DeduccionList.push(crearDeduccion("001", "001", "Seguridad social", object.ImporteSeguridadSocial));
    if (object.ImporteISR != 0.0)
        DeduccionList.push(crearDeduccion("002", "002", "ISR", object.ImporteISR));
    if (object.ImporteARCEAV!=0.0)
        DeduccionList.push(crearDeduccion("003", "003", "Aportaciones a retiro, cesantía en edad avanzada y vejez.", object.ImporteARCEAV));
    if (object.ImporteOtros!=0.0)
        DeduccionList.push(crearDeduccion("004", "004", "Otros", object.ImporteOtros));
    if (object.ImporteDPI != 0.0)
        DeduccionList.push(crearDeduccion("006", "006", "Descuento por incapacidad", object.ImporteOtros));
    if (object.ImportePA != 0.0)
        DeduccionList.push(crearDeduccion("007", "007", "Pensión alimenticia", object.ImportePA));
    if (object.ImporteRenta != 0.0)
        DeduccionList.push(crearDeduccion("008", "008", "Renta", object.ImporteRenta));
    if (object.ImportePPFNDLVPLT != 0.0)
        DeduccionList.push(crearDeduccion("009", "009", "Préstamos provenientes del Fondo Nacional de la Vivienda para los Trabajadores", object.ImportePPFNDLVPLT));
    if (object.ImportePPCDV != 0.0)
        DeduccionList.push(crearDeduccion("010", "010", "Pago por crédito de vivienda", object.ImportePPCDV));
    if (object.ImporteINFONACOT!= 0.0)
        DeduccionList.push(crearDeduccion("011", "011", "Pago de abonos INFONACOT", object.ImporteINFONACOT));
    if (object.ImporteADS != 0.0)
        DeduccionList.push(crearDeduccion("012", "012", "Anticipo de salarios", object.ImporteADS));
    if (object.ImportePHCEAT != 0.0)
        DeduccionList.push(crearDeduccion("013", "013", "Pagos hechos con exceso al trabajador", object.ImportePHCEAT));
    if (object.ImporteErrores != 0.0)
        DeduccionList.push(crearDeduccion("014", "014", "Errores", object.ImporteErrores));
    if (object.ImportePerdidas != 0.0)
        DeduccionList.push(crearDeduccion("015", "015", "Pérdidas", object.ImportePerdidas));
    if (object.ImporteAverias != 0.0)
        DeduccionList.push(crearDeduccion("016", "016", "Averias", object.ImporteAverias));
    if (object.ImporteAdquisicionArticulos != 0.0)
        DeduccionList.push(crearDeduccion("017", "017", "Adquisición de artículos producidos por la empresa o establecimiento", object.ImporteAdquisicionArticulos));
    if (object.ImporteCuotasConstitucion != 0.0)
        DeduccionList.push(crearDeduccion("018", "018", "Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro", object.ImporteCuotasConstitucion));
    if (object.ImporteCuotasSindicales != 0.0)
        DeduccionList.push(crearDeduccion("019", "019", "Cuotas sindicales", object.ImporteCuotasSindicales));
    if (object.ImporteAusencia != 0.0)
        DeduccionList.push(crearDeduccion("020", "020", "Ausencia (Ausentismo)", object.ImporteAusencia));
    if (object.ImporteObreroP != 0.0)
        DeduccionList.push(crearDeduccion("021", "021", "Cuotas obrero patronales", object.ImporteObreroP));
    if (object.ImporteImpuestosL != 0.0)
        DeduccionList.push(crearDeduccion("022", "022", "Impuestos locales", object.ImporteImpuestosL));
    if (object.ImporteAportacionesV != 0.0)
        DeduccionList.push(crearDeduccion("023", "023", "Aportaciones Voluntarias", object.ImporteAportacionesV));

}

function crearObjetoPeticion(object) {
    /**
     * Por cada trabajador registrado en nomina se tendra un 
     * objeto de tipo object con el cual construiremos el objeto
     * que se manda en el servicio de la emisión de nomina.
     * **/
    var Nomina = {
        Complemento: {
            Nomina: {
                Deducciones: {
                    DeduccionList: crearDeduccionList(object)
                },
                Percepciones: {
                    PercepcionList: crearPercepcionList(object)
                }
            },
            Version: "1.2",
            TipoNomina: "O" 
        }
    }

    return Nomina;
}