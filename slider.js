// 이미지 데이터 배열
const images = [
    './img/aespa.jpeg',
    './img/aimyon.jpeg',
    './img/day6.jpeg',
    './img/dualipa.jpeg',
    './img/edsheeran.jpeg',
    './img/got7.jpeg',
    './img/hahyunsang.jpeg',
    './img/imase.jpeg',
    './img/ive.jpeg',
    './img/jennie.jpeg',
    './img/kenshi.jpeg',
    './img/plave.jpeg',
    './img/sekai.jpeg',
    './img/seventeen.jpeg',
    './img/smtown.jpeg',
    './img/taeyeon.jpeg',
    './img/twice.jpeg',
    './img/wicked.jpeg'
];

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const indicators = document.querySelector('.indicators');

    // 랜덤으로 3개 이미지 선택
    let randomImages = [];
    while (randomImages.length < 3) {
        let randomIndex = Math.floor(Math.random() * images.length);
        let randomImage = images[randomIndex];
        if (!randomImages.includes(randomImage)) {
            randomImages.push(randomImage);
        }
    }

    // 슬라이드 추가
    randomImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${imgSrc}" alt="슬라이드">`;
        slider.appendChild(slide);

        // 인디케이터 추가
        const indicator = document.createElement('button');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => moveSlide(index)); 
        indicators.appendChild(indicator);
    });

    let currentIndex = 0;

    function moveSlide(index) {
        const totalSlides = randomImages.length;

        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }

        currentIndex = index;
    
        // 슬라이더를 왼쪽으로 이동
        const moveDistance = index * 100;
        slider.style.transform = `translateX(-${moveDistance}%)`;

        const indicatorButtons = document.querySelectorAll('.indicators button');
    
        indicatorButtons.forEach((button, idx) => {
            if (idx === index) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // 자동 슬라이드 (3초마다 한 장씩 이동)
    setInterval(() => {
        moveSlide(currentIndex + 1); // 다음 슬라이드로 이동
    }, 3000);
});
