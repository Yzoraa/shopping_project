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
                </div>
            `
            )
            .join('');
    } else {
        bodyWrap.innerHTML = `<div class="emptyMain">좋아요 한 상품이 없습니다.</div>`;
    }

    // list.html로 이동
    const productCards = document.querySelectorAll('.productCard');
    productCards.forEach((img) => {
        img.addEventListener('click', () => {
            const productId = img.getAttribute('id');
            window.location.href = `list.html?productId=${productId}`;
        });
    });
});
