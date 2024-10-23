import { formatearFecha } from "../../controlador/utils";

const TablaBalance = ({ balances, eliminarBalance }) => {
    return (
        <div className="TablaBalance">
            <h2>Balance económico</h2>
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
                            <td colSpan="4">No hay balances disponibles para este año</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaBalance;
