package hr.shiftconference.hackathon.thehttps.eventsonar.ui.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.ImageView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Event;

public class EventDetailsActivity extends AppCompatActivity implements OnMapReadyCallback {
    private Event event;
    private Toolbar toolbar;
    ImageView imageView;
    private GoogleMap gMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_details);

        Bundle bundle = getIntent().getExtras();
        event = (Event) bundle.getParcelable("currentEvent");

        toolbar = (Toolbar) findViewById(R.id.toolbar_event_details);
        /*
        imageView = (ImageView) findViewById(R.id.image_view_toolbar);
        Picasso.with(this)
                .load(event.getImageURL())
                .fit()
                .centerCrop()
                .into(this.imageView);*/
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        gMap = googleMap;

        // LatLng current= new LatLng(event.getLatitude(), event.getLongitude());
        LatLng current= new LatLng(43.507, 16.438);
        Log.i("KOORDINATE ---- ", String.valueOf(current.latitude) + ' ' + String.valueOf(current.longitude));
        gMap.addMarker(new MarkerOptions().position(current).title(event.getName()));
        gMap.moveCamera(CameraUpdateFactory.newLatLng(current)) ;
        // gMap.animateCamera(CameraUpdateFactory.zoomIn());
    }
}
