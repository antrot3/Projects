using System.Web.Mvc;

namespace Sonar.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("Layout");
        }
    }
}
