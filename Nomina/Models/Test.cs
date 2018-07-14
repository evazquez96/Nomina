using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models
{
    public class Test
    {
        public String clave { get; set; }
        public String nombre { get; set; }
        public Pago pago { get; set; }

        public Test(String clave,String nombre)
        {
            this.clave = clave;
            this.nombre = nombre;
        }
    }
}