package com.indiggo.domain;


import java.time.LocalDate;



public class Analytic {
    /**
     * @param date
     * @param metricQty
     * @param metricID
     * @param metric
     * @param isOrganic
     */

    private LocalDate date;
    private int metricQty;
    private int metricID;
    private Metric metric;
    private boolean isOrganic;


    public Analytic(LocalDate date, int metricQty, int metricID, Metric metric, boolean isOrganic) {
        this.date = date;
        this.metricQty = metricQty;
        this.metricID = metricID;
        this.metric = metric;
        this.isOrganic = isOrganic;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getMetricQty() {
        return metricQty;
    }

    public int getMetricID() {
        return metricID;
    }

    public Metric getMetric() {
        return metric;
    }

    public boolean isOrganic() {
        return isOrganic;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setMetricQty(int metricQty) {
        this.metricQty = metricQty;
    }

    public void setMetricID(int metricID) {
        this.metricID = metricID;
    }

    public void setMetric(Metric metric) {
        this.metric = metric;
    }

    public void setOrganic(boolean organic) {
        isOrganic = organic;
    }
}
