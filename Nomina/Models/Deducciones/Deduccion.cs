using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models.Deducciones
{
    public class Deduccion
    {
        public String tipoDeduccion { get; set; }
        /*
         * Ver archivo catNomina en la hoja llamada c_TipoDeducción.
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
        public decimal importe { get; set; }

        public Deduccion(String tipoDeduccion,String clave,String concepto,decimal importe)
        {
            this.tipoDeduccion = tipoDeduccion;
            this.clave = clave;
            this.concepto = concepto;
            this.importe = importe;
        }

    }
}