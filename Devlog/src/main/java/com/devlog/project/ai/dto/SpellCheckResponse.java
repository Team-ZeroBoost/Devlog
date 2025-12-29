package com.devlog.project.ai.dto;

import java.util.List;

public class SpellCheckResponse {

    private List<Fix> fixes;

    public static class Fix {
        private String before;
        private String after;
    }
}

