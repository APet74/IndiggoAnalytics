package com.indiggo.dao;

import com.indiggo.domain.*;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.ArrayList;
import java.util.Locale;


import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Component;


@Component
public class AnalyticDAO {
    /**
     *  Called from the controller to get data for the front end. Takes start date, end date, type and organic flag
     *  Compares dates from the data pulled from the generateAnalytics() method. This is not efficient and would be
     *  quicker with a database
     * @param startDate
     * @param endDate
     * @param type
     * @param organic
     * @return filteredData for front end
     */
    public List<Analytic> getAnalyticBetweenDates(LocalDate startDate, LocalDate endDate, int type, int organic) {
        List<Analytic> Analytics = generateAnalytics();
        List<Analytic> filteredData = new ArrayList<Analytic>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-d");
        dtf = dtf.withLocale( Locale.US );
        for ( Analytic obj : Analytics) {
            if ((obj.getDate().compareTo(startDate) >= 0 && obj.getDate().compareTo(endDate) <= 0) && obj.getMetricID() == type) {
                switch(organic) {
                    case 0:
                        if(!obj.isOrganic())
                            filteredData.add(obj);
                        break;
                    case 1:
                        if(obj.isOrganic())
                            filteredData.add(obj);
                        break;
                    case 2:
                        filteredData.add(obj);
                        break;
                }

            }
        }
        return filteredData;
    }

    /**
     *  generates the four types of metrics and stores them in a list of metrics.
     * @return metrics
     */
    private List<Metric> generateMetrics(){
        List<Metric> metrics = new ArrayList<Metric>();
        metrics.add(new Metric(1, "Users"));
        metrics.add(new Metric(2, "Sessions"));
        metrics.add(new Metric(3, "Pageviews"));
        metrics.add(new Metric(4,"New Users"));
        return metrics;
    }

    /**
     * @param objList
     * @param index
     * @return filtered metrics to return single metric based on ID
     */
    private Metric searchMetrics(List<Metric> objList, int id) {
        return objList.stream().filter(obj -> obj.getMetricID() == id).findFirst().orElse(null);
    }

    /**
     * Left publicly assessable so that the endpoint /analytics/ works and returns the full json list if needed.
     * Also inefficient but will check to see what metrics exist in the CSV and add random metrics for missing dates
     * ONLY works for November as it is hard coded to use the 11th month and starts on 11-1-2020 and goes until the
     * last day at which point it will break. Random logic creates "semi-realistic" results.
     * @return List of Analytics
     */
    public List<Analytic> generateAnalytics(){


        //Get Today's date and loop from the first of November until today assigning random numbers for the metrics.
        String csvFile = "src/main/java/com/indiggo/data/analytics.csv";
        BufferedReader br = null;
        String line = "";
        String csvSplitBy = ",";
        int counter = 0;
        List<Metric> metrics = generateMetrics();
        LocalDate today = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-d");
        dtf = dtf.withLocale( Locale.US );
        List<Analytic> analytics = new ArrayList<Analytic>();
        Metric jointMetric = null;
        try {
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
                String[] analytic = line.split(csvSplitBy);
                jointMetric = searchMetrics(metrics, Integer.parseInt(analytic[2]));
                analytics.add(new Analytic(LocalDate.parse(analytic[0], dtf),Integer.parseInt(analytic[1]), Integer.parseInt(analytic[2]), jointMetric, Boolean.parseBoolean(analytic[3])));
                counter++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(counter / 8 + " " + counter);

        LocalDate firstDate = LocalDate.parse("2020-11-" + (counter == 0 ? 1 : counter / 8), dtf);
        long daysBetween = ChronoUnit.DAYS.between(firstDate, today);
        System.out.println(daysBetween);
        //Extremely inefficient way of generating data. Uses the counter from the while to determine what dates are NOT in the CSV and add them. Randomly generates metrics for those dates. Math for those random generation was just estimates based on standard trends.
            for(int i = 1; i < daysBetween+1; i++){
                int users = (int) (Math.random() * (1000 - 250 + 1) + 250);
                int oUsers = (int) (Math.random() * ((users / 2) - 75 + 1 + 100));
                int newUsers = (int) (Math.random() * (users - 75 + 1) + 75);
                int oNewUsers = (int) (Math.random() * (oUsers - 15 + 1) + 15);
                int sessions = (int) (Math.random() * (1400 - users + 1) + users);
                int oSessions = (int) (Math.random() * (sessions - oUsers + 1) + oUsers);
                int pageviews = (int) (Math.random() * (3000 - sessions + 1) + sessions);
                int oPageviews = (int) (Math.random() * (pageviews - oSessions + 1) + oSessions);

                System.out.println(users +  " | " + newUsers + " | " + oUsers + " | " + oNewUsers);

                Analytic userAnalytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), users, 1, searchMetrics(metrics, 1), false  );
                Analytic newUserAnalytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), newUsers, 4, searchMetrics(metrics, 4), false  );
                Analytic sessAnalytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), sessions, 2, searchMetrics(metrics, 2), false  );
                Analytic pageViewAnalaytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), pageviews, 3, searchMetrics(metrics, 3), false  );
                Analytic oUserAnaltic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), oUsers, 1, searchMetrics(metrics, 1), true  );
                Analytic oNewUserAnalytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), oNewUsers, 4, searchMetrics(metrics, 4), true  );
                Analytic oSessAnalytic= new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), oSessions, 2, searchMetrics(metrics, 2), true  );
                Analytic oPageViewAnalaytic = new Analytic(LocalDate.parse("2020-11-" + (counter / 8 + i), dtf), oPageviews, 3, searchMetrics(metrics, 3), true  );

                //could be simplified to a single method for adding to a list. Would require the code directly above to also be simplified which could be done.
                analytics.add(userAnalytic);
                analytics.add(newUserAnalytic);
                analytics.add(sessAnalytic);
                analytics.add(pageViewAnalaytic);
                analytics.add(oUserAnaltic);
                analytics.add(oNewUserAnalytic);
                analytics.add(oSessAnalytic);
                analytics.add(oPageViewAnalaytic);
                writeToCSV(userAnalytic);
                writeToCSV(newUserAnalytic);
                writeToCSV(sessAnalytic);
                writeToCSV(pageViewAnalaytic);
                writeToCSV(oUserAnaltic);
                writeToCSV(oNewUserAnalytic);
                writeToCSV(oSessAnalytic);
                writeToCSV(oPageViewAnalaytic);
            }
        return analytics;
    }

    /**
     * rewrites all the data to CSV to make sure data is persistent.
     * @param obj
     */
    private void writeToCSV(Analytic obj) {

        try {
            FileWriter csvWriter = new FileWriter("src/main/java/com/indiggo/data/analytics.csv", true);
            csvWriter.append(obj.getDate().toString());
            csvWriter.append(",");
            csvWriter.append(String.valueOf(obj.getMetricQty()));
            csvWriter.append(",");
            csvWriter.append(String.valueOf(obj.getMetricID()));
            csvWriter.append(",");
            csvWriter.append(String.valueOf(obj.isOrganic()));
            csvWriter.append("\n");

            csvWriter.flush();
            csvWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

