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
let qntEscolasComInternetPrivadas = [] 
let qntEscolasComInternetPublicas = [] 

for (const mesorregiao of labelsX) {
  let dadosBibliotecas = await getEscolasPorMesorregiao(mesorregiao)
  qntBiblioecasPrivadas.push(dadosBibliotecas[0])
  qntBibliotecasPublicas.push(dadosBibliotecas[1])
  qntBibliotecarioPrivadas.push(dadosBibliotecas[2])
  qntBibliotecarioPublicas.push(dadosBibliotecas[3])
  qntEscolasComInternetPrivadas.push(dadosBibliotecas[4])
  qntEscolasComInternetPublicas.push(dadosBibliotecas[5])
}
for (const loader of loaders) {
    loader.remove()
}

gerarGraficos(labelsX, qntBiblioecasPrivadas, qntBibliotecasPublicas, qntBibliotecarioPrivadas, qntBibliotecarioPublicas, qntEscolasComInternetPrivadas, qntEscolasComInternetPublicas)
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
  let qntEscolasComInternetPrivadas = 0
  let qntEscolasComInternetPublicas = 0

  try {
      while (hasMoreData) {
  
          const querySchool = new Parse.Query('censo_esc_2023');
          querySchool.select('IN_INTERNET','QT_PROF_BIBLIOTECARIO','TP_DEPENDENCIA','NO_MESORREGIAO','NO_ENTIDADE', 'NO_REGIAO','iN_BIBLIOTECA');
          querySchool.limit(limiteDeRegisros);
          querySchool.skip(skip);
          querySchool.equalTo('NO_MESORREGIAO', mesorregiao)
  
          const data = await querySchool.find();
          
          if (data.length > 0) {
              for (const escola of data) {
                  if (Number(escola.get('TP_DEPENDENCIA')) == 4) {
                      if (Number(escola.get('IN_INTERNET')) == 1) {
                        qntEscolasComInternetPrivadas ++
                      }
                      bibliotecasPrivadasCont++
                      qntBibliotecarioPrivadas += Number(escola.get('QT_PROF_BIBLIOTECARIO'))
                    } else {
                      if (Number(escola.get('IN_INTERNET')) == 1) {
                        qntEscolasComInternetPublicas ++
                      }
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
      
      return [bibliotecasPrivadasCont, bibliotecasPublicasCont, qntBibliotecarioPrivadas, qntBibliotecarioPublicas, qntEscolasComInternetPrivadas, qntEscolasComInternetPublicas]; 
  } catch (error) {
      throw error; 
  }
}

function gerarGraficos(labelsX, qntBiblioecasPrivadas, qntBibliotecasPublicas, qntBibliotecarioPrivadas, qntBibliotecarioPublicas, qntEscolasComInternetPrivadas, qntEscolasComInternetPublicas){
}
