package hr.shiftconference.hackathon.thehttps.eventsonar.models.application;

import android.app.Application;

import io.intercom.android.sdk.Intercom;

/**
 * Created by ANTE on 1.6.2016..
 */
public class EventSonarApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Intercom.initialize(this, "hvfbl3e7", "18a6bd957ce19e50684b8e6a276365e56f6e143c");
    }
}
