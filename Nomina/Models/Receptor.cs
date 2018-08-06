using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nomina.Models
{
    public class Receptor
    {
        public Receptor() { }
        public Receptor(String Curp,String numS,String FechaI,String Antiguedad,String TipoContrato,String Sindicalizado,String TipoJornada,String TipoRegimen,String NumEmpleado,String Departamento,String puesto,String RiesgoPuesto,String PeriodicidadPago,String Banco,String CuentaBancaria,String SalarioBaseCotApor,String SalarioDiarioIntegrado,String ClaveEntFed)
        {
            this.Curp = Curp;
            this.NumSeguridadSocial = numS;
            this.FechaInicioRelLaboral = FechaI;
            this.Antiguedad = Antiguedad;
            this.TipoContrato = TipoContrato;
            this.Sindicalizado = Sindicalizado;
            this.TipoJornada = TipoJornada;
            this.TipoRegimen = TipoRegimen;
            this.NumEmpleado = NumEmpleado;
            this.Departamento = Departamento;
            this.Puesto = puesto;
            this.RiesgoPuesto = RiesgoPuesto;
            this.PeriodicidadPago = PeriodicidadPago;
            this.Banco = Banco;
            this.CuentaBancaria = CuentaBancaria;
            this.SalarioBaseCotApor = SalarioBaseCotApor;
            this.SalarioDiarioIntegrado = SalarioDiarioIntegrado;
            this.ClaveEntFed = ClaveEntFed;

        }
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
        public String CuentaBancaria {get;set;}//condicional
        public String SalarioBaseCotApor { get; set; }//opcional
        public String SalarioDiarioIntegrado { get; set; }//opcional
        public String ClaveEntFed { get; set; }//requerido


    }
}