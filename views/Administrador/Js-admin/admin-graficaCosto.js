document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('admin-graficaCosto');
    const selectProyecto = document.getElementById('proyecto_grafica');
    const btnDescargar = document.getElementById('btnDescargarGrafica');
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Plugin para asegurar fondo blanco en las descargas JPG
    const pluginFondoBlanco = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart) => {
            const { ctx, width, height } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }
    };

    // Base de datos de costos totales por área según el proyecto seleccionado (RF-29)
    const datosProyectos = {
        '1': {
            titulo: 'Proyecto A - Edificio Central F',
            labels: ['Site Principal', 'Laboratorio de Redes'],
            costos: [45000, 32000] // $45,000 y $32,000 acumulados
        },
        '2': {
            titulo: 'Proyecto B - Torre de Innovación',
            labels: ['Piso 1 - Oficinas', 'Piso 2 - Co-Working', 'Data Center B'],
            costos: [58000, 42000, 89000]
        },
        '3': {
            titulo: 'Proyecto C - Biblioteca Central',
            labels: ['Zona de Consulta', 'Aulas Digitales', 'Site Secundario'],
            costos: [26000, 39000, 21000]
        }
    };

    // Paleta de colores para las áreas
    const coloresBase = [
        'rgba(54, 162, 235, 0.75)',  // Azul
        'rgba(255, 159, 64, 0.75)',   // Naranja
        'rgba(75, 192, 192, 0.75)',  // Verde agua
        'rgba(153, 102, 255, 0.75)', // Morado
        'rgba(255, 99, 132, 0.75)'   // Rojo/Rosa
    ];

    const coloresBorde = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
    ];

    // Inicializar gráfica con el primer proyecto
    const proyectoInicial = datosProyectos['1'];

    let graficaAreaPolar = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: proyectoInicial.labels,
            datasets: [{
                label: 'Costo Total Acumulado ($ MXN)',
                data: proyectoInicial.costos,
                backgroundColor: coloresBase.slice(0, proyectoInicial.labels.length),
                borderColor: coloresBorde.slice(0, proyectoInicial.labels.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.8, // Tamaño compacto
            plugins: {
                title: {
                    display: true,
                    text: `Comparativa de Costo Total: ${proyectoInicial.titulo}`,
                    font: { size: 14 }
                },
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return `${label}: $${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        font: { size: 10 },
                        callback: function(value) {
                            return '$' + value.toLocaleString('es-MX');
                        }
                    }
                }
            }
        },
        plugins: [pluginFondoBlanco]
    });

    // Función para actualizar la gráfica en tiempo real al cambiar de proyecto
    function actualizarGrafica() {
        const idProyecto = selectProyecto.value;
        const proyecto = datosProyectos[idProyecto];

        if (proyecto) {
            graficaAreaPolar.data.labels = proyecto.labels;
            graficaAreaPolar.data.datasets[0].data = proyecto.costos;
            graficaAreaPolar.data.datasets[0].backgroundColor = coloresBase.slice(0, proyecto.labels.length);
            graficaAreaPolar.data.datasets[0].borderColor = coloresBorde.slice(0, proyecto.labels.length);
            graficaAreaPolar.options.plugins.title.text = `Comparativa de Costo Total: ${proyecto.titulo}`;
            
            // Renderizar la animación de actualización
            graficaAreaPolar.update();
        }
    }

    // Escuchar el cambio en el selector de proyectos
    if (selectProyecto) {
        selectProyecto.addEventListener('change', actualizarGrafica);
    }

    // Función para descargar la imagen JPG con fondo blanco
    function descargarCapturaJPG() {
        const nombreProyecto = selectProyecto.options[selectProyecto.selectedIndex].text;
        
        setTimeout(() => {
            const imagenJpgUrl = graficaAreaPolar.toBase64Image('image/jpeg', 1.0);
            const enlace = document.createElement('a');
            enlace.href = imagenJpgUrl;
            enlace.download = `Grafica_Costos_${nombreProyecto.replace(/\s+/g, '_')}.jpg`;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
        }, 100);
    }

    if (btnDescargar) {
        btnDescargar.addEventListener('click', descargarCapturaJPG);
    }
});