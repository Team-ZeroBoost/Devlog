package com.devlog.project.board.jobposting.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.devlog.project.board.jobposting.dto.JobPostingDTO;


@Mapper
public interface JobpostingMapper {

	List<JobPostingDTO> selectjoblist();



}
