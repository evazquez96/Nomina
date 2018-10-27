using System;
using System.Collections.Generic;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.IO;
using System.Threading;
using System.Web.Configuration;

namespace Nomina.Helpers
{
    public class GoogleSheetsHelper
    {
        /**
        * Cabeceras.
        **/

        static string[] Scopes = { SheetsService.Scope.SpreadsheetsReadonly };
        static string ApplicationName = "Google Sheets API .NET Quickstart";
        private String range;
        private String SpreadSheetId;
        UserCredential credential;
        public SpreadsheetsResource.ValuesResource.GetRequest request { get; set; }
        public ValueRange response { get; set; }
        public IList<IList<Object>> values { get; set; }

        public GoogleSheetsHelper(String SpreadSheetId)
        {
            this.SpreadSheetId = SpreadSheetId;
            initComponents();
        }
        private void initComponents()
        {
            initUserCredential();
            /**
             * Inicializa la variable UserCredential. 
             */
        }

        public void createRequest(String initColumn, String endColumn,String name)
        {
            setRange(initColumn, endColumn,name);
            /*
             * Actualiza el rango desde donde se va a 
             * crear la petición para la lectura de las 
             * Columnas de la hoja de GoogleSheets.
             */

            //Create Google Sheets API Service
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
            request = service.Spreadsheets.Values.Get(SpreadSheetId, range);

        }

        public void executeRequest()
        {
            response = request.Execute();//Execute Request.
            values = response.Values;//Obtiene los valores del request.
            Console.WriteLine("Clave, Nombre, Antigüedad");
            foreach (var row in values)
            {
                // Print columns A and E, which correspond to indices 0 and 4.
                Console.WriteLine("{0}, {1}", row[0], row[1]);
            }
        }

        public void initUserCredential()
        {

            using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = System.Environment.GetFolderPath(
                    System.Environment.SpecialFolder.Personal);
                credPath = Path.Combine(credPath, ".credentials/sheets.googleapis.com-dotnet-quickstart.json");
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    WebConfigurationManager.AppSettings["GoogleAccount"],//Cuenta de Google con la se accedera.
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }

        }

        public void setRange(String initColumn,String endColumn,String name)
        {
            /**
            * Esta función servira para cambiar el rango de lectura
            * de las columnas.
            **/
            //this.range = WebConfigurationManager.AppSettings["GoogleSheetsName"];
            this.range = name;
            this.range = this.range + "!"+initColumn+":"+endColumn;
            /**
             * Actualiza el valor del rango de lectura.
             */ 

        }

    }
}