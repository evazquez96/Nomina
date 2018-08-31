import { debug } from "util";

function actualizarValoresDgrid(event, grid) {//Se pasa el evento y el grid.
    var cell = grid.cell(event);
    var row = grid.row(event);
    var field =cell.column.field;//Se obtiene el evento que se ejecuto al editar un valor del grid
    var id = cell.row.id;//Obtiene el id de la fila donde se edito.
    var data = row.data;
    var td = cell.element;
    var oldValue = event.oldValue;
    var value = event.value;
    console.log(event);
    switch (field) {
        case "Sueldo_Gravado":
            //data.TotalPercepcionesGravado = getTotalPercepcionesGravado(data,oldValue,value);
            break;
        case "Sueldo_Exento":
            break;
        default:
            break;
    }
    grid.save();
    grid.refresh();
    
}
function a(data) {
    var total = 0.0;
    total += parseFloat(data.Sueldo_Gravado);
    total += parseFloat(data.Aguinaldo_Gravado);
    total += parseFloat(data.Alimentacion_Gravado);
    total += parseFloat(data.AyudaAnteojos_Gravado);
    total += parseFloat(data.AyudaEscolar_Gravado);
    total += parseFloat(data.AyudaGF_Gravado);
    total += parseFloat(data.AyudaRenta_Gravado);
    total += parseFloat(data.AyudaTransporte_Gravado);
    total += parseFloat(data.Becas_Gravado);
    total += parseFloat(data.CCTPP_Gravado);
    total += parseFloat(data.CDA_Gravado);
    total += parseFloat(data.CDSSPPP_Gravado);
    total += parseFloat(data.CSPPP_Gravado);
    total += parseFloat(data.Comisiones_Gravado);
    total += parseFloat(data.FDA_Gravado);
    total += parseFloat(data.HE_Gravado);
    total += parseFloat(data.Habitacion_Gravado);
    total += parseFloat(data.IAAS_Gravado);
    total += parseFloat(data.IEAOTV_Gravado);
    total += parseFloat(data.Indeminizaciones_Gravado);
    total += parseFloat(data.JPHDRParciales_Gravado);
    total += parseFloat(data.JPHDR_Gravado);
    total += parseFloat(data.OIPS_Gravado);
    total += parseFloat(data.PAsistecia_Gravado);
    total += parseFloat(data.PPS_Gravado);
    total += parseFloat(data.PP_Gravado);
    total += parseFloat(data.PSV_Gravado);
    total += parseFloat(data.PTU_Gravado);
    total += parseFloat(data.PrimaA_Gravado);
    total += parseFloat(data.PrimaD_Gravado);
    total += parseFloat(data.PrimaV_Gravado);
    total += parseFloat(data.RGMDyH_Gravado);
    total += parseFloat(data.RPF_Gravado);
    total += parseFloat(data.SDR_Gravado);
    total += parseFloat(data.SGMM_Gravado);
    total += parseFloat(data.SPI_Gravado);
    total += parseFloat(data.ValesD_Gravado);
    total += parseFloat(data.ValesG_Gravado);
    total += parseFloat(data.ValesR_Gravado);
    total += parseFloat(data.ValesRopa_Gravado);
    return total;
}
function getTotalPercepcionesGravado(data,old,actual) {
    var total = 0.0;
    total += parseFloat(data.Sueldo_Gravado);
    total += parseFloat(data.Aguinaldo_Gravado);
    total += parseFloat(data.Alimentacion_Gravado);
    total += parseFloat(data.AyudaAnteojos_Gravado);
    total += parseFloat(data.AyudaEscolar_Gravado);
    total += parseFloat(data.AyudaGF_Gravado);
    total += parseFloat(data.AyudaRenta_Gravado);
    total += parseFloat(data.AyudaTransporte_Gravado);
    total += parseFloat(data.Becas_Gravado);
    total += parseFloat(data.CCTPP_Gravado);
    total += parseFloat(data.CDA_Gravado);
    total += parseFloat(data.CDSSPPP_Gravado);
    total += parseFloat(data.CSPPP_Gravado);
    total += parseFloat(data.Comisiones_Gravado);
    total += parseFloat(data.FDA_Gravado);
    total += parseFloat(data.HE_Gravado);
    total += parseFloat(data.Habitacion_Gravado);
    total += parseFloat(data.IAAS_Gravado);
    total += parseFloat(data.IEAOTV_Gravado);
    total += parseFloat(data.Indeminizaciones_Gravado);
    total += parseFloat(data.JPHDRParciales_Gravado);
    total += parseFloat(data.JPHDR_Gravado);
    total += parseFloat(data.OIPS_Gravado);
    total += parseFloat(data.PAsistecia_Gravado);
    total += parseFloat(data.PPS_Gravado);
    total += parseFloat(data.PP_Gravado);
    total += parseFloat(data.PSV_Gravado);
    total += parseFloat(data.PTU_Gravado);
    total += parseFloat(data.PrimaA_Gravado);
    total += parseFloat(data.PrimaD_Gravado);
    total += parseFloat(data.PrimaV_Gravado);
    total += parseFloat(data.RGMDyH_Gravado);
    total += parseFloat(data.RPF_Gravado);
    total += parseFloat(data.SDR_Gravado);
    total += parseFloat(data.SGMM_Gravado);
    total += parseFloat(data.SPI_Gravado);
    total += parseFloat(data.ValesD_Gravado);
    total += parseFloat(data.ValesG_Gravado);
    total += parseFloat(data.ValesR_Gravado);
    total += parseFloat(data.ValesRopa_Gravado);
    total -= parseFloat(old);
    total += parseFloat(actual);
    return total;
}

function getTotalPercepcionesExento(object) {
    var total = 0.0;
    total += parseFloat(object.Sueldo_Exento);
    total += parseFloat(object.Aguinaldo_Exento);
    total += parseFloat(object.Alimentacion_Exento);
    total += parseFloat(object.AyudaAnteojos_Exento);
    total += parseFloat(object.AyudaEscolar_Exento);
    total += parseFloat(object.AyudaGF_Exento);
    total += parseFloat(object.AyudaRenta_Exento);
    total += parseFloat(object.AyudaTransporte_Exento);
    total += parseFloat(object.Becas_Exento);
    total += parseFloat(object.CCTPP_Exento);
    total += parseFloat(object.CDA_Exento);
    total += parseFloat(object.CDSSPPP_Exento);
    total += parseFloat(object.CSPPP_Exento);
    total += parseFloat(object.Comisiones_Exento);
    total += parseFloat(object.FDA_Exento);
    total += parseFloat(object.HE_Exento);
    total += parseFloat(object.Habitacion_Exento);
    total += parseFloat(object.IAAS_Exento);
    total += parseFloat(object.IEAOTV_Exento);
    total += parseFloat(object.Indeminizaciones_Exento);
    total += parseFloat(object.JPHDRParciales_Exento);
    total += parseFloat(object.JPHDR_Exento);
    total += parseFloat(object.OIPS_Exento);
    total += parseFloat(object.PAsistecia_Exento);
    total += parseFloat(object.PPS_Exento);
    total += parseFloat(object.PP_Exento);
    total += parseFloat(object.PSV_Exento);
    total += parseFloat(object.PTU_Exento);
    total += parseFloat(object.PrimaA_Exento);
    total += parseFloat(object.PrimaD_Exento);
    total += parseFloat(object.PrimaV_Exento);
    total += parseFloat(object.RGMDyH_Exento);
    total += parseFloat(object.RPF_Exento);
    total += parseFloat(object.SDR_Exento);
    total += parseFloat(object.SGMM_Exento);
    total += parseFloat(object.SPI_Exento);
    total += parseFloat(object.ValesD_Exento);
    total += parseFloat(object.ValesG_Exento);
    total += parseFloat(object.ValesR_Exento);
    total += parseFloat(object.ValesRopa_Exento);
    return total;
}

function getTotalDeducciones(object) {
    /**
     * Recibe como parametro el objecto que corresponde a la 
     * fila de cada empleado registrado en nomina.
     * **/
    var total = 0.0;
    total += parseFloat(object.ImporteSeguridadSocial);
    total += parseFloat(object.ImporteISR);
    total += parseFloat(object.ImporteARCEAV);
    total += parseFloat(object.ImporteOtros);
    total += parseFloat(object.ImporteDPI);
    total += parseFloat(object.ImportePA);
    total += parseFloat(object.ImportePPCDV);
    total += parseFloat(object.ImporteINFONACOT);
    total += parseFloat(object.ImporteADS);
    total += parseFloat(object.ImporteErrores);
    total += parseFloat(object.ImportePerdidas);
    total += parseFloat(object.ImporteAverias);
    total += parseFloat(object.ImporteAdquisicionArticulos);
    total += parseFloat(object.ImporteCuotasConstitucion);
    total += parseFloat(object.ImporteCuotasSindicales);
    total += parseFloat(object.ImporteAusencia);
    total += parseFloat(object.ImporteObreroP);
    total += parseFloat(object.ImporteImpuestosL);
    total += parseFloat(object.ImporteAportacionesV); 
    
    return total;
}

