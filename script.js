const chatBtn = document.getElementById('furii-chat-button');
const chatModal = document.getElementById('furii-chat-modal');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const respostasFurii = {
  "como funciona o rastreamento": "Nosso sistema usa localização via GPS e redes Wi-Fi para rastrear dispositivos com precisão em tempo real.",
  "quais dispositivos sao compativeis": "Atualmente suportamos dispositivos Android, iOS, Windows e macOS.",
  "o rastreamento e por gps ou wifi": "Utilizamos ambos! O GPS para maior precisão, e o Wi-Fi quando o sinal GPS não está disponível.",
  "e necessario internet para funcionar": "Sim, é necessário estar conectado à internet para enviar e receber os dados de localização.",
  "quais leis o sistema segue": "Nosso sistema segue totalmente a LGPD (Lei Geral de Proteção de Dados), o Marco Civil da Internet e normas internacionais como o GDPR. Garantimos consentimento, segurança e transparência no tratamento dos dados.",
  "o que e criptografia pontaaponta": "Criptografia ponta-a-ponta significa que somente quem envia e quem recebe consegue acessar o conteúdo da mensagem. O GeoFurion usa AES-256 para proteger seus dados e TLS 1.3 em todas as conexões.",
  "este software e legalizado": "Sim! O GeoFurion é 100% legalizado, licenciado e protegido por direitos autorais. Pode ser distribuído de forma segura, de acordo com as leis nacionais e internacionais de proteção de dados e software."
};

chatBtn.addEventListener('click', () => {
  const isOpen = chatModal.classList.contains('show');
  
  if (isOpen) {
    chatModal.classList.remove('show');
  } else {
    chatModal.classList.add('show');
    chatBtn.classList.add('rotate');
    setTimeout(() => chatBtn.classList.remove('rotate'), 600);
  }
});


closeChat.addEventListener('click', () => {
  chatModal.classList.remove('show');
});

function addMessage(content, sender = "furii") {
  const msg = document.createElement("div");
  msg.className = `msg bubble ${sender === "user" ? "user-msg" : "furii-msg"}`;
  msg.innerText = content;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleUserInput(message) {
  if (!message.trim()) return;
  addMessage(message, "user");

const pergunta = message
  .toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
  .replace(/[^a-z0-9\s]/gi, "") // remove pontuação
  .trim();


  const resposta = Object.entries(respostasFurii).find(([chave]) =>
    pergunta.includes(chave)
  );

  if (resposta) {
    addMessage(resposta[1], "furii");
  } else {
    addMessage("Woooow, vi que você não é um Furion! Adquira nosso Software e tenha acesso total a mim!! Posso te ajudar a programar, criar mapas dinâmicos e muuuito mais! Compre já!", "furii");
  }
}

sendBtn.addEventListener('click', () => {
  handleUserInput(input.value);
  input.value = "";
});

input.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});

document.querySelectorAll('.chat-option').forEach(btn => {
  btn.addEventListener('click', () => {
    handleUserInput(btn.textContent);
  });
});


const swiper = new Swiper(".casosSwiper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 32,
  centeredSlides: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1, // <-- FORÇA UMA BOX VISÍVEL
});


document.addEventListener("DOMContentLoaded", function () {
  // MENU LATERAL MOBILE
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("mobile-sidebar");
  const closeSidebar = document.getElementById("close-sidebar");

  if (menuToggle && sidebar && closeSidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("show");
    });

    closeSidebar.addEventListener("click", function () {
      sidebar.classList.remove("show");
    });

    document.querySelectorAll(".mobile-nav a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("show");
      });
    });
  }

  // ENVIO DE E-MAIL VIA MAILTO
  const enviarBtn = document.getElementById("enviar-email");

  if (enviarBtn) {
    enviarBtn.addEventListener("click", () => {
      const nome = document.querySelector('input[name="nome"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();

      if (!nome || !email) {
        alert("Por favor, preencha seu nome e e-mail.");
        return;
      }

      const assunto = encodeURIComponent("Pré-inscrição para o GeoFurion");
      const corpo = encodeURIComponent(
        `Olá, meu nome é ${nome}.\nGostaria de realizar minha pré-inscrição no GeoFurion.\n\nMeu e-mail: ${email}`
      );

      const mailtoLink = `mailto:contato@geofurion.com?subject=${assunto}&body=${corpo}`;
      window.location.href = mailtoLink;
    });
  }
});


