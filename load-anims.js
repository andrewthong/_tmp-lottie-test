(function() {

  const links = document.querySelectorAll('.lottie-link'); 

  const animations = [];

  links.forEach((link) => {

    // Webflow does not support dynamic data-attributes 
    let lottieRef = link.querySelector('.lottie-ref');
    if(!lottieRef)
      return;

    let animRef = lottieRef.innerText;
    lottieRef.remove();

    if(bmAnimations[animRef]) {

      let speed = link.hasAttribute('data-speed') ? link.getAttribute('data-speed') : 1;
      
      // leave action (if true, animation finishes on leave)
      let reverse = false;
      if(link.hasAttribute('data-reverse')) {
        reverse = true;
      }

      let animation = bodymovin.loadAnimation({
        container: link.querySelector('.lottie'),
        animationData: bmAnimations[animRef],
        renderer: 'svg',
        loop: true,
        autoplay: false,
        name: animRef,
      });

      animation.goToAndStop(1000);
      
      link.addEventListener('mouseenter', () => {
        animation.loop = true;
        if(reverse) {
          animation.setSpeed(speed);
          animation.setDirection(1);
        }
        animation.play();
      });
      
      link.addEventListener('mouseleave', () => {
        animation.loop = false;
        if(reverse) {
          animation.setDirection(-1);
          animation.setSpeed(1.25);
        }
      });
      
      link.addEventListener('touchstart', () => {
        animation.loop = false;
        animation.setSpeed(speed);
        animation.setDirection(1);
        animation.play();
      });
      
      animations.push(animation);
      
    }
  });

  // loading
  let delay = 200;
  animations.forEach((animation, index) => {
    animation.loop = false;
    setTimeout(() => {
      links[index].classList.add('loaded');
      animation.setDirection(-1);
      animation.play();
    }, index * delay);
  });

})()