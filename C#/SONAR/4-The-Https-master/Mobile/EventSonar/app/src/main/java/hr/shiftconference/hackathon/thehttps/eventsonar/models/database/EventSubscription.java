package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by ANTE on 31.5.2016..
 */
public class EventSubscription {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("PersonID")
    @Expose
    private int personId;
    @SerializedName("EventTypeID")
    @Expose
    private int eventTypeId;
    @SerializedName("TownID")
    @Expose
    private int townId;

    @SerializedName("Event")
    @Expose
    private Event event;
    @SerializedName("Person")
    @Expose
    private Person person;
    @SerializedName("Town")
    @Expose
    private Town town;

    // PROPERTIES
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public int getEventTypeId() {
        return eventTypeId;
    }

    public void setEventTypeId(int eventTypeId) {
        this.eventTypeId = eventTypeId;
    }

    public int getTownId() {
        return townId;
    }

    public void setTownId(int townId) {
        this.townId = townId;
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

    public Town getTown() {
        return town;
    }

    public void setTown(Town town) {
        this.town = town;
    }
}
