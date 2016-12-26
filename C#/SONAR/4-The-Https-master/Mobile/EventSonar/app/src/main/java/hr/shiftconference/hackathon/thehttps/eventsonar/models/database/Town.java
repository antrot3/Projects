package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ANTE on 31.5.2016..
 */
public class Town {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("Name")
    @Expose
    private String name;

    @SerializedName("Event")
    @Expose
    private List<Event> event;
    @SerializedName("EventSubscription")
    @Expose
    private List<EventSubscription> eventSubscription;

    // PROPERTIES
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Event> getEvent() {
        return event;
    }

    public void setEvent(List<Event> event) {
        this.event = event;
    }

    public List<EventSubscription> getEventSubscription() {
        return eventSubscription;
    }

    public void setEventSubscription(List<EventSubscription> eventSubscription) {
        this.eventSubscription = eventSubscription;
    }

    // CONSTRUCTOR
    public Town()
    {
        this.event = new ArrayList<>();
        this.eventSubscription = new ArrayList<>();
    }
}
