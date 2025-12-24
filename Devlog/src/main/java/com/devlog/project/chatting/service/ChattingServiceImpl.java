package com.devlog.project.chatting.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.devlog.project.chatting.dto.ChattingDTO.FollowListDTO;
import com.devlog.project.chatting.mapper.ChattingMapper;
import com.devlog.project.chatting.repository.ChattingUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChattingServiceImpl implements ChattingService {
	
	private final ChattingUserRepository chattingUserRepository;
	private final ChattingMapper chatMapper;
	
	
	
	// 채팅방 목록 조회
	@Override
	public List<com.devlog.project.chatting.dto.ChattingDTO.ChattingListDTO> selectChatList(int memberNo) {
		
		return chatMapper.selectChatList(memberNo);
	}


	// 팔로우 목록 조회
	@Override
	public List<FollowListDTO> selectFollowList(int memberNo) {
		return chatMapper.selectFollowList(memberNo);
	}

	
	
	// 개인 채팅방 생성
	@Override
	public Long privateCreate(Long myMemberNo, Long targetMemberNo) {
		
		log.info("myMemberNo={}, targetMemberNo={}", myMemberNo, targetMemberNo);
		// 1. 기존에 채팅방 있는지 조회
		Optional<Long> roomNo = chattingUserRepository.findPrivateRoomNo(myMemberNo, targetMemberNo);
		
		// 1-1. 조회 결과 있다면 해당 방 번호 반환
		if(roomNo.isPresent()) {
			System.out.println("방 번호 : " + roomNo.get());
			log.info("채팅방 번호 조회 결과 : {}", roomNo.get());
			return roomNo.get();
		}
		
		// 2. 조회 결과 없을 시 방 생성
		
		
		
		return null;
	}
	
	

}
