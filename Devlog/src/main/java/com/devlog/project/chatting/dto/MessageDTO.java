package com.devlog.project.chatting.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDTO {
	
	private Long messageNo;
	private Long memberNo;
	private String senderName;
	private String senderProfile;
	
	private String type;
	private String content;
	
	private String imgPath;
	
	private LocalDateTime sendTime;
	
	
	private int unreadCount;
	private boolean mine;
	
	private Map<String, Integer> reactions;
	
	
}
