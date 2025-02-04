document.addEventListener('DOMContentLoaded', () => {
    const bodyWrap = document.querySelector('.bodyWrap');

    let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

    if (favoriteItems.length > 0) {
        bodyWrap.innerHTML = favoriteItems
            .map(
                (item) => `
                <div class="productCard" id="${item.id}" name="${item.name}" price="${item.price}" img="${item.productImg}">
                    <div class="productImg">
                        <img src="${item.productImg}" alt="상품 이미지">
                    </div>
                    <div class="productInfo">
                        <h2>${item.name}</h2>
                        <p>가격: ${item.price}원</p>
                    </div>
                </div>
            `
            )
            .join('');
    } else {
        bodyWrap.innerHTML = `<div class="emptyMain">좋아요 한 상품이 없습니다.</div>`;
    }
});
