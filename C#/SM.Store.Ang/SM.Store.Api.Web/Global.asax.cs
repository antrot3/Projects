﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SM.Store.Api.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {           
            GlobalConfiguration.Configure(WebApiConfig.Register);            
        }

        protected void Application_End(object sender, EventArgs e)
        {            
            DIFactoryDesigntime.CleanUp();
        }
    }
}
