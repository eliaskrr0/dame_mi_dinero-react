import { useEffect, useState } from "react";

const InicioView = () => {
    const [balances, setBalances] = useState([]);
    const [anios, setAnios] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('');

    useEffect(() => {
        const fetchAnios = async () => {
            try {
                const response = await fetch('http://localhost:8080/dmd/anios');
                const data = await response.json();
                setAnios(data);
                if (data.length > 0) {
                    setAnioSeleccionado(data[0]);
                }
            } catch (error) {
                console.error('Error fetching años: ', error);
            }
        };

        fetchAnios();
    }, []);

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                if (anioSeleccionado) {
                    const response = await fetch(`http://localhost:8080/dmd/inicio?anio=${anioSeleccionado}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los balances');
                    }
                    const data = await response.json();
                    setBalances(data);
                }
            } catch (error) {
                console.error('Error fetching balances: ', error);
            }
        };

        fetchBalances();
    }, [anioSeleccionado]);

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
    };

    return (
        <div className="InicioView">
            <h2>Balance económico</h2>

            {/* Lista desplegable para filtrar por año */}
            <div className="form-group">
                <label htmlFor="anioSeleccionado">Selecciona el año:</label>
                <select id="anioSeleccionado" className="form-control" value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)}>
                    {anios.map(anio => (
                        <option key={anio} value={anio}>
                            {anio}
                        </option>
                    ))}
                </select>
            </div>

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
                            <td colSpan="3">No hay balances disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InicioView;