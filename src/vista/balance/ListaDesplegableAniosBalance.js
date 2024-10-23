import { useEffect, useState } from "react";

const ListaDesplegableAniosBalance = ({ onAnioSeleccionado }) => {
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
                    onAnioSeleccionado(data[0]); // Establece el año seleccionado en el padre
                }
            } catch (error) {
                console.error('Error fetching años: ', error);
            }
        };

        fetchAnios();
    }, [onAnioSeleccionado]);

    const manejarCambioAnio = (e) => {
        const nuevoAnio = e.target.value;
        setAnioSeleccionado(nuevoAnio);
        onAnioSeleccionado(nuevoAnio); // Llama a la función del padre para actualizar el año seleccionado
    };

    return (
        <div className="ListaDesplegableAniosBalance">
            <h2>Balance económico</h2>
            <div className="form-group">
                <label htmlFor="anioSeleccionado">Selecciona el año:</label>
                <select
                    id="anioSeleccionado"
                    className="form-control"
                    value={anioSeleccionado}
                    onChange={manejarCambioAnio} // Usa la nueva función para manejar cambios
                >
                    {anios.map(anio => (
                        <option key={anio} value={anio}>
                            {anio}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ListaDesplegableAniosBalance;
