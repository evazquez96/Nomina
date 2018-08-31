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
        public String Clabe { get; set; }
        public String NumDiasPagados { get; set; }//requerido
        public String TotalPercepciones { get; set; }//condicional
        //public String TotalDeducciones { get; set; }//condicional
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
        public String PSV_Gravado { get; set; }//Prima de seguro de vida
        public String PSV_Exento { get; set; }//Prima de seguro de vida
        public String SGMM_Gravado { get; set; }
        public String SGMM_Exento { get; set; }
        public String CSPPP_Gravado { get; set; }
        public String CSPPP_Exento { get; set; }
        public String SPI_Gravado { get; set; }
        public String SPI_Exento { get; set; }
        public String Becas_Gravado { get; set; }
        public String Becas_Exento { get; set; }
        public String HE_Gravado { get; set; }
        public String HE_Exento { get; set; }
        public String PrimaD_Gravado { get; set; }
        public String PrimaD_Exento { get; set; }
        public String PrimaV_Gravado { get; set; }
        public String PrimaV_Exento { get; set; }
        public String PrimaA_Gravado { get; set; }
        public String PrimaA_Exento { get; set; }
        public String PPS_Gravado { get; set; }//Pagos por separacion
        public String PPS_Exento { get; set; }
        public String SDR_Gravado { get; set; }
        public String SDR_Exento { get; set; }//seguro de retiro
        public String Indeminizaciones_Gravado { get; set; }
        public String Indeminizaciones_Exento { get; set; }
        public String RPF_Gravado { get; set; }//Reembolso por funeral
        public String RPF_Exento { get; set; }
        public String CDSSPPP_Gravado { get; set; }//Cuotas de seguridad social pagadas por el patron.
        public String CDSSPPP_Exento { get; set; }
        public String Comisiones_Gravado { get; set; }
        public String Comisiones_Exento { get; set; }
        public String ValesD_Gravado { get; set; }//vales de despensa.
        public String ValesD_Exento { get; set; }
        public String ValesR_Gravado { get; set; }//vales de restaurante
        public String ValesR_Exento { get; set; }
        public String ValesG_Gravado { get; set; }//vales de gasolina
        public String ValesG_Exento { get; set; }
        public String ValesRopa_Gravado { get; set; }//vales de ropa
        public String ValesRopa_Exento { get; set; }
        public String AyudaRenta_Gravado { get; set; }//Ayuda para renta
        public String AyudaRenta_Exento { get; set; }
        public String AyudaEscolar_Gravado { get; set; }//Ayuda para articulos escolares
        public String AyudaEscolar_Exento { get; set; }
        public String AyudaAnteojos_Gravado { set; get; }//Ayuda para antejos
        public String AyudaAnteojos_Exento { get; set; }
        public String AyudaTransporte_Gravado { get; set; }//Ayuda para transporte
        public String AyudaTransporte_Exento { get; set; }
        public String AyudaGF_Gravado { get; set; }//Ayuda para gastos de funeral
        public String AyudaGF_Exento { get; set; }
        public String OIPS_Gravado { get; set; }//Otros ingresos por salarios
        public String OIPS_Exento { get; set; }
        public String JPHDR_Gravado { get; set; } //Jubilaciones, pensiones o haberes de retiro
        public String JPHDR_Exento { get; set; }
        public String JPHDRParciales_Gravado { get; set; }//Jubilaciones, pensiones o haberes de retiro parciales
        public String JPHDRParciales_Exento { get; set; }
        public String IEAOTV_Gravado { get; set; }//Ingresos en acciones o titulo valor que representan bienes
        public String IEAOTV_Exento { get; set; }
        public String IAAS_Gravado { get; set; }//Ingresos asimilados a salarios
        public String IAAS_Exento { get; set; }
        public String Alimentacion_Gravado { get; set; }//Alimentacion
        public String Alimentacion_Exento { get; set; }
        public String Habitacion_Gravado { get; set; }//Habitacion
        public String Habitacion_Exento { get; set; }
        public String PAsistecia_Gravado { get; set; }//Premios por asistencia.
        public String PAsistecia_Exento { get; set; }
        public String TotalPercepcionesGravado { get; set; }//Total Gravado
        public String TotalPercepcionesExento { get; set; }
        /**
         **Fin de los atributos para las Percepciones
        **/


        /**
         * Inicio de los atributos de  deducciones
         **/
        public String ImporteSeguridadSocial { get; set; }
        public String ImporteISR { get; set; }
        public String ImporteARCEAV { get; set; }
        public String ImporteOtros { get; set; }
        public String ImporteDPI { get; set; }
        public String ImportePA { get; set; }
        public String ImportePPCDV { get; set; }
        public String ImporteINFONACOT { get; set; }
        public String ImporteADS { get; set; }
        public String ImporteErrores { get; set; }
        public String ImportePerdidas { get; set; }
        public String ImporteAverias { get; set; }
        public String ImporteAdquisicionArticulos { get; set; }
        public String ImporteCuotasConstitucion { get; set; }
        public String ImporteCuotasSindicales { get; set; }
        public String ImporteAusencia { get; set; }
        public String ImporteObreroP { get; set; }
        public String ImporteImpuestosL { get; set; }
        public String ImporteAportacionesV { get; set; }
        public String TotalDeducciones { get; set; }
        /**
         *  Fin de los atributos de deducciones
         **/

        public String RiesgoTrabajoDias { get; set; }
        public String RiesgoTrabajoDescuento { get; set; }
        public String RiesgoEnfermedadDias { get; set; }
        public String RiesgoEnfermedadDescuento { get; set; }
        public String MaternidadDias { get; set; }
        public String MaternidadDescuento { get; set; }
        public String TotalIncapacidadesDias { get;set; }
        public String TotalIncapacidadesDescuento { get; set; }



        public String HorasExD_Dias { get; set; }
        public String HorasExD_Horas {get;set;}
        public String HorasExD_Importe { get; set; }
        public String HorasExT_Dias { get; set; }
        public String HorasExT_Horas { get; set; }
        public String HorasExT_Importe { get; set; }
        public String HorasExS_Dias { get; set; }
        public String HorasExS_Horas { get; set; }
        public String HorasExS_Importe { get; set; }
        public String TotalHE { get; set; }


        /**Otros pagos.**/
        public String Reintegro_ISR { get; set; }
        public String SubsidioEmpleoEfecEntregado { get; set; }
        public String ViaticosEntregadosTrabajador { get; set; }
        public String AplicacionSaldoAFavorCompensacionAnual { get; set; }
        public String PagosDistintosALosListados { get; set; }

        //public Receptor Receptor { get; set; }

        public void getAntiguedad(String fecha_inicio,String actual)
        {
            DateTime i=Convert.ToDateTime(fecha_inicio);
            DateTime a=Convert.ToDateTime(actual);
            TimeSpan ts=a-i;//Diferencia entre la fecha en que se manda a emitir la nomina y la fecha de relacion laboral
            Antiguedad= Convert.ToString(ts.TotalDays/7);//Diferencia de fechas en semanas.
            //Antiguedad = String.Format("{0:0.000}", Antiguedad);
            //Antiguedad = String.Format("{0:#.##}", Antiguedad.ToString());
        }

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
            //Antiguedad=getAntiguedad()
        }


    }


}