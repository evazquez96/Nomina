using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models.OtrosPagos
{
    public class OtroPago
    {
        public String tipoOtroPago { get; set; }
        public String clave { get; set; }
        public String concepto { get; set; }
        public decimal importe { get; set; }
    }
}