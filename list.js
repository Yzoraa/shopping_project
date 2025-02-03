document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');

    const data_map = JSON.parse(localStorage.getItem('data_map')) || [];
    const bodyWrap = document.querySelector('.bodyWrap');

    // productId에 맞는 상품 찾기
    const selectedProduct = data_map.find(item => item.id == productId);

    if (selectedProduct) {
        bodyWrap.innerHTML = `
            <div class="productDetail">
                <div class="productImg">
                    <img class="productImage" src="${selectedProduct.productImg}" alt="상품 이미지">
                    <div class="hoverText">이미지 크게 보기</div>
                </div>
                <div class="productInfo">
                    <h2>${selectedProduct.name}</h2>
                    <p>가격: ${selectedProduct.price}원</p>
                    <p>${selectedProduct.productEx}</p>
                    <div class="buttonWrap">
                        <button class="bagBtn">
                            <img class="bagIcon" src="./img/bagicon.png" width="20px" height="20px"> 장바구니
                        </button>
                    </div>
                </div>
            </div>

            <!-- 모달창 -->
            <div class="modal hidden">
                <div class="modal-content">
                    <img class="modalImage" src="${selectedProduct.productImg}" alt="확대 이미지">
                </div>
            </div>
        `;

        const productImage = document.querySelector('.productImage');
        const hoverText = document.querySelector('.hoverText');
        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal-content');
        const bagBtn = document.querySelector('.bagBtn');

        // 이미지 호버 효과
        productImage.addEventListener('mouseover', () => {
            hoverText.style.opacity = '1';
            productImage.style.opacity = '0.7';
        });

        productImage.addEventListener('mouseout', () => {
            hoverText.style.opacity = '0';
            productImage.style.opacity = '1';
        });

        // 모달창 열기
        productImage.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        // 모달창 닫기 (바깥 부분 클릭 시)
        modal.addEventListener('click', (event) => {
            if (!modalContent.contains(event.target)) {
                modal.classList.add('hidden');
            }
        });

        // 장바구니 버튼 클릭 이벤트
        bagBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // 중복 방지
            const isAlreadyCart = cart.some(item => item.id == selectedProduct.id);

            if (!isAlreadyCart) {
                cart.push(selectedProduct);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('장바구니에 추가되었습니다.');
            } else {
                alert('이미 장바구니에 있는 상품입니다.');
            }

            // 장바구니 개수 업데이트 이벤트 발생
            window.dispatchEvent(new Event('updateBag'));
        });

    } else {
        bodyWrap.innerHTML = `<div class="emptyMain">선택한 상품이 없습니다.</div>`;
    }
});
