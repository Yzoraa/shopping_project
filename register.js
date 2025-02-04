// 이미지 데이터
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

// 입력 데이터
const idElement = document.getElementById('id');
const nameElement = document.getElementById('name');
const priceElement = document.getElementById('price');
const productExElement = document.getElementById('productEx');
const clickbutton = document.getElementById('btn');

// 조건 불일치 시 나타날 div
const userID = document.getElementById('userID');

// 테이블 생성
const tableWrap = document.querySelector('.main-wrap');
tableWrap.innerHTML = ` 
<table>
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
</table> `;

// getItem은 아이템 읽어오기, parse는 배열(객체)로 변환
let data_map = JSON.parse(localStorage.getItem('data_map')) || [];

// 테이블에 데이터 넣는 함수
const dataSetting = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data_map
    .map((item, index) => {
        return `
        <tr>
            <td><img src="${item.productImg}" alt="상품 이미지" style="width: 100px; height: 100px;"></td>
            <td><div class="name">${item.name}</div><span class="span${item.id}"></span></td>
            <td><div class="price">${item.price}원</div><span class="span${item.id}"></span></td>
            <td><div class="productEx">${item.productEx}</div><span class="span${item.id}"></span></td>
            <td>
                <div>
                    <button class="modifybtn" index="${index}">수정</button>
                    <button class="delectbtn" index="${index}">삭제</button>
                </div>
            </td>
        </tr>
        `;
    })
    .join("");

    // 수정 및 삭제 버튼 이벤트 리스너 추가
    document.querySelectorAll('.modifybtn').forEach((btn) =>
        btn.addEventListener('click', modBtnClick)
    );
    document.querySelectorAll('.delectbtn').forEach((btn) =>
        btn.addEventListener('click', delBtnClick)
    );
};

// 버튼 활성화 함수
const btnAble = () => {
    const changeID = $("#id").val();
    const nameValue = document.getElementById('name').value;
    const priceValue = document.getElementById('price').value;
    const productExValue = document.getElementById('productEx').value;

    let isDuplicatedID = data_map.some((item) => item.id === changeID);

    if(isDuplicatedID === false && changeID !== '' && nameValue !== '' && priceValue !== '' && productExValue !== ''){
        clickbutton.disabled = false;
    } else{
        clickbutton.disabled = true;
    }
}

// 수정 버튼 클릭 함수
function modBtnClick(event) {
    const btn = event.target;
    const row = btn.closest('tr'); // 현재 버튼이 속한 행

    const productExTd = row.querySelector('.productEx'); // 상품 설명 열
    const priceTd = row.querySelector('.price'); // 가격 열
    const nameTd = row.querySelector('.name'); // 상품명 열

    const index = btn.getAttribute('index'); // 데이터의 인덱스

    if (btn.innerText === '수정') {
        // 기존 데이터 저장
        const productExOrigin = productExTd.textContent;
        const priceOrigin = priceTd.textContent.replace('원', '');
        const nameOrigin = nameTd.textContent;

        // input 태그 생성
        productExTd.innerHTML = `
            <input class="newProductEx" type="text" value="${productExOrigin}">
            <br><span class="span${data_map[index].id}"></span>
        `;
        priceTd.innerHTML = `
            <input class="newPrice" type="number" value="${priceOrigin}">
            <br><span class="span${data_map[index].id}"></span>
        `;
        nameTd.innerHTML = `
            <input class="newName" type="text" value="${nameOrigin}">
            <br><span class="span${data_map[index].id}"></span>
        `;

        // 실시간 입력 확인 (상품설명)
        const inputProductEx = productExTd.querySelector('.newProductEx');
        const spanProductEx = productExTd.querySelector('span');

        inputProductEx.addEventListener('input', () => {
            if (inputProductEx.value.trim() === '') {
                spanProductEx.textContent = '상품설명은 빈칸일 수 없습니다.';
            } else {
                spanProductEx.textContent = '';
            }
        });

        // 실시간 입력 확인 (가격)
        const inputPrice = priceTd.querySelector('.newPrice');
        const spanPrice = priceTd.querySelector('span'); 

        inputPrice.addEventListener('input', () => {
            if (inputPrice.value.trim() === '' || Number(inputPrice.value) <= 0) {
                spanPrice.textContent = '가격은 0보다 큰 숫자여야 합니다.';
            } else {
                spanPrice.textContent = '';
            }
        });

        // 실시간 입력 확인 (이름)
        const inputName = nameTd.querySelector('.newName');
        const spanName = nameTd.querySelector('span');

        inputName.addEventListener('input', () => {
            if (inputName.value.trim() === '') {
                spanName.textContent = '상품명은 빈칸일 수 없습니다.';
            } else {
                spanName.textContent = '';
            }
        });

        btn.innerText = '수정완료';
    } else {
        // 입력 태그 선택
        const inputProductEx = productExTd.querySelector('.newProductEx');
        const inputPrice = priceTd.querySelector('.newPrice');
        const inputName = nameTd.querySelector('.newName');

        // 수정된 입력값 가져오기
        const productExChange = inputProductEx.value.trim();
        const priceChange = inputPrice.value.trim();
        const nameChange = inputName.value.trim();

        if (productExChange === '' || priceChange === '' || nameChange === '') {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        // 업데이트
        productExTd.textContent = productExChange;
        priceTd.textContent = priceChange;
        nameTd.textContent = nameChange;
        btn.innerText = '수정';

        // 로컬스토리지 데이터 업데이트
        data_map[index].productEx = productExChange;
        data_map[index].price = priceChange;
        data_map[index].name = nameChange;

        localStorage.setItem('data_map', JSON.stringify(data_map));
    }
}


// 삭제버튼 클릭 함수
function delBtnClick(event){
    const btn = event.target;
    const li = btn.closest('tr');
    const nameCheck = li.querySelector('.name').innerHTML;
    li.remove();

    data_map = data_map.filter((result) => result.name !== nameCheck);
    console.log(data_map);

    // 로컬스토리지에 다시 저장
    localStorage.setItem('data_map', JSON.stringify(data_map)); 
}

document.addEventListener('DOMContentLoaded', () => {
    // btnAble();

    // 새로고침 해도 테이블 데이터 값 유지
    if (data_map.length > 0) {
        dataSetting();
    }

    clickbutton.disabled = true;

    // id 중복 확인
    $('#id').on('propertychange change paste input', function(){
        const changeID = $("#id").val();
        let isDuplicatedID = data_map.some((item) => item.id === changeID);

        if(isDuplicatedID){
            userID.textContent = 'id는 중복 불가입니다.';
        } else{
            userID.textContent = changeID;
        }

        btnAble();
    });
    
    // 나머지 input 값 공백 확인
    $('#name, #price, #productEx').on('propertychange change paste input', function(){
        btnAble();
    });

    // 클릭시 저장 및 출력
    clickbutton.addEventListener('click', ()=>{
        // 랜덤 이미지 선택
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];

        let userInfo = {
            id: idElement.value,
            name: nameElement.value,
            price: priceElement.value,
            productEx: productExElement.value,
            productImg: randomImage
        }

        data_map.push(userInfo);
    
        // stringify는 문자열로 변환, setItem은 로컬스토리지에 아이템 추가
        localStorage.setItem('data_map', JSON.stringify(data_map)); 
        dataSetting();
    
        // 원상복귀
        idElement.value = '';
        nameElement.value = '';
        priceElement.value = '';
        productExElement.value = '';
        
        userID.textContent = '';

        clickbutton.disabled = true;
    });

})