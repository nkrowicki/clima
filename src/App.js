import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  const appidKey = '650549deed9da4752e697cd3a4ce83f4';

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({})

  const [error, setError] = useState(false)

  const { ciudad, pais } = busqueda;

  useEffect(() => {

    if (consultar) {

      const consultarAPI = async () => {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appidKey}`)
        const res = await respuesta.json();
        setResultado(res);
        //Para que nos permita hacer otra consulta
        setConsultar(false);

        //Detecta si hubo errores en la consulta
        if (res.cod === '404') setError(true)
        else setError(false);

      }
      
      consultarAPI();
    }

    //es-lint-disable-next-line
  }, [consultar]);


  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima
      resultado={resultado} />
  }


  return (
    <Fragment>
      <Header
        titulo='Clima react app'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">

              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
