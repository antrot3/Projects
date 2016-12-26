package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import android.content.Context;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ANTE on 31.5.2016..
 */
public class DatabaseModel {
    private Context context;
    private List<Comment> comments;
    private List<Event> events;
    private List<EventPerson> eventPersons;
    private List<EventState> eventStates;
    private List<EventSubscription> eventSubscriptions;
    private List<EventType> eventTypes;
    private List<Person> persons;
    private List<PersonSubscription> personSubscriptions;
    private List<PersonType> personTypes;
    private List<SocialNetwork> socialNetworks;
    private List<Town> towns;

    public DatabaseModel(Context context) {
        this.context = context;

        this.comments = new ArrayList<>();
        this.events = new ArrayList<>();
        this.eventPersons = new ArrayList<>();
        this.eventStates = new ArrayList<>();
        this.eventSubscriptions = new ArrayList<>();
        this.eventTypes = new ArrayList<>();
        this.persons = new ArrayList<>();
        this.personSubscriptions = new ArrayList<>();
        this.personTypes = new ArrayList<>();
        this.socialNetworks = new ArrayList<>();
        this.towns = new ArrayList<>();
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<EventPerson> getEventPersons() {
        return eventPersons;
    }

    public void setEventPersons(List<EventPerson> eventPersons) {
        this.eventPersons = eventPersons;
    }

    public List<EventState> getEventStates() {
        return eventStates;
    }

    public void setEventStates(List<EventState> eventStates) {
        this.eventStates = eventStates;
    }

    public List<EventSubscription> getEventSubscriptions() {
        return eventSubscriptions;
    }

    public void setEventSubscriptions(List<EventSubscription> eventSubscriptions) {
        this.eventSubscriptions = eventSubscriptions;
    }

    public List<EventType> getEventTypes() {
        return eventTypes;
    }

    public void setEventTypes(List<EventType> eventTypes) {
        this.eventTypes = eventTypes;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }

    public List<PersonSubscription> getPersonSubscriptions() {
        return personSubscriptions;
    }

    public void setPersonSubscriptions(List<PersonSubscription> personSubscriptions) {
        this.personSubscriptions = personSubscriptions;
    }

    public List<PersonType> getPersonTypes() {
        return personTypes;
    }

    public void setPersonTypes(List<PersonType> personTypes) {
        this.personTypes = personTypes;
    }

    public List<SocialNetwork> getSocialNetworks() {
        return socialNetworks;
    }

    public void setSocialNetworks(List<SocialNetwork> socialNetworks) {
        this.socialNetworks = socialNetworks;
    }

    public List<Town> getTowns() {
        return towns;
    }

    public void setTowns(List<Town> towns) {
        this.towns = towns;
    }
}
