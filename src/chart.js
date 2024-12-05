const ctx = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');
  const ctx3 = document.getElementById('chart3').getContext('2d');
  const ctx4 = document.getElementById('chart4').getContext('2d'); 
  
  const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
  const cinza = getComputedStyle(document.documentElement).getPropertyValue('--cinza').trim();
  const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();
  const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul').trim();

  let somabibliotecasPrivadas = 0
  let somabibliotecasPublicas = 0

  for (const quantidade of qntBiblioecasPrivadas) {
      somabibliotecasPrivadas += quantidade
  }

  for (const quantidade of qntBibliotecasPublicas) {
    somabibliotecasPublicas += quantidade
  }
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsX,  
      datasets: [{
        label: 'Privado',  
        backgroundColor: roxo,  
        data: qntBiblioecasPrivadas,  
        borderWidth: 1
      }, {
        label: 'Pública',  
        backgroundColor: cinza,  
        data: qntBibliotecasPublicas, 
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
          data: qntEscolasComInternetPrivadas,  
          borderWidth: 1
        }, {
          label: 'Pública',  
          backgroundColor: cinza,  
          data: qntEscolasComInternetPublicas, 
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
          data: qntBibliotecarioPrivadas,  
          borderWidth: 1
        }, {
          label: 'Pública',  
          backgroundColor: cinza,  
          data: qntBibliotecarioPublicas, 
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
        labels: ['Públicas', 'Privadas'],
        datasets: [{
          label: 'Privado',
          backgroundColor: [verde, roxo], 
          data: [somabibliotecasPublicas, somabibliotecasPrivadas],
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
    },
  );
