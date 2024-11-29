const ctx = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');
const ctx3 = document.getElementById('chart3').getContext('2d');
const ctx4 = document.getElementById('chart4').getContext('2d');    

const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
const cinza = getComputedStyle(document.documentElement).getPropertyValue('--cinza').trim();
const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();
const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul').trim();


let labelsX = ["Agreste", "Zona da Mata", "Sertão"];

let valoresPrivado = [12, 3, 5]; 
let valoresPublica = [8, 6, 4];  

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelsX,  
    datasets: [{
      label: 'Privado',  
      backgroundColor: roxo,  
      data: valoresPrivado,  
      borderWidth: 1
    }, {
      label: 'Pública',  
      backgroundColor: cinza,  
      data: valoresPublica, 
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        barPercentage: 0.9,  
        categoryPercentage: 0.8, 
      }
    }
  }
});

new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labelsX,  
      datasets: [{
        label: 'Privado',  
        backgroundColor: azul,  
        data: valoresPrivado,  
        borderWidth: 1
      }, {
        label: 'Pública',  
        backgroundColor: cinza,  
        data: valoresPublica, 
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          barPercentage: 0.9,  
          categoryPercentage: 0.8, 
        }
      }
    }
  });

new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: labelsX,  
      datasets: [{
        label: 'Privado',  
        backgroundColor: verde,  
        data: valoresPrivado,  
        borderWidth: 1
      }, {
        label: 'Pública',  
        backgroundColor: cinza,  
        data: valoresPublica, 
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          barPercentage: 0.9,  
          categoryPercentage: 0.8, 
        }
      }
    }
  });

new Chart(ctx4, {
  type: 'pie', 
  data: {
    labels: labelsX,
    datasets: [{
      label: 'Privado',
      backgroundColor: verde, 
      data: valoresPrivado,
      borderWidth: 1
    }, {
      label: 'Pública',
      backgroundColor: cinza,
      data: valoresPublica,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true
      }
    }
  }
});
