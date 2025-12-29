package com.devlog.project.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.devlog.project.ai.dto.SpellCheckRequest;
import com.devlog.project.ai.dto.SpellCheckResponse;

@Service
public class SpellCheckServiceImpl implements SpellCheckService {

    private final ChatClient chatClient;

    public SpellCheckServiceImpl(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public SpellCheckResponse check(SpellCheckRequest request) {

        String prompt = """
        다음 글에서 오탈자와 띄어쓰기 오류만 교정해줘.

        규칙:
        - 의미 수정하지 않기
        - 문체 유지하기
        - 수정 전 → 수정 후 형태로 출력

        글:
        %s
        """.formatted(request.getContent());

        String aiResult = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        // 여기서 aiResult 파싱
        return parse(aiResult);
    }
}
