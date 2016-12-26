using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Sonar.ViewModels;
using Sonar.Web.Mappers;
using Sonar.Web.Model;
using Sonar.Web.ViewModel;

namespace Sonar.Web.API
{
    public class UserApiController : ApiController
    {
        private readonly hackathon_shift_2016_testEntities context;
        private readonly int currentlyLoggedInUserId;

        public UserApiController()
        {
            context = new hackathon_shift_2016_testEntities();
            currentlyLoggedInUserId = 14;
        }

        [HttpGet]
        public Person GetUserProfile(int id)
        {
            return context.Person.First(person => person.Id == id);
        }

        [HttpGet]
        public SidebarVM GetSidebarData()
        {
            var person = context.Person
                .FirstOrDefault(p => p.Id == currentlyLoggedInUserId);

            var friends = context.Person
                .Where(p => p.Id != currentlyLoggedInUserId)
                .Take(3)
                .ToList()
                .Select(PersonMapper.Map)
                .ToList();

            var events = context.Event
                .Take(3)
                .ToList()
                .Select(EventMapper.Map)
                .ToList();

            context.Dispose();

            var result = new SidebarVM
            {
                User = PersonMapper.Map(person),
                Friends = friends,
                Events = events
            };

            return result;
        }
    }
}
