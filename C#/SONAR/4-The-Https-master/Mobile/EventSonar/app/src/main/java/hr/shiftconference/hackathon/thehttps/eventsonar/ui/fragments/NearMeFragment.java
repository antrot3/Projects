package hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.Event;
import hr.shiftconference.hackathon.thehttps.eventsonar.services.APIService;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters.EventsRecyclerAdapter;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class NearMeFragment extends Fragment {
    private Context context;

    public NearMeFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_near_me, container, false);
        setUpRecyclerView(view);

        return view;
    }

    private void setUpRecyclerView(View view) {
        final RecyclerView recyclerView = (RecyclerView) view
                .findViewById(R.id.events_recycler_view);

        final EventsRecyclerAdapter eventsRecyclerAdapter = new EventsRecyclerAdapter(
                context
        );
        recyclerView.setAdapter(eventsRecyclerAdapter);

        StaggeredGridLayoutManager staggeredGridLayoutManager =
                new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(staggeredGridLayoutManager);

        // CALL API
        Call<List<Event>> call = APIService.getService().getAllEvents();
        call.enqueue(new Callback<List<Event>>() {
            @Override
            public void onResponse(Call<List<Event>> call, Response<List<Event>> response) {
                eventsRecyclerAdapter.setAdapterData(response.body());

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
