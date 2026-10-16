// Script para renderizar la gráfica de barras (RF-4.7) con Chart.js
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('graficaCostosAreas');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Oficina Administrativa A', 
                'Site Principal - Piso 3', 
                'Sala de Juntas B', 
                'Recepción Corporativa', 
                'Laboratorio de Redes'
            ],
            datasets: [
                {
                    label: 'Costo Total Acumulado ($ MXN)',
                    data: [7500, 20500, 6200, 4800, 15300],
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.75)',
                        'rgba(40, 167, 69, 0.75)',
                        'rgba(23, 162, 184, 0.75)',
                        'rgba(255, 193, 7, 0.75)',
                        'rgba(108, 117, 125, 0.75)'
                    ],
                    borderColor: [
                        'rgb(0, 123, 255)',
                        'rgb(40, 167, 69)',
                        'rgb(23, 162, 184)',
                        'rgb(255, 193, 7)',
                        'rgb(108, 117, 125)'
                    ],
                    borderWidth: 2,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Comparativa de Costo Total por Área Arquitectónica (RF-4.7)',
                    font: {
                        size: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Costo Total ($ MXN)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Áreas Arquitectónicas'
                    }
                }
            }
        }
    });
});