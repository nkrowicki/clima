import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';



const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {



    const [error, setError] = useState(false);

    //Extraer ciudad y pais
    const { ciudad, pais } = busqueda;

    // Funcion que coloca elementos en el state
    const handleChange = e => {

        //Actualizar state
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    //Validando submit
    const handleSubmit = e => {
        e.preventDefault();

        if (ciudad.trim() === '' || pais.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        // Consultar a la api
        setConsultar(true);

    }


    return (

        <form
            onSubmit={handleSubmit}
        >

            {error ? <Error mensaje="Ambos son obligatorios" /> : null}


            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col 12">
                <select
                    name="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione pais--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País</label>

            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    vale="Buscar clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>"
        </form>);
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired

}

export default Formulario;