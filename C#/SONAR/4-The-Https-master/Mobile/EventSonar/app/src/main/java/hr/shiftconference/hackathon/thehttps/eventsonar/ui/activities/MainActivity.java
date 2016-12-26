package hr.shiftconference.hackathon.thehttps.eventsonar.ui.activities;

import android.content.Intent;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import hr.shiftconference.hackathon.thehttps.eventsonar.R;
import hr.shiftconference.hackathon.thehttps.eventsonar.services.APIService;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters.ViewPagerAdapter;
import hr.shiftconference.hackathon.thehttps.eventsonar.models.database.DatabaseModel;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments.FriendsFragment;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments.InterestsFragment;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments.MyEventsFragment;
import hr.shiftconference.hackathon.thehttps.eventsonar.ui.fragments.NearMeFragment;

public class MainActivity extends AppCompatActivity {
    // fields
    Toolbar toolbar;
    ViewPager viewPager;
    ViewPagerAdapter viewPagerAdapter;
    TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupToolbar();
        setupSlidingNavigation();
        APIService.setupAPIService();

        // DatabaseModel context = new DatabaseModel(this);

        //context.getPersons().addAll(APIHelper.Person.Fetch());

        //context.Persons().fetchAll();
        //List<Person> persons = context.Persons().getAll();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.settings:
                Intent settings = new Intent(this, SettingsActivity.class);
                startActivity(settings);
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private void setupToolbar() {
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setTitle("Event Sonar");
        toolbar.setSubtitle("not logged in");

        setSupportActionBar(toolbar);

        getSupportActionBar().setLogo(R.mipmap.logo_nas);
        getSupportActionBar().setDisplayUseLogoEnabled(true);
        getSupportActionBar().setIcon(R.mipmap.logo_nas);
    }

    private void setupSlidingNavigation() {
        // VIEW PAGER
        viewPager = (ViewPager) findViewById(R.id.view_pager);
        viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());

        NearMeFragment nearMeFragment = new NearMeFragment();
        MyEventsFragment myEventsFragment = new MyEventsFragment();
        FriendsFragment friendsFragment = new FriendsFragment();
        InterestsFragment interestsFragment = new InterestsFragment();
        nearMeFragment.referenceParentContext(this);
        myEventsFragment.referenceParentContext(this);

        viewPagerAdapter.addFragment(nearMeFragment, "Near Me");
        viewPagerAdapter.addFragment(myEventsFragment, "My Events");
        viewPagerAdapter.addFragment(friendsFragment, "Friends");
        viewPagerAdapter.addFragment(interestsFragment, "Interests");
        viewPager.setAdapter(viewPagerAdapter);

        // ------------------------------------------------------------------

        // TABS
        tabLayout = (TabLayout) findViewById(R.id.tab_layout);
        tabLayout.setupWithViewPager(viewPager);
        // tabLayout.getTabAt(0).getIcon();
    }
}
