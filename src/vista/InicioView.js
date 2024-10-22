import { useEffect, useState } from "react";

const InicioView = () => {
    const [balances, setBalances] = useState([]);        

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetch('http://localhost:8080/dmd/inicio');
                const text = await response.text();
                console.log(text);

                if (!response.ok) {
                    throw new Error('Error al obtener los balances');
                }

                const data = JSON.parse(text);
                setBalances(data);
            } catch (error) {

                console.error('Error fetching balances: ', error);
            }
        };

        fetchBalances();

    }, []);

    const formatearFecha = (fecha) => {
        const [anio, mes] = fecha.split('-');
        const mesesTexto = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        return {
            anio,
            mes: mesesTexto[parseInt(mes, 10) - 1]
        };
    }
    
    return (
        <div className="InicioView">
            <h2>Balance económico</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Ingreso</th>
                        <th scope="col">Mes</th>
                        <th scope="col">Año</th>
                    </tr>
                </thead>
                <tbody>                    
                    {balances.length > 0 ? (                        
                        balances.map(balance => {
                            const { anio, mes } = formatearFecha(balance.fecha);
                            return (
                                <tr key={balance.id}>
                                    <td>{balance.ingreso}€</td>
                                    <td>{mes}</td>
                                    <td>{anio}</td>                                
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="2">No hay balances disponibles</td>
                        </tr>
                    )} 
                </tbody>
            </table>
        </div>
    );
};

export default InicioView;