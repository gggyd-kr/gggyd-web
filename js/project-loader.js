// Dynamic Project Detail Loader
class ProjectDetailLoader {
    constructor() {
        this.projectId = this.getProjectIdFromURL();
        this.currentLang = localStorage.getItem('language') || 'kr';
        this.init();
    }

    getProjectIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    async init() {
        if (!this.projectId) {
            console.error('No project ID found in URL');
            return;
        }

        try {
            const response = await fetch('data/projects.json');
            const projects = await response.json();
            const projectData = projects[this.projectId];

            if (projectData) {
                this.loadProject(projectData);
            } else {
                console.error('Project not found:', this.projectId);
            }
        } catch (error) {
            console.error('Error loading project:', error);
        }
    }

    loadProject(data) {
        const lang = this.currentLang;

        // 타이틀
        const titleElement = document.querySelector('.project-title');
        if (titleElement) {
            titleElement.textContent = data.title[lang];
            titleElement.setAttribute('data-kr', data.title.kr);
            titleElement.setAttribute('data-en', data.title.en);
        }

        // 설명
        const descContainer = document.querySelector('.project-description');
        if (descContainer) {
            descContainer.innerHTML = '';
            data.description[lang].forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                p.setAttribute('data-kr', data.description.kr[data.description[lang].indexOf(paragraph)]);
                p.setAttribute('data-en', data.description.en[data.description[lang].indexOf(paragraph)]);
                descContainer.appendChild(p);
            });
        }

        // 메타 정보
        this.loadMeta('year', data.year);
        this.loadMeta('material', data.specs.material[lang], data.specs.material);
        this.loadMeta('size', data.specs.size);
        this.loadMeta('finish', data.specs.finish[lang], data.specs.finish);
        this.loadMeta('production', data.specs.production[lang], data.specs.production);
        this.loadMeta('category', data.category[lang], data.category);

        // 이미지
        this.loadImages(data.images);

        // 페이지 타이틀
        document.title = `${data.title[lang]} - 감각공예단`;
    }

    loadMeta(key, value, langValues = null) {
        const metaItems = document.querySelectorAll('.meta-item');
        metaItems.forEach(item => {
            const label = item.querySelector('.meta-label');
            if (label && label.textContent.toLowerCase().includes(this.getMetaLabel(key))) {
                const valueElement = item.querySelector('.meta-value');
                if (valueElement) {
                    valueElement.textContent = value;
                    if (langValues) {
                        valueElement.setAttribute('data-kr', langValues.kr || value);
                        valueElement.setAttribute('data-en', langValues.en || value);
                    }
                }
            }
        });

        // 년도 메타 아이템 (첫 번째)
        if (key === 'year') {
            const firstMeta = document.querySelector('.meta-item:first-child .meta-value');
            if (firstMeta) {
                firstMeta.textContent = value;
            }
        }
    }

    getMetaLabel(key) {
        const labels = {
            'material': 'material',
            'size': 'size',
            'finish': 'finish',
            'production': 'production',
            'category': 'category'
        };
        return labels[key] || key;
    }

    loadImages(images) {
        const gallery = document.querySelector('.project-gallery');
        if (!gallery) return;

        gallery.innerHTML = '';
        images.forEach((imageUrl, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'gallery-image';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Project image ${index + 1}`;
            
            imageItem.appendChild(img);
            gallery.appendChild(imageItem);
        });

        // Masonry 레이아웃 재계산 (약간의 딜레이 후)
        setTimeout(() => {
            if (window.initMasonry) {
                window.initMasonry();
            }
        }, 100);
    }

    // 언어 전환 시 호출될 함수
    updateLanguage(lang) {
        this.currentLang = lang;
        
        // data-kr, data-en 속성을 가진 모든 요소 업데이트
        document.querySelectorAll('[data-kr][data-en]').forEach(element => {
            if (lang === 'kr') {
                element.textContent = element.getAttribute('data-kr');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        });
    }
}

// 전역 인스턴스
let projectLoader;

document.addEventListener('DOMContentLoaded', () => {
    projectLoader = new ProjectDetailLoader();
});
