package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ANTE on 31.5.2016..
 */
public class EventState {
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

    // CONSTRUCTORS
    public EventState() {
        this.event = new ArrayList<>();
    }
}
