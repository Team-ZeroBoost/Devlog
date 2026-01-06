package com.devlog.project.main.controller.websocket;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.devlog.project.member.model.dto.FollowDTO;
import com.devlog.project.member.model.entity.Member;
import com.devlog.project.member.model.repository.MemberRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OnlineUserEventListener {
	
	
	private final MemberRepository memberRepository;
	private final OnlineMapper onlineMapper;
	private final SimpMessageSendingOperations messagingTemplate;
	private static final Map<String, Long> sessionUserMap = new ConcurrentHashMap<>();

	
	
    @Getter
    @AllArgsConstructor
    public static class OnlineUser {
        private String nickname;
        private String profileImg;
    }
    
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        Principal principal = headerAccessor.getUser();
        String memberEmaiil = principal.getName();
        Member member = 
        
        if (attributes != null && attributes.get("memberNo") != null) {
            Long memberNo = (Long) attributes.get("memberNo");
            String sessionId = headerAccessor.getSessionId();
            sessionUserMap.put(sessionId, memberNo);

            List<OnlineUser> friends = getOnlineFollowingList(memberNo); 
            messagingTemplate.convertAndSendToUser(String.valueOf(memberNo), "/queue/friends", friends);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        sessionUserMap.remove(sessionId);
    }

    private List<OnlineUser> getOnlineFollowingList(Long memberNo) {
        List<FollowDTO> followingList = onlineMapper.selectFollow(memberNo);
        if (followingList == null) return List.of();

        return followingList.stream()
            .filter(dto -> sessionUserMap.containsValue(dto.getMemberNo()))
            .map(dto -> new OnlineUser(dto.getMemberNickname(), dto.getProfile()))
            .collect(Collectors.toList());
    }
	
	
}
