document.addEventListener("DOMContentLoaded", () => {
    var timeDisplay = document.getElementById("time");
  
   function refreshTime() {
    const optionsDate = {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
  
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };
  
    const date = new Date();
    
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
    
    const formattedString = formattedDate.toLocaleLowerCase() + ' - ' + formattedTime
    
    timeDisplay.innerHTML = formattedString;
  }
  
  refreshTime()
  setInterval(refreshTime, 1000);
  });


  const ulEscolas = document.getElementById("ulEscolas");
  const inputNome = document.getElementById("inputNome");
  const inputRegiao = document.getElementById("inputRegiao");
  const inputBiblioteca = document.getElementById("inputBiblioteca");
  const btAdicionar = document.getElementById("btAdicionar");
  
  // URL e headers da API
  const baseURL = "https://parseapi.back4app.com/classes/escola";
  const headers = {
    "X-Parse-Application-Id": "dM71vWpVmgsm7vOQhK6nSLtqDT1vgv8D3GENv74M",
    "X-Parse-REST-API-Key": "QJSNc49zI2FEA0LoYWPusyIeTnmNFxKMsaAod643",
    "Content-Type": "application/json"
  };
  
  // Função para listar as escolas
  const listarEscolas = async () => {
    try {
      const response = await fetch(baseURL, { method: "GET", headers });
      if (!response.ok) throw new Error("Erro ao acessar o servidor");
      const data = await response.json();
  
      ulEscolas.innerHTML = "";
      data.results.forEach((escola) => {
        const li = document.createElement("li");
        li.textContent = `${escola.nome} - ${escola.regiao} - Biblioteca: ${escola.biblioteca}`;
  
        // Botão para editar a escola
        const btEditar = document.createElement("button");
        btEditar.textContent = "Editar";
        btEditar.onclick = () => editarEscola(escola);
        li.appendChild(btEditar);
  
        // Botão para excluir a escola
        const btExcluir = document.createElement("button");
        btExcluir.textContent = "Excluir";
        btExcluir.onclick = () => excluirEscola(escola.objectId);
        li.appendChild(btExcluir);
  
        ulEscolas.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar as escolas.");
    }
  };
  
  // Função para adicionar uma escola
  const adicionarEscola = async () => {
    const nome = inputNome.value.trim();
    const regiao = inputRegiao.value.trim();
    const biblioteca = inputBiblioteca.value;
  
    if (!nome || !regiao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers,
        body: JSON.stringify({ nome, regiao, biblioteca }),
      });
  
      if (!response.ok) throw new Error("Erro ao adicionar a escola");
  
      inputNome.value = "";
      inputRegiao.value = "";
      listarEscolas();
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar a escola.");
    }
  };
  
  // Função para editar uma escola
  const editarEscola = async (escola) => {
    const novoNome = prompt("Informe o novo nome:", escola.nome);
    const novaRegiao = prompt("Informe a nova região:", escola.regiao);
    const novaBiblioteca = prompt("Possui biblioteca? (Sim/Não):", escola.biblioteca);
  
    if (novoNome && novaRegiao && (novaBiblioteca === "Sim" || novaBiblioteca === "Não")) {
      try {
        const response = await fetch(`${baseURL}/${escola.objectId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ nome: novoNome, regiao: novaRegiao, biblioteca: novaBiblioteca }),
        });
  
        if (!response.ok) throw new Error("Erro ao editar a escola");
  
        listarEscolas();
      } catch (error) {
        console.error(error);
        alert("Erro ao editar a escola.");
      }
    }
  };
  
  // Função para excluir uma escola
  const excluirEscola = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta escola?")) {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: "DELETE",
          headers,
        });
  
        if (!response.ok) throw new Error("Erro ao excluir a escola");
  
        listarEscolas();
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir a escola.");
      }
    }
  };
  
  // Ao carregar a página, listar as escolas
  window.onload = listarEscolas;
  
  // Ao clicar no botão de adicionar, chama a função para adicionar a escola
  btAdicionar.onclick = adicionarEscola;
  