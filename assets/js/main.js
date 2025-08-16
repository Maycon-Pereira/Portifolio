(function ($) {

  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    preloaderSetup();
  });

  $(document).on("ready", function () {
    $(window).trigger("resize");
    dynamicBackground();
    formValidation();
    progressBarInit();
    stickyHeader();
    onePageNavigation();
    mainMenu();
    lightGallery();
    socialBtnHover();
    slickInit();
    particles();
    parallaxEffect();
    rippleInit();
    new WOW().init();

  });

  $(window).on("scroll", function () {
    stickyHeader();
    parallaxEffect();
  });

  /*--------------------------------------------------------------
    1. Placeholder
  --------------------------------------------------------------*/
  function preloaderSetup() {
    $(".st-perloader").fadeOut();
    $("st-perloader-in").delay(150).fadeOut("slow");
  }

  /*--------------------------------------------------------------
    2. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    // Background images
    $('.st-dynamic-bg').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')'
      });
    });
  }

  /*--------------------------------------------------------------
    3. Menu
  --------------------------------------------------------------*/
  function mainMenu() {
    $('.st-nav').append('<span class="st-munu-toggle"><span></span></span>');
    $('.menu-item-has-children').append('<span class="st-munu-dropdown-toggle"></span>');

    $('.st-munu-toggle').on('click', function () {
      $(this).toggleClass("st-toggle-active").siblings('.st-nav-list').slideToggle();
    });

    $('.st-munu-dropdown-toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
    });
    $(document).on('click', function (event) {
      var menuContainer = $('.st-nav');
      if (!menuContainer.is(event.target) && menuContainer.has(event.target).length === 0) {
        $('.st-munu-toggle').removeClass("st-toggle-active");
        $('.st-nav-list').slideUp();
        $('.st-munu-dropdown-toggle').removeClass('active').siblings('ul').slideUp();
      }
    });
  }


  /*--------------------------------------------------------------
    4. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.st-sticky-header').addClass('st-sticky-active');
    } else {
      $('.st-sticky-header').removeClass('st-sticky-active');
    }
  }

  /*--------------------------------------------------------------
    5. One Page Navigation
  --------------------------------------------------------------*/
  function onePageNavigation() {
    // Click To Go Top
    $('.st-smooth-move').on('click', function () {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        var scrollPoint = $(thisAttr).offset().top - 10;
        $('body,html').animate({
          scrollTop: scrollPoint
        }, 800);
      }
      return false;
    });

    // One Page Active Class
    var topLimit = 300,
      ultimateOffset = 200;

    $('.st-onepage-nav').each(function () {
      var $this = $(this),
        $parent = $this.parent(),
        current = null,
        $findLinks = $this.find("a");

      function getHeader(top) {
        var last = $findLinks.first();
        if (top < topLimit) {
          return last;
        }
        for (var i = 0; i < $findLinks.length; i++) {
          var $link = $findLinks.eq(i),
            href = $link.attr("href");

          if (href.charAt(0) === "#" && href.length > 1) {
            var $anchor = $(href).first();
            if ($anchor.length > 0) {
              var offset = $anchor.offset();
              if (top < offset.top - ultimateOffset) {
                return last;
              }
              last = $link;
            }
          }
        }
        return last;
      }

      $(window).on("scroll", function () {
        var top = window.scrollY,
          height = $this.outerHeight(),
          max_bottom = $parent.offset().top + $parent.outerHeight(),
          bottom = top + height + ultimateOffset;

        var $current = getHeader(top);

        if (current !== $current) {
          $this.find(".active").removeClass("active");
          $current.addClass("active");
          current = $current;
        }
      });
    });
  }


  /*--------------------------------------------------------------
    6. Progress Bar
  --------------------------------------------------------------*/
  function progressBarInit() {
    $('.st-progressbar').each(function () {
      var progressPercentage = $(this).data('progress') + "%";
      $(this).find('.st-progressbar-in').css('width', progressPercentage);
    });
  }


  /*--------------------------------------------------------------
    7. Ajax Contact Form And Appointment
  --------------------------------------------------------------*/
  // Contact Form
  function formValidation() {
    if ($.exists('#contact-form #submit')) {
      $('#st-alert').hide();
      $('#contact-form #submit').on('click', function () {
        var name = $('#name').val();
        var subject = $('#subject').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
          $('#st-alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>');
          return false;
        }

        name = $.trim(name);
        subject = $.trim(subject);
        phone = $.trim(phone);
        email = $.trim(email);
        msg = $.trim(msg);

        if (name != '' && email != '' && msg != '') {
          var values = "name=" + name +
            "&subject=" + subject +
            "&phone=" + phone +
            "&email=" + email +
            "&msg=" + msg;
          $.ajax({
            type: "POST",
            url: "assets/php/mail.php",
            data: values,
            success: function () {
              $('#name').val('');
              $('#subject').val('');
              $('#phone').val('');
              $('#email').val('');
              $('#msg').val('');

              $('#st-alert').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
              setTimeout(function () {
                $('#st-alert').fadeOut('slow');
              }, 4000);
            }
          });
        } else {
          $('#st-alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
        }
        return false;
      });
    }
  }


  /*--------------------------------------------------------------
    8. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    $('.st-lightgallery').each(function () {
      $(this).lightGallery({
        selector: '.st-lightbox-item',
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
        autoplay: true
      });
    });
  }

  /*--------------------------------------------------------------
    9. Social Button Hover
  --------------------------------------------------------------*/
  function socialBtnHover() {
    $(".st-social-btn").hover(
      function () {
        $(this).addClass("active").siblings().removeClass('active');
      }
    )
  }

  /*--------------------------------------------------------------
    10. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    $('.st-slider').each(function () {
      // Slick Variable
      var $ts = $(this).find('.slick-container');
      var $slickActive = $(this).find('.slick-wrapper');
      var $sliderNumber = $(this).siblings('.slider-number');

      // Auto Play
      var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
      // Auto Play Time Out
      var autoplaySpdVar = 3000;
      if (autoPlayVar > 1) {
        autoplaySpdVar = autoPlayVar;
        autoPlayVar = 1;
      }
      // Slide Change Speed
      var speedVar = parseInt($ts.attr('data-speed'), 10);
      // Slider Loop
      var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
      // Slider Center
      var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
      // Pagination
      var paginaiton = $(this).children().hasClass('pagination');
      // Slide Per View
      var slidesPerView = $ts.attr('data-slides-per-view');
      if (slidesPerView == 1) {
        slidesPerView = 1;
      }
      if (slidesPerView == 'responsive') {
        var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
        var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
        var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
        var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
        var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
      }
      // Fade Slider
      var fadeVar = parseInt($($ts).attr('data-fade-slide'));
      (fadeVar === 1) ? (fadeVar = true) : (fadeVar = false);

      // Slick Active Code
      $slickActive.slick({
        infinite: true,
        autoplay: autoPlayVar,
        dots: paginaiton,
        centerPadding: '0',
        speed: speedVar,
        infinite: loopVar,
        autoplaySpeed: autoplaySpdVar,
        centerMode: centerVar,
        fade: fadeVar,
        prevArrow: $(this).find('.slick-arrow-left'),
        nextArrow: $(this).find('.slick-arrow-right'),
        appendDots: $(this).find('.pagination'),
        slidesToShow: slidesPerView,
        responsive: [{
          breakpoint: 1600,
          settings: {
            slidesToShow: lgPoint
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: mdPoint
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: smPoint
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: xsPoing
          }
        }
        ]
      });
    })
  }
  /*--------------------------------------------------------------
    11. particles
  --------------------------------------------------------------*/
  function particles() {
    if ($.exists('#particles-js')) {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 355,
            "density": {
              "enable": true,
              "value_area": 789.1476416322727
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.48927153781200905,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.6,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 5,
              "size_min": 0,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 83.91608391608392,
              "size": 1,
              "duration": 3,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }
  /*--------------------------------------------------------------
    12. Ripple
  --------------------------------------------------------------*/
  function rippleInit() {
    if ($.exists('.st-ripple-version')) {
      $('.st-ripple-version').each(function () {
        $('.st-ripple-version').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    13. Parallax Effect
  --------------------------------------------------------------*/
  function parallaxEffect() {
    $('.st-parallax').each(function () {
      var windowScroll = $(document).scrollTop(),
        windowHeight = $(window).height(),
        barOffset = $(this).offset().top,
        barHeight = $(this).height(),
        barScrollAtZero = windowScroll - barOffset + windowHeight,
        barHeightWindowHeight = windowScroll + windowHeight,
        barScrollUp = barOffset <= (windowScroll + windowHeight),
        barSctollDown = barOffset + barHeight >= windowScroll;

      if (barSctollDown && barScrollUp) {
        var calculadedHeight = barHeightWindowHeight - barOffset;
        var largeEffectPixel = ((calculadedHeight / 5));
        var mediumEffectPixel = ((calculadedHeight / 20));
        var miniEffectPixel = ((calculadedHeight / 10));

        $(this).find('.st-to-left').css('transform', `translateX(-${miniEffectPixel}px)`);
        $(this).find('.st-to-right').css('transform', `translateX(${miniEffectPixel}px)`);
        $(this).css('background-position', `center -${largeEffectPixel}px`);
      }
    });
  }
})(jQuery); // End of use strict


function emailForm() {

  nome = document.getElementById('name').value
  email = document.getElementById('email').value
  subject = document.getElementById('subject').value
  msg = document.getElementById('msg').value



  $.ajax({
    method: 'POST',
    url: 'https://formsubmit.co/ajax/pmaycon63@gmail.com',
    dataType: 'json',
    accepts: 'application/json',
    data: {
      name: nome,
      email: email,
      subject: subject,
      message: msg
    },
    success: (data) => console.log(),
    error: (err) => console.log(err)
  });


}

/* 
var openPopups = document.getElementsByClassName("openPopup");

// Itera sobre cada elemento e adiciona um evento de clique
for (var i = 0; i < openPopups.length; i++) {
  openPopups[i].addEventListener("click", function () {
    document.getElementById("popupContainer").style.display = "block";
  });
}

document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("popupContainer").style.display = "none";
});

window.addEventListener("click", function (event) {
  var popup = document.getElementById("popupContainer");
  if (event.target == popup) {
    popup.style.display = "none";
  }
}); */


const translations = {
  pt: {
    homeNav: 'Início',
    aboutNav: 'Sobre',
    servicesNav: 'Serviços',
    resumeNav: 'Experiência',
    skillsNav: 'Habilidades',
    projectsNav: 'Projetos',
    contactNav: 'Contate-me',

    ola1: 'Olá, Eu sou',
    profss: 'Engenheiro de Software',
    contrat: 'Contrate-me',

    aboutMe: 'SOBRE MIM',

    aboutTitle: 'Olá, sou o Maycon Pereira',
    aboutResume: 'Ingeniero de Software con más de 3 años de experiencia en back-end con Java y Spring Boot. Enfoque en APIs RESTful seguras, pruebas automatizadas (JUnit, Mockito, Postman), control de versiones con Git e integración continua (Jenkins, GitHub Actions). Experiencia en equipos ágiles con liderazgo técnico de squads, utilizando bases de datos relacionales y arquitectura orientada a servicios. Comprometido con código limpio, calidad y entregas consistentes.',

    birthday: 'Aniversário',
    birthdayDate: '25 de Agosto 2005',
    souDe: 'Sou De',
    souDeBrazil: 'Barueri, SP, Brasil',
    language: 'Idiomas',
    languageTraslate: 'Português, Inglês',
    free: 'Disponível',
    downloadCV: 'Baixar CV',

    service: 'SERVIÇOS',

    box1: 'Java & Back-End',
    box2: `Desenvolvimento de APIs RESTful com Spring Boot.
Foco em arquitetura escalável e robusta.
Integração entre sistemas e serviços.`,
    box3: 'Banco de Dados',
    box4: `Experiência com MySQL e PostgreSQL.
Modelagem e manutenção de dados.
Otimização de consultas SQL.`,
    box5: 'Controle de Versão',
    box6: `Uso avançado de Git e GitHub.
Criação e gerenciamento de branches.
Colaboração em equipes de desenvolvimento.`,
    box7: 'Aplicações',
    box8: `Implantação de aplicações Spring Boot.
Configuração de ambientes produtivos.
Monitoramento e manutenção contínua.`,
    box9: 'Segurança',
    box10: `Implementação de autenticação e autorização.
Configuração de Spring Security.
Boas práticas contra vulnerabilidades.`,
    box11: 'Testes & QA',
    box12: `Testes unitários e de integração com JUnit.
Validação de APIs com Postman.
Garantia de qualidade no ciclo de desenvolvimento.`,

    exp: 'EXPERIÊNCIA',
    exp1: 'Experiência',

    qaEng: 'Engenheiro QA',
    atual: 'Até o momento',

    resumeExperienceQA: 'Atuando como QA Engineer, contribuindo para garantir a qualidade das entregas por meio de testes automatizados, documentação de cenários, acompanhamento dos ciclos de desenvolvimento e apoio na identificação de melhorias nos processos e sistemas. Sempre aprendendo e evoluindo com o time!',
    resumeExperienceFre: 'Conduzi o desenvolvimento completo de um e-commerce com WordPress e Elementor, integrando WooCommerce e aplicando melhorias de UX e SEO que aumentaram as vendas em 700%.',
    resumeExperienceFull: 'Conduzi de forma independente o desenvolvimento de uma aplicação web completa, abrangendo front-end, back-end e banco de dados para a Fieb. Essa experiência fortaleceu minhas habilidades em desenvolvimento, integração de sistemas e gestão de projetos.',

    graduacao: 'Graduação',
    graduation: 'Análise e Desenvolvimento de Sistemas (ADS)',
    resumeGraduacao: 'Estou estudando na São Judas para me formar e me estabelecer no mercado, adquirindo conhecimentos sólidos e aproveitando grandes oportunidades na área de tecnologia, com foco em desenvolvimento de software, segurança e qualidade de sistemas.',
    university: "Universidade São Judas Tadeu",

    technician: 'Técnico em Informática',
    resumeEducation: 'Enquanto estudei na (Fieb), obtive habilidades sólidas em informática, incluindo programação. Essa formação me preparou para enfrentar desafios no desenvolvimento de software com eficiência e qualidade.',

    skills1: 'HABILIDADES',

    projec: 'PROJETOS',

    attention: 'ATENÇÃO',
    attentionWord: 'ESTAMOS EM\n OBRAS.\n DESCULPE O\n TRANSTORNO',

    vagas: 'Vagas de Emprego',
    complement: 'Oportunidades / Marketing',
    nameProject: 'BlueWorks - Empregabilidade',
    resumeProject1: 'É um projeto de API e Site de empregabilidade, onde disponibiliza a função CRUD de empresas, usuarios e vagas. Site especificado para a criação de empresas onde ela pode criar vagas de emprego, para que os usuarios se candidatatem as vagas.',
    resumeProject2: 'Desenvolvemos uma API REST para a Voll.med, junto com a Alura, usando Spring Framework, Spring Security e JPA para segurança e eficiência. Permite CRUD de médicos e pacientes, e agendamento/cancelamento de consultas. É uma solução completa para gestão médica, promovendo uma experiência segura e integrada.',

    clinic: 'Clínica',
    complementClinic: 'Especialidade / Organização',

    complementCommerce: 'Venda / Compra',
    complementsecurity: 'Segurança / Autenticação',
    complementhotel: 'Gerenciamento / Reserva',
    resumeProject5: 'O Microserviço de Gerenciamento de Reservas permite que os usuários façam, atualizem e cancelem reservas em um hotel. Ele oferece funcionalidades para verificar a disponibilidade de quartos, registrar novas reservas e gerenciar informações de clientes. O serviço garante que todas as reservas sejam armazenadas de forma segura e permite o acesso a dados em tempo real sobre a ocupação do hotel.',
    project3: 'API E-Commerce',
    resumeProject3: 'API Rest da aplicação de uma E-commerce, contendo as funcionalidades de CRUD de usuarios sendo Usuario, Vendedor e Admin, onde um Vendedor pode criar produtos para a venda, o Admin pode criar novas categorias, e o Usuario que pode ver esses produtos e compra-los.',
    resumeProject4: 'O Microserviço de Segurança permite que usuários se registrem e façam login na aplicação de forma segura. Ele utiliza JWT para autenticação, gerando tokens após o login, que são usados para acessar recursos protegidos. O serviço diferencia entre Usuários Comuns e Administradores, com permissões específicas baseadas em funções.',

    emConstanteProgresso: 'Em constante evolução: Este projeto está em desenvolvimento e ainda não está finalizado. Agradecemos sua paciência e apoio enquanto trabalhamos para torná-lo ainda melhor.',

    buttonSeeProjects: 'Ver Projeto',
    repository: '< Repositório />',

    inConstruction: 'Em Construção',

    project_1: 'API Voll.Med',
    inProgress1: 'Em Progresso',

    seeMore: 'Ver Mais...',
    seeLess: 'Ver Menos...',

    contact1: 'CONTATE-ME',

    hello: 'Prazer em vê-lo aqui!',
    contactInf: 'Informação de Contato',
    contactInformation: 'Obrigado por visitar meu portfólio! Se você gostaria de entrar em contato comigo para oportunidades de colaboração, projetos freelance ou simplesmente para dizer oi, fique à vontade para me enviar um \n e-mail.',
    submit: 'Enviar mensagem',

    phone: 'Telefone',
    address: 'Endereço',
    brazilAddress: 'Barueri, Brasil',
    visitPerfil: 'Visite meu perfil e conecte-se comigo',
  },
  en: {
    homeNav: 'Home',
    aboutNav: 'About',
    servicesNav: 'Services',
    resumeNav: 'Resume',
    skillsNav: 'Skills',
    projectsNav: 'Projects',
    contactNav: 'Contact-me',

    ola1: 'Hello, I’m',
    profss: 'Software Engineer',
    contrat: 'Hire me',

    aboutMe: 'ABOUT ME',

    aboutTitle: 'Hi There! I\'m Maycon Pereira',
    aboutResume: 'Software Engineer with over 3 years of experience in back-end development using Java and Spring Boot. Focused on secure RESTful APIs, automated testing (JUnit, Mockito, Postman), version control with Git, and continuous integration (Jenkins, GitHub Actions). Experienced in agile teams with technical leadership of squads, working with relational databases and service-oriented architecture. Committed to clean code, quality, and consistent delivery.',

    birthday: 'Birthday',
    birthdayDate: 'August 25, 2005',
    souDe: 'From',
    souDeBrazil: 'Barueri, SP, Brazil',
    language: 'Language',
    languageTraslate: 'Portuguese, English',
    free: 'Available',
    downloadCV: 'Download CV',

    service: 'SERVICES',

    box1: 'Java & Back-End',
    box2: `Development of RESTful APIs with Spring Boot.
Focus on scalable and robust architecture.
Integration between systems and services.`,
    box3: 'Databases',
    box4: `Experience with MySQL and PostgreSQL.
Data modeling and maintenance.
SQL query optimization.`,
    box5: 'Version Control',
    box6: `Advanced use of Git and GitHub.
Branch creation and management.
Collaboration in development teams.`,
    box7: 'Applications',
    box8: `Deployment of Spring Boot applications.
Configuration of production environments.
Continuous monitoring and maintenance.`,
    box9: 'Security',
    box10: `Implementation of authentication and authorization.
Configuration of Spring Security.
Best practices against vulnerabilities.`,
    box11: 'Testing & QA',
    box12: `Unit and integration testing with JUnit.
API validation with Postman.
Quality assurance throughout the development lifecycle.`,

    exp: 'RESUME',
    exp1: 'Experience',

    qaEng: 'QA Engineer',
    atual: 'Present',

    resumeExperienceQA: 'Working as a QA Engineer, contributing to ensure delivery quality through automated testing, test scenario documentation, monitoring development cycles, and supporting process and system improvements. Always learning and growing with the team!',
    resumeExperienceFre: 'Led the full development of an e-commerce platform using WordPress and Elementor, integrating WooCommerce and applying UX and SEO improvements that increased sales by 700%.',
    resumeExperienceFull: 'Independently developed a complete web application covering front-end, back-end, and database for Fieb. This experience strengthened my skills in development, systems integration, and project management.',


    graduacao: 'Graduation',
    graduation: 'Information Systems Development',
    resumeGraduacao: 'I am studying at São Judas University to graduate and establish myself in the job market, acquiring solid knowledge and seizing great opportunities in the technology field, with a focus on software development, security, and systems quality.',
    university: "São Judas Tadeu University",

    technician: 'Computer Technician',
    resumeEducation: 'While studying at (Fieb), I acquired solid skills in computer science, including programming. This education prepared me to tackle software development challenges with efficiency and quality.',

    skills1: 'MY SKILLS',

    projec: 'PROJECTS',

    attention: 'ATTENTION',
    attentionWord: 'AREA UNDER\n CONSTRUCTION.\n SORRY FOR THE\n INCONVENIENCE',

    vagas: 'Jobs',
    complement: 'Opportunities / Marketing',
    nameProject: 'BlueWorks - Employability',
    resumeProject1: 'It\'s a employability API and website project, which provides CRUD functionality for companies, users, and job openings. The website is designed for companies to create job openings, allowing users to apply for these openings.',
    resumeProject2: 'We developed a REST API for Voll.med, in collaboration with Alura, using Spring Framework, Spring Security, and JPA for security and efficiency. It enables CRUD operations for doctors and patients, as well as scheduling/canceling appointments. It\'s a comprehensive solution for medical management, promoting a secure and integrated experience.',

    clinic: 'Clinic ',
    complementClinic: 'Specialty Clinic / Organization',

    complementCommerce: 'Sale / Purchase',
    complementsecurity: 'Security / Authentication',
    complementhotel: 'Management / Reservation',
    resumeProject5: 'The Reservation Management Microservice allows users to make, update and cancel hotel reservations. It offers functionalities to check room availability, register new reservations and manage customer information. The service ensures that all reservations are stored securely and allows access to real-time data on hotel occupancy.',
    project3: 'E-Commerce API',
    resumeProject3: 'REST API for an E-commerce Application Containing CRUD functionalities for users, including User, Seller, and Admin. A Seller can create products for sale, an Admin can create new categories, and a User can view and purchase these products.',
    resumeProject4: 'The Security Microservice allows users to register and log in to the application securely. It uses JWT for authentication, generating tokens after login, which are used to access protected resources. The service differentiates between Regular Users and Administrators, with specific role-based permissions.',

    emConstanteProgresso: 'In constant evolution: This project is under development and is not yet finalized. We appreciate your patience and support as we work to make it even better.',

    buttonSeeProjects: 'See Project',
    repository: '< Repository />',

    inConstruction: 'Under Construction',

    project_1: 'Voll.Med API',
    inProgress1: 'In Progress',

    seeMore: 'See More...',
    seeLess: 'see Less...',

    contact1: 'CONTACT-ME',

    hello: 'Just say Hello',
    contactInf: 'Contact Info',
    contactInformation: 'Thank you for visiting my portfolio! If you would like to get in touch with me for collaboration opportunities, freelance projects, or just to say hello, feel free to send me an email.',
    submit: 'Send message',

    phone: 'Phone',
    address: 'Address',
    brazilAddress: 'Barueri, Brazil',
    visitPerfil: 'Visite my social profile and get connected',

  },
  es: {
    homeNav: 'Inicio',
    aboutNav: 'Acerca de',
    servicesNav: 'Servicios',
    resumeNav: 'Currículum',
    skillsNav: 'Habilidades',
    projectsNav: 'Proyectos',
    contactNav: 'Contacto',

    ola1: 'Hola, soy',
    profss: 'Ingeniero de Software',
    contrat: 'Contrátame',

    aboutMe: 'ACERCA DE MÍ',

    aboutTitle: '¡Hola! Soy Maycon Pereira',
    aboutResume: 'Ingeniero de Software con más de 2 años de experiencia en desarrollo de aplicaciones Java, seguridad, pruebas manuales y automatizadas, integración de sistemas y aseguramiento de la calidad. Experiencia trabajando en equipos de 4 a 7 personas, con liderazgo de squads de hasta 4 miembros. Enfoque en arquitectura robusta, APIs escalables, calidad de código y prácticas de QA aplicadas a lo largo de todo el ciclo de vida del desarrollo de software.',

    birthday: 'Cumpleaños',
    birthdayDate: '25 de agosto de 2005',
    souDe: 'De',
    souDeBrazil: 'Barueri, SP, Brasil',
    language: 'Idioma',
    languageTraslate: 'Portugués, Inglés',
    free: 'Disponible',
    downloadCV: 'Descargar CV',

    service: 'SERVICIOS',

    box1: 'Java & Back-End',
    box2: `Desarrollo de APIs RESTful con Spring Boot.
Enfoque en arquitectura escalable y robusta.
Integración entre sistemas y servicios.`,
    box3: 'Bases de Datos',
    box4: `Experiencia con MySQL y PostgreSQL.
Modelado y mantenimiento de datos.
Optimización de consultas SQL.`,
    box5: 'Control de Versiones',
    box6: `Uso avanzado de Git y GitHub.
Creación y gestión de ramas.
Colaboración en equipos de desarrollo.`,
    box7: 'Aplicaciones',
    box8: `Implementación de aplicaciones Spring Boot.
Configuración de entornos productivos.
Monitoreo y mantenimiento continuo.`,
    box9: 'Seguridad',
    box10: `Implementación de autenticación y autorización.
Configuración de Spring Security.
Buenas prácticas contra vulnerabilidades.`,
    box11: 'Pruebas & QA',
    box12: `Pruebas unitarias y de integración con JUnit.
Validación de APIs con Postman.
Aseguramiento de calidad durante todo el ciclo de desarrollo.`,

    exp: 'CURRÍCULUM',
    exp1: 'Experiencia',

    qaEng: 'Ingeniero QA',
    atual: 'Hasta el momento',

    resumeExperienceQA: 'Desempeñándome como QA Engineer, contribuyendo a garantizar la calidad de las entregas mediante pruebas automatizadas, documentación de escenarios, seguimiento de los ciclos de desarrollo y apoyo en la identificación de mejoras en los procesos y sistemas. ¡Siempre aprendiendo y evolucionando con el equipo!',
    resumeExperienceFre: 'Lideré el desarrollo completo de un e-commerce con WordPress y Elementor, integrando WooCommerce y aplicando mejoras de UX y SEO que incrementaron las ventas en un 700%.',
    resumeExperienceFull: 'Lideré de manera independiente el desarrollo de una aplicación web completa, abarcando front-end, back-end y base de datos para Fieb. Esta experiencia fortaleció mis habilidades en desarrollo, integración de sistemas y gestión de proyectos.',

    graduacao: 'Grado',
    graduation: 'Análisis y Desarrollo de Sistemas (ADS)',
    resumeGraduacao: 'Estoy estudiando en la Universidad São Judas para graduarme y consolidarme en el mercado, adquiriendo conocimientos sólidos y aprovechando grandes oportunidades en el área de tecnología, con enfoque en desarrollo de software, seguridad y calidad de sistemas.',
    university: "Universidad São Judas Tadeu",

    technician: 'Técnico en Informática',
    resumeEducation: 'Mientras estudiaba en (Fieb), adquirí sólidas habilidades en informática, incluyendo programación. Esta educación me preparó para enfrentar desafíos en el desarrollo de software con eficiencia y calidad.',

    skills1: 'MIS HABILIDADES',

    projec: 'PROYECTOS',

    attention: 'ATENCIÓN',
    attentionWord: 'ESTAMOS EN\n OBRAS.\n DISCULPE EL\n INCONVENIENTE',

    vagas: 'Vacantes de Empleo',
    complement: 'Oportunidades / Marketing',
    nameProject: 'BlueWorks - Empleabilidad',
    resumeProject1: 'Es un proyecto de API y sitio web de empleabilidad, que proporciona funcionalidad CRUD para empresas, usuarios y vacantes de empleo. El sitio web está diseñado para que las empresas creen vacantes de empleo, permitiendo que los usuarios se postulen para estas vacantes.',
    resumeProject2: 'Desarrollamos una API REST para Voll.med, en colaboración con Alura, utilizando Spring Framework, Spring Security y JPA para seguridad y eficiencia. Permite operaciones CRUD para médicos y pacientes, así como la programación/cancelación de citas. Es una solución completa para gestión médica, promoviendo una experiencia segura e integrada.',

    clinic: 'Clínica',
    complementClinic: 'Especialidades / Organización',

    complementCommerce: 'Venta / Compra',
    complementsecurity: 'Seguridad/Autenticación',
    complementhotel: 'Gestión / Reserva',
    resumeProject5: 'El Microservicio de Gestión de Reservas permite a los usuarios realizar, actualizar y cancelar reservas de hotel. Ofrece funcionalidades para consultar la disponibilidad de habitaciones, registrar nuevas reservas y gestionar la información de los clientes. El servicio garantiza que todas las reservas se almacenen de forma segura y permite el acceso a datos en tiempo real sobre la ocupación hotelera.',
    project3: 'API E-Commerce',
    resumeProject3: 'API REST para una aplicación de comercio electrónico Contiene funcionalidades CRUD para usuarios, incluyendo Usuario, Vendedor y Admin. Un Vendedor puede crear productos para la venta, un Admin puede crear nuevas categorías, y un Usuario puede ver y comprar estos productos.',
    resumeProject4: 'El microservicio de seguridad permite a los usuarios registrarse e iniciar sesión en la aplicación de forma segura. Utiliza JWT para la autenticación, generando tokens después de iniciar sesión, que se utilizan para acceder a recursos protegidos. El servicio diferencia entre usuarios habituales y administradores, con permisos específicos basados ​​en roles.',


    emConstanteProgresso: 'En constante evolución: Este proyecto está en desarrollo y aún no está finalizado. Agradecemos su paciencia y apoyo mientras trabajamos para mejorarlo aún más.',

    buttonSeeProjects: 'Ver Proyecto',

    repository: '< Repositorio />',

    inConstruction: 'En Construcción',

    project_1: 'API Voll.Med',
    inProgress1: 'En Progreso',

    seeMore: 'Ver Más...',
    seeLess: 'Ver Menos...',

    contact1: 'CONTÁCTAME',

    hello: '¡Solo di Hola!',
    contactInf: 'Información de Contacto',
    contactInformation: '¡Gracias por visitar mi portafolio! Si desea ponerse en contacto conmigo para oportunidades de colaboración, proyectos freelance o simplemente para saludar, no dude en enviarme un correo electrónico.',
    submit: 'Enviar mensaje',

    phone: 'Teléfono',
    address: 'Dirección',
    brazilAddress: 'Barueri, Brasil',
    visitPerfil: 'Visita mi perfil social y conéctate',

  }
};

function changeLanguage(lang) {


  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  /*
  document.getElementById('homeNav').innerText = translations[lang].homeNav;
  document.getElementById('aboutNav').innerText = translations[lang].aboutNav;
  document.getElementById('servicesNav').innerText = translations[lang].servicesNav;
  document.getElementById('resumeNav').innerText = translations[lang].resumeNav;
  document.getElementById('skillsNav').innerText = translations[lang].skillsNav;
  document.getElementById('projectsNav').innerText = translations[lang].projectsNav;
  document.getElementById('contactNav').innerText = translations[lang].contactNav;

  document.getElementById('ola1').innerText = translations[lang].ola1;

  document.getElementById('contrat').innerText = translations[lang].contrat;
  document.getElementById('aboutMe').innerText = translations[lang].aboutMe;
  document.getElementById('aboutMe2').innerText = translations[lang].aboutMe2;

  document.getElementById('aboutTitle').innerText = translations[lang].aboutTitle;
  document.getElementById('aboutResume').innerText = translations[lang].aboutResume;

  document.getElementById('birthday').innerText = translations[lang].birthday;
  document.getElementById('birthdayDate').innerText = translations[lang].birthdayDate;
  document.getElementById('souDe').innerText = translations[lang].souDe;
  document.getElementById('souDeBrazil').innerText = translations[lang].souDeBrazil;
  document.getElementById('language').innerText = translations[lang].language;
  document.getElementById('languageTraslate').innerText = translations[lang].languageTraslate;
  document.getElementById('free').innerText = translations[lang].free;
  document.getElementById('downloadCV').innerText = translations[lang].downloadCV;

  document.getElementById('service').innerText = translations[lang].service;
  document.getElementById('service2').innerText = translations[lang].service2;

  document.getElementById('box1').innerText = translations[lang].box1;
  document.getElementById('box2').innerText = translations[lang].box2;
  document.getElementById('box3').innerText = translations[lang].box3;
  document.getElementById('box4').innerText = translations[lang].box4;
  document.getElementById('box5').innerText = translations[lang].box5;
  document.getElementById('box6').innerText = translations[lang].box6;
  document.getElementById('box7').innerText = translations[lang].box7;
  document.getElementById('box8').innerText = translations[lang].box8;
  document.getElementById('box9').innerText = translations[lang].box9;
  document.getElementById('box10').innerText = translations[lang].box10;
  document.getElementById('box11').innerText = translations[lang].box11;
  document.getElementById('box12').innerText = translations[lang].box12;

  document.getElementById('exp').innerText = translations[lang].exp;
  document.getElementById('exp1').innerText = translations[lang].exp1;
  document.getElementById('exp2').innerText = translations[lang].exp2;
  document.getElementById('resumeExperience').innerText = translations[lang].resumeExperience;

  document.getElementById('educacao').innerText = translations[lang].educacao;
  document.getElementById('technician').innerText = translations[lang].technician;
  document.getElementById('resumeEducation').innerText = translations[lang].resumeEducation;

  document.getElementById('graduacao').innerText = translations[lang].graduacao;
  document.getElementById('graduation').innerText = translations[lang].graduation;
  document.getElementById('resumeGraduacao').innerText = translations[lang].resumeGraduacao;
  document.getElementById('university').innerText = translations[lang].university;

  document.getElementById('skills1').innerText = translations[lang].skills1;
  document.getElementById('skills2').innerText = translations[lang].skills2;

  document.getElementById('projec').innerText = translations[lang].projec;
  document.getElementById('projec1').innerText = translations[lang].projec1;

  document.getElementById('attention').innerText = translations[lang].attention;
  document.getElementById('attentionWord').innerText = translations[lang].attentionWord;

  document.getElementById('vagas').innerText = translations[lang].vagas;
  document.getElementById('complement').innerText = translations[lang].complement;
  document.getElementById('nameProject').innerText = translations[lang].nameProject;
  document.getElementById('resumeProject1').innerText = translations[lang].resumeProject1;
  document.getElementById('resumeProject2').innerText = translations[lang].resumeProject2;



  document.getElementById('clinic').innerText = translations[lang].clinic;
  document.getElementById('complementClinic').innerText = translations[lang].complementClinic;

  document.getElementById('emConstanteProgresso').innerText = translations[lang].emConstanteProgresso;

  document.getElementById('buttonSeeProjects').innerText = translations[lang].buttonSeeProjects;

  document.getElementById('repository').innerText = translations[lang].repository;
  document.getElementById('repository1').innerText = translations[lang].repository1;
  document.getElementById('repository2').innerText = translations[lang].repository2;
  document.getElementById('repository3').innerText = translations[lang].repository3;
  document.getElementById('repository4').innerText = translations[lang].repository4;
  document.getElementById('repository5').innerText = translations[lang].repository5;

  document.getElementById('inConstruction1').innerText = translations[lang].inConstruction1;

  document.getElementById('project1').innerText = translations[lang].project_1;
  document.getElementById('inProgress1').innerText = translations[lang].inProgress1;

  document.getElementById('seeMore').innerText = translations[lang].seeMore;
  document.getElementById('seeMore').innerText = translations[lang].seeLess;

  document.getElementById('contact1').innerText = translations[lang].contact1;
  document.getElementById('contact2').innerText = translations[lang].contact2;

  document.getElementById('hello').innerText = translations[lang].hello;

  document.getElementById('contactInf').innerText = translations[lang].contactInf;
  document.getElementById('contactInformation').innerText = translations[lang].contactInformation;
  document.getElementById('submit').innerText = translations[lang].submit;

  document.getElementById('phone').innerText = translations[lang].phone;
  document.getElementById('address').innerText = translations[lang].ad[lang].complementCommerce;
  document.getElementById('project3').innerText = translations[lang].project3;
  document.getElementById('resumeProject3').innerText = translations[lang].resumeProject3;
dress;
  document.getElementById('brazilAddress').innerText = translations[lang].brazilAddress;
  document.getElementById('visitPerfil').innerText = translations[lang].visitPerfil;

  document.getElementById('complementCommerce').innerText = translations

  document.getElementById('complementsecurity').innerText = translations[lang].complementsecurity;
  document.getElementById('resumeProject4').innerText = translations[lang].resumeProject4;

  document.getElementById('complementhotel').innerText = translations[lang].complementhotel;
  document.getElementById('resumeProject5').innerText = translations[lang].resumeProject5;









*/





  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var subjectInput = document.getElementById('subject');
  var msgInput = document.getElementById('msg');
  var submit = document.getElementById('submit');
  if (lang === 'pt') {
    nameInput.placeholder = 'Seu Nome';
    emailInput.placeholder = 'Seu Email';
    subjectInput.placeholder = 'Seu Assunto';
    msgInput.placeholder = 'Sua Mensagem';
  } else if (lang === 'en') {
    nameInput.placeholder = 'Your Name';
    emailInput.placeholder = 'Your Email';
    subjectInput.placeholder = 'Your Subject';
    msgInput.placeholder = 'Your Message';
  } else if (lang === 'es') {
    nameInput.placeholder = 'Tu Nombre';
    emailInput.placeholder = 'Tu Correo Electrónico';
    subjectInput.placeholder = 'Tu Asunto';
    msgInput.placeholder = 'Tu Mensaje';
  }

  var dropdown = document.getElementById("myDropdown");
  var languageIcon = document.getElementById("languageIcon");

  // Altera a imagem com base no idioma selecionado
  if (lang === 'pt') {
    languageIcon.src = "https://img.icons8.com/color/48/brazil.png";
  } else if (lang === 'en') {
    languageIcon.src = "https://img.icons8.com/color/48/usa.png";
  } else if (lang === 'es') {
    languageIcon.src = "https://img.icons8.com/color/48/spain-2.png";
  }

  // Fecha o dropdown após selecionar o idioma
  toggleDropdown();

}


// Função para abrir ou fechar o dropdown
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Fecha o dropdown quando a página é clicada fora do botão ou da imagem
document.addEventListener('click', function (event) {
  var dropdown = document.getElementById("myDropdown");
  var button = document.getElementById("languageIcon");

  // Verifica se o clique foi fora do botão ou da imagem
  if (!event.target.matches('.dropbtn') && !event.target.matches('#languageIcon')) {
    dropdown.classList.remove('show');
  }
});

// Evita que o dropdown seja fechado quando a imagem é clicada
document.getElementById('languageIcon').addEventListener('click', function (event) {
  event.stopPropagation(); // Evita a propagação do evento de clique
});



const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elements = document.querySelectorAll('.AnimatedLeft')

elements.forEach((element) => myObserver.observe(element))





const myObserverRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elementsRight = document.querySelectorAll('.AnimatedRight')

elementsRight.forEach((element) => myObserverRight.observe(element))

const myObserverBottom = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elementsBottom = document.querySelectorAll('.heading-anime')

elementsBottom.forEach((element) => myObserverBottom.observe(element))


function mostraProjetosEscondido(button) {
  const projetos = document.querySelectorAll('.projetosEscondido');
  const more = button.querySelector('#more');
  const less = button.querySelector('#less');

  if (projetos[0].style.display === "block") {

    projetos.forEach(p => p.style.display = "none");
    more.style.display = "inline";
    less.style.display = "none";
  } else {

    projetos.forEach(p => p.style.display = "block");
    more.style.display = "none";
    less.style.display = "inline";
  }
}



function newHabilities() {
  const habili = document.querySelectorAll('.noneHabilities');
  habili.forEach(el => {
    el.style.display = "block"; // exibe cada elemento
  });
}