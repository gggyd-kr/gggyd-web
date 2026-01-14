// Masonry Layout for Project Detail
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.project-gallery');
    const images = document.querySelectorAll('.gallery-image');

    if (!gallery || images.length === 0) return;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function initMasonry() {
        if (isMobile()) {
            // 모바일에서는 Masonry 비활성화
            gallery.style.height = 'auto';
            return;
        }

        const gap = 32; // 2rem = 32px
        const columnWidth = (gallery.offsetWidth - gap) / 2;
        const columns = [0, 0]; // 각 열의 현재 높이

        const allImages = gallery.querySelectorAll('.gallery-image');
        
        allImages.forEach((image, index) => {
            const img = image.querySelector('img');
            
            // 이미지가 로드될 때까지 기다림
            if (img.complete) {
                positionImage(image, img, columnWidth, gap, columns);
            } else {
                img.addEventListener('load', () => {
                    positionImage(image, img, columnWidth, gap, columns);
                });
            }
        });

        // 갤러리 높이 설정
        setTimeout(() => {
            const maxHeight = Math.max(...columns);
            gallery.style.height = maxHeight + 'px';
        }, 100);
    }

    function positionImage(image, img, columnWidth, gap, columns) {
        // 가장 짧은 열 찾기
        const shortestColumn = columns[0] <= columns[1] ? 0 : 1;
        
        // 이미지 비율 계산
        const imageHeight = (img.naturalHeight / img.naturalWidth) * columnWidth;
        
        // 위치 지정
        const left = shortestColumn === 0 ? 0 : columnWidth + gap;
        const top = columns[shortestColumn];
        
        image.style.left = left + 'px';
        image.style.top = top + 'px';
        
        // 열 높이 업데이트
        columns[shortestColumn] += imageHeight + gap;
        
        // 갤러리 높이 업데이트
        const maxHeight = Math.max(...columns);
        image.parentElement.style.height = maxHeight + 'px';
    }

    // 초기 실행
    initMasonry();

    // 윈도우 리사이즈 시 재계산
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initMasonry();
        }, 250);
    });

    // 전역 함수로 노출 (프로젝트 로더에서 호출)
    window.initMasonry = initMasonry;
});
