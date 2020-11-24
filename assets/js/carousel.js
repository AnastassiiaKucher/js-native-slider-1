class Carousel {
    constructor(s) {
    const settings = this._initConfig(s);

    console.log(settings);

    this.container = document.querySelector(s.containerID);
    this.slides = this.container.querySelectorAll(s.slideID);

    this.interval = s.interval;
    }

    _initConfig(o) {
        const p = { containerID: '#carousel',
            slideID: '.slide',
            interval: 3000 };

        // const settings = {
        //     containerID: '#carousel',
        //     slideID: '.slide',
        //     interval: 5000
        // };

        // if (o !== undefined) {
        //     settings.containerID = o.containerID || '#carousel';
        //     settings.slideID = o.slideID || '.slide';
        //     settings.interval = o.interval || 3000;
        // }

        return {...p, ...o};
    }

    _initProp() {
        this.currentSlide = 0;
        this.slidesCount = this.slides.length;
        this.intervalID = null;
        this.isPlaing = true;

        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.SPACE = 'Space';
        this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="far fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    }

    _initControls() {
        const controls = document.createElement('div');
        const PAUSE = `<span id="pause-btn" class="control control-pause" type="button">${this.FA_PAUSE}</span>`;
        const PREV = `<span id="prev-btn" class="control control-prev" type="button">${this.FA_PREV}</span>`;
        const NEXT = `<span id="next-btn" class="control control-next" type="button">${this.FA_NEXT}</span>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initControls() {
        const controls = document.createElement('div');
        const PAUSE = `<span id="pause-btn" class="control control-pause" type="button">${this.FA_PAUSE}</span>`;
        const PREV = `<span id="prev-btn" class="control control-prev" type="button">${this.FA_PREV}</span>`;
        const NEXT = `<span id="next-btn" class="control control-next" type="button">${this.FA_NEXT}</span>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initIndicators() {
        const indicators = document.createElement('ol');

        indicators.setAttribute('class', 'indicators');
        indicators.setAttribute('id', 'indicators-container');


        for (let i = 0; i < this.slidesCount; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('class', 'indicator');
            if (i=== 0) indicator.classList.add('active');
            // indicator.setAttribute('data-slide-to', `${i}`);
            indicator.dataset.slideTo = `${i}`;
            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);

        this.indicatorsContainer = this.container.querySelector('#indicators-container');
        this.indicators = this.container.querySelectorAll('.indicator');
    }

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));

    }

    _gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.indicators[this.currentSlide].classList.toggle('active');
        this.slides[this.currentSlide].classList.toggle('active');
    }

    _gotoPrev() {
        this._gotoSlide(this.currentSlide - 1);
    }

    _gotoNext() {
        this._gotoSlide(this.currentSlide + 1);
    }

    _play() {
        this.intervalID = setInterval(() => this._gotoNext(), this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaing = true;
    }

    _pause() {
        if (this.isPlaing) {
            clearInterval(this.intervalID);
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaing = false;
        }
    }

    pausePlay() {
        this.isPlaing ? this._pause() : this._play();
    }

    prev() {
        this._pause();
        this._gotoPrev();
    }

    next() {
        this._pause();
        this._gotoNext();
    }

    indicate(e) {
        let target = e.target;

        if (target.classList.contains('indicator')) {
            this._pause();
            // this._gotoSlide(+target.getAttribute('data-slide-to'));
            this._gotoSlide(+target.dataset.slideTo);
        }
    }

    pressKey(e) {
        if (e.code === this.LEFT_ARROW) this.prev();
        if (e.code === this.RIGHT_ARROW) this.next();
        if (e.code === this.SPACE) this.pausePlay();
    }

    init() {
        this._initProp();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this.intervalID = setInterval(() => this._gotoNext(), this.interval);
    }
}

class SwipeCarousel extends Carousel{
    _swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }

    _swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if ((this.swipeStartX - this.swipeEndX) > 100) this.next();
        if ((this.swipeStartX - this.swipeEndX) < -100) this.prev();
    }

    _initListeners() {
        super._initListeners();
        this.container.addEventListener('touchstart', this._swipeStart.bind(this));
        this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    }
}