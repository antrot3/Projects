package hr.shiftconference.hackathon.thehttps.eventsonar.services;

import android.support.annotation.Nullable;

import java.util.Date;
import java.util.List;

import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Event;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Person;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Town;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

/**
 * Created by ANTE on 31.5.2016..
 */
public interface APIEndpoints {
    @GET("eventsapi/GetAllEventsForUser")
    Call<List<Event>> getAllEvents();

    @GET("friendsapi/GetAllFriendsForUser?Id={id}")
    Call<List<Person>> getFriendsOfUser(@Nullable @Path("id") int user_id);
    @GET("profileapi/Get?Id={id}")
    Call<List<Person>> getUser(@Nullable @Path("id") int user_id);
    @GET("townapi/GetAllTowns")
    Call<List<Town>> getAllTowns();

    @POST("eventsapi/CreateEvent?Id={id}&Name={name}&Description={description}" +
            "&TownID={town_id}")
    Call<Void> createEvent(@Path("id") int organizer_id,
                           @Path("name") String name,
                           @Path("description") String description,
                           @Path("town_id") int town_id,
                           @Path("event_type_id") int event_type_id,
                           @Path("image_url") String image_url,
                           @Nullable @Path("long") float longitude,
                           @Nullable @Path("lat") float latitude,
                           @Path("contact") String contact,
                           @Path("start_date") Date start_date,
                           @Path("end_date") Date end_date);
}
