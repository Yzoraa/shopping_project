document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);  // 쿼리스트링을 파싱
    const productId = params.get('productId');  // 'productId' 값을 가져옴

    const data_map = JSON.parse(localStorage.getItem('data_map')) || [];
    const bodyWrap = document.querySelector('.bodyWrap');

    // productId에 맞는 상품 찾기
    const selectedProduct = data_map.find(item => item.id == productId);

    if (selectedProduct) {
        bodyWrap.innerHTML = `
            <div class="productDetail">
                <div class="productImg">
                    <img src="${selectedProduct.productImg}" alt="상품 이미지">
                </div>
                <div class="productInfo">
                    <h2>${selectedProduct.name}</h2>
                    <p>가격: ${selectedProduct.price}원</p>
                    <p>${selectedProduct.productEx}</p>
                    <button class="bagBtn">
                        <img class="bagIcon" src="./img/bagicon.png" width="20px" height="20px"> 장바구니
                    </button>
                </div>
            </div>
        `;
    } else {
        bodyWrap.innerHTML = `<div class="emptyMain">선택한 상품이 없습니다.</div>`;
    }
});
