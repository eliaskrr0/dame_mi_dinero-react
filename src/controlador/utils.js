export const formatearFecha = (fecha) => {
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