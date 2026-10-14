const ctx = document.getElementById('graficaMetraje').getContext('2d');

const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [{
        label: 'Metraje Calculado (Metros)',
        data: [65, 59, 80, 81, 26, 55, 40],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#007bff',
        fill: false
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Tendencia de Metraje Proyectado',
                font: { size: 16 }
            }
        }
    }
};

new Chart(ctx, config);
