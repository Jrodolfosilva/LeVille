const WEBHOOK_URL = "https://seu-servidor.com/caminho-do-webhook";

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

async function handleSubmit(event) {
  event.preventDefault();

  formMessage.textContent = "Enviando...";
  formMessage.className = "loading";

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    // Requisição POST com dados JSON no corpo, que é o padrão recomendado.
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      formMessage.textContent = "Cadastro realizado com sucesso!";
      formMessage.className = "success";
      form.reset();
    } else {
      formMessage.textContent = ` Erro no servidor (${response.status}). Tente novamente.`;
      formMessage.className = "error";
    }
  } catch (error) {
    console.error("Falha no envio (erro de rede/CORS):", error);
    formMessage.textContent =
      " Erro ao enviar. Verifique sua conexão ou configuração do webhook.";
    formMessage.className = "error";
  }
}

form.addEventListener("submit", handleSubmit);
