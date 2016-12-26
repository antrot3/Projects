using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Sonar.ViewModels;
using Sonar.Web.Model;

namespace Sonar.Web.API
{
    public class TownApiController : ApiController
    {
        private readonly hackathon_shift_2016_testEntities context;
        public TownApiController()
        {
            context = new hackathon_shift_2016_testEntities();
        }

        [HttpGet]
        public IEnumerable<TownVM> GetAllTowns()
        {
            return context.Town.Select(town => new TownVM() {
                Name = town.Name,
                Id = town.Id
            });
        }
    }
}
