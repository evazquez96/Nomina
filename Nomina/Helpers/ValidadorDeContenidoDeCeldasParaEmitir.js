function validarContenidoDeCeldas(grid) {
    /**
     * Se enviara todo el grid para poder realizar las
     * validaciones de cada celda.
     * 
     **/
    var collection = grid.get("collection");
    collection.forEach(function (object) {
        object.isValid = { bandera: true ,codError:""};
        //console.log(object)
    })
    /**El primer foreach lo que hace es ponerle la bandera isValid=true**/
    collection.forEach(function (object) {
        //object.isValid = true;
        console.log(object)
    })

}