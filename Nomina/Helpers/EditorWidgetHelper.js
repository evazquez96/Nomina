
function actualizarValoresDgrid(event, grid) {//Se pasa el evento y el grid.
    var cell = grid.cell(event);
    var row = grid.row(event);
    var field =cell.column.field;//Se obtiene el evento que se ejecuto al editar un valor del grid
    var id = cell.row.id;//Obtiene el id de la fila donde se edito.
    var data = row.data;
    var td = cell.element;
    var oldValue = event.oldValue;
    var value = event.value;
    //console.log(cell);
    //console.log(row);
    //console.log(data);
    //console.log(td);
    console.log(event);
    //
    switch (field) {
        case "Sueldo_Gravado":
            data.TotalPercepcionesGravado = getTotalPercepcionesGravado(data,oldValue,value);
            //console.log(data.TotalPercepcionesGravado);
            //console.log(getTotalPercepcionesGravado(data));
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

