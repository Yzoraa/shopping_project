document.addEventListener('DOMContentLoaded', () => {
    const data_map = JSON.parse(localStorage.getItem('data_map')) || [];

    const bodyWrap = document.querySelector('.bodyWrap');
    const bagIcon = document.querySelector('.bagIcon');
    
    const userIcon = document.querySelector('.userIcon');

    // 장바구니 아이콘 클릭 시 페이지 이동
    bagIcon.addEventListener('click', ()=>{
        window.location.href = 'bag.html';
    });

    // 유저 아이콘 클릭 시 메시지 출력
    userIcon.addEventListener('click', ()=>{
        alert('준비중입니다.')
    });
    
    // 장바구니 카운트 함수
    function updateBag() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.length;

        // .bagIcon의 부모 요소 (cart-container 확인)
        let bagIcon = document.querySelector('.bagIcon');
        let cartContainer = bagIcon.parentElement;

        // cart-container가 없으면 새로 생성
        if (!cartContainer.classList.contains('cart-container')) {
            cartContainer = document.createElement('div');
            cartContainer.classList.add('cart-container');

            // 기존 .bagIcon의 부모 요소에 cartContainer 추가
            bagIcon.parentNode.replaceChild(cartContainer, bagIcon);
            cartContainer.appendChild(bagIcon);
        }

        // 기존 cart-count 삭제
        let existingCount = cartContainer.querySelector('.cart-count');
        if (existingCount) {
            existingCount.remove();
        }

        // 장바구니에 상품이 있으면 숫자 추가
        if (cartCount > 0) {
            let countBadge = document.createElement('span');
            countBadge.classList.add('cart-count');
            countBadge.innerText = cartCount;
            cartContainer.appendChild(countBadge);
        }
    }

    updateBag();

    // 이벤트 리스너로 개수 업데이트
    window.addEventListener('updateBag', updateBag);

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