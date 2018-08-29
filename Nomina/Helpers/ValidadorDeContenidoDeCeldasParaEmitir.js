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
        console.log(object)
    })

}

function crearObjeto(object) {
    /**
     * Por cada trabajador registrado en nomina se tendra un 
     * objeto de tipo object con el cual construiremos el objeto
     * que se manda en el servicio de la emisión de nomina.
     * **/
    var obj = {


    }
}