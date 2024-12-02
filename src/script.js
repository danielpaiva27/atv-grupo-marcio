Parse.serverURL = 'https://parseapi.back4app.com'; 

Parse.initialize(
    'u3w3KPgn5ja6f1i7XW2OVnilH9vceeVtlKvhVv6D',
    'KmiuyRNhRdaExPIvsucfvc3JUIPD3hoKeHkaCApN' 
)

window.onload = async ()=>{
let loaders = document.querySelectorAll('.loader')

let labelsX = [
    'Agreste Pernambucano',
    'Mata Pernambucana',
    'Sertão Pernambucano',
    'São Francisco Pernambucano',
    'Metropolitana de Recife']

let qntBiblioecasPrivadas = []
let qntBibliotecasPublicas = [] 
let qntBibliotecarioPrivadas = [] 
let qntBibliotecarioPublicas = [] 

for (const mesorregiao of labelsX) {
  let dadosBibliotecas = await getEscolasPorMesorregiao(mesorregiao)
  qntBiblioecasPrivadas.push(dadosBibliotecas[0])
  qntBibliotecasPublicas.push(dadosBibliotecas[1])
  qntBibliotecarioPrivadas.push(dadosBibliotecas[2])
  qntBibliotecarioPublicas.push(dadosBibliotecas[3])
}
for (const loader of loaders) {
    loader.remove()
}

gerarGraficos(labelsX, qntBiblioecasPrivadas, qntBibliotecasPublicas, qntBibliotecarioPrivadas, qntBibliotecarioPublicas)
}

async function getEscolasPorMesorregiao(mesorregiao) {

  const limiteDeRegisros = 250; 
  let escolas = []; 
  let skip = 0;
  let hasMoreData = true;
  let bibliotecasPrivadasCont = 0
  let bibliotecasPublicasCont = 0
  let qntBibliotecarioPrivadas = 0
  let qntBibliotecarioPublicas = 0

  try {
      while (hasMoreData) {
  
          const querySchool = new Parse.Query('censo_esc_2023');
          querySchool.select('QT_PROF_BIBLIOTECARIO','TP_DEPENDENCIA','NO_MESORREGIAO','NO_ENTIDADE', 'NO_REGIAO','iN_BIBLIOTECA');
          querySchool.limit(limiteDeRegisros);
          querySchool.skip(skip);
          querySchool.equalTo('NO_MESORREGIAO', mesorregiao)
  
          const data = await querySchool.find();
          
          if (data.length > 0) {
              for (const escola of data) {
                  if (Number(escola.get('TP_DEPENDENCIA')) == 4) {
                      bibliotecasPrivadasCont++
                      qntBibliotecarioPrivadas += Number(escola.get('QT_PROF_BIBLIOTECARIO'))
                    } else {
                      bibliotecasPublicasCont++
                      qntBibliotecarioPublicas += Number(escola.get('QT_PROF_BIBLIOTECARIO'))
                  }
              }

              escolas = escolas.concat(data); 
              skip += limiteDeRegisros; 
          } else {
              hasMoreData = false;             
          }
      }
      
      return [bibliotecasPrivadasCont, bibliotecasPublicasCont, qntBibliotecarioPrivadas, qntBibliotecarioPublicas]; 
  } catch (error) {
      throw error; 
  }
}

function gerarGraficos(labelsX, qntBiblioecasPrivadas, qntBibliotecasPublicas, qntBibliotecarioPrivadas, qntBibliotecarioPublicas){
  const ctx = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');
  const ctx3 = document.getElementById('chart3').getContext('2d');
  const ctx4 = document.getElementById('chart4').getContext('2d'); 
  
  const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
  const cinza = getComputedStyle(document.documentElement).getPropertyValue('--cinza').trim();
  const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();
  const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul').trim();
  
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
        labels: labelsX,
        datasets: [{
          label: 'Privado',
          backgroundColor: verde, 
          data: qntBiblioecasPrivadas,
          borderWidth: 1
        }, {
          label: 'Pública',
          backgroundColor: roxo,
          data: qntBibliotecasPublicas,
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
}