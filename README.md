# Flow - Code Review Platform

![Flow Logo](./public/icons/appIcon.svg) Flow는 대학생 및 졸업생을 위한 혁신적인 코드 리뷰 및 멘토링 플랫폼입니다. <br/>
이 프로젝트는 사용자의 개발 역량 강화와 성공적인 취업 준비를 지원하기 위해 설계되었습니다.

## 🌟 주요 기능

- **커뮤니티 서비스**: 게시글 작성, 댓글 및 답글 작성, 트렌딩 포스트 조회
- **코드 리뷰**: 신뢰 기반의 코드 리뷰 요청 및 피드백 시스템
- **채용 정보 제공**: 최신 채용 공고 조회 및 검색
- **커피챗 멘토링**: 실시간 조언 및 멘토링 요청 기능
- **명예의 전당**: 우수한 기여자들의 정보 공개 및 동기 부여

---

## 📸 스크린샷
### 1. 메인 페이지
| 웹 화면                               | 모바일 화면                           |
|---------------------------------------|---------------------------------------|
| ![웹 화면](https://github.com/user-attachments/assets/13133192-5af3-4f00-8d43-dbf46d7c8a8c) | ![모바일 화면](https://github.com/user-attachments/assets/79dc4205-e429-4c42-a249-32382237888c) |

### 2. 게시물 작성 및 조회
![Post Feature](https://github.com/user-attachments/assets/c422c3fd-5310-4545-a56b-da4656f2aafe)
| 웹 화면                               | 모바일 화면                           |
|---------------------------------------|---------------------------------------|
| ![웹 화면](https://github.com/user-attachments/assets/36d1f2fa-fad7-4bba-8e3a-3d3d4f26056c) | ![모바일 화면](https://github.com/user-attachments/assets/3bb4f78b-c611-4a2e-ab46-26f7ae6ce6a3) |


### 3. 커피챗 요청
![Coffee Chat](https://github.com/user-attachments/assets/36d1f2fa-fad7-4bba-8e3a-3d3d4f26056c)


---

## 🚀 기술 스택

- **Frontend**: React, Next.js, Styled-Components, Recoil
- **Backend**: Spring Boot, PostgreSQL
- **DevOps**: Google Cloud Platform, Kubernetes, ArgoCD, Terraform
- **CI/CD**: GitHub Actions, Artifact Registry

---

## 🛠️ 프로젝트 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. Storybook 실행
```bash
npm run storybook
```

### 4. 배포 빌드
```bash
npm run build
```

---

아래와 같이 FSD(File-Slice Design) 아키텍처를 활용했다는 내용을 추가할 수 있습니다:

---

## 📂 파일 구조
```plaintext
Flow-Front/
├── src/
│   ├── app/
│   ├── entities/
│   ├── features/
│   ├── shared/
│   └── views/
└── public/
    └── storybook-static/
```

### FSD(File-Slice Design) 아키텍처 활용
- 위 파일 구조는 **FSD(File-Slice Design)** 아키텍처를 기반으로 설계되었습니다.
- **FSD란?** 기능 중심(feature-oriented)으로 프로젝트를 구성하여 모듈 간의 의존성을 최소화하고, 확장성을 높이는 아키텍처 방식입니다.
- 주요 디렉토리 설명:
  - `app/`: 전역 상태 관리 및 앱 초기화 관련 코드
  - `entities/`: 비즈니스 도메인(Entity)와 관련된 코드
  - `features/`: 특정 기능(Feature) 단위로 구성된 코드
  - `shared/`: 공통 유틸리티 및 컴포넌트
  - `views/`: 화면(View) 레이어 관련 코드
- **장점**:
  - 코드의 가독성과 유지보수성이 향상됩니다.
  - 팀 간 작업 영역을 명확히 구분하여 협업 효율성을 증대합니다.

---

## 🌐 배포 주소
[Flow Frontend](https://front.gcuflow.site)

---

## 🏆 팀 구성
- **Leader/Frontend**: [Jim Min Seong](https://github.com/jiminseong)
- **Backend/DevOps**: [SteamedEggMaster](https://github.com/SteamedEggMaster)
- **DevOps/Frontend/Backend**: [abwarten](https://github.com/abwarten)

---

## 📖 추가 정보
프로젝트에 대한 자세한 내용은 [완료보고서](https://github.com/user-attachments/files/18238724/Flow.-.pdf)를 참고하세요. 
