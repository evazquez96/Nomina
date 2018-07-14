using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models
{
    public class Pago
    {
        
        public String fecha { get; set; }
        public String fechaInicio { get; set; }
        public String fechaFin { get; set; }
        public decimal diasPagados { get; set; }
        public String banco { get; set; }
        public String clabe { get; set; }
        public String monto { get; set; }

        /**
        * El atributo fecha,fechaInicio,fechaFin se expresan
        * en la forma aaaa-mm-dd, de acuerdo con la especificación
        * ISO 8601.
        */ 
        public Pago() { }

        public Pago(String fecha,String fechaInicio,String fechaFin,decimal diasPagados,String banco,String clabe,String monto)
        {
            this.fecha = fecha;
            this.fechaInicio = fechaInicio;
            this.fechaFin = fechaFin;
            this.diasPagados = diasPagados;
            this.banco = banco;
            this.clabe = clabe;
            this.monto = monto;
        }
        
    }
}