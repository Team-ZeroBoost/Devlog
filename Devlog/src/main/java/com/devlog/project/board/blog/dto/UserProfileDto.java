package com.devlog.project.board.blog.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserProfileDto {
	private String id;            // 아이디(이메일)
    private String nickname;      // 닉네임
    private String username;      // 실명
    private String job;           // 직업
    private String bio;           // 자기소개
    private String profileImgUrl; // 프로필 이미지 경로
    private String githubUrl;
    private String blogUrl;
    private int exp;              // 경험치
	
}
