document.addEventListener('DOMContentLoaded', () => {
    const data_map = JSON.parse(localStorage.getItem('data_map')) || [];
    const bodyWrap = document.querySelector('.bodyWrap');
    const bagIcon = document.querySelector('.bagIcon');
    const userIcon = document.querySelector('.userIcon');
    const heart = document.querySelector('.heart');

    // 장바구니, 하트 아이콘 클릭 시 페이지 이동
    bagIcon.addEventListener('click', () => {
        window.location.href = 'bag.html';
    });
    heart.addEventListener('click', () => {
        window.location.href = 'heart.html';
    });

    // 유저 아이콘 클릭 시 메시지 출력
    userIcon.addEventListener('click', () => {
        alert('준비중입니다.');
    });

    // 장바구니 카운트 함수
    function updateBag() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.length;
        let bagIcon = document.querySelector('.bagIcon');
        let cartContainer = bagIcon.parentElement;

        if (!cartContainer.classList.contains('cart-container')) {
            cartContainer = document.createElement('div');
            cartContainer.classList.add('cart-container');
            bagIcon.parentNode.replaceChild(cartContainer, bagIcon);
            cartContainer.appendChild(bagIcon);
        }

        let existingCount = cartContainer.querySelector('.cart-count');
        if (existingCount) {
            existingCount.remove();
        }

        if (cartCount > 0) {
            let countBadge = document.createElement('span');
            countBadge.classList.add('cart-count');
            countBadge.innerText = cartCount;
            cartContainer.appendChild(countBadge);
        }
    }

    updateBag();
    window.addEventListener('updateBag', updateBag);

    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

    if (data_map.length > 0) {
        bodyWrap.innerHTML = data_map
            .map(
                (item) => `
                <div class="productCard" id="${item.id}" name="${item.name}" price="${item.price}" img="${item.productImg}">
                    <div class="productImg">
                        <img src="${item.productImg}" alt="상품 이미지">
                    </div>
                    <div class="productInfo">
                        <svg class="heartIcon ${favoriteItems.some(fav => fav.id === item.id) ? 'red' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                </div>
            `
            )
            .join('');

        // 하트 버튼 클릭 + 토글 이벤트 
        document.querySelectorAll('.heartIcon').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();

                // `.productCard` 요소에서 데이터 가져오기
                const productCard = btn.closest('.productCard');
                const id = productCard.getAttribute('id');
                const name = productCard.getAttribute('name');
                const price = productCard.getAttribute('price');
                const productImg = productCard.getAttribute('img');

                let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
                let index = favoriteItems.findIndex(item => item.id === id);

                if (index !== -1) {
                    favoriteItems.splice(index, 1);
                    btn.classList.remove('red');
                } else {
                    favoriteItems.push({ id, name, price, productImg });
                    btn.classList.add('red');
                }

                localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
            });
        });

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
