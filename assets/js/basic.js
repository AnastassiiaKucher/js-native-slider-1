(function () {

    const container = document.querySelector('#carousel');
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('#indicators-container');
    const indicators = document.querySelectorAll('.indicator');
    const pauseBtn = document.querySelector('#pause-btn');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    
    let currentSlide = 0;
    let interval = 2000;
    let slidesCount = slides.length;
    let intervalID = null;
    let isPlaing = true;
    let swipeStartX = null;
    let swipeEndX = null;
    
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';
    const SPACE = 'Space';
    const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    const FA_PLAY = '<i class="far fa-play-circle"></i>';
    
    
    function gotoSlide(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slidesCount) % slidesCount;
        indicators[currentSlide].classList.toggle('active');
        slides[currentSlide].classList.toggle('active');
    }
    
    function gotoPrev() {
        gotoSlide(currentSlide - 1);
    }
    
    function gotoNext() {
        gotoSlide(currentSlide + 1);
    }
    
    function play() {
        intervalID = setInterval(gotoNext, interval);
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaing = true;
    }
    
    function pause() {
        if (isPlaing) {
            clearInterval(intervalID);
            pauseBtn.innerHTML = FA_PLAY;
            isPlaing = false;
        }
    }
    
    const pausePlay = () => isPlaing ? pause() : play();
    
    function prev() {
        pause();
        gotoPrev();
    }
    
    function next() {
        pause();
        gotoNext();
    }
    
    function indicate(e) {
        let target = e.target;
    
        if (target.classList.contains('indicator')) {
            pause();
            // gotoSlide(+target.getAttribute('data-slide-to'));
            gotoSlide(+target.dataset.slideTo);
        }
    }
    
    function pressKey(e) {
        if (e.code === LEFT_ARROW) prev();
        if (e.code === RIGHT_ARROW) next();
        if (e.code === SPACE) pausePlay();
    }
    
    function swipeStart(e) {
        swipeStartX = e.changedTouches[0].pageX;
    }
    
    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        if ((swipeStartX - swipeEndX) > 100) next();
        if ((swipeStartX - swipeEndX) < -100) prev();
    }
    
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    
    intervalID = setInterval(gotoNext, interval);
    
    } ());