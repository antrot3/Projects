using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zadatak.Models;
namespace Zadatak.Controllers
{
    public class MuzikaController : Controller
    {
        //
        // GET: /Muzika/
       
        public ActionResult Index()
        {

            //var product =( from a in db.Prijenosnica join b in db.TablicaHitova on a.Id equals b.Id select new { a, b });
            //return View(product);
            return View();

        }
        

       

    }
}
