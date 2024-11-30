// ------------------------------------------------
// Project Name: Braxton - Personal Portfolio & Resume HTML Template
// Project Description: Show yourself brightly with Braxton - unique and creative portfolio and resume template!
// Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
// Version: 1.0.0
// Build Date: March 2024
// Last Update: March 2024
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: demo.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  01. Loader & Loading Animation
//  02. Lenis Scroll Plugin
//  03. Parallax
//  04. Scroll Animations
//  05. Smooth Scrolling
//  06. SVG Fallback
//  07. Chrome Smooth Scroll
//  08. Images Moving Ban
//  09. Scroll To Top
//  10. Color Switch
//  11. Marquee
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {

"use strict";

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable specific keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
  // Disable F12, Ctrl+Shift+I, and other developer tools shortcuts
  if ((e.key === 'F12') || (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 'i'))) {
    e.preventDefault();
    return false;
  }
});

// Custom Worm-like Cursor with Tail Effect
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

// Add tail elements dynamically
const tail = [];
const numOfTailElements = 10; // Number of tail elements, adjust for longer/shorter tail
for (let i = 0; i < numOfTailElements; i++) {
  const tailElement = document.createElement('div');
  tailElement.classList.add('cursor-tail');
  document.body.appendChild(tailElement);
  tail.push(tailElement);
}

// Style the custom cursor with the worm effect and color
const style = document.createElement('style');
style.innerHTML = `
  #cursor {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #cda6c5; /* Custom color */
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease-out;
  }

  .cursor-tail {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #cda6c5; /* Same custom color */
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.5;
    transition: transform 0.1s ease-out;
  }

  @keyframes worm {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

// Track mouse movement and update the cursor position
document.addEventListener('mousemove', function(e) {
  // Move the main cursor
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // Update tail elements to follow the cursor
  for (let i = numOfTailElements - 1; i > 0; i--) {
    const tailPos = tail[i - 1].getBoundingClientRect();
    tail[i].style.left = `${tailPos.left}px`;
    tail[i].style.top = `${tailPos.top}px`;
  }

  // Set the first tail element to the cursor's position
  tail[0].style.left = `${e.pageX}px`;
  tail[0].style.top = `${e.pageY}px`;
});
  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------------------- //
  // Loader & Loading Animation Start
  // --------------------------------------------- //
  const content = document.querySelector('body');
  const imgLoad = imagesLoaded(content);

  imgLoad.on('done', instance => {

    document.getElementById("loaderContent").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loaderDemo").classList.add("loaded");
    }, 300);

    gsap.set(".animate-headline", {y: 50, opacity: 0});
    ScrollTrigger.batch(".animate-headline", {
      interval: 0.1,
      batchMax: 4,
      duration: 6,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0,
        ease: 'sine',
        stagger: {each: 0.15, grid: [1, 4]}, 
        overwrite: true
      }),
      onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
      onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
      onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
    });

    gsap.from(".promo-image", {
      delay: 0.6,
      x: 30,
      opacity: 0,
      ease: "sine",
      duration: 1
    });

  });
  // --------------------------------------------- //
  // Loader & Loading Animation End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Lenis Scroll Plugin Start
  // --------------------------------------------- //
  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  // --------------------------------------------- //
  // Lenis Scroll Plugin End
  // --------------------------------------------- //

  // ------------------------------------------------------------------------------ //
  // Parallax (apply parallax effect to any element with a data-speed attribute) Start
  // ------------------------------------------------------------------------------ //
  gsap.to("[data-speed]", {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0
    }
  });
  // --------------------------------------------- //
  // Parallax End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Scroll Animations Start
  // --------------------------------------------- //
  // Animation In Up
  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
      ease: 'sine',
    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reverse',
      }
    });
  });

  // Animation Cards Stack
  // Grid 2x
  gsap.set(".animate-card-2", {y: 100, opacity: 0});
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    //duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 2]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: -10, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
  });
  // --------------------------------------------- //
  // Scroll Animations End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // S Start
  // --------------------------------------------- //
  var offset = 300,
      offset_opacity = 1200,
      scroll_top_duration = 500,
      $back_to_top = $('.to-top');

	$(window).on('scroll', function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
  // --------------------------------------------- //
  // Scroll To Top End
  // --------------------------------------------- //

});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
const themeBtn = document.querySelector('.color-switcher');

function getCurrentTheme(){
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  localStorage.getItem('template.theme') ? theme = localStorage.getItem('template.theme') : null;
  return theme;
}

function loadTheme(theme){
  const root = document.querySelector(':root');
  if(theme === "light"){
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute('color-scheme', `${theme}`);
};

themeBtn.addEventListener('click', () => {
  let theme = getCurrentTheme();
  if(theme === 'dark'){
    theme = 'light';
  } else {
    theme = 'dark';
  }
  localStorage.setItem('template.theme', `${theme}`);
  loadTheme(theme);
});

window.addEventListener('DOMContentLoaded', () => {
  loadTheme(getCurrentTheme());
});
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //

// --------------------------------------------- //
// Marquee Start
// --------------------------------------------- //
let currentScroll = 0;
let isScrollingDown = true;
let stars = document.querySelectorAll(".star");

let tween = gsap.to(".marquee__part", {
  xPercent: -100,
  repeat: -1,
  duration: 5,
  ease: "linear"
})
.totalProgress(0.5);

gsap.set(".marquee__inner", {xPercent: -50});

window.addEventListener("scroll", function() {
  if(window.pageYOffset > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  stars.forEach((star) => {
    if (isScrollingDown) {
      star.classList.remove("active");
    } else {
      star.classList.add("active");
    }
  });

  currentScroll = window.pageYOffset;
});
// --------------------------------------------- //
// Marquee End
// --------------------------------------------- //