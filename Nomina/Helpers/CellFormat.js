function centerText(div) {
    div.style.setProperty("display", "flex", "important");
    div.style.setProperty("justify-content", "center", "important");
    div.style.setProperty("align-items", "center", "important");
}

function formatoCeldasVacias(td) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    td.style.setProperty("background-color", "#e2d8e4", "important");
    return div;
}

function formatoCentrarContenido(data) {
    var div = document.createElement("div");
    div.innerHTML = data;
    div.style.setProperty("text-align", "center", "important");
    return div;
}

function getTotalPercepcionesGravado(object) {
    var total = 0.0;
    total += parseFloat(object.Sueldo_Gravado);
    total += parseFloat(object.Aguinaldo_Gravado);
    total += parseFloat(object.Alimentacion_Gravado);
    total += parseFloat(object.AyudaAnteojos_Gravado);
    total += parseFloat(object.AyudaEscolar_Gravado);
    total += parseFloat(object.AyudaGF_Gravado);
    total += parseFloat(object.AyudaRenta_Gravado);
    total += parseFloat(object.AyudaTransporte_Gravado);
    total += parseFloat(object.Becas_Gravado);
    total += parseFloat(object.CCTPP_Gravado);
    total += parseFloat(object.CDA_Gravado);
    total += parseFloat(object.CDSSPPP_Gravado);
    total += parseFloat(object.CSPPP_Gravado);
    total += parseFloat(object.Comisiones_Gravado);
    total += parseFloat(object.FDA_Gravado);
    total += parseFloat(object.HE_Gravado);
    total += parseFloat(object.Habitacion_Gravado);
    total += parseFloat(object.IAAS_Gravado);
    total += parseFloat(object.IEAOTV_Gravado);
    total += parseFloat(object.Indeminizaciones_Gravado);
    total += parseFloat(object.JPHDRParciales_Gravado);
    total += parseFloat(object.JPHDR_Gravado);
    total += parseFloat(object.OIPS_Gravado);
    total += parseFloat(object.PAsistecia_Gravado);
    total += parseFloat(object.PPS_Gravado);
    total += parseFloat(object.PP_Gravado);
    total += parseFloat(object.PSV_Gravado);
    total += parseFloat(object.PTU_Gravado);
    total += parseFloat(object.PrimaA_Gravado);
    total += parseFloat(object.PrimaD_Gravado);
    total += parseFloat(object.PrimaV_Gravado);
    total += parseFloat(object.RGMDyH_Gravado);
    total += parseFloat(object.RPF_Gravado);
    total += parseFloat(object.SDR_Gravado);
    total += parseFloat(object.SGMM_Gravado);
    total += parseFloat(object.SPI_Gravado);
    total += parseFloat(object.ValesD_Gravado);
    total += parseFloat(object.ValesG_Gravado);
    total += parseFloat(object.ValesR_Gravado);
    total += parseFloat(object.ValesRopa_Gravado);

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

function formatoDivTotal(data,td, bandera) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    div.innerHTML = data;
    div.style.setProperty("text-align", "center", "important");
    if (bandera == true)
        td.style.setProperty("background-color", "#9ACD32", "important");//Color para los Gravados
    else
        td.style.setProperty("background-color", "YELLOW", "important");//Color para los Exentos
    return div;
}

function formatoHeader(node, bandera,text,domStyle) {
    var div = document.createElement("div");
    div.innerHTML = text;
    domStyle.set(div, "text-align", "center");
    switch (bandera) {
        case 1://Headers para Pago
            break;
        case 2:
            break;
        default:
            break;
    }
    return div;
}