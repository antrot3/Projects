using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Sonar.Web.Model;
using Sonar.ViewModels;
using Sonar.Web.Mappers;
using System;

namespace Sonar.Web.Controllers
{
    public class FriendsApiController : ApiController
    {
        [HttpPost]
        public void AddFriend()
        {

        }

        [HttpGet]
        public IEnumerable<PersonVM> GetAllFriendsForUser(string username = "adonlic")
        {
            var context = new hackathon_shift_2016_testEntities();
            var id = context.Person.Single(_person => _person.Username == username).Id;
            //context.Dispose();

            context = new hackathon_shift_2016_testEntities();
            var friends = context.PersonSubscription.Where(_person => _person.SubscriberID == id);
            //context.Dispose();

            var viewModels = new List<PersonVM>();
            foreach (var friend in friends)
            {
                context = new hackathon_shift_2016_testEntities();
                var _person = context.Person.SingleOrDefault(person => person.Id == friend.Id);
                if (_person != null)
                {
                    viewModels.Add(PersonMapper.Map(_person));
                }
                //context.Dispose();
            }

            return viewModels;
        }

        [HttpGet]
        public IEnumerable<PersonVM> GetAllPeople()
        {
            var context = new hackathon_shift_2016_testEntities();
            return context.Person.Select(e => new PersonVM()
            {
                Id = e.Id,
                FirstName = e.FirstName,
                ImageUrl = e.ImageUrl,
                LastName = e.LastName,
                BirthDate = e.BirthDate,
                Username = e.Username,
                Email = e.Email,
                Rating = e.Rating
            });
        }
    }
}
