# 감각공예단 (Sensory Craft Group) 웹사이트

## 📁 폴더 구조

```
sensory-craft/
├── index.html                      # 메인 페이지 (가로 스크롤 갤러리)
├── work.html                       # Work 페이지 (프로젝트 그리드)
├── shop.html                       # Shop 페이지 (제품 그리드)
├── project-detail-new.html         # 프로젝트 상세 페이지
├── project-detail.html             # 구 프로젝트 상세 페이지
│
├── css/                            # 스타일시트
│   ├── styles.css                  # 공통 스타일 (헤더, 언어전환 등)
│   ├── work.css                    # Work 페이지 스타일
│   ├── shop.css                    # Shop 페이지 스타일
│   ├── project-detail-new.css      # 프로젝트 상세 스타일
│   └── project-detail.css          # 구 프로젝트 상세 스타일
│
├── js/                             # JavaScript
│   ├── script.js                   # 공통 스크립트
│   ├── language-switcher.js        # 한영 전환 시스템
│   ├── work.js                     # Work 페이지 필터링
│   ├── shop.js                     # Shop 페이지 툴팁
│   └── project-detail-masonry.js   # Masonry 레이아웃
│
└── images/                         # 이미지 (추후 추가)
    ├── projects/                   # 프로젝트 이미지
    └── products/                   # 제품 이미지
```

## 🎨 주요 기능

### 1. 메인 페이지 (index.html)
- 가로 스크롤 갤러리
- 마우스 휠로 가로 스크롤
- 드래그 스크롤 지원
- 투명 오버레이 헤더

### 2. Work 페이지
- 2열 그리드 레이아웃 (정사각형 이미지)
- 카테고리 필터: All / Space / Product
- 호버 시 이미지 전환
- 반응형: 모바일 1열

### 3. Shop 페이지
- 3열 그리드 레이아웃 (정사각형 이미지)
- 데스크탑: 제품명/가격 숨김, 마우스 커서 툴팁
- 태블릿/모바일: 제품명/가격 표시
- 반응형: 태블릿 2열, 모바일 1열

### 4. Project Detail 페이지
- 상단: 타이틀 + 설명 (좌) / 메타정보 (우)
- 하단: Pinterest 스타일 Masonry 이미지 갤러리
- 2열 레이아웃

### 5. 언어 전환 시스템
- 최상단 우측 고정 (KR / EN)
- JavaScript 기반 실시간 전환
- 영문 시 Shop 메뉴 자동 숨김
- localStorage에 언어 설정 저장

## 🎯 브랜드 컬러
- 브랜드 옐로우: #F4C430
- 다크 브라운: #2C2416
- 웜 화이트: #FFF8F0
- 우드 톤: #D4A574

## 📱 반응형 브레이크포인트
- 모바일: ~768px
- 태블릿: 769px~1200px
- 데스크탑: 1201px+

## 🚀 다음 단계
- [ ] About 페이지
- [ ] Contact 페이지
- [ ] 실제 프로젝트 이미지 추가
- [ ] 결제 시스템 연동 (옵션)
- [ ] SEO 최적화

## 💡 사용 방법
1. 모든 파일을 같은 폴더에 유지
2. index.html을 브라우저로 열기
3. 이미지는 images/ 폴더에 추가

---
Made with ❤️ for 감각공예단
