package hr.shiftconference.hackathon.thehttps.eventsonar.models.database;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ANTE on 31.5.2016..
 */
public class PersonType {
    // FIELDS
    @SerializedName("Id")
    @Expose
    private int id;
    @SerializedName("Name")
    @Expose
    private String name;

    @SerializedName("Person")
    @Expose
    private List<Person> person;

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

    public List<Person> getPerson() {
        return person;
    }

    public void setPerson(List<Person> person) {
        this.person = person;
    }

    // CONSTRUCTORS
    public PersonType()
    {
        this.person = new ArrayList<>();
    }
}
