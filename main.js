document.addEventListener('DOMContentLoaded', () => {
    const data_map = JSON.parse(localStorage.getItem('data_map')) || [];

    const bodyWrap = document.querySelector('.bodyWrap');

    if (data_map.length > 0) {
        bodyWrap.innerHTML = data_map
            .map(
                (item) => `
                <div class="productCard" id="${item.id}">
                    <div class="productImg">
                        <img src="${item.productImg}" alt="상품 이미지">
                    </div>
                    <div class="productInfo">
                        <h2>${item.name}</h2>
                        <p>가격: ${item.price}원</p>
                        <svg class="heartIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                </div>
            `
            )
            .join('');

        // 하트 토글 이벤트
        const btnHeart = document.querySelectorAll(".heartIcon");
        btnHeart.forEach((btns) => {
            btns.addEventListener('click', (event) => {
                event.stopPropagation();
                btns.classList.toggle('red')
            })
        })

        // 상품 클릭 시 list.html로 데이터 전달
        const productCards = document.querySelectorAll('.productCard');
        productCards.forEach((card) => {
            card.addEventListener('click', () => {
                const productId = card.getAttribute('id');
                window.location.href = `list.html?productId=${productId}`;
            });
        });

    } else {
        bodyWrap.innerHTML = `<div class="emptyMain">등록된 상품이 없습니다.</div>`;
    }
});
