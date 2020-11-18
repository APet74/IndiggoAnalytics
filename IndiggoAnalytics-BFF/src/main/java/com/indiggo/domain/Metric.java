package com.indiggo.domain;


public class Metric {

    private int metricID;
    private String metricName;

    /**
     *
     * @param metricID
     * @param metricName
     */

    public Metric(int metricID, String metricName) {
        this.metricID = metricID;
        this.metricName = metricName;
    }

    public int getMetricID() {
        return metricID;
    }

    public void setMetricID(int metricID) {
        this.metricID = metricID;
    }

    public String getMetricName() {
        return metricName;
    }

    public void setMetricName(String metricName) {
        this.metricName = metricName;
    }
}
