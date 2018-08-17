using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using Nomina.Helpers;
using Nomina.Models;

namespace Nomina.Controllers
{
    public class NominaController : ApiController
    {

        [Route("nomina/{url}")]
        [HttpGet]
        public List<Nomina.Models.Nomina> getNomina(String url)
        {
            List<Nomina.Models.Nomina> nominaL=new List<Nomina.Models.Nomina>();//Corresponde a la lista de la nomina a emitir.
            List<Receptor> DBempleados= getEmpleadosRegistradosEnMenfisCatalogo();
            /*
             *Se obtiene la base de datos menfis_catalogo_empleados OK.xlsx
             */
            GoogleSheetsHelper gsh = new GoogleSheetsHelper(url);
            gsh.createRequest("A5", "FG", WebConfigurationManager.AppSettings["GoogleSheetsName"]);
            gsh.executeRequest();
            /*
             *Se encarga de la lectura del archivo que esta en: formato nomina 2018 enero.xlsx
             *Que corresponde al archivo donde se encuentra la nomina a emitir.
             */
            var values = gsh.values;
            /*
             *Esta variable contiene los valores de las columnas
             *que corresponden al archivo de formato de nomina.
             */
            
            Nomina.Models.Nomina unaNomina;

            foreach (var row in values)
            {
                if (!isNull(row[0]))
                {
                    /*
                     * Entra al if si el NoEmpleado no es
                     * nula.
                     */
                    String noEmpleado= filtrarCampo(row[0]);//Obtiene la clave del emmpleado
                    Receptor receptor = getEmpleadoEnNomina(DBempleados,noEmpleado);
                    /*
                     * Si la clave de empleado existe en menfis_catalogo_empleados OK.xlsx
                     * entonces regresa una instancia de tipo Receptor que corresponde a un
                     * Nodo del elemento Nomina.
                     */

                    if (!isNull(receptor))
                    {
                        /*
                         * Si entra al if indica que el empleado si se encuentra
                         * registrado en el catalogo de menfis_catalogo_empleados OK.xlsx
                         */
                        unaNomina = new Models.Nomina();
                        /*
                         *Se crea una instancia de tipo nomina la cual sera 
                         *exclusiva de cada empleado.
                         */
                        unaNomina.TipoNomina = WebConfigurationManager.AppSettings["tipo_Nomina"];//Obtiene el tipo de nomina.
                        unaNomina.Version = WebConfigurationManager.AppSettings["version"];//Obtiene la versión de nomina.
                        //unaNomina.Receptor = receptor;//Obtiene la instancia que corresponde al nodo receptor.
                        unaNomina.getAtributosReceptor(receptor);
                        unaNomina.FechaPago = Convert.ToString(row[3]);//Obtiene la fecha de pago.
                        unaNomina.NumDiasPagados = Convert.ToString(row[6]);//Obtiene el numero de dias pagados
                        unaNomina.Monto = limpiarMontos(Convert.ToString(row[9]));//Obtiene el Monto
                        unaNomina.Sueldo_Gravado = limpiarMontos(Convert.ToString(row[10]));//Obtiene el sueldo Gravado
                        unaNomina.Sueldo_Exento = limpiarMontos(filtrarCampo2(row[11]));//Obtiene el sueldo Exento.
                        unaNomina.Aguinaldo_Gravado = limpiarMontos(filtrarCampo2(row[12]));
                        unaNomina.Aguinaldo_Exento = limpiarMontos(filtrarCampo2(row[13]));
                        unaNomina.PTU_Gravado = limpiarMontos(filtrarCampo2(row[14]));
                        unaNomina.PTU_Exento = limpiarMontos(filtrarCampo2(row[15]));
                        unaNomina.RGMDyH_Gravado = limpiarMontos(filtrarCampo2(row[16]));
                        unaNomina.RGMDyH_Exento = limpiarMontos(filtrarCampo2(row[17]));
                        unaNomina.FDA_Gravado = limpiarMontos(filtrarCampo2(row[18]));
                        unaNomina.FDA_Exento = limpiarMontos(filtrarCampo2(row[19]));
                        unaNomina.CDA_Gravado = limpiarMontos(filtrarCampo2(row[20]));
                        unaNomina.CDA_Exento = limpiarMontos(filtrarCampo2(row[21]));
                        unaNomina.CCTPP_Gravado = limpiarMontos(filtrarCampo2(row[22]));
                        unaNomina.CCTPP_Exento = limpiarMontos(filtrarCampo2(row[23]));
                        unaNomina.PP_Gravado = limpiarMontos(filtrarCampo2(row[24]));
                        unaNomina.PP_Exento = limpiarMontos(filtrarCampo2(row[25]));//Premio puntualidad
                        unaNomina.PSV_Gravado= limpiarMontos(filtrarCampo2(row[26]));//Prima de seguro de vida.
                        unaNomina.PSV_Exento = limpiarMontos(filtrarCampo2(row[27]));//Prima de seguro de vida.
                        unaNomina.SGMM_Gravado= limpiarMontos(filtrarCampo2(row[28]));//Seguro de gastos medicos mayores.
                        unaNomina.SGMM_Exento = limpiarMontos(filtrarCampo2(row[29]));//Seguro de gastos medicos mayores.
                        unaNomina.CSPPP_Gravado = limpiarMontos(filtrarCampo2(row[30]));//Cuotas sindicales pagadas por el patron
                        unaNomina.CSPPP_Exento = limpiarMontos(filtrarCampo2(row[31]));//Cuotas sindicales pagadas por el patron
                        unaNomina.SPI_Gravado = limpiarMontos(filtrarCampo2(row[32]));//Subsidios por incapacidad.
                        unaNomina.SPI_Exento = limpiarMontos(filtrarCampo2(row[33]));//Subsidios por incapacidad.
                        unaNomina.Becas_Gravado = limpiarMontos(filtrarCampo2(row[34]));//Becas
                        unaNomina.Becas_Exento = limpiarMontos(filtrarCampo2(row[35]));//Becas
                        unaNomina.HE_Gravado = limpiarMontos(filtrarCampo2(row[36]));//Horas Extra
                        unaNomina.HE_Exento = limpiarMontos(filtrarCampo2(row[37]));//Horas Extra.
                        unaNomina.PrimaD_Gravado = limpiarMontos(filtrarCampo2(row[38]));//Prima Dominical
                        unaNomina.PrimaD_Exento = limpiarMontos(filtrarCampo2(row[39]));//Prima Dominical
                        unaNomina.PrimaV_Gravado = limpiarMontos(filtrarCampo2(row[40]));//Prima vacacional.
                        unaNomina.PrimaV_Exento = limpiarMontos(filtrarCampo2(row[41]));//Prima vacacional.
                        unaNomina.PrimaA_Gravado = limpiarMontos(filtrarCampo2(row[42]));//Prima por antiguedad
                        unaNomina.PrimaA_Exento = limpiarMontos(filtrarCampo2(row[43]));//Prima por antiguedad
                        unaNomina.PPS_Gravado = limpiarMontos(filtrarCampo2(row[44]));//Pagos por separacion
                        unaNomina.PPS_Exento = limpiarMontos(filtrarCampo2(row[45]));//Pagos por separacion
                        unaNomina.SDR_Gravado = limpiarMontos(filtrarCampo2(row[46]));//Seguro de retiro
                        unaNomina.SDR_Exento = limpiarMontos(filtrarCampo2(row[47]));//Seguro de retiro
                        unaNomina.Indeminizaciones_Gravado = limpiarMontos(filtrarCampo2(row[48]));//Indeminizaciones
                        unaNomina.Indeminizaciones_Exento = limpiarMontos(filtrarCampo2(row[49]));//Indeminizaciones
                        unaNomina.RPF_Gravado = limpiarMontos(filtrarCampo2(row[50]));//Reembolso por funeral
                        unaNomina.RPF_Exento = limpiarMontos(filtrarCampo2(row[51]));//Reembolso por funeral
                        unaNomina.CDSSPPP_Gravado = limpiarMontos(filtrarCampo2(row[52]));//Cuotas de seguridad social pagadas por el patron.
                        unaNomina.CDSSPPP_Exento = limpiarMontos(filtrarCampo2(row[53]));//Cuotas de seguridad social pagadas por el patron.
                        unaNomina.Comisiones_Gravado = limpiarMontos(filtrarCampo2(row[54]));//Comisiones
                        unaNomina.Comisiones_Exento = limpiarMontos(filtrarCampo2(row[55]));//Comisiones
                        unaNomina.ValesD_Gravado = limpiarMontos(filtrarCampo2(row[56]));//Vales de despensa
                        unaNomina.ValesD_Exento = limpiarMontos(filtrarCampo2(row[57]));//Vales de despensa
                        unaNomina.ValesR_Gravado = limpiarMontos(filtrarCampo2(row[58]));//Vales de restaurant
                        unaNomina.ValesR_Exento = limpiarMontos(filtrarCampo2(row[59]));//Vales de restaurant
                        unaNomina.ValesG_Gravado = limpiarMontos(filtrarCampo2(row[60]));//Vales de gasolina
                        unaNomina.ValesG_Exento = limpiarMontos(filtrarCampo2(row[61]));//Vales de gasolina
                        unaNomina.ValesRopa_Gravado = limpiarMontos(filtrarCampo2(row[62]));//Vales de ropa.
                        unaNomina.ValesRopa_Exento = limpiarMontos(filtrarCampo2(row[63]));//Vales de ropa.
                        unaNomina.AyudaRenta_Gravado = limpiarMontos(filtrarCampo2(row[64]));//Ayuda para renta
                        unaNomina.AyudaRenta_Exento = limpiarMontos(filtrarCampo2(row[65]));//Ayuda para renta
                        unaNomina.AyudaEscolar_Gravado = limpiarMontos(filtrarCampo2(row[66]));//Ayuda para articulos escolares
                        unaNomina.AyudaEscolar_Exento = limpiarMontos(filtrarCampo2(row[67]));//Ayuda para articulos escolares
                        unaNomina.AyudaAnteojos_Gravado = limpiarMontos(filtrarCampo2(row[68]));//Ayuda para anteojos
                        unaNomina.AyudaAnteojos_Exento = limpiarMontos(filtrarCampo2(row[69]));//Ayuda para anteojos
                        unaNomina.AyudaTransporte_Gravado = limpiarMontos(filtrarCampo2(row[70]));//Ayuda para transporte
                        unaNomina.AyudaTransporte_Exento = limpiarMontos(filtrarCampo2(row[71]));//Ayuda para transporte
                        unaNomina.AyudaGF_Gravado = limpiarMontos(filtrarCampo2(row[72]));//Ayuda para gastos de funeral.
                        unaNomina.AyudaGF_Exento = limpiarMontos(filtrarCampo2(row[73]));//Ayuda para gastos de funeral.
                        unaNomina.OIPS_Gravado = limpiarMontos(filtrarCampo2(row[74]));//Otros ingresos por salarios.
                        unaNomina.OIPS_Exento = limpiarMontos(filtrarCampo2(row[75]));//Otros ingresos por salarios.
                        unaNomina.JPHDR_Gravado = limpiarMontos(filtrarCampo2(row[76]));//Jubilaciones, pensiones o haberes de retiro
                        unaNomina.JPHDR_Exento = limpiarMontos(filtrarCampo2(row[77]));//Jubilaciones, pensiones o haberes de retiro
                        unaNomina.JPHDRParciales_Gravado = limpiarMontos(filtrarCampo2(row[78]));//Jubilaciones, pensiones o haberes de retiro parciales
                        unaNomina.JPHDRParciales_Exento = limpiarMontos(filtrarCampo2(row[79]));//Jubilaciones, pensiones o haberes de retiro parciales
                        unaNomina.IEAOTV_Gravado = limpiarMontos(filtrarCampo2(row[80]));//Ingresos en acciones o titulo valor que representan bienes
                        unaNomina.IEAOTV_Exento = limpiarMontos(filtrarCampo2(row[81]));//Ingresos en acciones o titulo valor que representan bienes
                        unaNomina.IAAS_Gravado = limpiarMontos(filtrarCampo2(row[82]));//Ingresos asimilados a salarios
                        unaNomina.IAAS_Exento = limpiarMontos(filtrarCampo2(row[83]));//Ingresos asimilados a salarios
                        unaNomina.Alimentacion_Gravado = limpiarMontos(filtrarCampo2(row[84]));//Alimentacion
                        unaNomina.Alimentacion_Exento = limpiarMontos(filtrarCampo2(row[85]));//Alimentacion
                        unaNomina.Habitacion_Gravado = limpiarMontos(filtrarCampo2(row[86]));//Habitación
                        unaNomina.Habitacion_Exento = limpiarMontos(filtrarCampo2(row[87]));//Habitación
                        unaNomina.PAsistecia_Gravado = limpiarMontos(filtrarCampo2(row[88]));//Premios por asistencia
                        unaNomina.PAsistecia_Exento = limpiarMontos(filtrarCampo2(row[89]));//Premios por asistencia
                        unaNomina.TotalPercepcionesGravado = limpiarMontos(filtrarCampo2(row[90]));//Total de percepciones
                        unaNomina.TotalPercepcionesExento = limpiarMontos(filtrarCampo2(row[91]));//Total de percepciones
                                                                                                  /*
                                                                                                   * FIN DE LA LECTURA DE LOS CAMPOS PARA LAS PERCEPCIONES.
                                                                                                   */
                        unaNomina.ImporteSeguridadSocial = limpiarMontos(filtrarCampo2(row[92]));
                        /**Apartir de este campo, ya cuando se tenga en producción, solo se tendra el importe,
                         * se omitira el gravado y exento, por lo tanto se tendra que modificar la estructura
                         * de la hoja de Google Sheets. Revisar el documento de observacines Nomina que esta en
                         * drive.**/
                        unaNomina.ImporteISR = limpiarMontos(filtrarCampo2(row[94]));
                        unaNomina.ImporteARCEAV= limpiarMontos(filtrarCampo2(row[96]));
                        unaNomina.ImporteOtros= limpiarMontos(filtrarCampo2(row[98]));//Verificar desde aqui
                        //Revisar columnas CV a CY
                        unaNomina.ImporteDPI= limpiarMontos(filtrarCampo2(row[102]));
                        unaNomina.ImportePA= limpiarMontos(filtrarCampo2(row[105]));//Importe pensión alimenticia.
                        /*
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
       */

                        /**
                         * Inicio de los campos para las deducciones
                         * **/


                        unaNomina.FechaInicialPago = Convert.ToString(row[4]);//Obtiene la fecha inicial de pago.
                        unaNomina.FechaFinalPago = Convert.ToString(row[5]);//Obtiene la fecha final de pago.
                        unaNomina.getAntiguedad(unaNomina.FechaInicioRelLaboral, unaNomina.FechaPago);
                        nominaL.Add(unaNomina);
                    }


                }
            }


            return nominaL;

        }

        private String limpiarMontos(String cad)
        {
            String d = cad.Replace(" ", "");
            String e = d.Replace(",", "");
            return e;

        }


        /*
        [Route("nomina/{url}/pago")]
        [HttpGet]
        public List<Test> GetNomina(String url)
        {
            GoogleSheetsHelper gsh = new GoogleSheetsHelper(url);
            gsh.createRequest("A5","FG", WebConfigurationManager.AppSettings["GoogleSheetsName"]);
            gsh.executeRequest();
            var values = gsh.values;
            List<Test> nomina = new List<Test>();
            Pago pago;
            foreach(var row in values)
            {
                Test test = new Test(Convert.ToString(row[0]), Convert.ToString(row[1])) ;
                pago = getPago(row);
                test.pago = pago;
                nomina.Add(test);
                //z = z + row[0] + row[1];
                //break;
            }
            return nomina;
        }
        */

        [Route("nomina/receptores")]
        [HttpGet]
        public List<Receptor> getEmpleadosRegistradosEnMenfisCatalogo()
        {
            GoogleSheetsHelper gsh = new GoogleSheetsHelper("1dUVAXAf2LvtUtJRiHNhEosNwD8cHWg10EsT0_TEiY4o");
            /**
             * Este Helper sera el encargado de Buscar a los 
             * Receptores en la Google Sheets llamada "menfis_catalogo_empleados OK.xlsx"
             */
            gsh.createRequest("A2", "U","BASE");
            gsh.executeRequest();
            var values = gsh.values;
            List<Receptor> Receptores = new List<Receptor>();
            Receptor receptor;
            foreach(var r in values)
            {
                if (r[0] != null)
                {
                     /*
                     * Comprueba que el campo No.Empleado
                     * No sea nulo
                     */
                    receptor = new Receptor();
                    /*
                     * Se crea una nueva instancia de tipo Receptor
                     */
                    receptor.Nombre = filtrarCampo(r[1]);
                    receptor.NumEmpleado = filtrarCampo(r[0]);
                    receptor.Curp = filtrarCampo(r[3]);
                    receptor.NumSeguridadSocial =filtrarCampo(r[6]);
                    receptor.FechaInicioRelLaboral = filtrarCampo(r[14]);
                    receptor.TipoContrato = filtrarCampo(r[13]);
                    receptor.Sindicalizado = "";//Duda
                    receptor.TipoJornada = filtrarCampo(r[11]);
                    receptor.TipoRegimen = filtrarCampo(r[4]);
                    receptor.Departamento = filtrarCampo(r[12]);
                    receptor.Puesto = filtrarCampo(r[9]);
                    receptor.RiesgoPuesto = filtrarCampo(r[10]);
                    receptor.PeriodicidadPago = filtrarCampo(r[5]);
                    receptor.Banco = filtrarCampo(r[15]);
                    receptor.CuentaBancaria = filtrarCampo(r[16]);
                    receptor.SalarioBaseCotApor = filtrarCampo(r[7]);
                    receptor.SalarioDiarioIntegrado = filtrarCampo(r[8]);
                    receptor.ClaveEntFed = filtrarCampo(r[18]);
                    Receptores.Add(receptor);
                }
            }
            return Receptores;
        }

        private Receptor getEmpleadoEnNomina(List<Receptor> catalogo,String noEmpleado)
        {
            /*
             *Obtiene la información del nodo Receptor.
             *Busca un empleado que se encuentra registrado en la hoja de nomina dentro del catalogo de empleados,
             *Si encuentra al empleado entonces regresa la información correspondiente del nodo Receptor de ese 
             *determinado empleado. En caso de que no se encuentre significa que el NoEmpleado que se encuentra en el archivo
             *de nomina no corresponde a ningun empleado registrado en el catalogo, por lo tanto se descartara ese registro
             *dentro de la nomina.
             */
            Receptor unReceptor=null;

            foreach(var empleado in catalogo)
            {
                if (empleado.NumEmpleado.Equals(noEmpleado))
                {
                    unReceptor = empleado;
                    break;
                }
            }
            return unReceptor;

        }
        private String filtrarCampo2(Object obj) {
            return (Convert.ToString(obj).Length==0) ? "0.0" : Convert.ToString(obj);
        }
        private String filtrarCampo(Object obj)
        {
            return (obj == null ) ? "" : Convert.ToString(obj);
         
        }

        private Boolean isNull(Object obj) { return obj == null ? true : false; }

        private Pago getPago(IList<Object> obj)
        {
            Pago unPago = new Pago();
            unPago.fecha= Convert.ToString(obj[3]);
            unPago.fechaInicio = Convert.ToString(obj[4]);
            unPago.fechaFin = Convert.ToString(obj[5]);
            unPago.diasPagados = Convert.ToDecimal(obj[6]);
            if (!isNull(obj[7]))
                unPago.banco = Convert.ToString(obj[7]);
            if (!isNull(obj[8]))
                unPago.clabe = Convert.ToString(obj[8]);
            NumberStyles styles = NumberStyles.Number;
            String aux = Convert.ToString(obj[9]);
            //Console.WriteLine(Convert.ToString(obj[9]));
            //aux = "1,244.18";
            //aux = "1,244.18 "
            unPago.monto = aux;
            return unPago;
        }
        
    }
}
