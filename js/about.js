// About 페이지 언어 전환
document.addEventListener('DOMContentLoaded', () => {
    const krText = document.querySelector('.kr-text');
    const enText = document.querySelector('.en-text');
    
    // 저장된 언어 불러오기
    const savedLang = localStorage.getItem('language') || 'kr';
    updateAboutLanguage(savedLang);
    
    // 언어 전환 감지
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-link') || 
            e.target.closest('.top-language-switcher a')) {
            
            setTimeout(() => {
                const currentLang = localStorage.getItem('language') || 'kr';
                updateAboutLanguage(currentLang);
            }, 100);
        }
    });
    
    function updateAboutLanguage(lang) {
        if (lang === 'en') {
            krText.style.display = 'none';
            enText.style.display = 'block';
        } else {
            krText.style.display = 'block';
            enText.style.display = 'none';
        }
    }
});
