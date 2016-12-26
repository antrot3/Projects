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
using Windows.UI.ViewManagement;

using System.Windows.Media.Imaging;
using System.Windows.Media;

namespace PhoneApp1
{
    public partial class activity2 : PhoneApplicationPage
    {
        public activity2()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Uri("/Pitanja1.xaml", UriKind.Relative));
        }
    }
}