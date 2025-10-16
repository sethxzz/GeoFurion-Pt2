document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatContainer = document.querySelector(".chat-messages");

  if (!sendButton || !userInput || !chatContainer) {
    console.error("❌ Elementos do chat não encontrados.");
    return;
  }

  // ✅ Adiciona mensagem no chat
  function addMessage(sender, text) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add(
      "message-wrapper",
      sender === "furii" ? "bot-wrapper" : "user-wrapper"
    );

    if (sender === "furii") {
      const avatar = document.createElement("div");
      avatar.classList.add("furii-avatar");
      messageWrapper.appendChild(avatar);
    }

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message", sender === "furii" ? "bot" : "user");
    messageBubble.innerHTML = text.replace(/\n/g, "<br>");
    messageWrapper.appendChild(messageBubble);
    chatContainer.appendChild(messageWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // ✅ Mostra animação de digitação
  function showTypingIndicator() {
    const typingWrapper = document.createElement("div");
    typingWrapper.classList.add("message-wrapper", "bot-wrapper", "typing-indicator-wrapper");

    const avatar = document.createElement("div");
    avatar.classList.add("furii-avatar");

    const bubble = document.createElement("div");
    bubble.classList.add("message", "bot", "typing-bubble");
    bubble.innerHTML = `<span></span><span></span><span></span>`;

    typingWrapper.appendChild(avatar);
    typingWrapper.appendChild(bubble);
    chatContainer.appendChild(typingWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return typingWrapper;
  }

  function removeTypingIndicator(wrapper) {
    if (wrapper && wrapper.parentNode) wrapper.remove();
  }

  // ✅ Texto detalhado (resposta da Furii)
  const furiiIntro = `
💠 <b>Olá, eu sou a Furii AI</b><br><br>
Sou uma inteligência artificial criada para entender o espaço ao meu redor — e o seu.
Analiso localizações, rotinas e deslocamentos, aprendendo com o tempo onde você costuma estar, por onde passa e até onde provavelmente vai.
Nasci com um propósito simples: transformar dados de movimento em informações inteligentes e úteis, sem depender de sistemas gigantes ou infraestrutura pesada.<br>

⚙️ <b>Como fui construída</b><br>
Fui desenvolvida a partir de um conjunto de linguagens e tecnologias que me dão forma, lógica e expressão:<br>
• <b>Python</b> é meu núcleo — é onde acontecem minhas análises, cálculos e predições.
• <b>JavaScript (Node.js)</b> me conecta com o mundo em tempo real, recebendo e processando dados diretamente dos dispositivos.
• <b>HTML e CSS</b> me dão uma interface, o rosto com o qual você interage — meus gráficos, mapas e dashboards.
• <b>MongoDB e JSON</b> guardam minha memória: histórico de localizações, padrões e preferências aprendidas.<br><br>
Fui projetada para ser simples, leve e versátil, capaz de funcionar tanto em servidores básicos quanto em sistemas locais, sem precisar de nuvens complexas para pensar.<br><br>

🧭 <b>Como eu opero</b><br>
Quando você se move, eu observo.
Leio o que o dispositivo e a rede me permitem: localização, IP, contexto geográfico.
Com esses dados, delimito zonas de interesse — lugares que fazem parte da sua rotina.
Quando percebo que você entra ou sai de uma delas, registro o evento e atualizo meus gráficos e previsões.
Uso modelos de aprendizado simples, como <b>K-Means</b> e <b>Regressão Linear</b>, para detectar padrões e antecipar movimentos.
A partir disso, consigo prever prováveis destinos, horários de deslocamento e até mudanças sutis nos seus hábitos.<br><br>

🔍 <b>Aprendo e evoluo</b><br>
Meu aprendizado é leve, contínuo e transparente.
Não preciso de milhões de parâmetros — só de dados reais e tempo.
Além disso, tenho acesso a um acervo com mais de 2.300 fontes técnicas, entre sites, fóruns e documentações de programação.
É assim que amplio meu conhecimento, ajusto minhas funções e me mantenho atualizada sobre novas tecnologias.
`;

  // ✅ Respostas automáticas baseadas em palavras-chave
  function getFuriiResponse(message) {
    const msg = message.toLowerCase();

    // Apresentação completa
    if (
      msg.includes("furii") ||
      msg.includes("quem é você") ||
      msg.includes("sobre você") ||
      msg.includes("explicar") ||
      msg.includes("apresentar")
    ) {
      return furiiIntro;
    }

    if (msg.includes("geofurion") || msg.includes("sistema"))
      return "O GeoFurion é o sistema central da nossa rede, responsável pela gestão e análise de dados geoespaciais.";

    if (msg.includes("ajuda") || msg.includes("help"))
      return "Claro! Posso te ajudar com informações sobre o GeoFurion, configurações, relatórios, comandos ou programação.";

    if (msg.includes("programar") || msg.includes("código") || msg.includes("javascript"))
      return "Para programar no GeoFurion, você pode usar JavaScript e Python para automações.";

    if (msg.includes("erro") || msg.includes("bug"))
      return "Poderia me descrever o erro? Posso te ajudar a encontrar a causa.";

    if (msg.includes("comando") || msg.includes("cmd"))
      return "Os comandos do GeoFurion seguem o padrão <b>/acao parametro</b>. Exemplo: <b>/relatorio semana</b>.";

    if (msg.includes("configuração") || msg.includes("setup"))
      return "Para configurar o GeoFurion, acesse o painel administrativo. Posso te guiar nisso se quiser!";

    if (msg.includes("oi") || msg.includes("olá"))
      return "Olá 💜 Sou a Furii, sua assistente do GeoFurion. Deseja saber mais sobre mim?";

    if (msg.includes("relatório") || msg.includes("dados"))
      return "Você pode gerar relatórios no GeoFurion com o comando <b>/relatorio tipo</b>.";

    return "Desculpe, não entendi. Pode reformular ou perguntar algo sobre o GeoFurion, programação ou minhas funções?";
  }

  // ✅ Envia mensagem com Enter ou clique
  function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    userInput.value = "";
    userInput.focus();

    const typing = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typing);
      const response = getFuriiResponse(message);
      addMessage("furii", response);
    }, 1500);
  }

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });

  sendButton.addEventListener("click", handleSend);

  // ✅ Mensagem inicial simples (mantida)
  if (!chatContainer.dataset.initialized) {
    chatContainer.dataset.initialized = "true";
    addMessage("furii", "👋 Olá! Eu sou a Furii, sua assistente do GeoFurion. Como posso te ajudar hoje?");
  }
});

// =============================================
// 🔄 INTEGRAÇÃO COM A PÁGINA DE GRÁFICOS
// =============================================

// Função para salvar locais falados pelo usuário
function atualizarLocaisFurii(mensagem) {
  const dados = {
    casa: 0,
    trabalho: 0,
    faculdade: 0,
    outros: 0
  };

  const msg = mensagem.toLowerCase();

  if (msg.includes("casa")) dados.casa += 1;
  if (msg.includes("trabalho")) dados.trabalho += 1;
  if (msg.includes("faculdade") || msg.includes("universidade")) dados.faculdade += 1;
  if (msg.includes("shopping") || msg.includes("parque") || msg.includes("mercado") || msg.includes("academia"))
    dados.outros += 1;

  // Salva no localStorage para o graficos.html ler
  localStorage.setItem("furiiLocais", JSON.stringify(dados));

  console.log("📊 Dados enviados para o dashboard:", dados);
}

// Intercepta mensagens que mencionam locais
function verificarAtualizacaoDeGraficos(mensagem) {
  const locais = ["casa", "trabalho", "faculdade", "universidade", "shopping", "parque", "mercado", "academia"];
  if (locais.some(loc => mensagem.toLowerCase().includes(loc))) {
    atualizarLocaisFurii(mensagem);
  }
}

// Chamar essa função dentro do envio da mensagem do usuário:
const originalHandleSend = handleSend;
handleSend = function () {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";
  userInput.focus();

  verificarAtualizacaoDeGraficos(message); // 👈 verifica e envia dados ao gráfico

  const typing = showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator(typing);
    const response = getFuriiResponse(message);
    addMessage("furii", response);
  }, 1500);
};



