package hr.shiftconference.hackathon.thehttps.eventsonar.ui.activities;

import android.content.Intent;
import android.graphics.Bitmap;
import android.media.Image;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.google.android.gms.maps.model.TileOverlayOptions;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;

public class MyNewEventActivity extends AppCompatActivity implements View.OnClickListener {
    Toolbar toolbar;
    ImageView imageView;
    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_new_event);

        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        imageView = (ImageView) findViewById(R.id.get_picture);
        button = (Button) findViewById(R.id.button_new_event);
        imageView.setOnClickListener(this);
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.get_picture:
                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
                    startActivityForResult(takePictureIntent, 1);
                }
                break;
            case R.id.button_new_event:
                break;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1 && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");

            Bitmap croppedBmp = Bitmap.createBitmap((Bitmap) extras.get("data"), 0, 0, imageBitmap.getWidth(),
                    imageBitmap.getHeight() / 2);
            imageView.setImageBitmap(croppedBmp);
        }
    }
}
