
Parse.serverURL = 'https://parseapi.back4app.com'; 

Parse.initialize(
    'u3w3KPgn5ja6f1i7XW2OVnilH9vceeVtlKvhVv6D',
    'KmiuyRNhRdaExPIvsucfvc3JUIPD3hoKeHkaCApN' 
)

window.onload = getSchools(1)

async function getSchools(page) {
    let buttonBefore = document.getElementById('before')
    let buttonAfter = document.getElementById('after')
    let listSchools = document.getElementById('schools')
    listSchools.innerHTML = ''
    
    let skip = (page - 1) * 20;
    let limiteDeRegisros = 20;

    const querySchools = new Parse.Query('censo_esc_2023');
    querySchools.select('IN_INTERNET','QT_PROF_BIBLIOTECARIO','TP_DEPENDENCIA','NO_MESORREGIAO','NO_ENTIDADE', 'NO_REGIAO','iN_BIBLIOTECA');
    querySchools.limit(limiteDeRegisros);
    querySchools.skip(skip);

    let dataSchools = await querySchools.find()

    dataSchools.forEach(async (school)=>{
        
        let container = document.createElement('div')
        container.classList.add('card')
        container.classList.add('d-flex')
        container.classList.add('flex-column')
        container.classList.add('justify-content-center')

        let nameSchool = document.createElement('div')
        nameSchool.classList.add('txt')
        nameSchool.classList.add('d-flex')
        nameSchool.classList.add('flex-row')
        nameSchool.classList.add('justify-content-center')
        let nameSchoolText = document.createElement('p')
        nameSchoolText.classList.add('card-text')
        nameSchoolText.textContent = school.get('NO_ENTIDADE')

        let infosSchool = document.createElement('div')
        infosSchool.classList.add('data')
        infosSchool.classList.add('d-flex')
        infosSchool.classList.add('flex-row')
        infosSchool.classList.add('justify-content-between')

        let regionText = document.createElement('p')
        regionText.textContent = `Região: ${school.get('NO_REGIAO')}`
        
        let mesorregionText = document.createElement('p')
        mesorregionText.textContent = `Mesorregião: ${school.get('NO_MESORREGIAO')}`

        let acessNet = document.createElement('p')
        acessNet.textContent = `Acesso à internet: ${school.get('IN_INTERNET') == 1 ? 'Possui' : 'Não possui'}`

        let acesslibrary = document.createElement('p')
        acesslibrary.textContent = `Acesso à biblioteca: ${school.get('IN_BIBLIOTECA') == 1 ? 'Possui' : 'Não possui'}`

        infosSchool.appendChild(regionText)
        infosSchool.appendChild(mesorregionText)
        infosSchool.appendChild(acessNet)
        infosSchool.appendChild(acesslibrary)

        nameSchool.appendChild(nameSchoolText)
        container.appendChild(nameSchool)
        container.appendChild(infosSchool)
        listSchools.appendChild(container)
    })

    localStorage.setItem('page',page)
    
    if(localStorage.getItem('page') == 1){
        buttonBefore.disabled = true
    } else {
        buttonBefore.disabled = false
    }
    
    buttonBefore.onclick = async ()=>{
        await getSchools(Number(localStorage.getItem('page')) - 1)
    }
    buttonAfter.onclick = async ()=>{
        await getSchools(Number(localStorage.getItem('page')) + 1)
    }
    
}