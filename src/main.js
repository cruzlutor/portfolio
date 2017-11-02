import sass from './sass/main.sass'

function scrollIt(destination, duration = 200, callback) {

  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback)  callback();
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easeOutQuart(time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

var ticking = false
var sections = document.querySelectorAll('section');
var links = document.querySelectorAll('[data-section]');
var navigation = document.querySelector('.navigation');

function onScroll() {
  for(var i = 0, len = sections.length; i < len; i++){
    var diff = sections[i].offsetTop - window.scrollY;
    if( diff < window.innerHeight / 2 && diff > (window.innerHeight / 2) * -1 ){
      links[i].className = 'navigation-item-link is-active';
      navigation.className = (i == 1)  ? 'navigation is-dark' : 'navigation';
    }else{
      links[i].className = 'navigation-item-link';
    }  
  }
}

function initScroll() {
  window.addEventListener('scroll', function (e) {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  onScroll();
}

function initNavigation(){
  for (let i = 0, len = links.length; i < len; i++) {
    links[i].addEventListener('click', onNavClick);
  }
}

function init() {
  initScroll();
  initNavigation();
}

function onNavClick(e) {
  e.preventDefault();
  scrollIt(document.getElementById(e.currentTarget.dataset.section), 500, function () {
    console.log('done')
  });
}

init();