class VerticalCubeSlider {
    constructor() {
        this.currentIndex = 0;
        this.isAnimating = false;
        this.sliceCount = 10;
        this.autoPlayInterval = null;
        this.isPlaying = true;
        this.currentFace = 0;

        this.images = [
            { url: 'images/love1.jpeg', thumb: 'images/love1.jpeg', title: 'The Beginning 💫', description: '31 August — where our story began.' },
            { url: 'images/love2.jpeg', thumb: 'images/love2.jpeg', title: 'Our Laughs ❤️', description: 'Somewhere between jokes, I fell for you.' },
            { url: 'images/love3.jpeg', thumb: 'images/love3.jpeg', title: 'Six Months Later 💖', description: 'And I would still choose you again.' },
            { url: 'images/love4.jpeg', thumb: 'images/love4.jpeg', title: 'My Favorite Person 💕', description: 'Every memory with you is special.' },
            { url: 'images/love5.jpeg', thumb: 'images/love5.jpeg', title: 'Forever? 💍', description: 'I don’t want just six months. I want forever.' }
        ];

        this.init();
    }

    init() {
        this.createSlices();
        this.createDots();
        this.createThumbnails();
        this.attachEventListeners();
        this.initializeImages();
        this.startAutoPlay();
    }

    createSlices() {
        const stage = document.getElementById('sliderStage');
        if (!stage) return;

        const containerWidth = stage.offsetWidth;

        for (let i = 0; i < this.sliceCount; i++) {
            const sliceContainer = document.createElement('div');
            sliceContainer.className = 'slice-container';

            const sliceCube = document.createElement('div');
            sliceCube.className = 'slice-cube';

            for (let face = 1; face <= 4; face++) {
                const sliceFace = document.createElement('div');
                sliceFace.className = `slice-face face-${face}`;

                const sliceImage = document.createElement('div');
                sliceImage.className = 'slice-image';
                sliceImage.dataset.face = face;

                sliceImage.style.width = `${containerWidth}px`;
                sliceImage.style.left = `-${i * (containerWidth / this.sliceCount)}px`;

                sliceFace.appendChild(sliceImage);
                sliceCube.appendChild(sliceFace);
            }

            sliceContainer.appendChild(sliceCube);
            stage.appendChild(sliceContainer);
        }
    }

    createDots() {
        const dotsContainer = document.getElementById('dots');
        if (!dotsContainer) return;

        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    createThumbnails() {
        const thumbnailsContainer = document.getElementById('thumbnails');
        if (!thumbnailsContainer) return;

        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.style.backgroundImage = `url("${image.thumb}")`;
            thumbnail.addEventListener('click', () => this.goToSlide(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    initializeImages() {
        this.setFaceImage(1, this.images[0].url);
    }

    setFaceImage(faceNumber, imageUrl) {
        document.querySelectorAll(`.slice-image[data-face="${faceNumber}"]`)
            .forEach(img => img.style.backgroundImage = `url("${imageUrl}")`);
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const nextFace = (this.currentFace + 1) % 4;
        const nextFaceNumber = nextFace + 1;

        this.setFaceImage(nextFaceNumber, this.images[index].url);

        document.querySelectorAll('.slice-cube')
            .forEach(cube => cube.className = `slice-cube rotate-${nextFace}`);

        setTimeout(() => {
            document.getElementById('slideTitle').textContent = this.images[index].title;
            document.getElementById('slideDescription').textContent = this.images[index].description;
            this.currentIndex = index;
            this.currentFace = nextFace;
            this.isAnimating = false;
        }, 900);
    }

    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.images.length);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3500);
    }

    attachEventListeners() {
        const prev = document.getElementById('prevArrow');
        const next = document.getElementById('nextArrow');

        if (prev) prev.addEventListener('click', () => this.goToSlide((this.currentIndex - 1 + this.images.length) % this.images.length));
        if (next) next.addEventListener('click', () => this.nextSlide());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VerticalCubeSlider();
});
