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
    public partial class Rezultati : PhoneApplicationPage
    {
        
        public Rezultati()
        {
            InitializeComponent();
            
            int p = 0;
            int u=1;
            
            sin.Text = "Cestitamo ukupan broj bodovva je" + p + "/" + u;
            
            
        }
    }
}