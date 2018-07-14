using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models.Deducciones
{
    public class Deducciones
    {
        public decimal totalOtrasDeducciones { get; set; }
        /*
         * Total de deducciones que se relacionan con el comprobante,
         * donde la clave de tipo de deduccion "c_TipoDeduccion"!=002
         * i.e al ISR.
        */
        public decimal totalImpuestosRetenidos { get; set; }
        /*
         * Total de impuestos federales retenidos i.e donde la clave de 
         * deduccion "c_TipoDeduccion"==002 i.e al ISR.
         */
        public List<Deduccion> deducciones { get; set; }

        public void calcularTotalOtrasDeduccionesEImpuestosRetenidos()
        {
            this.totalOtrasDeducciones = 0.0m;
            this.totalImpuestosRetenidos = 0.0m;

            foreach(var d in deducciones)
            {
                if (d.clave.Equals("002"))
                {
                    totalImpuestosRetenidos += d.importe;
                }
                else
                {
                    totalOtrasDeducciones += d.importe;
                }
            }
        }
        
    }
}