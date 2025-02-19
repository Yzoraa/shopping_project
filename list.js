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
                </div>
                <div class="productInfo">
                    <span>[CD/LP 종합]</span>
                    <h3>${selectedProduct.name}</h3><hr>
                    <p><small>판매가</small> &emsp; <large><b>${selectedProduct.price}원</b></large></p>
                    <p><small>상세정보</small></p>
                    <p>${selectedProduct.productEx}</p>
                    <div class="buttonWrap">
                        <button class="bagBtn">
                            <img class="bagIcon" src="./img/bagicon.png" width="20px" height="20px"> 장바구니
                        </button>
                    </div>
                </div>
            </div>
        `;

        const productImage = document.querySelector('.productImage');
        const bagBtn = document.querySelector('.bagBtn');


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
