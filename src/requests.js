// const Parse = require('parse/node')

Parse.serverURL = 'https://parseapi.back4app.com'; 

Parse.initialize(
  'u3w3KPgn5ja6f1i7XW2OVnilH9vceeVtlKvhVv6D',
  'KmiuyRNhRdaExPIvsucfvc3JUIPD3hoKeHkaCApN' 
)

let labelsX = [
    'Agreste Pernambucano',
    'Mata Pernambucana',
    'Sertão Pernambucano',
    'São Francisco Pernambucano',
    'Metropolitana de Recife']

async function getEscolasPorMesorregiao(mesorregiao) {
    const limiteDeRegisros = 250; 
    let escolas = []; 
    let skip = 0;
    let hasMoreData = true;
    let bibliotecasPrivadasCont = 0
    let bibliotecasPublicasCont = 0

    try {
        while (hasMoreData) {
    
            const querySchool = new Parse.Query('censo_esc_2023');
            querySchool.select('TP_DEPENDENCIA','NO_MESORREGIAO','NO_ENTIDADE', 'NO_REGIAO','iN_BIBLIOTECA');
            querySchool.limit(limiteDeRegisros);
            querySchool.skip(skip);
            querySchool.equalTo('NO_MESORREGIAO', mesorregiao)
    
            const data = await querySchool.find();
            
            if (data.length > 0) {
                for (const escola of data) {
                    if (Number(escola.get('TP_DEPENDENCIA')) == 4) {
                        bibliotecasPrivadasCont++
                    } else {
                        bibliotecasPublicasCont++
                    }
                }

                escolas = escolas.concat(data); 
                skip += limiteDeRegisros; 
            } else {
                hasMoreData = false;             
            }
        }
        
        return [bibliotecasPrivadasCont, bibliotecasPublicasCont]; 
    } catch (error) {
        throw error; 
    }
}

labelsX.forEach((mesorregiao)=>{
    getEscolasPorMesorregiao(mesorregiao)
})