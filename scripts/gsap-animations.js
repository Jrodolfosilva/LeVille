// Garante que o GSAP e o ScrollTrigger estão registrados antes de usar.
gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------
// Efeitos Iniciais (Banner/Hero Section)
// ------------------------------------------------------------
function initHeroAnimations() {
    // Esconde o conteúdo inicial para evitar o "Flash of Unstyled Content" (FOUC)
    gsap.set('.banner-conteudo > div, .form', { autoAlpha: 0, y: 30 });
    gsap.set('.carrossel-beneficios li', { autoAlpha: 0, y: 15 });

    // Cria uma Timeline para orquestrar a entrada do conteúdo do banner
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

    tl.to('.blur-banner', { duration: 0.5, opacity: 1 }, 0) // Garante que o blur/conteúdo aparece (se estiver oculto por CSS)
      .to('.localizacao', { autoAlpha: 1, y: 0 }, 0.2)
      .to('h1', { autoAlpha: 1, y: 0 }, 0.3)
      .to('.banner-conteudo p', { autoAlpha: 1, y: 0 }, 0.4)
      .to('.botao-cta', { autoAlpha: 1, y: 0 }, 0.5)
      .to('.form', { autoAlpha: 1, x: 0 }, 0.6)

    // Animação para a barra de benefícios após o banner
    gsap.from('.carrossel-beneficios li', {
        autoAlpha: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.1, // Anima cada item com um pequeno atraso
        ease: "power1.out",
        scrollTrigger: {
            trigger: '.carrossel-beneficios',
            start: 'top 95%', // Inicia um pouco antes de entrar na tela
            // markers: true // Descomente para debug
        }
    });
}

// ------------------------------------------------------------
// Efeito de Entrada Genérico (Fade-in e Subida)
// ------------------------------------------------------------
// Esta função será usada para a maioria das seções (Empreendimento, Plantas, Implantacao, Diferenciais, Incorporadora)
function createFadeInScrollTrigger(triggerSelector, elementsToAnimate) {
    const triggerElement = document.querySelector(triggerSelector);
    if (!triggerElement) return;

    // Define o estado inicial: opacidade 0, movido 30px para baixo
    gsap.set(elementsToAnimate, { autoAlpha: 0, y: 30 });

    ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 80%', // Inicia a animação quando o topo da seção estiver a 80% do viewport
        onEnter: () => {
            gsap.to(elementsToAnimate, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15, // Pequeno atraso entre os elementos (título, parágrafo, etc)
                ease: "power2.out",
                overwrite: true // Permite que a animação seja interrompida e reiniciada
            });
        },
        // onLeaveBack: () => {
        //     // Opcional: Para resetar a animação ao subir a rolagem
        //     gsap.to(elementsToAnimate, { autoAlpha: 0, y: 30, duration: 0.3, overwrite: true });
        // },
        once: true // Executa a animação apenas uma vez ao entrar na tela
        // markers: true // Descomente para debug
    });
}

// ------------------------------------------------------------
// Animação da Seção Lazer (Entrada Sequencial dos Itens)
// ------------------------------------------------------------
function initLazerAnimations() {
    const triggerElement = document.querySelector('#lazer');
    const titleElements = '#lazer h2, #lazer p';
    const leisureItems = '.infra-lazer li';

    if (!triggerElement) return;

    // Animação do Título e Parágrafo da Seção Lazer (Fade-in padrão)
    createFadeInScrollTrigger('#lazer', titleElements);

    // Efeito de entrada sequencial para os Ícones de Lazer
    gsap.set(leisureItems, { autoAlpha: 0, scale: 0.8 });

    ScrollTrigger.create({
        trigger: '.infra-lazer',
        start: 'top 85%',
        onEnter: () => {
            gsap.to(leisureItems, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.08, // Pequeno atraso sequencial para os ícones
                ease: "back.out(1.7)", // Efeito mais dinâmico
                overwrite: true
            });
        },
        // onLeaveBack: () => {
        //     gsap.to(leisureItems, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: true });
        // },
        once: true
        // markers: true
    });
}

// ------------------------------------------------------------
// Animação Imagem + Conteúdo (Ex: Empreendimento)
// ------------------------------------------------------------
function initEmpreendimentoAnimations() {
    const triggerElement = document.querySelector('.empreendimento');
    if (!triggerElement) return;

    // Imagem da Esquerda: Movimento Parallax / Deslizamento
    gsap.from('.img-empreendimento', {
        y: 100, // Começa mais abaixo
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom', // Quando a seção entrar por baixo
            end: 'bottom top',   // Termina quando a seção sair por cima
            scrub: true,         // Vincula a animação à rolagem (Parallax)
            // markers: true
        }
    });

    // Conteúdo da Direita: Fade-in e subida
    createFadeInScrollTrigger('.empreendimento', '.conteudo-empreendimento h2, .conteudo-empreendimento img, .conteudo-empreendimento p, .conteudo-empreendimento h3, .botao-whatsapp');
}

// ------------------------------------------------------------
// Animação Lista de Conveniências (Mapa)
// ------------------------------------------------------------
function initMapaConveniencia() {
    const triggerElement = document.querySelector('.lista-destinos');
    const convenienceItems = '.destino-item';

    if (!triggerElement) return;

    createFadeInScrollTrigger('.mapa', '#mapa h2, #mapa p');

    gsap.set(convenienceItems, { autoAlpha: 0, x: -30 });

    ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(convenienceItems, {
                autoAlpha: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.05, // Entrada rápida sequencial
                ease: "power1.out",
                overwrite: true
            });
        },
        once: true
        // markers: true
    });
}

// ------------------------------------------------------------
// Inicializa todas as animações
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Animações de Entrada da Primeira Seção (Hero)
    initHeroAnimations();

    // 2. Animação da Seção Empreendimento (Fade-in Conteúdo + Parallax Imagem)
    initEmpreendimentoAnimations();

    // 3. Animações de Entrada Genéricas por Seção
    createFadeInScrollTrigger('.plantas', '.conteudo-plantas > *');
    createFadeInScrollTrigger('.implantacao', '.conteudo-implantacao > *');
    createFadeInScrollTrigger('.diferenciais', '.diferenciais h2');
    createFadeInScrollTrigger('.infra-diferenciais', '.infra-diferenciais li'); // Atraso sequencial para diferenciais
    createFadeInScrollTrigger('.incorporadora', '.conteudo-incorporadora > *, .equipe-incorporadora > img');

    // 4. Animação específica para Seção Lazer (entrada sequencial dos ícones)
    initLazerAnimations();

    // 5. Animação de Entrada para Itens de Conveniência (Mapa)
    initMapaConveniencia();
});