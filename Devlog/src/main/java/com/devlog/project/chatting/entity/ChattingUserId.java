package com.devlog.project.chatting.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ChattingUserId implements Serializable {
	
	
	// JPA 복합키 (@EmbeddedId)
	// 채팅방(CHATTING_ROOM_NO)과 회원(MEMBER_NO)을 조합한 식별자
	// 채팅 참여( ChattingUser )를 유니크하게 식별하기 위한 키
	
	@Column(name = "CHATTING_ROOM_NO")
	private Long roomNo;
	
	
	@Column(name = "MEMBER_NO")
	private Long memberNo;
	
	// 복합키 사용할 때 반드시 equals() 와 hashCode()를 구현해야함
	
	
	
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ChattingUserId)) return false;
        ChattingUserId that = (ChattingUserId) o;
        return Objects.equals(roomNo, that.roomNo)
            && Objects.equals(memberNo, that.memberNo);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(roomNo, memberNo);
    }
	
	
}
