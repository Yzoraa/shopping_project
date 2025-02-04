document.addEventListener('DOMContentLoaded', () => {
    const bodyWrap = document.querySelector('.bodyWrap');

    // 테이블 생성
    bodyWrap.innerHTML = ` 
        <table class="cartTable">
            <thead>
                <tr>
                    <th>이미지</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>상세</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody class="tbody"></tbody>
        </table>
        <div class="buttonWrap">
            <button class="deleteAll">🗑️ 전체 비우기</button>
        </div>
    `;

    dataSetting();

    // list.html로 이동
    const productCards = document.querySelectorAll('.cardImg');
    productCards.forEach((img) => {
        img.addEventListener('click', () => {
            const productId = img.getAttribute('id');
            window.location.href = `list.html?productId=${productId}`;
        });
    });
});

// 테이블에 데이터 넣는 함수
const dataSetting = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.querySelector('.tbody');

    if (cart.length === 0) {
        document.querySelector('.bodyWrap').innerHTML = `<div class="emptyMain">장바구니가 비어 있습니다.</div>`;
        return;
    }

    tbody.innerHTML = cart
    .map(
        (item) => `
        <tr>
            <td><img src="${item.productImg}" class="cardImg" id="${item.id}"alt="상품" style="width: 100px; height: 100px;"></td>
            <td class="name">${item.name}</td>
            <td>${item.price}원</td>
            <td>${item.productEx}</td>
            <td>
                <button class="delectbtn">삭제</button>
            </td>
        </tr>
    `
    )
    .join('');

    // 개별 삭제 버튼 이벤트 추가
    document.querySelectorAll('.delectbtn').forEach((btn) =>
        btn.addEventListener('click', delBtnClick)
    );

    // 전체 삭제 버튼 이벤트 추가
    document.querySelector('.deleteAll').addEventListener('click', deleteAllClick);
};


// 개별 삭제 함수
function delBtnClick(event) {
    const btn = event.target;
    const li = btn.closest('tr');
    const nameCheck = li.querySelector('.name').innerHTML;
    li.remove();

    // 로컬스토리지에서 삭제
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item) => item.name !== nameCheck);

    // 로컬스토리지에 다시 저장
    localStorage.setItem('cart', JSON.stringify(cart));

    if (cart.length === 0) {
        document.querySelector('.bodyWrap').innerHTML = `<div class="emptyMain">장바구니가 비어 있습니다.</div>`;
    }
}

// 전체 삭제 함수
function deleteAllClick(){
    localStorage.removeItem('cart');
    document.querySelector('.bodyWrap').innerHTML = `<div class="emptyMain">장바구니가 비어 있습니다.</div>`;
}