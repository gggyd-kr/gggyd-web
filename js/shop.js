// Shop page cursor tooltip
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length === 0) return;

    // 데스크탑 체크
    function isDesktop() {
        return window.innerWidth > 1200;
    }

    // 툴팁 요소 생성
    const tooltip = document.createElement('div');
    tooltip.className = 'cursor-tooltip';
    document.body.appendChild(tooltip);

    // 제품 데이터 매핑
    const productData = {
        0: 'shop.products.tray_oak.name',
        1: 'shop.products.tray_walnut.name',
        2: 'shop.products.object_set.name',
        3: 'shop.products.side_table.name',
        4: 'shop.products.pen_tray.name',
        5: 'shop.products.bookshelf.name'
    };

    // 툴팁 업데이트 함수
    window.updateShopTooltips = function(lang) {
        // 현재 언어는 languageSwitcher에서 관리
    };

    productCards.forEach((card, index) => {
        const productKey = productData[index];

        card.addEventListener('mouseenter', () => {
            if (isDesktop() && languageSwitcher) {
                const lang = languageSwitcher.getCurrentLang();
                const translation = languageSwitcher.getTranslation(productKey, lang);
                tooltip.textContent = translation || card.querySelector('.product-name').textContent;
                tooltip.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        card.addEventListener('mousemove', (e) => {
            if (isDesktop()) {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = e.clientY + 'px';
            }
        });
    });
});
