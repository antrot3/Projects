package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by ANTE on 31.5.2016..
 */
public class PersonSubscription {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("SubscriberID")
    @Expose
    private int subscriberId;
    @SerializedName("PublisherID")
    @Expose
    private int publisherId;

    @SerializedName("Person")
    @Expose
    private Person person;
    @SerializedName("Person1")
    @Expose
    private Person person1;

    // PROPERTIES
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(int subscriberId) {
        this.subscriberId = subscriberId;
    }

    public int getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(int publisherId) {
        this.publisherId = publisherId;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Person getPerson1() {
        return person1;
    }

    public void setPerson1(Person person1) {
        this.person1 = person1;
    }
}
