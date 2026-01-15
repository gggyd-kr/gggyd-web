// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 폼 데이터 가져오기
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // 여기서 실제로 서버로 전송하거나 이메일 서비스 연동
            // 예: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

            // 임시: 성공 메시지 표시
            showMessage('success', '메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!');

            // 폼 초기화
            contactForm.reset();

            // 실제 구현 시 아래 코드 사용:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('success', '메시지가 성공적으로 전송되었습니다!');
                    contactForm.reset();
                } else {
                    showMessage('error', '전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            })
            .catch(error => {
                showMessage('error', '전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                console.error('Error:', error);
            });
            */
        });
    }

    function showMessage(type, text) {
        // 기존 메시지 제거
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 새 메시지 생성
        const message = document.createElement('div');
        message.className = `form-message ${type} show`;
        message.textContent = text;

        // 폼 위에 삽입
        contactForm.insertBefore(message, contactForm.firstChild);

        // 5초 후 메시지 숨기기
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }
});
