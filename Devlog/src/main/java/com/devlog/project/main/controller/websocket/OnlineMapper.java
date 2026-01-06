package com.devlog.project.main.controller.websocket;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.devlog.project.member.model.dto.FollowDTO;

@Mapper
public interface OnlineMapper {

	List<FollowDTO> selectFollow(Long memberNo);
}
