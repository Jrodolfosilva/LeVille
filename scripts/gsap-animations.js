// Garante que o GSAP e o ScrollTrigger estão registrados antes de usar.
gsap.registerPlugin(ScrollTrigger);

// Configurações de Animação
const DURATION = 1.2;
const MOVE_DIST = 80;
const STAGGER = 0.2;
const EASY_OUT = "power4.out";

const initialSettings = { autoAlpha: 0, y: MOVE_DIST };

// ------------------------------------------------------------
// NOVA FUNÇÃO CENTRAL: Animação Vinculada ao Scroll (Scrub)
// ------------------------------------------------------------
// A animação começa ao entrar e só termina quando 90% da seção for percorrida.
function createScrubbedFadeIn(triggerSelector, elementsToAnimate, animationProps) {
    const triggerElement = document.querySelector(triggerSelector);
    if (!triggerElement) return;

    // Define o estado inicial (como ponto de partida do scrub)
    gsap.set(elementsToAnimate, initialSettings);

    // Cria a animação de A para B (invisível/deslocado para visível/posição original)
    const scrubbedAnimation = gsap.fromTo(elementsToAnimate,
        initialSettings,
        {
            autoAlpha: 1,
            y: 0,
            ease: "none", // Usamos "none" ou "linear" para o scrub ser previsível
            stagger: 0.05, // Stagger reduzido para não travar o scroll, mas ainda sequencial
            ...animationProps // Permite sobrescrever propriedades como 'x' ou 'scale'
        }
    );

    ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top bottom', // A animação começa quando o topo da seção entra na parte inferior do viewport
        end: 'bottom 10%',   // A animação termina quando a parte inferior da seção atinge 10% do viewport
        scrub: 1.5,          // Vincula a animação ao scroll com suavização de 1.5 segundos (mais suave)
        animation: scrubbedAnimation,
        // markers: true // Descomente para debug
    });
}

// ------------------------------------------------------------
// Efeitos Iniciais (Hero Section) - SEM ANIMAÇÃO NO BANNER
// ------------------------------------------------------------
function initHeroAnimations() {
    // Animação da barra de benefícios (mantida com reversão, sem scrub, pois é curta)
    gsap.set('.carrossel-beneficios li', { autoAlpha: 0, y: 30 });

    gsap.from('.carrossel-beneficios li', {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.carrossel-beneficios',
            start: 'top 95%',
            toggleActions: "play reverse play reverse"
        }
    });
}

// ------------------------------------------------------------
// 1. Empreendimento (Conteúdo + Parallax da Imagem)
// ------------------------------------------------------------
function initEmpreendimentoAnimations() {
    // CONTEÚDO: Agora vinculado ao Scroll (Scrub)
    createScrubbedFadeIn(
        '.empreendimento',
        '.conteudo-empreendimento h2, .conteudo-empreendimento img, .conteudo-empreendimento p, .conteudo-empreendimento h3, .botao-whatsapp'
    );

    // IMAGEM: Parallax (mantido com scrub)
    gsap.from('.img-empreendimento', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
            trigger: '.empreendimento',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            // markers: true
        }
    });
}

// ------------------------------------------------------------
// 2. Lazer (Apenas Título, Texto e Ícones com Scrub)
// ------------------------------------------------------------
function initLazerAnimations() {
    // TÍTULO/TEXTO: Vinculado ao Scroll (Scrub)
    createScrubbedFadeIn('#lazer', '#lazer h2, #lazer p');

    // ÍCONES DE LAZER: Usando scrub com movimento lateral e rotação (mais visível)
    const leisureItems = '.infra-lazer li';
    // Define o estado inicial diferente (lateral + rotação)
    gsap.set(leisureItems, { autoAlpha: 0, x: -100, rotation: -15 });

    // Cria a animação de A para B
    const leisureScrubbedAnimation = gsap.fromTo(leisureItems,
        { autoAlpha: 0, x: -100, rotation: -15 },
        { autoAlpha: 1, x: 0, rotation: 0, ease: "none", stagger: 0.1 }
    );

    ScrollTrigger.create({
        trigger: '.infra-lazer',
        start: 'top bottom',
        end: 'bottom 10%',
        scrub: 1,
        animation: leisureScrubbedAnimation,
        // markers: true
    });
}

// ------------------------------------------------------------
// 3. Plantas e 4. Implementação (Títulos e Conteúdo com Scrub)
// ------------------------------------------------------------
function initPlantasImplantacaoAnimations() {
    // PLANTAS
    createScrubbedFadeIn(
        '.plantas',
        '.conteudo-plantas h2, .conteudo-plantas p, .conteudo-plantas img'
    );

    // IMPLANTAÇÃO
    createScrubbedFadeIn('.implantacao', '.conteudo-implantacao > *');
}

// ------------------------------------------------------------
// 5. Diferenciais (Título + Itens Sequenciais com Scrub)
// ------------------------------------------------------------
function initDiferenciaisAnimations() {
    // TÍTULO: Vinculado ao Scroll (Scrub)
    createScrubbedFadeIn('.diferenciais', '.diferenciais h2');

    // ITENS: Animação de entrada lateral com Scrub
    const differentialItems = '.infra-diferenciais li';
    gsap.set(differentialItems, { autoAlpha: 0, x: -MOVE_DIST });

    // Cria a animação de A para B
    const differentialScrubbedAnimation = gsap.fromTo(differentialItems,
        { autoAlpha: 0, x: -MOVE_DIST },
        { autoAlpha: 1, x: 0, ease: "none", stagger: 0.08 }
    );

    ScrollTrigger.create({
        trigger: '.infra-diferenciais',
        start: 'top bottom',
        end: 'bottom 10%',
        scrub: 1.5,
        animation: differentialScrubbedAnimation,
        // markers: true
    });
}

// ------------------------------------------------------------
// 6. Mapa / Localização (Título + Itens Sequenciais com Scrub)
// ------------------------------------------------------------
function initMapaConveniencia() {
    // TÍTULO/TEXTO: Vinculado ao Scroll (Scrub)
    createScrubbedFadeIn('.mapa', '#mapa h2, #mapa p');

    // ITENS DE CONVENIÊNCIA: Animação de entrada lateral com Scrub
    const convenienceItems = '.destino-item';
    gsap.set(convenienceItems, { autoAlpha: 0, x: -MOVE_DIST });

    // Cria a animação de A para B
    const convenienceScrubbedAnimation = gsap.fromTo(convenienceItems,
        { autoAlpha: 0, x: -MOVE_DIST },
        { autoAlpha: 1, x: 0, ease: "none", stagger: 0.05 }
    );

    ScrollTrigger.create({
        trigger: '.lista-destinos',
        start: 'top bottom',
        end: 'bottom 10%',
        scrub: 1,
        animation: convenienceScrubbedAnimation,
        // markers: true
    });
    
    // Animação da Imagem do Mapa (Para fazer a imagem deslizar ou escalar conforme você rola a seção)
    gsap.from('.mapa-localizacao img', {
        scale: 1.1, // Começa ligeiramente ampliada
        ease: 'none',
        scrollTrigger: {
            trigger: '.mapa',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
}

// ------------------------------------------------------------
// 7. Incorporadora (Conteúdo completo com Scrub)
// ------------------------------------------------------------
function initIncorporadoraAnimations() {
    // Aplica o efeito Vinculado ao Scroll (Scrub)
    createScrubbedFadeIn(
        '.incorporadora',
        '.conteudo-incorporadora > *, .equipe-incorporadora > img'
    );
}

// ------------------------------------------------------------
// Inicializa todas as animações
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initEmpreendimentoAnimations();
    initLazerAnimations();
    initPlantasImplantacaoAnimations();
    initDiferenciaisAnimations();
    initMapaConveniencia();
    initIncorporadoraAnimations();
});