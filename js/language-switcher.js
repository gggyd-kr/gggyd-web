// Language Switcher with Translation System
const translations = {
    kr: {
        // Navigation
        nav: {
            about: "About",
            work: "Work",
            shop: "Shop",
            contact: "Contact"
        },
        // Shop page
        shop: {
            products: {
                tray_oak: {
                    name: "조각보 트레이 - 오크",
                    price: "₩95,000"
                },
                tray_walnut: {
                    name: "조각보 트레이 - 월넛",
                    price: "₩110,000"
                },
                object_set: {
                    name: "우드 오브제 세트",
                    price: "₩85,000"
                },
                side_table: {
                    name: "원목 사이드 테이블",
                    price: "₩340,000"
                },
                pen_tray: {
                    name: "조각보 펜 트레이",
                    price: "₩65,000"
                },
                bookshelf: {
                    name: "미니 책장",
                    price: "₩180,000"
                }
            }
        },
        // Work page
        work: {
            categories: {
                all: "All",
                space: "Space",
                product: "Product"
            },
            projects: {
                jogakbo_tray: {
                    name: "조각보 트레이",
                    year: "2024"
                },
                popup_booth: {
                    name: "백화점 팝업부스 가구",
                    year: "2024"
                },
                wood_object: {
                    name: "우드 오브제 컬렉션",
                    year: "2023"
                },
                cafe_design: {
                    name: "카페 공간 디자인",
                    year: "2023"
                },
                side_table_project: {
                    name: "원목 사이드 테이블",
                    year: "2024"
                },
                exhibition: {
                    name: "전시 공간 설치",
                    year: "2023"
                }
            }
        },
        // Project detail page
        projectDetail: {
            title: "조각보 트레이",
            description: [
                "전통 조각보의 절약 정신과 짜맞춤 기법을 현대적으로 재해석한 목공예 트레이입니다. 가구 제작 과정에서 발생하는 자투리 목재를 활용하여, 각기 다른 나무의 결과 색상을 조화롭게 배치했습니다.",
                "전통 제혀쪽매와 사개맞춤 기법으로 조립하여 접착제 사용을 최소화하였으며, 제품마다 고유한 무늬를 지닌 유일한 작품입니다. 버려질 뻔한 나무 조각들이 새로운 가치를 얻어 일상의 아름다움으로 재탄생합니다."
            ],
            meta: {
                year: "2024",
                material: "원목 (오크, 월넛, 메이플)",
                size: "W 350 × D 250 × H 30 mm",
                finish: "자연 유래 오일 피니시",
                production: "전통 짜맞춤 + 수작업",
                category: "Product Design"
            },
            labels: {
                material: "소재",
                size: "사이즈",
                finish: "마감",
                production: "제작",
                category: "카테고리"
            }
        }
    },
    en: {
        // Navigation
        nav: {
            about: "About",
            work: "Work",
            shop: "Shop", // Shop은 숨겨질 예정
            contact: "Contact"
        },
        // Shop page
        shop: {
            products: {
                tray_oak: {
                    name: "Jogakbo Tray - Oak",
                    price: "$75"
                },
                tray_walnut: {
                    name: "Jogakbo Tray - Walnut",
                    price: "$87"
                },
                object_set: {
                    name: "Wood Object Set",
                    price: "$67"
                },
                side_table: {
                    name: "Solid Wood Side Table",
                    price: "$270"
                },
                pen_tray: {
                    name: "Jogakbo Pen Tray",
                    price: "$52"
                },
                bookshelf: {
                    name: "Mini Bookshelf",
                    price: "$142"
                }
            }
        },
        // Work page
        work: {
            categories: {
                all: "All",
                space: "Space",
                product: "Product"
            },
            projects: {
                jogakbo_tray: {
                    name: "Jogakbo Tray",
                    year: "2024"
                },
                popup_booth: {
                    name: "Department Store Popup Booth Furniture",
                    year: "2024"
                },
                wood_object: {
                    name: "Wood Object Collection",
                    year: "2023"
                },
                cafe_design: {
                    name: "Cafe Space Design",
                    year: "2023"
                },
                side_table_project: {
                    name: "Solid Wood Side Table",
                    year: "2024"
                },
                exhibition: {
                    name: "Exhibition Space Installation",
                    year: "2023"
                }
            }
        },
        // Project detail page
        projectDetail: {
            title: "Jogakbo Tray",
            description: [
                "A modern reinterpretation of traditional Korean Jogakbo patchwork and joinery techniques in woodcraft. This tray utilizes scrap wood from furniture production, harmoniously arranging different wood grains and colors.",
                "Assembled using traditional mortise and tenon joinery to minimize adhesive use, each piece features a unique pattern, making it a one-of-a-kind work. Wood pieces that would have been discarded are given new value, reborn as everyday beauty."
            ],
            meta: {
                year: "2024",
                material: "Solid Wood (Oak, Walnut, Maple)",
                size: "W 350 × D 250 × H 30 mm",
                finish: "Natural Oil Finish",
                production: "Traditional Joinery + Handcrafted",
                category: "Product Design"
            },
            labels: {
                material: "Material",
                size: "Size",
                finish: "Finish",
                production: "Production",
                category: "Category"
            }
        }
    }
};

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'kr';
        this.init();
    }

    init() {
        // 페이지 로드 시 저장된 언어 적용
        this.applyLanguage(this.currentLang);
        
        // 언어 전환 버튼 이벤트
        document.querySelectorAll('.top-language-switcher a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.textContent.toLowerCase();
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        // Shop 메뉴 표시/숨김
        const shopLinks = document.querySelectorAll('nav a[href*="shop"]');
        shopLinks.forEach(link => {
            if (lang === 'en') {
                link.style.display = 'none';
            } else {
                link.style.display = '';
            }
        });

        // 활성 언어 표시
        document.querySelectorAll('.top-language-switcher a').forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase() === lang) {
                link.classList.add('active');
            }
        });

        // 모든 data-i18n 속성을 가진 요소 번역
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key, lang);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Shop 툴팁 업데이트
        if (window.updateShopTooltips) {
            window.updateShopTooltips(lang);
        }

        // 프로젝트 상세 페이지 업데이트
        if (window.projectLoader) {
            window.projectLoader.updateLanguage(lang);
        }
    }

    getTranslation(key, lang) {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    getCurrentLang() {
        return this.currentLang;
    }
}

// 전역 인스턴스 생성
let languageSwitcher;

document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher = new LanguageSwitcher();
});
