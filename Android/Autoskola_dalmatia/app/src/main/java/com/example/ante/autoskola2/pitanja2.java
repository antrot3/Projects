package com.example.ante.autoskola2;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;


public class pitanja2 extends ActionBarActivity {

    TextView tv;
    TextView txtbrp;
    Button btnnext;
    ImageView img;

    CheckBox cb1,cb2,cb3,cb4;

    String sve[]={"ovo je onaj drugi","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba"
            ,"2. Koja su bitna obilježja vožnje u gradu?","veliki broj traka za vozila javnog prijevoza putnika","gužve i zastoji u prometu","prisutnost velikog broja ostalih sudionika prometa","nesto","veliki broj traka za vozila javnog prijevoza putnika","gužve i zastoji u prometu","prisutnost velikog broja ostalih sudionika prometa"
            ,"3. Kojom brzinom je dopušteno voziti nakon izlaska iz naselja u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "4. Kojom brzinom je dopušteno voziti nakon znaka u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "5. Kojom brzinom vam je dopušteno voziti nakon znaka u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "6. Kako ćete voziti u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba"
            ,"7. Kojom cestom vozite u situaciji kao na slici obzirom na položaj parkiranih vozila?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba"
            ,"8. Koje opasnosti možete očekivati u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "9. Kojim smjerom vam je dopušteno voziti s obzirom da nema oznaka na kolniku u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "10. Je li vozilo na prometnoj traci s lijeve strane ulice, u situaciji kao na slici, zaustavljeno propisno?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "11. Vozite osobni automobil i želite skrenuti ulijevo u ulicu, u situaciji kao na slici. Kakoćete postupiti?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "12. Vozite u gradu, zelenim valom. Što je zabranjeno?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "13. Koje su opasnosti moguće za vrijeme vožnje zelenim valom?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "14. Koje su moguće opasnosti za vrijeme vožnje raskrižjima u više razina (petljom)?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "15. Koje su moguće opasnosti za vrijeme vožnje raskrižjem s kružnim tokom prometa sdvije prometne trake?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "16. Koji je položaj vozilom na prometnoj traci zauzeo vozač crvenog automobila ispredvas,u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "17. Kako ćete voziti raskrižjem,s obzirom na položaj vašega automobila u prometnoj traci i prometne znakove,u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "18. Vozite vozilom u srednjoj prometnoj traci u situaciji kao na slici. Kako ćete postupiti?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "19. Vozite krajnjom lijevom prometnom trakom i želite na raskrižju skrenuti ulijevo u situaciji kao na slici. Kako ćete postupiti?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "20. Što se smatra kolonom vozila u naseljenom mjestu?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "21. Koje opasnosti možete očekivati u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",

            "22. Na kojim se mjestima u gradu može zaustaviti i parkirati?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "23. O čemu morate voditi računa tijekom prolaska raskrižjem?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "24. O čemu ovisi izbor prometne trake pri izlasku iz raskrižja?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "25. U skladu s čime se može odvijati promet na raskrižju?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "26.Koja je vozila vozač dužan propustiti na raskrižju cesta iste važnosti?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "27.Što mora poduzeti vozač vozila prije skretanja?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "28. Smije li vozač vozila iz srednje prometne trake, kada to bude dopušteno, skrenuti ulijevo u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "29.Što je mimoilaženje?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "30.Što ste dužni učiniti zbog neke zapreke na cesti ako procijenite da nemate dovoljno prostora za sigurno mimoilaženje?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "31.Koji je vozač dužan zaustaviti svoje vozilo i omogućiti mimoilaženje na cesti s velikim uzdužnim nagibom?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "32. .Smije li se pretjecati vozilo s desne strane koje na raskrižju skreće ulijevo?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "33. .S koje se strane mora obilaziti pješački otok koji se nalazi na sredini kolnika ceste s dvosmjernim prometom?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "34. .S koje strane se može obilaziti pješački otok koji se nalazi na sredini ceste s jednosmjernim prometom ako prometnim znakom nije drukčije određeno?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "35. Smije li se zaustaviti vozilo na mjestima u situaciji kao na slici?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba",
            "36. Na koji način može biti osiguran prijelaz ceste preko željezničke pruge?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba"

    };
    int bodovi[]={1,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,71,2,3,4,5,6,7};
    String slije[]={"@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31","@drawable/logo","@drawable/ikona","@drawable/bg31"};
    int flag=1;
    int brojac=0;
    public static int marks,correct,wrong,ukupno,suma;
    int tocni=0;
    int potrebni=0;
    int bodoviuk=0;
    String krivi;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pitanja);
        tv=(TextView)findViewById(R.id.txtq);
        txtbrp=(TextView)findViewById(R.id.txtbrp);
        img=(ImageView)findViewById(R.id.imageView2);
        cb1=(CheckBox)findViewById(R.id.cb1);
        cb2=(CheckBox)findViewById(R.id.cb2);
        cb3=(CheckBox)findViewById(R.id.cb3);
        cb4=(CheckBox)findViewById(R.id.cb4);

        tv.setText(sve[0]);
        txtbrp.setText("Ovo je pitanje broj "+flag);
        cb1.setText(sve[1]);
        cb2.setText(sve[2]);
        cb3.setText(sve[3]);
        cb4.setText(sve[4]);
        if(cb4.getText()=="nesto")
        {
            cb4.setClickable(false);
            cb4.setAlpha(0);

        }
        else
        {
            cb4.setClickable(true);
            cb4.setAlpha(1);
        }
        Context context = img.getContext();
        int id = context.getResources().getIdentifier(slije[brojac], "drawable", context.getPackageName());
        img.setImageResource(id);


    }
    public void onClick(View v) {

        if( Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH ){
            img.setSystemUiVisibility( View.SYSTEM_UI_FLAG_HIDE_NAVIGATION );

        }
        else if( Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB )

            img.setSystemUiVisibility( View.STATUS_BAR_HIDDEN );
        else{}

    }

    public void oclicknext(View v) {

        tocni=0;
        potrebni=0;
        if (cb1.isChecked()) {
            if (cb1.getText() == sve[5 + brojac * 8] || cb1.getText() == sve[6 + brojac * 8] || cb1.getText() == sve[7 + brojac * 8]) {
                tocni++;
                potrebni++;

            }
            else {
                potrebni++;
            }
        }
        else{
            if (cb1.getText() == sve[5 + brojac * 8] || cb1.getText() == sve[6 + brojac * 8] || cb1.getText() == sve[7 + brojac * 8]) {

                potrebni++;
            }

        }
        if (cb2.isChecked()) {
            if (cb2.getText() == sve[5 + brojac * 8] || cb2.getText() == sve[6 + brojac * 8] || cb2.getText() == sve[7 + brojac * 8]) {
                tocni++;
                potrebni++;

            }
            else {
                potrebni++;
            }
        }
        else{
            if (cb2.getText() == sve[5 + brojac * 8] || cb2.getText() == sve[6 + brojac * 8] || cb2.getText() == sve[7 + brojac * 8]) {

                potrebni++;
            }

        }
        if (cb3.isChecked()) {
            if (cb3.getText() == sve[5 + brojac * 8] || cb3.getText() == sve[6 + brojac * 8] || cb3.getText() == sve[7 + brojac * 8]) {
                tocni++;
                potrebni++;

            }
            else {
                potrebni++;
            }
        }
        else{
            if (cb3.getText() == sve[5 + brojac * 8] || cb3.getText() == sve[6 + brojac * 8] || cb3.getText() == sve[7 + brojac * 8]) {

                potrebni++;
            }

        }
        if (cb4.isChecked()) {
            if (cb4.getText() == sve[5 + brojac * 8] || cb4.getText() == sve[6 + brojac * 8] || cb4.getText() == sve[7 + brojac * 8]) {
                tocni++;
                potrebni++;

            }
            else {
                potrebni++;
            }
        }
        else{
            if (cb4.getText() == sve[5 + brojac * 8] || cb4.getText() == sve[6 + brojac * 8] || cb4.getText() == sve[7 + brojac * 8]) {

                potrebni++;
            }

        }

        if (potrebni==tocni) {
            ukupno=ukupno+bodovi[brojac];

            suma=suma+bodovi[brojac];
        }
        else {

            suma=suma+bodovi[brojac];
        }
        brojac++;
        flag++;
        tocni=0;
        potrebni=0;


        if (brojac*8 < sve.length) {
            txtbrp.setText("Ovo je pitanje broj " + flag);
            tv.setText(sve[brojac*8]);
            cb1.setText(sve[brojac*8+1]);
            cb2.setText(sve[brojac*8+2]);
            cb3.setText(sve[brojac*8+3]);
            cb4.setText(sve[brojac*8+4]);
            if(cb4.getText()=="nesto")
            {
                cb4.setClickable(false);
                cb4.setAlpha(0);

            }
            else
            {
                cb4.setClickable(true);
                cb4.setAlpha(1);
            }
            if (cb1.isChecked()||cb2.isChecked()||cb3.isChecked()||cb4.isChecked())
            {
                cb1.setChecked(false);
                cb2.setChecked(false);
                cb3.setChecked(false);
                cb4.setChecked(false);
            }else{};
            Context context = img.getContext();
            int id = context.getResources().getIdentifier(slije[brojac], "drawable", context.getPackageName());
            img.setImageResource(id);



        }
        else {

            Intent in = new Intent(getApplicationContext(), rezultati.class);
            startActivity(in);

        }
    }



    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_pitanja, menu);
        return true;
    }
    public void promjenastrane5(View v){
        startActivity(new Intent(pitanja2.this, rezultati.class));
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}