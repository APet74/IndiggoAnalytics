package com.indiggo.controllers;


import com.indiggo.domain.Analytic;
import com.indiggo.dao.AnalyticDAO;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class AnalyticsController {

    @Autowired
    AnalyticDAO analyticDAO;

    @RequestMapping("/analytics")
    public List<Analytic> getAnalytics(){
        return analyticDAO.generateAnalytics();
    }

    @CrossOrigin // TODO: Remove for Production
    @GetMapping("/analytics/{date1}/{date2}/{type}/{organic}")
    public @ResponseBody List<Analytic> getAnalyticsByDate(@PathVariable String date1, @PathVariable String date2, @PathVariable int type, @PathVariable int organic) {
        return analyticDAO.getAnalyticBetweenDates(LocalDate.parse(date1), LocalDate.parse(date2),type, organic);
    }

}
