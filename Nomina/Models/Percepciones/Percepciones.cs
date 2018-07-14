using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models.Percepciones
{
    public class Percepciones
    {
        public List<Percepcion> percepciones { get; set; }

        public decimal totalGravado { get; set; }

        public decimal totalExento { get; set; }

        public void calcularTotalGravadoExento() {

            totalExento = 0.0m;
            totalGravado = 0.0m;
            foreach(var percepcion in percepciones)
            {
                totalExento += percepcion.importeExento;
                totalGravado += percepcion.importeGravado;
            }

        }
    }
}