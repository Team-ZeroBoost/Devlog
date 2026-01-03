console.log("blogList.js loaded")

const blogGrid = document.getElementById('blogGrid');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loader = document.getElementById('loader');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentPage = 1;  // SSR로 0페이지는 로딩됨 -> 1페이지부터
let currentSort = 'id';
let isLoading = false;
let isLastPage = false;

// 1. 카드 생성 함수 (필드명 수정됨)
function createCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';

    const imgSrc = post.thumbnailUrl ? post.thumbnailUrl : 'https://placehold.co/300x200/eeeeee/333?text=DevLog';
    // [수정] id -> boardNo
    const detailUrl = `/blog/detail/${post.boardNo}`; 
    const paidIcon = (post.isPaid === 'Y') ? '<i class="fa-solid fa-crown" style="color:#ffd700; margin-right:5px;"></i>' : '';

    card.innerHTML = `
        <a href="${detailUrl}" class="card-link">
            <div class="card-image">
                <img src="${imgSrc}" alt="썸네일" onerror="this.src='https://via.placeholder.com/300'">
            </div>
            <div class="card-content">
                <h3 class="card-title">${paidIcon}${post.boardTitle}</h3>
                
                <p class="card-desc">${post.boardContent ? post.boardContent : ''}</p>
                
                <div class="card-meta">
                    <span class="author">${post.memberNickname}</span>
                    <div class="stats">
                        <span><i class="fa-solid fa-eye"></i> ${post.boardCount}</span>
                        <span><i class="fa-solid fa-comment"></i> ${post.commentCount}</span>
                    </div>
                </div>
                <div class="card-footer-time" style="display:flex; justify-content:space-between; align-items:center;">
                    <span>${post.bCreateDate}</span>
                </div>
            </div>
        </a>
    `;
    return card;
}

// 2. 데이터 페치
function fetchPosts(isReset = false) {
    if (isLoading) return;
    
    if (isReset) {
        blogGrid.innerHTML = '';
        currentPage = 0; // 초기화 시 0부터
        isLastPage = false;
        loader.style.display = 'block';
    }

    if (isLastPage) return;
    isLoading = true;

    // API 호출
    const url = `/api/blog/list?page=${currentPage}&size=12&sort=${currentSort},desc`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('실패');
            return res.json();
        })
        .then(data => {
            // [수정] Service에서 Map으로 리턴하므로 data.content가 리스트임
            const posts = data.content; 
            const last = data.last;

            if (!posts || posts.length === 0) {
                isLastPage = true;
                loader.style.display = 'none';
                if (isReset) blogGrid.innerHTML = '<p class="no-data">등록된 게시글이 없습니다.</p>';
                return;
            }

            if (last) {
                isLastPage = true;
                loader.style.display = 'none';
            }

            posts.forEach(post => {
                blogGrid.appendChild(createCard(post));
            });
            currentPage++;
        })
        .catch(err => console.error(err))
        .finally(() => isLoading = false);
}

// 3. 무한 스크롤 옵저버
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLastPage && !isLoading) {
        setTimeout(() => fetchPosts(), 300);
    }
}, { threshold: 0.1 });

if (loader) observer.observe(loader);

// 4. 필터 버튼
filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const sort = this.getAttribute('data-sort');
        // 백엔드 파라미터 매핑
        if (sort === 'view') currentSort = 'viewCount';
        else if (sort === 'like') currentSort = 'likeCount';
        else if (sort === 'comment') currentSort = 'commentCount';
        else currentSort = 'id';

        fetchPosts(true);
    });
});

// TOP 버튼
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = (window.scrollY > 500) ? 'flex' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});