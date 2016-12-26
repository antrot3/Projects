package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by ANTE on 31.5.2016..
 */
public class EventPerson {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("EventID")
    @Expose
    private int eventId;
    @SerializedName("PersonID")
    @Expose
    private int personId;

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

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
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
