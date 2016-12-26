using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using PhoneApp1.Resources;


using System.Xml;
using Microsoft.Phone.Tasks;
using Microsoft.Phone.Automation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using System.IO;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.UI;
using Windows.UI.ViewManagement;

using System.Windows.Media.Imaging;
using System.Windows.Media;


namespace PhoneApp1
{
    public partial class Page1 : PhoneApplicationPage
    {
        

        string[] sve = new string[]{"1.Koja su bitna obilježja vožnje u gradu?","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba","nesto","ograničen broj parkirališnih mjesta","učestala i brza promjena prometnih situacija","mali broj znakova izričitih naredaba"
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
        int[] bodovi = new int[] { 1, 2, 2, 2, 4, 1, 2, 2, 2, 4, 1, 2, 2, 2, 4, 1, 2, 2, 2, 4, 1, 2, 2, 2, 4, 1, 2, 2, 2, 41, 2, 2, 2, 4, 1, 2, 2, 2, 4 };
        string[] slije = new string[] { "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png", "/Resources/logo.png", "/Resources/bg31.png", "/Resources/ikona.png" };
        int flag = 1;
        int brojac = 0;
        public static int marks, correct, wrong, ukupno, suma;
        int tocni = 0;
        int potrebni = 0;
        int bodoviuk = 0;
        


        public Page1()
        {

            InitializeComponent();
            Pitanje.Text = sve[0];
            cb1.Content = sve[1];
            cb2.Content = sve[2];
            cb3.Content = sve[3];
            cb4.Content = sve[4];
            String stringPath = slije[0];
            Uri imageUri = new Uri(stringPath, UriKind.Relative);
            BitmapImage imageBitmap = new BitmapImage(imageUri);
            cb1.Opacity = 100;

            cb2.Opacity = 100;

            cb3.Opacity = 100;

            cb4.Opacity = 100;
            slija.Source = imageBitmap;
            if (cb4.Content.Equals("nesto"))
            {

                cb4.Opacity = 0;

            }
            else
            {
                cb4.Opacity = 100;

            }




        }

        

        private void Button_Click_1(object sender, System.Windows.RoutedEventArgs e)
        {
            tocni = 0;
            potrebni = 0;
            if (cb1.IsChecked == true)
            {

                if (cb1.Content.Equals(sve[5 + brojac * 8]) || cb1.Content.Equals(sve[6 + brojac * 8]) || cb1.Content.Equals(sve[7 + brojac * 8]))
                {
                    tocni++;
                    potrebni++;

                }
                else
                {
                    potrebni++;
                }
            }
            else
            {
                if (cb1.Content.Equals(sve[5 + brojac * 8]) || cb1.Content.Equals(sve[6 + brojac * 8]) || cb1.Content.Equals(sve[7 + brojac * 8]))
                {

                    potrebni++;

                }


            }
            if (cb2.IsChecked == true)
            {

                if (cb2.Content.Equals(sve[5 + brojac * 8]) || cb2.Content.Equals(sve[6 + brojac * 8]) || cb2.Content.Equals(sve[7 + brojac * 8]))
                {
                    tocni++;
                    potrebni++;

                }
                else
                {
                    potrebni++;
                }
            }

            else{
                if (cb2.Content.Equals(sve[5 + brojac * 8]) || cb2.Content.Equals(sve[6 + brojac * 8]) || cb2.Content.Equals(sve[7 + brojac * 8]))
                {
                    
                    potrebni++;

                }


                }
            
         if (cb3.IsChecked == true)
            {

                if (cb3.Content.Equals(sve[5 + brojac * 8]) || cb3.Content.Equals(sve[6 + brojac * 8]) || cb3.Content.Equals(sve[7 + brojac * 8]))
                {
                    tocni++;
                    potrebni++;

                }
                else
                {
                    potrebni++;
                }
            }

            else{
                if (cb3.Content.Equals(sve[5 + brojac * 8]) || cb3.Content.Equals(sve[6 + brojac * 8]) || cb3.Content.Equals(sve[7 + brojac * 8]))
                {
                    
                    potrebni++;

                }


                }
         if (cb4.IsChecked == true)
         {

             if (cb4.Content.Equals(sve[5 + brojac * 8]) || cb4.Content.Equals(sve[6 + brojac * 8]) || cb4.Content.Equals(sve[7 + brojac * 8]))
             {
                 tocni++;
                 potrebni++;

             }
             else
             {
                 potrebni++;
             }
         }

         else
         {
             if (cb4.Content.Equals(sve[5 + brojac * 8]) || cb4.Content.Equals(sve[6 + brojac * 8]) || cb4.Content.Equals(sve[7 + brojac * 8]))
             {

                 potrebni++;

             }


         }
         if (potrebni == tocni)
         {
             ukupno = ukupno + bodovi[brojac];

             suma = suma + bodovi[brojac];
         }
         else
         {

             suma = suma + bodovi[brojac];
         }
         brojac++;
         flag++;
         tocni = 0;
         potrebni = 0;
            if (brojac*8 < sve.Length) {
                Pitanje.Text=(sve[brojac*8]);
                
                cb1.Content=(sve[brojac*8+1]);
                cb2.Content=(sve[brojac*8+2]);
                cb3.Content=(sve[brojac*8+3]);
                cb4.Content=(sve[brojac*8+4]);
                if (cb4.Content.Equals("nesto"))
                {
                    
                   
                    cb4.Opacity = 0;
                    

                }
                else
                {
                    
                    cb4.Opacity=100;
                    
                    
                }
                if (cb1.IsChecked == true||cb2.IsChecked == true||cb3.IsChecked == true||cb4.IsChecked == true)
                {
                    cb1.IsChecked = false;
                    cb2.IsChecked = false;
                    cb3.IsChecked = false;
                    cb4.IsChecked = false;
                }else{};
                String stringPath = slije[brojac];
            Uri imageUri = new Uri(stringPath, UriKind.Relative);
            BitmapImage imageBitmap = new BitmapImage(imageUri);

            slija.Source = imageBitmap;
            }
            else {
                cb1.Opacity = 0;
                
                cb2.Opacity = 0;
                
                cb3.Opacity = 0;
                
                cb4.Opacity = 0;


                Pitanje.Text = ("Cestitamo na zavrsenom ispitu" + ukupno + "/" + suma + "!!!!!");
                

            }
            }


        }
    

}
