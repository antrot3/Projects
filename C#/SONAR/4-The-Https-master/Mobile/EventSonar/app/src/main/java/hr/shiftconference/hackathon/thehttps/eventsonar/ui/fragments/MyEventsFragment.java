package hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments;


import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Event;
import hr.shiftconference.hackathon.thehttps.eventsonar.services.APIService;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.activities.MyNewEventActivity;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters.EventsRecyclerAdapter;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters.MyEventsRecyclerAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class MyEventsFragment extends Fragment {
    private Context context;
    private FloatingActionButton fab;

    public MyEventsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_my_events, container, false);
        setUpRecyclerView(view);

        fab = (FloatingActionButton) view.findViewById(R.id.my_new_event);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent newEvent = new Intent(getActivity(), MyNewEventActivity.class);
                getActivity().startActivity(newEvent);
            }
        });

        return view;
    }

    private void setUpRecyclerView(View view) {
        final RecyclerView recyclerView = (RecyclerView) view
                .findViewById(R.id.my_events_recycler_view);

        final MyEventsRecyclerAdapter myEventsRecyclerAdapter = new MyEventsRecyclerAdapter(
                context
        );
        recyclerView.setAdapter(myEventsRecyclerAdapter);

        LinearLayoutManager linearLayoutManager =
                new LinearLayoutManager(context);
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(linearLayoutManager);

        // CALL API
        Call<List<Event>> call = APIService.getService().getAllEvents();
        call.enqueue(new Callback<List<Event>>() {
            @Override
            public void onResponse(Call<List<Event>> call, Response<List<Event>> response) {
                myEventsRecyclerAdapter.setAdapterData(response.body());

            }

            @Override
            public void onFailure(Call<List<Event>> call, Throwable t) {

            }
        });
    }

    public void referenceParentContext(Context context) {
        this.context = context;
    }
}
