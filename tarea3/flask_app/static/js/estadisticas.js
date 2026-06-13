async function obtenerDatos() {
  try {
    const url = '/api/data-estadisticas';
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error('Error al obtener datos');
    }

    return respuesta.json();
  }
  catch (error) {
    console.error('Error en la funcion de obtener datos', error);
    throw error;
  }
};

async function crearGraficos() {
    try {
        const datos = await obtenerDatos()

        Highcharts.chart('graficoMiembroPorDia', {
            chart: {type: 'line'},
            title: {text: 'Cantidad de miembros registrados por dia'},
            xAxis: {categories: datos['miembros por dia']['dias']},
            yAxis: {title: 'Cantidad de registros', plotLines: [{value:0, width:1, color:'#808080'}]},
            series: [{name: 'Miembros', data: datos['miembros por dia']['cantidad miembros']}]
        })

        Highcharts.chart('graficoActPorTipo', {
            chart: {type: 'pie'},
            title: {text: 'Total de actividades por tipo'},
            xAxis: {categories: datos['actividades por tipo']['tipos']},
            yAxis: {title: 'Cantidad de actividades', plotLines: [{value:0, width:1, color:'#808080'}]},
            series: [{name: 'Miembros', data: datos['actividades por tipo']['cantidad de actividades']}]
        })

        Highcharts.chart('graficoActPorComuna', {
            chart: {type: 'column'},
            title: {text: 'Cantidad de actividades por comuna'},
            xAxis: {categories: datos['actividades por comuna']['comunas']},
            yAxis: {title: 'Cantidad de actividades', plotLines: [{value:0, width:1, color:'#808080'}]},
            series: [{name: 'Miembros', data: datos['actividades por comuna']['cantidad de actividades']}]
        })
    }
    catch(error) {
        console.error('error al crear los graficos')
    }
}

crearGraficos()