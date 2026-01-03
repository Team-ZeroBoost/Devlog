package com.devlog.project.manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager/report")
@RequiredArgsConstructor
public class ManagerReportController {

    private final AdminReportService reportService;

    @GetMapping
    public String reportList(Model model) {
        model.addAttribute("reportList", reportService.findAllReports());
        return "manager/manager-report";
    }

    @PostMapping("/status")
    @ResponseBody
    public void updateStatus(
        @RequestParam Long reportId,
        @RequestParam String status
    ) {
        reportService.updateStatus(reportId, status);
    }
}