package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by ANTE on 31.5.2016..
 */
public class SocialNetwork {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("PersonID")
    @Expose
    private int personId;
    @SerializedName("ProfileLink")
    @Expose
    private String profileLink;

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

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public String getProfileLink() {
        return profileLink;
    }

    public void setProfileLink(String profileLink) {
        this.profileLink = profileLink;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
