using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Zadatak.Controllers
{
    public class MuzikaController : Controller
    {
        //
        // GET: /Muzika/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Playlista()
        {
            return PartialView();
        }

    }
}
