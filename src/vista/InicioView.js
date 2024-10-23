import { useState, useEffect } from "react";
import FormularioGuardarBalance from "./balance/FormularioGuardarBalance";
import TablaBalance from "./balance/TablaBalance";
import ListaDesplegableAniosBalance from "./balance/ListaDesplegableAniosBalance";

const InicioView = () => {
    const [balances, setBalances] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('');

    useEffect(() => {
        const fetchBalances = async () => {
            if (anioSeleccionado) {
                try {
                    const response = await fetch(`http://localhost:8080/dmd/inicio?anio=${anioSeleccionado}`);
                    const data = await response.json();
                    setBalances(data); // Actualiza la lista de balances con los balances del año seleccionado
                } catch (error) {
                    console.error('Error fetching balances: ', error);
                }
            }
        };

        fetchBalances();
    }, [anioSeleccionado]); // Vuelve a obtener balances al cambiar el año seleccionado

    const manejarBalanceAgregado = (nuevoBalance) => {
        setBalances(prevBalances => [...prevBalances, nuevoBalance]);
    };

    const eliminarBalance = async (id_balance) => {
        try {
            const response = await fetch(`http://localhost:8080/dmd/inicio/eliminar/${id_balance}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('¡Error al llamar a la URL de eliminar balance!');
            }

            // Filtra el balance eliminado del estado
            setBalances(prevBalances => prevBalances.filter(balance => balance.id_balance !== id_balance));
            console.log(`Balance con id ${id_balance} eliminado`);
        } catch (error) {
            console.error('Error al eliminar el balance', error);
        }
    };

    return (
        <div className="InicioView">
            <h2>Gestión de Balance Económico</h2>
            <ListaDesplegableAniosBalance onAnioSeleccionado={setAnioSeleccionado} />
            <FormularioGuardarBalance onBalanceAgregado={manejarBalanceAgregado} />
            <TablaBalance
                balances={balances}
                eliminarBalance={eliminarBalance} // Pasa la función eliminarBalance al componente TablaBalance
            />
        </div>
    );
};

export default InicioView;
