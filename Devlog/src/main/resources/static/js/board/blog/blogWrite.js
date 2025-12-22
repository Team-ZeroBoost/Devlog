// Toast UI Editor 초기화
const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '600px',
    initialEditType: 'markdown', // 기본 모드: 마크다운
    previewStyle: 'vertical',    // 미리보기 스타일: 세로 분할 (스크린샷 참조)
    placeholder: '내용을 입력하세요.',
    hooks: {
        addImageBlobHook: (blob, callback) => {
            // 이미지 업로드 로직 구현 필요 (백엔드 연동 시)
            console.log('이미지 업로드:', blob);
        }
    }
});

// 유료/무료 콘텐츠 토글 로직
const radioButtons = document.querySelectorAll('input[name="content-type"]');
const priceWrapper = document.getElementById('priceWrapper');
const priceInput = document.getElementById('priceInput');

radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'paid') {
            // 유료 선택 시: 입력창 활성화 및 스타일 변경
            priceWrapper.classList.add('active');
            priceInput.disabled = false;
            priceInput.focus();
        } else {
            // 무료 선택 시: 입력창 비활성화 및 초기화
            priceWrapper.classList.remove('active');
            priceInput.disabled = true;
            priceInput.value = '';
        }
    });
});

// 버튼 이벤트 리스너 (예시)
document.querySelector('.btn-publish').addEventListener('click', () => {
    const title = document.querySelector('.input-title').value;
    const content = editor.getMarkdown(); // 마크다운 내용 가져오기

    if (!title) {
        alert('제목을 입력해주세요.');
        return;
    }

    // 여기서 백엔드로 데이터 전송 (AJAX/Fetch)
    console.log({
        title: title,
        content: content,
        isPaid: document.querySelector('input[name="content-type"]:checked').value === 'paid',
        price: priceInput.value
    });

    alert('발행이 완료되었습니다!'); // 실제로는 완료 페이지 이동
});