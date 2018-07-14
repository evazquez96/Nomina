using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models.Percepciones
{
    public class Percepcion
    {
        public String tipoPercepcion { get; set; }
        /*
         * Ver archivo catNomina en la hoja llamada c_TipoPercepción.
         */
        public String clave { get; set; }
        /*
         *Percepción de nómina propia de la contabilidad de cada
         * patrón.
         */
        public String concepto { get; set; }
        /*
         * Descripción de cada tip de percepción.
         * Corresponde a la Columna "Descripción"
         */
        public decimal importeGravado { get; set; }

        public decimal importeExento { get; set; }

        public Percepcion(String tipoPercepcion,String clave,String concepto,decimal gravado,decimal exento)
        {

            this.tipoPercepcion = tipoPercepcion;
            this.clave = clave;
            this.concepto = concepto;
            this.importeGravado = gravado;
            this.importeExento = exento;

        }

    }
}