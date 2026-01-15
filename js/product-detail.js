// Product Detail Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Fallback for Safari (if needed)
    const productInfo = document.querySelector('.product-info');
    const productDetail = document.querySelector('.product-detail');
    let scrollHandler = null;
    
    function initSticky() {
        // 기존 스크롤 리스너 제거
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler);
            scrollHandler = null;
        }
        
        // 데스크탑에서만 작동
        if (productInfo && window.innerWidth > 768) {
            const productInfoWidth = productInfo.offsetWidth;
            
            // Grid의 오른쪽 위치 계산
            const gridRect = productDetail.getBoundingClientRect();
            const rightPosition = window.innerWidth - gridRect.right;
            
            // 처음부터 fixed로 고정
            productInfo.style.position = 'fixed';
            productInfo.style.top = '100px';
            productInfo.style.right = rightPosition + 'px';
            productInfo.style.width = productInfoWidth + 'px';
            productInfo.style.maxHeight = 'calc(100vh - 100px)';
            productInfo.style.overflowY = 'auto';
            
        } else if (productInfo) {
            // 모바일에서는 모든 sticky 스타일 초기화
            productInfo.style.position = '';
            productInfo.style.top = '';
            productInfo.style.right = '';
            productInfo.style.width = '';
            productInfo.style.maxHeight = '';
            productInfo.style.overflowY = '';
        }
    }
    
    // 초기 실행
    initSticky();
    
    // Mobile Gallery Setup
    function setupMobileGallery() {
        if (window.innerWidth <= 768) {
            const galleryImages = document.querySelectorAll('.gallery-img');
            const mobileThumbnails = document.querySelector('.mobile-thumbnails');
            
            if (galleryImages.length > 0 && mobileThumbnails) {
                // 썸네일이 이미 생성되어 있으면 스킵
                if (mobileThumbnails.children.length > 0) return;

                // 썸네일 생성
                galleryImages.forEach((img, index) => {
                    const thumbnail = document.createElement('img');
                    thumbnail.src = img.src;
                    thumbnail.alt = `Thumbnail ${index + 1}`;
                    if (index === 0) thumbnail.classList.add('active');
                    
                    thumbnail.addEventListener('click', () => {
                        // 모든 이미지 숨기기
                        galleryImages.forEach(i => i.style.display = 'none');
                        // 클릭한 이미지만 보이기
                        galleryImages[index].style.display = 'block';
                        
                        // 썸네일 active 클래스
                        mobileThumbnails.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                        thumbnail.classList.add('active');
                    });
                    
                    mobileThumbnails.appendChild(thumbnail);
                });
            }
        }
    }

    // 초기 실행
    setupMobileGallery();

    // 윈도우 리사이즈 시 재계산 (sticky + gallery)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initSticky();
            setupMobileGallery();
        }, 250);
    });

    // Finish Options Selection
    const finishOptions = document.querySelectorAll('.finish-option');
    
    finishOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            finishOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            const selectedFinish = option.getAttribute('data-finish');
            console.log('Selected finish:', selectedFinish);
        });
    });

    // Quantity Controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            const maxValue = parseInt(quantityInput.getAttribute('max'));
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Prevent manual input of invalid values
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            const min = parseInt(quantityInput.getAttribute('min'));
            const max = parseInt(quantityInput.getAttribute('max'));

            if (value < min) quantityInput.value = min;
            if (value > max) quantityInput.value = max;
            if (isNaN(value)) quantityInput.value = 1;
        });
    }

    // Add to Cart Button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = quantityInput ? quantityInput.value : 1;
            const selectedFinish = document.querySelector('.finish-option.active');
            const finishType = selectedFinish ? selectedFinish.getAttribute('data-finish') : 'natural';
            
            alert(`장바구니에 추가되었습니다!\n수량: ${quantity}\n마감: ${finishType}`);
        });
    }

    // Contact Button
    const contactBtn = document.querySelector('.contact-btn');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }
});
