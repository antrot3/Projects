package hr.shiftconference.hackathon.thehttps.eventsonar.ui.adapters;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ANTE on 19.5.2016..
 */
public class ViewPagerAdapter extends FragmentPagerAdapter {
    // view groups (fragments) attached to adapter
    private final List<Fragment> fragments;
    // stuff that fragments are visualy made of...
    private final List<String> fragmentTitles;

    public ViewPagerAdapter(FragmentManager fm) {
        super(fm);

        // they'll be same size...
        fragments = new ArrayList<>();
        fragmentTitles = new ArrayList<>();
    }

    @Override
    public Fragment getItem(int position) {
        Log.w("Fragment getItem -> ", fragmentTitles.get(0));
        return fragments.get(position);
    }

    @Override
    public int getCount() {
        return fragments.size();
    }

    public void addFragment(Fragment fragment, String title) {
        fragments.add(fragment);
        fragmentTitles.add(title);
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return fragmentTitles.get(position);
    }
}
