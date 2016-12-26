package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import android.support.annotation.Nullable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;

/**
 * Created by ANTE on 31.5.2016..
 */
public class Comment {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("Text")
    @Expose
    private int text;
    @SerializedName("PersonID")
    @Expose
    private int personId;
    @SerializedName("EventID")
    @Expose
    private int eventId;
    @SerializedName("Date")
    @Expose
    @Nullable
    private Date date;

    @SerializedName("Event")
    @Expose
    private Event event;
    @SerializedName("Person")
    @Expose
    private Person person;

    // PROPERTIES
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getText() {
        return text;
    }

    public void setText(int text) {
        this.text = text;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    @Nullable
    public Date getDate() {
        return date;
    }

    public void setDate(@Nullable Date date) {
        this.date = date;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
