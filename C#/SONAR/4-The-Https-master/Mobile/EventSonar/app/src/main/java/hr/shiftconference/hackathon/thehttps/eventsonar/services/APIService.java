package hr.shiftconference.hackathon.thehttps.eventsonar.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by ANTE on 31.5.2016..
 */
public class APIService {
    private static final String APIRoot = "http://eventsonar.azurewebsites.net/api/";
    private static Retrofit retrofit;
    private static APIEndpoints service;

    public static APIEndpoints getService() {
        return service;
    }

    public static void setupAPIService() {
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .create();

        retrofit = new Retrofit.Builder()
                .baseUrl(APIRoot)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        service = retrofit.create(APIEndpoints.class);
    }
}
