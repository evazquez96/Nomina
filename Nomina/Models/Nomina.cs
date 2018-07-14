using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models
{
    public class Nomina
    {
        public Nomina() { }
        public String Version { get; set; } //requerido
        public String TipoNomina { get; set; }//requerido
        public String FechaPago { get; set; }//requerido
        public String FechaInicialPago { get; set; } //requerido
        public String FechaFinalPago { get; set; }//requerido
        public String NumDiasPagados { get; set; }//requerido
        public String TotalPercepciones { get; set; }//condicional
        public String TotalDeducciones { get; set; }//condicional
        public String TotalOtrosPagos { get; set; }//condicional

        public Receptor Receptor { get; set; }


    }
}