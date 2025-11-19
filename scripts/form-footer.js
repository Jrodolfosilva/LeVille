const WEBHOOK_URL_DARK = 'https://seu-servidor.com/caminho-do-webhook-dark'; 


const formDark = document.getElementById('contact-form-dark');
        const formMessageDark = document.getElementById('form-message-dark');

        async function handleSubmitDark(event) {
            event.preventDefault();

            formMessageDark.textContent = 'Enviando...';
            formMessageDark.className = 'loading';
            
            const formData = new FormData(formDark);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            try {
                // Configuração POST para envio JSON (padrão recomendado)
                const response = await fetch(WEBHOOK_URL_DARK, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    formMessageDark.textContent = 'Cadastro realizado com sucesso!';
                    formMessageDark.className = 'success';
                    formDark.reset();
                } else {
                    formMessageDark.textContent = `Erro no servidor (${response.status}).`;
                    formMessageDark.className = 'error';
                }

            } catch (error) {
                console.error('Falha no envio:', error);
                formMessageDark.textContent = 'Erro ao enviar. Verifique a conexão.';
                formMessageDark.className = 'error';
            }
        }

        formDark.addEventListener('submit', handleSubmitDark);