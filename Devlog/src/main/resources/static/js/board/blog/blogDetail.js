// 상태 변수
let userCoffeeBeans = 12450;
const contentPrice = 3000;
let isFollowing = false;

// 게시글 상태
let isAuthor = true;
let isPaidContent = true;
let viewCount = 999;
let postLikeCount = 1;
let isPostLiked = false;

// 현재 로그인한 사용자 정보
const currentUser = {
    id: 'user1',
    nickname: 'GwanSik_Yang',
    profileUrl: 'https://via.placeholder.com/40'
};

// 댓글 데이터
let comments = [
    {
        id: 1,
        userId: 'user2',
        nickname: 'DevKing',
        profileUrl: 'https://via.placeholder.com/40/333',
        content: '정말 유익한 글이네요! 면접 준비 중인데 큰 도움이 되었습니다.',
        date: '2025.11.07 14:20',
        likes: 5,
        isLiked: false,
        replies: [
            {
                id: 101,
                userId: 'user1',
                nickname: 'GwanSik_Yang',
                profileUrl: 'https://via.placeholder.com/40',
                content: '감사합니다! 꼭 합격하시길 응원합니다 :)',
                date: '2025.11.07 15:00',
                likes: 2,
                isLiked: true,
            }
        ]
    },
    {
        id: 2,
        userId: 'user3',
        nickname: 'NewBie',
        profileUrl: 'https://via.placeholder.com/40/777',
        content: '질문 2번 내용이 특히 공감되네요. 솔직함이 무기죠.',
        date: '2025.11.08 09:10',
        likes: 0,
        isLiked: false,
        replies: []
    }
];

// DOM 요소 참조
const postHeartIcon = document.getElementById('postHeartIcon');
const postLikeCountSpan = document.getElementById('postLikeCount');
const btnPostLike = document.getElementById('btnPostLike');

const commentListEl = document.getElementById('commentList');
const commentTotalCountEl = document.getElementById('commentTotalCount');
const mainCommentInput = document.getElementById('mainCommentInput');

const authorActionArea = document.getElementById('authorActionArea');
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');

// 초기화
function init() {
    updateBalanceDisplay();
    checkAuthorPermissions();
    renderComments();
}

// === 게시글 좋아요 ===
function togglePostLike() {
    isPostLiked = !isPostLiked;

    if (isPostLiked) {
        postLikeCount++;
        btnPostLike.classList.add('active');
        postHeartIcon.classList.remove('fa-regular');
        postHeartIcon.classList.add('fa-solid');
    } else {
        postLikeCount--;
        btnPostLike.classList.remove('active');
        postHeartIcon.classList.remove('fa-solid');
        postHeartIcon.classList.add('fa-regular');
    }
    postLikeCountSpan.innerText = postLikeCount;
}

// === 댓글 렌더링 ===
function renderComments() {
    commentListEl.innerHTML = '';
    let totalCount = 0;

    comments.forEach(comment => {
        totalCount++;
        commentListEl.appendChild(createCommentElement(comment, false));

        if (comment.replies && comment.replies.length > 0) {
            comment.replies.forEach(reply => {
                totalCount++;
                commentListEl.appendChild(createCommentElement(reply, true, comment.id));
            });
        }
    });

    commentTotalCountEl.innerText = totalCount;
    document.getElementById('commentCount').innerText = totalCount;
}

function createCommentElement(data, isReply, parentId = null) {
    const el = document.createElement('div');
    el.className = `comment-item ${isReply ? 'reply' : ''}`;
    el.id = `comment-${data.id}`;

    const isMine = data.userId === currentUser.id;
    const heartClass = data.isLiked ? 'fa-solid' : 'fa-regular';
    const activeClass = data.isLiked ? 'active' : '';

    // [수정] 프로필 이미지와 닉네임에 링크 적용
    el.innerHTML = `
        <a href="/blog/${data.nickname}" class="profile-link">
            <img src="${data.profileUrl}" alt="${data.nickname}" class="avatar">
        </a>
        <div class="comment-content">
            <div class="comment-header">
                <div class="comment-meta">
                    <a href="/blog/${data.nickname}" class="profile-link">
                        <span class="username">${data.nickname}</span>
                    </a>
                    <span class="comment-date">${data.date}</span>
                </div>
            </div>
            
            <div class="comment-text" id="text-${data.id}">${data.content}</div>
            
            <div class="comment-actions">
                <button class="action-btn like-comment-btn ${activeClass}" onclick="toggleCommentLike(${data.id}, ${parentId})">
                    <i class="${heartClass} fa-heart"></i> ${data.likes || 0}
                </button>
                ${!isReply ? `<button class="action-btn" onclick="openReplyForm(${data.id})">답글 달기</button>` : ''}
                ${isMine ? `
                    <button class="action-btn" onclick="enableEditMode(${data.id}, ${parentId})">수정</button>
                    <button class="action-btn delete-btn" onclick="deleteComment(${data.id}, ${parentId})">삭제</button>
                ` : ''}
            </div>
            <div id="reply-form-area-${data.id}"></div>
        </div>
    `;
    return el;
}

// === 댓글 CRUD ===

// 1. 메인 댓글 작성
function addMainComment() {
    const content = mainCommentInput.value.trim();
    if (!content) {
        alert("내용을 입력해주세요.");
        return;
    }

    const newComment = {
        id: Date.now(),
        userId: currentUser.id,
        nickname: currentUser.nickname,
        profileUrl: currentUser.profileUrl,
        content: content,
        date: new Date().toLocaleString(),
        likes: 0,
        isLiked: false,
        replies: []
    };

    comments.push(newComment);
    mainCommentInput.value = '';
    renderComments();
}

// 2. 답글 폼 열기
function openReplyForm(commentId) {
    const area = document.getElementById(`reply-form-area-${commentId}`);
    if (area.innerHTML !== '') {
        area.innerHTML = '';
        return;
    }

    document.querySelectorAll('[id^="reply-form-area-"]').forEach(el => el.innerHTML = '');

    // [수정] 답글 폼 내 프로필에도 링크 적용
    const formHtml = `
        <div class="reply-form-container">
            <div class="comment-user-profile">
                 <a href="/blog/${currentUser.nickname}" class="profile-link">
                    <img src="${currentUser.profileUrl}" class="avatar" style="width:24px;height:24px;">
                    <span class="username" style="font-size:0.85rem;">${currentUser.nickname}</span>
                 </a>
            </div>
            <div class="input-wrapper">
                <textarea id="replyInput-${commentId}" placeholder="답글을 작성하세요..."></textarea>
                <div class="input-footer">
                    <button class="btn-submit-styled" onclick="addReply(${commentId})">등록</button>
                </div>
            </div>
        </div>
    `;
    area.innerHTML = formHtml;
}

// 3. 답글 작성 완료
function addReply(parentId) {
    const input = document.getElementById(`replyInput-${parentId}`);
    const content = input.value.trim();
    if (!content) return alert("내용을 입력하세요.");

    const parentComment = comments.find(c => c.id === parentId);
    if (parentComment) {
        const newReply = {
            id: Date.now(),
            userId: currentUser.id,
            nickname: currentUser.nickname,
            profileUrl: currentUser.profileUrl,
            content: content,
            date: new Date().toLocaleString(),
            likes: 0,
            isLiked: false
        };
        parentComment.replies.push(newReply);
        renderComments();
    }
}

// 4. 댓글 좋아요
function toggleCommentLike(id, parentId) {
    let target;
    if (parentId) {
        const parent = comments.find(c => c.id === parentId);
        target = parent.replies.find(r => r.id === id);
    } else {
        target = comments.find(c => c.id === id);
    }

    if (target) {
        target.isLiked = !target.isLiked;
        target.likes += target.isLiked ? 1 : -1;
        renderComments();
    }
}

// 5. 댓글 삭제
function deleteComment(id, parentId) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    if (parentId) {
        const parent = comments.find(c => c.id === parentId);
        parent.replies = parent.replies.filter(r => r.id !== id);
    } else {
        comments = comments.filter(c => c.id !== id);
    }
    renderComments();
}

// 6. 댓글 수정 모드 (버튼 숨김)
function enableEditMode(id, parentId) {
    const textEl = document.getElementById(`text-${id}`);
    const currentText = textEl.innerText;

    textEl.innerHTML = `
        <textarea id="editInput-${id}" class="edit-textarea">${currentText}</textarea>
        <div style="text-align:right;">
            <button class="action-btn" onclick="saveEdit(${id}, ${parentId})" style="display:inline-block; color:var(--primary-color);">저장</button>
            <button class="action-btn" onclick="renderComments()" style="display:inline-block;">취소</button>
        </div>
    `;

    // 수정 중 하단 액션 버튼 숨기기
    const commentItem = document.getElementById(`comment-${id}`);
    const actionArea = commentItem.querySelector('.comment-actions');
    if (actionArea) {
        actionArea.style.display = 'none';
    }
}

// 7. 댓글 수정 저장
function saveEdit(id, parentId) {
    const newContent = document.getElementById(`editInput-${id}`).value;

    if (parentId) {
        const parent = comments.find(c => c.id === parentId);
        const target = parent.replies.find(r => r.id === id);
        target.content = newContent;
    } else {
        const target = comments.find(c => c.id === id);
        target.content = newContent;
    }
    renderComments();
}

// === 유틸 함수 ===
function updateBalanceDisplay() {
    document.getElementById('userBalance').innerText = userCoffeeBeans.toLocaleString() + '콩';
}

function closeAllModals() {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('modalPurchase').classList.add('hidden');
    document.getElementById('modalNoBalance').classList.add('hidden');
    document.getElementById('modalSuccess').classList.add('hidden');
    document.getElementById('modalReport').classList.add('hidden');
}

function openPurchaseModal() {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('modalPurchase').classList.remove('hidden');
}

function processPayment() {
    document.getElementById('modalPurchase').classList.add('hidden');
    if (userCoffeeBeans >= contentPrice) {
        document.getElementById('modalSuccess').classList.remove('hidden');
    } else {
        document.getElementById('modalNoBalance').classList.remove('hidden');
    }
}

function completePurchase() {
    closeAllModals();
    userCoffeeBeans -= contentPrice;
    updateBalanceDisplay();
    document.getElementById('articleContent').classList.remove('locked');
}

function toggleFollow(btn) {
    isFollowing = !isFollowing;
    if (isFollowing) {
        btn.innerText = "✓ 팔로잉";
        btn.classList.add("following");
    } else {
        btn.innerText = "+ 팔로우";
        btn.classList.remove("following");
    }
}

function openReportModal() {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('modalReport').classList.remove('hidden');
}

function submitReport() {
    alert("신고가 접수되었습니다.");
    closeAllModals();
}

function checkAuthorPermissions() {
    if (!isAuthor) {
        authorActionArea.classList.add('hidden');
        return;
    }
    authorActionArea.classList.remove('hidden');

    if (isPaidContent) {
        btnEdit.disabled = true;
        btnEdit.title = "유료 게시글은 수정할 수 없습니다.";
    } else {
        btnEdit.disabled = false;
        btnEdit.title = "";
    }

    if (viewCount > 0) {
        btnDelete.disabled = true;
        btnDelete.title = "조회수가 있어 삭제 불가";
    } else {
        btnDelete.disabled = false;
        btnDelete.onclick = function () {
            if (confirm('삭제하시겠습니까?')) alert('삭제됨');
        }
    }
}

function setBalance(amount) {
    userCoffeeBeans = amount;
    updateBalanceDisplay();
}

function toggleAuthorMode() {
    isAuthor = document.getElementById('checkAuthor').checked;
    isPaidContent = document.getElementById('checkPaid').checked;
    checkAuthorPermissions();
}

// 실행
init();