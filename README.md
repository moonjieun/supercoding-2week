# 슈퍼코딩 2주차 프로젝트

## 요구사항

### 로그인 페이지/로그아웃 기능

- 필수
  - 이메일, 비밀번호 기반의 로그인 기능을 구현
  - 이메일, 비밀번호에 유효성 검사 로직을 적용
  - 로그아웃 기능을 구현
- 선택
  - Oauth 기반 인증 기능을 추가(네이버, 카카오등)
  - 로그인 시도를 5회 실패하면 계정을 일정 시간 잠금

### 회원가입

- 필수
  - 이메일, 비밀번호, 전화번호, 주소, 프로필 사진을 입력받는다.
  - 각각의 input에 규격에 맞는 값이 들어가도록 유효성 검사 로직을 추가한다.
- 선택
  - 이메일 중복확인 기능을 추가
  - 전화번호 기반 본인 인증 기능을 추가

### ### 쇼핑몰 물품 리스트 페이지

- 필수
  - 이미지와 상품명, 옵션, 가격 등의 정보를 그리드 형태로 리스트로 나타낸다.
  - 옵션에 따른 필터 및 페이지네이션 기능을 구현한다
- 선택
  - 반응형 레이아웃을 구현
  - 무한 스크롤링 기능을 구현
  - 상품 검색 기능을 구현

### 상세 페이지

- 필수
  - 이미지와 상품명, 옵션, 가격 등의 정보를 나타낸다.
    장바구니에 수량, 옵션을 설정해서 담을 수 있는 버튼을 구현한다.
- 선택
  - 여러 장의 이미지를 캐러셀로 보여줄 수 있는 화면을 구현한다.
  - 옵션에 따른 맞춤형 이미지를 보여주는 기능을 구현한다.

### 물품 주문 페이지

- 필수
  - 장바구니에 담긴 물품 내역을 보여준다.
  - 장바구니에 담긴 물품 내역을 수정할 수 있으며 그에 따라 가격이 달라진다.
  - 결제에 필요한 정보를 입력해서 주문 기능을 구현한다.
- 선택
  - 재고가 없거나 재고보다 많은 수량을 주문하려는 경우 막는다.

### 유저 프로필(마이)페이지

- 필수
  - 유저 정보를 보여준다.
  - 유저가 장바구니에 담은 물품 리스트를 보여준다.
- 선택
  - 유저가 판매하는 물품 리스트를 보여준다.
  - 유저 정보를 수정할 수 있다.
  - 유저가 쇼핑몰 페이머니를 조회할 수 있다.
  - 유저가 쇼핑몰 페이머니를 충전할 수 있다.
  - 등록 및 판매 기능

### 물품 등록

- 필수
  - 판매할 물품을 등록 할 수 있게 한다.

### 물품 판매

- 필수
  - 판매중인 물품의 재고를 수정할 수 있다.
- 선택
  - 판매한 물품 내역을 조회할 수 있다.

### 프로젝트 전체

- 필수
  - React, js 이용
  - redux, context api를 통해 전역 상태 관리
  - 커스텀 훅을 통해서 공통으로 사용하는 로직 관리
- 선택
  - styled-component, tailwindcss
  - ts, next.js
