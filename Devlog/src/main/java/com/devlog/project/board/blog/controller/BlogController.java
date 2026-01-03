package com.devlog.project.board.blog.controller;

import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.devlog.project.board.blog.dto.BlogDTO;
import com.devlog.project.board.blog.dto.MyBlogResponseDto;
import com.devlog.project.board.blog.service.BlogService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BlogController {

	private final BlogService blogService;

	// 1. 블로그 목록 화면
	@GetMapping("/blog/list")
	public String blogList(Model model,
			@PageableDefault(size = 12, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

		Map<String, Object> result = blogService.getBlogList(pageable.getPageNumber(), pageable.getPageSize(), "id");
		model.addAttribute("blogList", result.get("content"));
		return "board/blog/blogList";
	}

	// 2. 블로그 목록 데이터 (API)
	@GetMapping("/api/blog/list")
	@ResponseBody
	public Map<String, Object> getBlogListApi(
			@PageableDefault(size = 12, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

		String sortProp = pageable.getSort().stream().findFirst().map(Sort.Order::getProperty).orElse("id");
		return blogService.getBlogList(pageable.getPageNumber(), pageable.getPageSize(), sortProp);
	}

	// 3. 글 작성 화면
	@GetMapping("/blog/write")
	public String blogWrite() {
		// 로그인 체크
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            // 로그인 안 했으면 로그인 페이지로 리다이렉트 (alert 띄우고 보내고 싶으면 JS 처리 필요하지만 일단 리다이렉트)
            return "redirect:/member/login"; 
        }
		
		return "board/blog/blogWrite";
	}
                      
	// 4. 글 작성 처리 (API)
	@PostMapping("/api/blog/write")
	@ResponseBody
	public ResponseEntity<String> writeBlog(@RequestBody BlogDTO blogDTO) {
		blogService.writeBlog(blogDTO);
		return ResponseEntity.ok("저장 성공");
	}

	// 5. 이미지 업로드
	@PostMapping("/api/blog/imageUpload")
	@ResponseBody
	public String imageUpload(@RequestParam("image") MultipartFile image) {
		return blogService.uploadImage(image);
	}


	@GetMapping("/blog/{blogId:.+}") 
    public String blogMain(@PathVariable("blogId") String blogId, Model model) {
        
        // 1. 현재 로그인한 사용자 ID 가져오기
        String currentLoginId = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            currentLoginId = auth.getName();
        }

        try {
            // 2. 서비스에 내 블로그 화면 데이터 요청
            MyBlogResponseDto myBlogData = blogService.getMyBlogPageData(blogId, currentLoginId);
            
            // 3. 모델에 담기
            model.addAttribute("userProfile", myBlogData.getUserProfile());
            model.addAttribute("isOwner", myBlogData.isOwner());
            
            // 인기글 정보
            model.addAttribute("pickPost", myBlogData.getPickPost());
            
            // 태그 리스트
            model.addAttribute("tags", myBlogData.getTags());
            
            // 통계 데이터들
            model.addAttribute("followerCount", myBlogData.getFollowerCount());
            model.addAttribute("followingCount", myBlogData.getFollowingCount());
            model.addAttribute("subscriberCount", myBlogData.getSubscriberCount());
            model.addAttribute("totalVisit", myBlogData.getTotalVisit());
            model.addAttribute("postCount", myBlogData.getPostCount());
            model.addAttribute("todayVisit", myBlogData.getTodayVisit());

        } catch (Exception e) {
            // 회원이 없거나 에러 발생 시 목록으로 리턴
            System.out.println("블로그 진입 에러: " + e.getMessage());
            return "redirect:/blog/list";
        }

        model.addAttribute("blogId", blogId); // JS용 ID
        return "board/blog/myDev";
    }

	// 7. 내 블로그 목록 (API) - [수정] type 파라미터 받기
    @GetMapping("/api/blog/{blogId:.+}/list")
    @ResponseBody
    public Map<String, Object> getMyBlogListApi(@PathVariable("blogId") String blogId,
            @RequestParam(value = "type", required = false, defaultValue = "all") String type, // [추가]
            @PageableDefault(size = 6, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        String sortProp = pageable.getSort().stream().findFirst().map(Sort.Order::getProperty).orElse("id");
        
        // Service로 type 전달
        return blogService.getMyBlogList(blogId, type, pageable.getPageNumber(), pageable.getPageSize(), sortProp);
    }
}