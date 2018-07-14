function getCompoundColumnsHeaders() {
    return [
        { field: "clave", label: "No.Empleado" },
        { field: "nombre", label: "Nombre" },
        { field: "antiguedad", label: "Antigüedad" },
        getPagoHeader(),
        getPersepcionesHeader()
    ]

}

function getPersepcionesHeader() {
    return {
        label: "Percepciones", children: [
            {
                label: "1", children: [
                    {
                        label: "Sueldo", children: [
                            { field: "P_Sueldo_Gravado", label: "Gravado" },
                            { field: "P_Sueldo_Exento", label: "Exento" }
                        ]
                    }
                ]
            },
            {
                label: "2", children: [
                    {
                        label: "Aguinaldo", children: [
                            { field: "P_Aguinaldo_Gravado", label: "Gravado" },
                            { field: "P_Aguinaldo_Exento", label: "Exento" }
                        ]
                    }
                ]
            },
            {
                label: "3", children: [
                    {
                        label: "PTU", children: [
                            { field: "P_PTU_Gravado", label: "Gravado" },
                            { field: "P_PTU_Exento", label: "Exento" }
                        ]
                    }
                ]
            },
            {
                label: "4", children: [
                    {
                        label: "Reembolso de Gastos\nMédicos Dentales y \n Hospitalarios", children: [
                            { field: "P_RGMDH_Gravado", label: "Gravado" },
                            { field: "P_RGMDH_Exento", label: "Exento" }
                        ]
                    }
                ]
            },
            {
                label: "5", children: [
                    {
                        label: "Fonde de Ahorro", children: [
                            { field: "P_FDA_Gravado", label: "Gravado" },
                            { field: "P_FDA_Exento", label: "Exento" }
                        ]
                    }
                ]
            },
            {
                label: "6", children: [
                    {
                        label: "Caja de Ahorro", children: [
                            { field: "P_CDA_Gravado", label: "Gravado" },
                            { field: "P_CDA_Exento", label: "Exento" }
                        ]
                    }
                ]
            }
        ]
    }
}
function getPagoHeader() {
    return {
        label: "PAGO", children: [
            {
                label: " ", children: [
                    {
                        label: "Total", children: [
                            { field: "Fecha", label: "Fecha" },
                            { field: "FechaI", label: "Fecha Inicio" },
                            { field: "FechaF", label: "Fecha Fin" },
                            { field: "DiasPagodos", label: "Dias Pagados" },
                            { field: "Banco", label: "Banco" },
                            { field: "Clabe", label: "Clabe" },
                            { field: "Monto", label: "Monto" }
                        ]
                    }
                ]
            }
        ]
    }
}