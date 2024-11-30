const Parse = require('parse/node')

Parse.serverURL = 'https://parseapi.back4app.com'; 

Parse.initialize(
  'u3w3KPgn5ja6f1i7XW2OVnilH9vceeVtlKvhVv6D',
  'KmiuyRNhRdaExPIvsucfvc3JUIPD3hoKeHkaCApN' 
)

let header = {
    'X-Parse-Application-Id': 'u3w3KPgn5ja6f1i7XW2OVnilH9vceeVtlKvhVv6D',
    'X-Parse-REST-API-Key': 'QYqdyz2IUhM175KWtEqiDX7adZN9KXUtOSrSp3IA'
}

let headerJason = {
    ...header,
    'content-type': 'application/json'
}

async function getRegiao() {
    let regioes = []
    let dataEscolas = await fetch('https://parseapi.back4app.com/classes/censo_esc_2023',{
        method: 'GET',
        headers: header
    }).then((data)=>{
        return data.json()
    })
    
    for (const escola of dataEscolas.results) {
        let nomeRegiao = await escola.NO_REGIAO
        regioes.push(nomeRegiao)
    }
    regioesUnicas = [...new Set(regioes)]

    return regioesUnicas
}

async function getDataPorRegiao(regiao) {

    let where = new URLSearchParams({
        where: JSON.stringify({
            NO_REGIAO: regiao
        })
    })
    
    let data = await fetch(`https://parseapi.back4app.com/classes/censo_esc_2023?${where.toString()}`,{
        method: 'GET',
        headers: headerJason
    }).then((data)=>{
        return data.json()
    })

    return data
}

async function getAll(){
    const querySchool = new Parse.Query('censo_esc_2023')
    querySchool.select('NO_ENTIDADE','NO_REGIAO')
    querySchool.limit(100)
    let data = await querySchool.find().then((dataSchools)=>{
        return dataSchools
    })
    
    return data
}

