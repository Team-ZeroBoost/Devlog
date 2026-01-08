document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // 타임리프에서 전달받은 데이터 확인 (없으면 빈 배열)
  const rawData = window.jobPostingData || [];

  // 1. 데이터 가공 (전처리)
  const events = rawData.map((job) => {
    // 1. 날짜 데이터 정제 (하이픈 형식이든 점 형식이든 추출)
    const getCleanDate = (str) => {
      if (!str) return null;
      const match = str.match(/\d{4}[\.\-]\d{2}[\.\-]\d{2}/);
      return match ? match[0].replace(/\./g, "-") : null;
    };

    const startDate = getCleanDate(job.applyStart);
    const endDate = getCleanDate(job.applyEnd);

    // 2. 날짜 결정 우선순위:
    // 시작일이 있으면 시작일로, 없으면 마감일로, 둘 다 없으면 오늘로.
    let finalDate =
      startDate || endDate || new Date().toISOString().slice(0, 10);

    return {
      title: job.postingTitle,
      start: finalDate,
      extendedProps: {
        jobId: job.postingNo,
        applyStart: job.applyStart,
        applyEnd: job.applyEnd,
      },
      // 클래스 구분: 마감일 텍스트에 '채용시'가 들어있으면 핑크
      className:
        job.applyEnd && job.applyEnd.includes("채용시")
          ? "event-pink"
          : "event-purple",
    };
  });

  // 2. FullCalendar 초기화
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "ko",
    headerToolbar: {
      left: "title",
      center: "",
      right: "prev,next today",
    },
    dayMaxEvents: 3, // 한 칸에 이벤트 3개까지만 표시 (나머지는 +더보기)
    contentHeight: 750,
    events: events, // 가공된 데이터 삽입

    // 공고 클릭 시 상세 페이지 이동
    eventClick: function (info) {
      const jobId = info.event.extendedProps.jobId;
      if (jobId) {
        window.location.href = `/jobposting/${jobId}`;
      } else {
        alert("해당 공고의 상세 정보를 찾을 수 없습니다.");
      }
    },

    // 날짜 칸의 번호(숫자) 클릭 시 해당 날짜의 공고를 팝업으로 보여주고 싶을 때 사용
    navLinks: true,
    navLinkDayClick: function (date, jsEvent) {
      // 기본 팝업 기능이 필요 없다면 생략 가능합니다.
    },
  });

  calendar.render();
});
