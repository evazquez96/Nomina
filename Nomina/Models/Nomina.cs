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
        public String Monto { get; set; }
        //public decimal NumDiasPagados { get; set; }

        /**
         * Inicio de los Atributos que corresponden al Nodo receptar 
         **/
         public String Nombre { get; set; }
        public String Curp { get; set; }//requerido
        public String NumSeguridadSocial { get; set; }//condicional
        public String FechaInicioRelLaboral { get; set; }//condicional
        public String Antiguedad { get; set; }//condicional
        public String TipoContrato { get; set; }//requerido
        public String Sindicalizado { get; set; }//opcional
        public String TipoJornada { get; set; }//condicional
        public String TipoRegimen { get; set; }//requerido
        public String NumEmpleado { get; set; }//requerido
        public String Departamento { get; set; }//opcional
        public String Puesto { get; set; }//opcional
        public String RiesgoPuesto { get; set; }//opcional
        public String PeriodicidadPago { get; set; }//requerido
        public String Banco { get; set; }//condicional
        public String CuentaBancaria { get; set; }//condicional
        public String SalarioBaseCotApor { get; set; }//opcional
        public String SalarioDiarioIntegrado { get; set; }//opcional
        public String ClaveEntFed { get; set; }//requerido

        /**
            *Find de los Atributos que corresponden al Nodo receptar 
        **/

        /**
         * Inicio de los atributos para las Percepciones
         **/

        public String Sueldo_Gravado { get; set; }
        public String Sueldo_Exento { get; set; }
        public String Aguinaldo_Gravado { get; set; }
        public String Aguinaldo_Exento { get; set; }
        public String PTU_Gravado { get; set; }
        public String PTU_Exento { get; set; }
        public String RGMDyH_Gravado { get; set; }
        public String RGMDyH_Exento { get; set; }
        public String FDA_Gravado { get; set; }
        public String FDA_Exento { get; set; }
        public String CDA_Gravado { get; set; }
        public String CDA_Exento { get; set; }
        public String CCTPP_Gravado { get; set; }
        public String CCTPP_Exento { get; set; }
        public String PP_Gravado { get; set; }
        public String PP_Exento { get; set; }
        /**
         **Fin de los atributos para las Percepciones
        **/

        //public Receptor Receptor { get; set; }

        public void getAtributosReceptor(Receptor r)
        {
            Nombre = r.Nombre;   
            Curp = r.Curp;
            NumSeguridadSocial = r.NumSeguridadSocial;
            FechaInicioRelLaboral = r.FechaInicioRelLaboral;
            Antiguedad = r.Antiguedad;
            TipoContrato = r.TipoContrato;
            Sindicalizado = r.Sindicalizado;
            TipoJornada = r.TipoJornada;
            TipoRegimen = r.TipoRegimen;
            NumEmpleado = r.NumEmpleado;
            Departamento = r.Departamento;
            Puesto = r.Puesto;
            RiesgoPuesto = r.RiesgoPuesto;
            PeriodicidadPago = r.PeriodicidadPago;
            Banco = r.Banco;
            CuentaBancaria = r.CuentaBancaria;
            SalarioBaseCotApor = r.SalarioBaseCotApor;
            SalarioDiarioIntegrado = r.SalarioDiarioIntegrado;
            ClaveEntFed = r.ClaveEntFed;
        }


    }


}