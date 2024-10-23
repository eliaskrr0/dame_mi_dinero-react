import { useEffect, useState } from "react";
import { formatearFecha } from "../controlador/utils";

const InicioView = () => {
    const [balances, setBalances] = useState([]);
    const [anios, setAnios] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('');
    const [ingreso, setIngreso] = useState('');
    const [fecha, setFecha] = useState('');

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

    const agregarBalance = async (e) => {
        e.preventDefault();
        const nuevoBalance = {
            ingreso: parseFloat(ingreso),
            fecha
        };

        try {
            const response = await fetch('http://localhost:8080/dmd/inicio/insertar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoBalance)
            });

            if (!response.ok) {
                throw new Error('Error al conectar con la URL para insertar datos');
            }

            const data = await response.json();
            console.log('Balance agregado:', data);
            setBalances(prevBalances => [...prevBalances, data]); // Actualiza la lista de balances
            // Limpia el formulario
            setIngreso('');
            setFecha('');
        } catch (error) {
            console.error('Error al insertar nuevos datos', error);
        }
    };

    const eliminarBalance = async (id_balance) => {
        try {
            const response = await fetch(`http://localhost:8080/dmd/inicio/eliminar/${id_balance}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('¡Error al llamar a la URL de eliminar balance!');
            }
            console.log('id_balance: ', id_balance);

            // Filtra el balance eliminado del estado
            setBalances(prevBalances => prevBalances.filter(balance => balance.id_balance !== id_balance));
        } catch (error) {
            console.error('Error al eliminar el balance', error);
        }
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

            {/* Tabla que muestra los datos */}
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">Ingreso</th>
                        <th scope="col">Mes</th>
                        <th scope="col">Año</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.length > 0 ? (
                        balances.map(balance => {
                            const { anio, mes } = formatearFecha(balance.fecha);
                            return (
                                <tr key={balance.id_balance}>
                                    <td>{balance.ingreso}€</td>
                                    <td>{mes}</td>
                                    <td>{anio}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => eliminarBalance(balance.id_balance)}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4">No hay balances disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Formulario para agregar nuevos datos */}
            <h3>Agregar datos nuevos</h3>
            <form onSubmit={agregarBalance}>
                <div className="form-group">
                    <label htmlFor="ingreso">Ingreso:</label>
                    <input type="number" id="ingreso" className="form-control" value={ingreso} onChange={(e) => setIngreso(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input type="date" id="fecha" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Agregar balance</button>
            </form>
        </div>
    );
};

export default InicioView;