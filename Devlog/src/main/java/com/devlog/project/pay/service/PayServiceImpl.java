package com.devlog.project.pay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devlog.project.pay.dto.PayDTO;
import com.devlog.project.pay.mapper.PayMapper;

@Service
public class PayServiceImpl implements PayService {

	
	@Autowired
	private PayMapper paymapper;
	


	@Override
	public PayDTO selectMyBeans(Long memberNo) {
		return paymapper.selectMyBeans(memberNo);
	}



	@Override
	public List<PayDTO> selectBeansHistory(Long memberNo) {
		return paymapper.selectBeansHistory(memberNo);
	}


	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertPayment(PayDTO payment) {
		// 결제 정보 저장
		int result = paymapper.insertPayment(payment);
		
		if(result > 0) {
			paymapper.insertHistory(payment);
			paymapper.updateMemberBeans(payment);
		}
		return paymapper.insertPayment(payment);
	}
	
	
	
	
}
