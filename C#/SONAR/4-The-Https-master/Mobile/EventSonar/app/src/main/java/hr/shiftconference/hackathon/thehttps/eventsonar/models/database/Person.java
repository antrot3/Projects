package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import android.support.annotation.Nullable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by ANTE on 31.5.2016..
 */
public class Person {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("FirstName")
    @Expose
    private String firstName;
    @SerializedName("LastName")
    @Expose
    private String lastName;
    @SerializedName("BirthDate")
    @Expose
    @Nullable
    private Date birthDate;
    @SerializedName("Username")
    @Expose
    private String username;
    @SerializedName("Password")
    @Expose
    private String password;
    @SerializedName("Rating")
    @Expose
    private int rating;
    @SerializedName("PersonTypeID")
    @Expose
    private int personTypeId;
    @SerializedName("ImageUrl")
    @Expose
    private String imageURL;
    @SerializedName("Email")
    @Expose
    private String email;

    @SerializedName("Comment")
    @Expose
    private List<Comment> comment;
    @SerializedName("Event")
    @Expose
    private List<Event> event;
    @SerializedName("EventPerson")
    @Expose
    private List<EventPerson> eventPerson;
    @SerializedName("EventSubscription")
    @Expose
    private List<EventSubscription> eventSubscription;
    @SerializedName("PersonType")
    @Expose
    private PersonType personType;
    @SerializedName("PersonSubscription")
    @Expose
    private List<PersonSubscription> personSubscription;
    @SerializedName("PersonSubscription1")
    @Expose
    private List<PersonSubscription> personSubscription1;
    @SerializedName("SotialNetwork")
    @Expose
    private List<SocialNetwork> socialNetwork;

    // PROPERTIES
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Nullable
    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(@Nullable Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getPersonTypeId() {
        return personTypeId;
    }

    public void setPersonTypeId(int personTypeId) {
        this.personTypeId = personTypeId;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Comment> getComment() {
        return comment;
    }

    public void setComment(List<Comment> comment) {
        this.comment = comment;
    }

    public List<Event> getEvent() {
        return event;
    }

    public void setEvent(List<Event> event) {
        this.event = event;
    }

    public List<EventPerson> getEventPerson() {
        return eventPerson;
    }

    public void setEventPerson(List<EventPerson> eventPerson) {
        this.eventPerson = eventPerson;
    }

    public List<EventSubscription> getEventSubscription() {
        return eventSubscription;
    }

    public void setEventSubscription(List<EventSubscription> eventSubscription) {
        this.eventSubscription = eventSubscription;
    }

    public PersonType getPersonType() {
        return personType;
    }

    public void setPersonType(PersonType personType) {
        this.personType = personType;
    }

    public List<PersonSubscription> getPersonSubscription() {
        return personSubscription;
    }

    public void setPersonSubscription(List<PersonSubscription> personSubscription) {
        this.personSubscription = personSubscription;
    }

    public List<PersonSubscription> getPersonSubscription1() {
        return personSubscription1;
    }

    public void setPersonSubscription1(List<PersonSubscription> personSubscription1) {
        this.personSubscription1 = personSubscription1;
    }

    public List<SocialNetwork> getSocialNetwork() {
        return socialNetwork;
    }

    public void setSocialNetwork(List<SocialNetwork> socialNetwork) {
        this.socialNetwork = socialNetwork;
    }

    // CONSTRUCTORS
    public Person()
    {
        this.comment = new ArrayList<>();
        this.event = new ArrayList<>();
        this.eventPerson = new ArrayList<>();
        this.eventSubscription = new ArrayList<>();
        this.personSubscription = new ArrayList<>();
        this.personSubscription1 = new ArrayList<>();
        this.socialNetwork = new ArrayList<>();
    }
}
