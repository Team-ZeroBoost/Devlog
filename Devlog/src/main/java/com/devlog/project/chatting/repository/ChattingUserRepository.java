package com.devlog.project.chatting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devlog.project.chatting.entity.ChattingUser;
import com.devlog.project.chatting.entity.ChattingUserId;

@Repository
public interface ChattingUserRepository extends JpaRepository<ChattingUser, ChattingUserId> {
	
	
	// 회원 있는지
	@Query("""
		SELECT cr.roomNo
		from ChattingUser cu
		join ChatRoom cr on cu.id.roomNo = cr.roomNo
		where cr.roomType = 'PRIVATE'
		and cu.id.memberNo in (:myMemberNo, :targetMemberNo)
		group by cr.roomNo
		having count(distinct  cu.id.memberNo) = 2
	
			""")
	Optional<Long> findPrivateRoomNo(@Param("myMemberNo") Long myMemberNo, @Param("targetMemberNo") Long targetMemberNo);
	
	
	
	
	
	
	
	
	
}
