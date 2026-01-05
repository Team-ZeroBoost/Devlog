const modal = document.getElementById("reportModal");
const moveButton = document.getElementById("moveButton");

let currentTargetUrl = null;
let currentTargetType = null;
let currentReportNo = null;

// 모달 내부 요소
const modalReportNo = document.getElementById("modalReportNo");
const modalReportType = document.getElementById("modalReportType");
const modalReportDate = document.getElementById("modalReportDate");
const modalReason = document.getElementById("modalReason");
const modalTargetName = document.getElementById("modalTargetName");

const csrfToken = document.querySelector('meta[name="_csrf"]')?.content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content;

function openModal(row) {
  currentReportNo = row.dataset.reportNo;
  currentTargetType = row.dataset.targetType;
  currentTargetUrl = row.dataset.targetUrl;

  modalReportNo.value = row.dataset.reportNo;
  modalReportType.value = row.dataset.reportType;
  modalReportDate.value = row.dataset.reportDate;
  modalReason.value = row.dataset.reportReason;
  modalTargetName.textContent = row.dataset.target;

  moveButton.textContent =
    currentTargetType === "BOARD" ? "해당 게시글 이동" : "신고된 메시지 보기";

  modal.style.display = "flex";
}

// 모달 닫기
function closeModal() {
  modal.style.display = "none";
}

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// 게시글 이동
moveButton.addEventListener("click", () => {
  if (!currentTargetType) return;

  if (currentTargetType === "BOARD") {
    location.href = currentTargetUrl;
  } else {
    alert("신고된 메시지를 표시합니다.");
  }
});

// 신고 상태 변경
function changeStatus(selectEl) {
  const reportNo = selectEl.dataset.reportNo;
  const status = selectEl.value;

  if (!reportNo) return;

  if (status === "PENDING") {
    alert("처리 완료 또는 반려만 선택할 수 있습니다.");
    location.reload();
    return;
  }

  const url =
    status === "RESOLVED"
      ? "/manager/dashboard/report/resolve"
      : "/manager/dashboard/report/reject";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(csrfHeader && csrfToken ? { [csrfHeader]: csrfToken } : {}),
    },
    body: JSON.stringify({ reportNo }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("request failed");
      return res.json?.() ?? {};
    })
    .then(() => {
      alert("처리 상태가 변경되었습니다.");
      location.reload();
    })
    .catch(() => {
      alert("처리 중 오류가 발생했습니다.");
      location.reload();
    });
}

// 상태 select 이벤트 연결
document.querySelectorAll(".status-select").forEach((select) => {
  select.addEventListener("change", function () {
    changeStatus(this);
  });
});
