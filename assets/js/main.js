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
      $(this).toggleClass("st-toggle-active").siblings('.st-nav-list').slideToggle();;
    });
    $('.st-munu-dropdown-toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
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
});


const translations = {
  en: {
    homeNav: 'Home',
    aboutNav: 'About',
    servicesNav: 'Services',
    resumeNav: 'Resume',
    skillsNav: 'Skills',
    projectsNav: 'Projects',
    contactNav: 'Contact-me',

    ola1: 'Hello, I’m',
    contrat: 'Hire me',

    aboutMe: 'ABOUT ME',
    aboutMe2: 'ABOUT ME',

    aboutTitle: 'Hi There! I\'m Maycon Pereira',
    aboutResume: 'I\'m all about continuous learning, constantly on the lookout for ways to channel my tech passion into creative and challenging projects. What started as a mere fascination has evolved into an ongoing drive to explore new concepts and hone my skills in the development realm.',

    birthday: 'Birthday',
    birthdayDate: 'August 25, 2005',
    souDe: 'From',
    souDeBrazil: 'Barueri, SP, Brazil',
    language: 'Language',
    languageTraslate: 'Portuguese, English',
    free: 'Available',
    downloadCV: 'Download CV',

    service: 'SERVICES',
    service2: 'SERVICES',


    box1: 'APIs RESTful',
    box2: 'Developing robust and scalable APIs using Spring Boot.',
    box3: 'Database',
    box4: 'Experience in integrating Java applications with different databases.',
    box5: 'Git and GitHub',
    box6: 'Advanced use of Git for version control and team collaboration.',
    box7: 'Application Management',
    box8: 'Experience in deployment and management of Spring Boot applications.',
    box9: 'Security and Authentication',
    box10: 'Implementation of security in RESTful APIs using Spring Security.',
    box11: 'Automated Testing',
    box12: 'Implementation of unit and integration tests in Spring Boot projects.',

    exp: 'RESUME',
    exp1: 'RESUME',

    exp2: 'Experience',
    resumeExperience: 'BlueWorks - Employability, led the independent development of a complete web application for my graduation project, covering front-end, back-end, and database. This experience enhanced my skills in development and project management.',

    educacao: 'Education',
    technician: 'Computer Technician',
    resumeEducation: 'While studying at (Fieb), I acquired solid skills in computer science, including programming. This education prepared me to tackle software development challenges with efficiency and quality.',

    skills1: 'MY SKILLS',
    skills2: 'MY SKILLS',

    projec: 'PROJECTS',
    projec1: 'PROJECTS',

    attention: 'attention',
    attentionWord: 'AREA UNDER\n CONSTRUCTION.\n SORRY FOR THE\n INCONVENIENCE',

    vagas: 'Jobs',
    complement: 'Opportunities / Marketing',
    nameProject: 'BlueWorks - Employability',
    resumeProject1: 'It\'s a employability API and website project, which provides CRUD functionality for companies, users, and job openings. The website is designed for companies to create job openings, allowing users to apply for these openings.',
    resumeProject2: 'Restful API of Voll.med application (without Front-End), containing functionalities for CRUD of doctors and patients, as well as scheduling and cancellation of appointments.',
    
    clinic: 'Clinic ',
    complementClinic: 'Specialty Clinic / Organization',
    
    emConstanteProgresso: 'In constant evolution: This project is under development and is not yet finalized. We appreciate your patience and support as we work to make it even better.',

    buttonSeeProjects: 'See Project',
    buttonSeeProjects1: 'See Project',
    buttonSeeProjects2: 'See Project',

    repository: '< Repository />',
    repository1: '< Repository />',
    repository2: '< Repository />',

    inConstruction: 'Under Construction',
    inConstruction1: 'Under Construction',

    project_1: 'API Voll.Med',
    inProgress1: 'In Progress',

    seeMore: 'See More...',

    contact1: 'CONTACT-ME',
    contact2: 'CONTACT-ME',

    hello: 'Just say Hello',
    contactInf: 'Contact Info',
    contactInformation: 'Thank you for visiting my portfolio! If you would like to get in touch with me for collaboration opportunities, freelance projects, or just to say hello, feel free to send me an email.',
    submit: 'Send message',

    phone: 'Phone',
    address: 'Address',
    brazilAddress: 'Barueri, Brazil',
    visitPerfil: 'Visite my social profile and get connected',


  },
  pt: {
    homeNav: 'Início',
    aboutNav: 'Sobre',
    servicesNav: 'Serviços',
    resumeNav: 'Experiência',
    skillsNav: 'Habilidades',
    projectsNav: 'Projetos',
    contactNav: 'Contate-me',

    ola1: 'Olá, Eu sou',
    contrat: 'Contrate-me',

    aboutMe: 'SOBRE MIM',
    aboutMe2: 'SOBRE MIM',

    aboutTitle: 'Olá, sou o Maycon Pereira',
    aboutResume: 'Sou totalmente focado em aprendizado contínuo, sempre em busca de maneiras de canalizar minha paixão pela tecnologia em projetos criativos e desafiadores. O que começou como uma mera fascinação evoluiu para uma motivação constante de explorar novos conceitos e aprimorar minhas habilidades no campo do desenvolvimento.',

    birthday: 'Aniversário',
    birthdayDate: '25, Agosto 2005',
    souDe: 'Sou De',
    souDeBrazil: 'Barueri, SP, Brasil',
    language: 'Idiomas',
    languageTraslate: 'Português, Inglês',
    free: 'Disponível',
    downloadCV: 'Baixar CV',

    service: 'SERVIÇOS',
    service2: 'SERVIÇOS',


    box1: 'APIs RESTful',
    box2: 'Desenvolvimento de APIs robustas e escaláveis usando Spring Boot.',
    box3: 'Banco de Dados',
    box4: 'Experiência em integração de aplicações Java com diferentes bancos de dados.',
    box5: 'Git e GitHub',
    box6: 'Uso avançado do Git para controle de versão e colaboração em equipe.',
    box7: 'Gerenciamento de Aplicações',
    box8: 'Experiência em implantação e gerenciamento de aplicações Spring Boot.',
    box9: 'Segurança e Autenticação',
    box10: 'Implementação de segurança em APIs RESTful usando Spring Security.',
    box11: 'Testes Automatizados',
    box12: 'Implementação de testes unitários e de integração em projetos Spring Boot.',

    exp: 'EXPERIÊNCIA',
    exp1: 'EXPERIÊNCIA',

    exp2: 'Experiência',
    resumeExperience: 'BlueWorks - Empregabilidade, conduzi o desenvolvimento independente de uma aplicação web completa para meu projeto de conclusão de curso, abrangendo front-end, back-end e banco de dados. Essa experiência aprimorou minhas habilidades em desenvolvimento e gestão de projetos.',

    educacao: 'Educação',
    technician: 'Técnico em Informática',
    resumeEducation: 'Enquanto estudei na (Fieb), obtive habilidades sólidas em informática, incluindo programação. Essa formação me preparou para enfrentar desafios no desenvolvimento de software com eficiência e qualidade.',

    skills1: 'HABILIDADES',
    skills2: 'HABILIDADES',

    projec: 'PROJETOS',
    projec1: 'PROJETOS',

    attention: 'ATENÇÃO',
    attentionWord: 'ESTAMOS EM\n OBRAS.\n DESCULPE O\n TRANSTORNO',

    vagas: 'Vagas de Emprego',
    complement: 'Oportunidades / Marketing',
    nameProject: 'BlueWorks - Empregabilidade',
    resumeProject1: 'É um projeto de API e Site de empregabilidade, onde disponibiliza a função CRUD de empresas, usuarios e vagas. Site especificado para a criação de empresas onde ela pode criar vagas de emprego, para que os usuarios se candidatatem as vagas.',
    resumeProject2: 'API Rest da aplicação Voll.med (sem Front-End), contendo as funcionalidades de CRUD de médicos e de pacientes, além de agendamento e cancelamento de consultas.',
    
    clinic: 'Clínica',
    complementClinic: 'Especialidade / Organização',
    
    emConstanteProgresso: 'Em constante evolução: Este projeto está em desenvolvimento e ainda não está finalizado. Agradecemos sua paciência e apoio enquanto trabalhamos para torná-lo ainda melhor.',

    buttonSeeProjects: 'Ver Projeto',
    buttonSeeProjects1: 'Ver Projeto',
    buttonSeeProjects2: 'Ver Projeto',

    repository: '< Repositório />',
    repository1: '< Repositório />',
    repository2: '< Repositório />',

    inConstruction: 'Em Construção',
    inConstruction1: 'Em Construção',

    project_1: 'API Voll.Med',
    inProgress1: 'Em Progresso',

    seeMore: 'Ver Mais...',

    contact1: 'CONTATE-ME',
    contact2: 'CONTATE-ME',

    hello: 'Prazer em vê-lo aqui!',
    contactInf: 'Informação de Contato',
    contactInformation: 'Obrigado por visitar meu portfólio! Se você gostaria de entrar em contato comigo para oportunidades de colaboração, projetos freelance ou simplesmente para dizer oi, fique à vontade para me enviar um \n e-mail.',
    submit: 'Enviar mensagem',

    phone: 'Telefone',
    address: 'Endereço',
    brazilAddress: 'Barueri, Brasil',
    visitPerfil: 'Visite meu perfil e conecte-se comigo',
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
    contrat: 'Contrátame',

    aboutMe: 'ACERCA DE MÍ',
    aboutMe2: 'ACERCA DE MÍ',

    aboutTitle: '¡Hola! Soy Maycon Pereira',
    aboutResume: 'Estoy totalmente enfocado en el aprendizaje continuo, siempre en busca de formas de canalizar mi pasión por la tecnología en proyectos creativos y desafiantes. Lo que comenzó como una mera fascinación ha evolucionado hacia un impulso continuo de explorar nuevos conceptos y perfeccionar mis habilidades en el desarrollo.',

    birthday: 'Cumpleaños',
    birthdayDate: '25 de agosto de 2005',
    souDe: 'De',
    souDeBrazil: 'Barueri, SP, Brasil',
    language: 'Idioma',
    languageTraslate: 'Portugués, Inglés',
    free: 'Disponible',
    downloadCV: 'Descargar CV',

    service: 'SERVICIOS',
    service2: 'SERVICIOS',


    box1: 'APIs RESTful',
    box2: 'Desarrollo de APIs robustas y escalables utilizando Spring Boot.',
    box3: 'Base de Datos',
    box4: 'Experiencia en integración de aplicaciones Java con diferentes bases de datos.',
    box5: 'Git y GitHub',
    box6: 'Uso avanzado de Git para control de versión y colaboración en equipo.',
    box7: 'Gestión de Aplicaciones',
    box8: 'Experiencia en despliegue y gestión de aplicaciones Spring Boot.',
    box9: 'Seguridad y Autenticación',
    box10: 'Implementación de seguridad en APIs RESTful usando Spring Security.',
    box11: 'Pruebas Automatizadas',
    box12: 'Implementación de pruebas unitarias e de integración en proyectos Spring Boot.',

    exp: 'CURRÍCULUM',
    exp1: 'CURRÍCULUM',

    exp2: 'Experiencia',
    resumeExperience: 'BlueWorks - Empleabilidad, lideré el desarrollo independiente de una aplicación web completa para mi proyecto de graduación, cubriendo front-end, back-end y base de datos. Esta experiencia mejoró mis habilidades en desarrollo y gestión de proyectos.',

    educacao: 'Educación',
    technician: 'Técnico en Informática',
    resumeEducation: 'Mientras estudiaba en (Fieb), adquirí sólidas habilidades en informática, incluyendo programación. Esta educación me preparó para enfrentar desafíos en el desarrollo de software con eficiencia y calidad.',

    skills1: 'MIS HABILIDADES',
    skills2: 'MIS HABILIDADES',

    projec: 'PROYECTOS',
    projec1: 'PROYECTOS',

    attention: 'ATENCIÓN',
    attentionWord: 'ESTAMOS EN\n OBRAS.\n DISCULPE EL\n INCONVENIENTE',

    vagas: 'Vacantes de Empleo',
    complement: 'Oportunidades / Marketing',
    nameProject: 'BlueWorks - Empleabilidad',
    resumeProject1: 'Es un proyecto de API y sitio web de empleabilidad, que proporciona funcionalidad CRUD para empresas, usuarios y vacantes de empleo. El sitio web está diseñado para que las empresas creen vacantes de empleo, permitiendo que los usuarios se postulen para estas vacantes.',
    resumeProject2: 'API Rest de la aplicación Voll.med (sin Front-End), que contiene las funcionalidades de CRUD de médicos y pacientes, además de programación y cancelación de citas.',
    
    clinic: 'Clínica',
    complementClinic: 'Especialidades / Organización',
    
    emConstanteProgresso: 'En constante evolución: Este proyecto está en desarrollo y aún no está finalizado. Agradecemos su paciencia y apoyo mientras trabajamos para mejorarlo aún más.',

    buttonSeeProjects: 'Ver Proyecto',
    buttonSeeProjects1: 'Ver Proyecto',
    buttonSeeProjects2: 'Ver Proyecto',

    repository: '< Repositorio />',
    repository1: '< Repositorio />',
    repository2: '< Repositorio />',

    inConstruction: 'En Construcción',
    inConstruction1: 'En Construcción',

    project_1: 'API Voll.Med',
    inProgress1: 'En Progreso',

    seeMore: 'Ver Más...',

    contact1: 'CONTÁCTAME',
    contact2: 'CONTÁCTAME',

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
  document.getElementById('buttonSeeProjects2').innerText = translations[lang].buttonSeeProjects2;

  document.getElementById('repository').innerText = translations[lang].repository;
  document.getElementById('repository1').innerText = translations[lang].repository1;
  document.getElementById('repository2').innerText = translations[lang].repository2;

  document.getElementById('inConstruction1').innerText = translations[lang].inConstruction1;

  document.getElementById('project1').innerText = translations[lang].project_1;
  document.getElementById('inProgress1').innerText = translations[lang].inProgress1;

  document.getElementById('seeMore').innerText = translations[lang].seeMore;

  document.getElementById('contact1').innerText = translations[lang].contact1;
  document.getElementById('contact2').innerText = translations[lang].contact2;

  document.getElementById('hello').innerText = translations[lang].hello;

  document.getElementById('contactInf').innerText = translations[lang].contactInf;
  document.getElementById('contactInformation').innerText = translations[lang].contactInformation;
  document.getElementById('submit').innerText = translations[lang].submit;

  document.getElementById('phone').innerText = translations[lang].phone;
  document.getElementById('address').innerText = translations[lang].address;
  document.getElementById('brazilAddress').innerText = translations[lang].brazilAddress;
  document.getElementById('visitPerfil').innerText = translations[lang].visitPerfil;

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var subjectInput = document.getElementById('subject');
  var msgInput = document.getElementById('msg');
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



const myObserver = new IntersectionObserver( (entries) => {
  entries.forEach( (entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elements = document.querySelectorAll('.AnimatedLeft')

elements.forEach((element) => myObserver.observe(element))





const myObserverRight = new IntersectionObserver( (entries) => {
  entries.forEach( (entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elementsRight = document.querySelectorAll('.AnimatedRight')

elementsRight.forEach((element) => myObserverRight.observe(element))





const myObserverBottom = new IntersectionObserver( (entries) => {
  entries.forEach( (entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const elementsBottom = document.querySelectorAll('.heading-anime')

elementsBottom.forEach((element) => myObserverBottom.observe(element))

