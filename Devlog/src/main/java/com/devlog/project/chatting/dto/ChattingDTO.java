package com.devlog.project.chatting.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


public class ChattingDTO {
	
	
	
	
	@Getter
	@Setter
	@ToString
	public static class ChattingListDTO {
	    private Long chattingRoomNo;
	    private String roomType;
	    private String pinnedYn;
	    private String displayName;
	    private String roomImg;
	    private String lastMessage;
	    private LocalDateTime lastMessageAt;
	    private Long unreadCount;


	}
	
	
	
	@Getter
	@Setter
	@ToString
	public static class FollowListDTO {
		
		private Long memberNo;
		private String memberNickname;
		private String profileImg;
		
	}


}

