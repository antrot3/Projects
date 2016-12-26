package hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Person;

/**
 * Created by ANTE on 1.6.2016..
 */
public class FriendsRecyclerAdapter extends RecyclerView.Adapter<FriendsRecyclerAdapter.FriendViewHolder> {
    private List<Person> friends;
    private LayoutInflater layoutInflater;
    private Context context;

    public FriendsRecyclerAdapter(Context context) {
        this.layoutInflater = LayoutInflater.from(context);
        this.context = context;
    }

    @Override
    public FriendViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = layoutInflater.inflate(R.layout.list_item_event, parent, false);
        FriendViewHolder eventViewHolder = new FriendViewHolder(view);

        return eventViewHolder;
    }

    @Override
    public int getItemCount() {
        if (friends == null)
            return 0;

        return friends.size();
    }

    @Override
    public void onBindViewHolder(FriendViewHolder holder, int position) {
        Person currentFriend = friends.get(position);

        holder.setData(currentFriend, position);
        holder.setListeners();
    }

    public void setAdapterData(List<Person> friends) {
        this.friends = new ArrayList<>();
        this.friends.addAll(friends);

        notifyDataSetChanged();
    }



    class FriendViewHolder extends RecyclerView.ViewHolder {
        private TextView name, description;
        private ImageView image;
        private int position;
        private Person current;

        public FriendViewHolder(View itemView) {
            super(itemView);

            this.name = (TextView) itemView.findViewById(R.id.event_name);
            this.description = (TextView) itemView.findViewById(R.id.event_description);
            this.image = (ImageView) itemView.findViewById(R.id.event_image_view);
        }

        public void setData(Person currentFriend, int position) {
            this.name.setText(currentFriend.getFirstName() + " " + currentFriend.getLastName());
            this.description.setText(currentFriend.getEmail());
            /*
            Picasso.with(context)
                    .load(currentEvent.getImageURL())
                    .fit()
                    .centerCrop()
                    .into(this.image);
                    */
            this.position = position;
            this.current = currentFriend;
        }

        public void setListeners() {
            //this.name.setOnClickListener(this);
            //this.description.setOnClickListener(this);
            //this.image.setOnClickListener(this);
        }

        /*
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
        */
    }
}
