# mz-market : 의류 쇼핑몰 사이트

## 프로젝트 주제

- 목적 : 의류 상품 CRUD 기반으로 이루어진 쇼핑몰 사이트 입니다.
- 목표
  - 로그인 , 회원가입, 장바구니 등 쇼핑몰에 필요한 기본 기능을 기반으로 사용자들에게 편리함을 제공합니다.

## 기능 구현 리스트

<details><summary>1. 공통 헤더,푸터</summary>

- 메뉴를 클릭하여 원하는 페이지로 이동이 가능합니다.
</details>

<details><summary>2. 메인페이지</summary>

- 상품배너 슬라이더를 통해 편리하게 배너 이미지 확인이 가능합니다.
- 인기 상품 및 신상품을 확인이 가능합니다.
</details>

<details><summary>3. 로그인, 회원가입 페이지</summary>

- 로그인 페이지는 이메일 형식과 비밀번호 형식 확인, 로그인 후 메인페이지로 이동합니다.
- 회원가입 페이지는 이메일 형식과 비밀번호 형식 확인, 이메일 인증 후 회원가입이 진행됩니다.
</details>

<details><summary>4. 상품목록 조회 페이지</summary>

- 카테고리 별 필터링으로 원하는 상품 조회가 가능합니다.
- 상품 이미지, 설명, 가격을 확인 할 수 있습니다.
</details>

<details><summary>5. 마이페이지 내정보 수정, 주문내역 페이지</summary>

- 내정보 수정 페이지는 이름, 이메일, 비밀번호 수정이 가능 합니다.
- 주문내역 페이지는 주문했던 상품목록이 조회가 되며 수정하고 삭제가 가능합니다.
</details>

<details><summary>6. 상품 상세 페이지</summary>

- 상품 리스트에서 원하는 상품을 클릭하면 해당 아이디에 상품과 상세 설명, 사이즈 선택 등 주문하기 전의 내용들을 확인 할 수 있습니다.
</details>

<details><summary>7. 장바구니 페이지</summary>

- 상품을 담았던 내역들을 확인하고 총 금액을 계산하여 안내 합니다.
</details>

<details><summary>8. 주문결제 페이지</summary>

- 배송정보를 입력하고 이름, 연락처, 이메일, 주소, 요청사항을 기입하여 주문합니다.
</details>

<details><summary>9. 어드민 상품목록, 상품추가, 카테고리, 주문관리</summary>

- 상품목록, 상품추가, 카테고리, 주문관리, 4가지 페이지로 구성이 되며 상품 및 카테고리 CRUD기능으로 이루어져 있습나다.
</details>


## Tech Stack

| FE                        | BE         | Infra     |
| ------------------------- | ---------- | --------- |
| Html                      | node.js    | VM        |
| Css                       | express.js |           |
| JavaScript                | mongodb    |           |

## 나의 역할
백엔드 : 
- 전반적인 스키마 작성
- api 명세서 작업
- user api 작업
- user 에러 핸들링 & 유효성 검사
- 몽고 디비 세팅
- 포스트맨을 이용한 api 테스트

## 스키마 명세서 

<details><summary>유저 스키마</summary>

```javascript
  
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  pw: {
    type: String,
    trim: true,
    required: true,
  },
  // 관리자
  admin: {
    type: Boolean,
    default: false,
  },
});
```

</details>

<details><summary>상품 스키마</summary>

```javascript
  
const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["men", "women"],
    required: true,
  },
  images: {
    type: String,
    required: false,
  },
});
```

</details>


<details><summary>주문 스키마</summary>

```javascript
  
const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ready", "shipping", "complete"],
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  productInfo: {
    type: [productSchema],
    required: true,
  },
});
```

</details>

<details><summary>유저 스키마</summary>

```javascript
  
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  pw: {
    type: String,
    trim: true,
    required: true,
  },
  // 관리자
  admin: {
    type: Boolean,
    default: false,
  },
});
```

</details>

<details><summary>카테고리 스키마</summary>

```javascript
  
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});
```

</details>

## Collaboration Tools

- Notion : 스터디 기간, 사용 기술 스택, 참고 문서, 업무 진행 사항, 회의록
- Discord : 음성 채팅방 활용 의견 제시및 문제 해결
- GitHub : Code Repository
- Postman Teams : API 테스트 진행

