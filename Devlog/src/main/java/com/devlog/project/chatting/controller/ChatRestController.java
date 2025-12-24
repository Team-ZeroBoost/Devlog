package com.devlog.project.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.devlog.project.chatting.dto.ChattingDTO;
import com.devlog.project.chatting.service.ChattingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatRestController {
	
	private final ChattingService chattingService;
	
	// 채팅방 목록 조회
	@GetMapping("/devtalk/chatList")
	public String selectChatList(@RequestParam("memberNo") int memberNo
			, Model model){
		
		
		List<ChattingDTO.ChattingListDTO> chatList = chattingService.selectChatList(memberNo);
		
		log.info("chatList = {}", chatList);
		
		model.addAttribute("chatList", chatList);
		
		return "chatting/chatting ::#roomList";
	}
	
	
	@GetMapping("/devtalk/followSelect")
	public String selectFollowList(
			// 세션 로그인 멤버
			Model model
			) {
		
		int memberNo = 1;
		
		List<ChattingDTO.FollowListDTO> followList = chattingService.selectFollowList(memberNo);
		
		log.info("팔로우 리스트 조회 결과 : {} ", followList);
		
		model.addAttribute("followList", followList);
		
		return "chatting/chatting ::#chatFollowList";
	}
	
	@PostMapping("/devtalk/create/private")
	@ResponseBody
	public Long privateCreate(
			@RequestBody Long targetMemberNo
			
			) {
		
		
		
		
		
		Long myMemberNo = 1l;
		
		log.info("myMemberNo={}, targetMemberNo={}", myMemberNo, targetMemberNo);
		
		return chattingService.privateCreate(myMemberNo, targetMemberNo);
	}
	
	
}	
