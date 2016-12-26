package hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Event;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.activities.EventDetailsActivity;

/**
 * Created by ANTE on 1.6.2016..
 */
public class MyEventsRecyclerAdapter extends RecyclerView.Adapter<MyEventsRecyclerAdapter.MyEventViewHolder> {
    private List<Event> events;
    private LayoutInflater layoutInflater;
    private Context context;

    public MyEventsRecyclerAdapter(Context context) {
        this.layoutInflater = LayoutInflater.from(context);
        this.context = context;
    }

    @Override
    public MyEventViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = layoutInflater.inflate(R.layout.list_item_my_event, parent, false);
        MyEventViewHolder myEventViewHolder = new MyEventViewHolder(view);

        return myEventViewHolder;
    }

    @Override
    public int getItemCount() {
        if (events == null)
            return 0;

        return events.size();
    }

    @Override
    public void onBindViewHolder(MyEventViewHolder holder, int position) {
        Event currentEvent = events.get(position);

        holder.setData(currentEvent, position);
        holder.setListeners();
    }

    public void setAdapterData(List<Event> events) {
        this.events = new ArrayList<>();
        this.events.addAll(events);

        notifyDataSetChanged();
    }



    class MyEventViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView name, description, dateCreated, timeOfEvent;
        private ImageView image;
        private int position;
        private Event current;

        public MyEventViewHolder(View itemView) {
            super(itemView);

            this.name = (TextView) itemView.findViewById(R.id.event_name);
            this.description = (TextView) itemView.findViewById(R.id.event_description);
            this.dateCreated = (TextView) itemView.findViewById(R.id.date_added);
            this.timeOfEvent = (TextView) itemView.findViewById(R.id.time_of_event);
            this.image = (ImageView) itemView.findViewById(R.id.event_image_view);
        }

        public void setData(Event currentEvent, int position) {
            this.name.setText(currentEvent.getName());
            this.description.setText(currentEvent.getDescription());
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dCreated = df.format(currentEvent.getStartDate());
            String tOfEvent = df.format(currentEvent.getEndDate());
            this.dateCreated.setText(dCreated);
            this.timeOfEvent.setText(tOfEvent);
            Picasso.with(context)
                    .load(currentEvent.getImageURL())
                    .fit()
                    .centerCrop()
                    .into(this.image);
            this.position = position;
            this.current = currentEvent;
        }

        public void setListeners() {
            this.name.setOnClickListener(this);
            this.description.setOnClickListener(this);
            this.image.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            if (v.getId() == R.id.event_name || v.getId() == R.id.event_description
                    || v.getId() == R.id.event_image_view) {

                // open event details...
                Intent details = new Intent(context, EventDetailsActivity.class);
                details.putExtra("currentEvent", (Parcelable) current);
                context.startActivity(details);
            }
        }
    }
}
