package com.devlog.project.manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ManagerController {

    // 관리자 홈
    @GetMapping("/dashboard")
    public String adminDashboard() {
        return "manager/manager-home";
    }
}
