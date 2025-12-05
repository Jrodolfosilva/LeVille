

function SwiperLazer() {
  const swiperThumbs = new Swiper(".lazerSwiperThumbs", {
    spaceBetween: 20,
    slidesPerView: 4,
    freeMode: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: true,
    preloadImages: false,

    navigation: {
      nextEl: ".swiper-button-next-thumbs",
      prevEl: ".swiper-button-prev-thumbs",
    },

    // 🔹 Responsividade
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  const swiperMain = new Swiper(".lazerSwiper", {
    spaceBetween: 10,
    preloadImages: false,
    thumbs: { swiper: swiperThumbs },
  });
}
SwiperLazer();



function SwiperPlantas() {
  const swiperPlantasThumbs = new Swiper(".swiperPlantasThumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: true,
    preloadImages: false,
    lazy: true,

    // 🔹 Responsividade
    breakpoints: {
      0: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  const swiperPlantas = new Swiper(".swiperPlantas", {
    spaceBetween: 10,
    preloadImages: false,
    lazy: true,
    navigation: {
      nextEl: ".swiper-button-next-plantas",
      prevEl: ".swiper-button-prev-plantas",
    },
    thumbs: { swiper: swiperPlantasThumbs },
  });
}
SwiperPlantas();



function SwiperImplatacao() {
  const swiperImplatacaoThumbs = new Swiper(".swiperImplatacaoThumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: true,
    preloadImages: false,

    // 🔹 Responsividade
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  const swiperImplatacao = new Swiper(".swiperImplatacao", {
    spaceBetween: 10,
    preloadImages: false,
    thumbs: { swiper: swiperImplatacaoThumbs },
    navigation: {
      nextEl: ".swiper-button-next-implantacao",
      prevEl: ".swiper-button-prev-implantacao",
    },
  });
}
SwiperImplatacao();




function SwiperHome() {
  const swiperHome = new Swiper(".swiperBannerFundo", {
    slidesPerView: 1, 
    spaceBetween: 0,
    loop: false, 
    effect: 'fade', 
    speed: 700,
        autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },

    // ➡️ Navegação usando os botões dentro do banner-conteudo
    navigation: {
      nextEl: ".swiper-button-next-banner",
      prevEl: ".swiper-button-prev-banner",
    },

    
  });
}

SwiperHome();




function menuActive (){

  
}

menuActive()