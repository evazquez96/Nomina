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