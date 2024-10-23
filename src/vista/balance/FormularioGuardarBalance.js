import { useState } from "react";

const FormularioGuardarBalance = ({ onBalanceAgregado }) => {
    const [ingreso, setIngreso] = useState('');
    const [fecha, setFecha] = useState('');

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
            onBalanceAgregado(data); // Llama a la función del padre para agregar el nuevo balance
            // Limpia el formulario
            setIngreso('');
            setFecha('');
        } catch (error) {
            console.error('Error al insertar nuevos datos', error);
        }
    };

    return (
        <div className="FormularioGuardarBalance">
            <h3>Agregar datos nuevos</h3>
            <form onSubmit={agregarBalance}>
                <div className="form-group">
                    <label htmlFor="ingreso">Ingreso:</label>
                    <input
                        type="number"
                        id="ingreso"
                        className="form-control"
                        value={ingreso}
                        onChange={(e) => setIngreso(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar balance</button>
            </form>
        </div>
    );
};

export default FormularioGuardarBalance;
