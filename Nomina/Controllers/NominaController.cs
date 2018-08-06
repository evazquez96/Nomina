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
                        unaNomina.Monto = Convert.ToString(row[9]);//Obtiene el Monto
                        unaNomina.Sueldo_Gravado = Convert.ToString(row[10]);//Obtiene el sueldo Gravado
                        unaNomina.Sueldo_Exento = filtrarCampo2(row[11]);//Obtiene el sueldo Exento.
                        unaNomina.Aguinaldo_Gravado = filtrarCampo2(row[12]);
                        unaNomina.Aguinaldo_Exento = filtrarCampo2(row[13]);
                        unaNomina.PTU_Gravado = filtrarCampo2(row[14]);
                        unaNomina.PTU_Exento = filtrarCampo(row[15]);
                        unaNomina.RGMDyH_Gravado = filtrarCampo2(row[16]);
                        unaNomina.RGMDyH_Exento = filtrarCampo2(row[17]);
                        unaNomina.FDA_Gravado = filtrarCampo2(row[18]);
                        unaNomina.FDA_Exento = filtrarCampo2(row[19]);
                        unaNomina.CDA_Gravado = filtrarCampo2(row[20]);
                        unaNomina.CDA_Exento = filtrarCampo2(row[21]);
                        unaNomina.CCTPP_Gravado = filtrarCampo2(row[22]);
                        unaNomina.CCTPP_Exento = filtrarCampo2(row[23]);
                        unaNomina.PP_Gravado = filtrarCampo2(row[24]);
                        unaNomina.PP_Exento = filtrarCampo2(row[25]);
                        unaNomina.FechaInicialPago = Convert.ToString(row[4]);//Obtiene la fecha inicial de pago.
                        unaNomina.FechaFinalPago = Convert.ToString(row[5]);//Obtiene la fecha final de pago.
                        nominaL.Add(unaNomina);
                    }


                }
            }


            return nominaL;

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
            return (Convert.ToString(obj).Equals("")) ? "0.0" : Convert.ToString(obj);

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
