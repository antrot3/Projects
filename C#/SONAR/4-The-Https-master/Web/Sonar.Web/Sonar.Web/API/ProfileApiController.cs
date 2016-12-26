using Sonar.ViewModels;
using Sonar.Web.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sonar.Web.API
{
    public class ProfileApiController : ApiController
    {
        [HttpGet]
        public PersonVM Get(int id)
        {
            if (id == 0)
                id = 14; //14 is currently logged in user

            var context = new Model.hackathon_shift_2016_testEntities();
            var viewModel = PersonMapper.Map(context.Person.Single(person => person.Id == id));

            context.Dispose();

            return viewModel;
        }

        [HttpGet]
        public PersonVM GetByUsername(string username)
        {
            var context = new Model.hackathon_shift_2016_testEntities();

            var viewModel = PersonMapper.Map(context.Person.Single(person => person.Username == username));

            context.Dispose();

            return viewModel;
        }

        [HttpPost]
        public void Update(PersonVM personData)
        {
            var dataModel = PersonMapper.Map(personData);

            using (var context = new Model.hackathon_shift_2016_testEntities())
            {
                var personToUpdate = context.Person.Single(p => p.Id == dataModel.Id);

                personToUpdate.Username = dataModel.Username;
                personToUpdate.FirstName = dataModel.FirstName;
                personToUpdate.LastName = dataModel.LastName;
                personToUpdate.Password = dataModel.Password;
                personToUpdate.BirthDate = dataModel.BirthDate;
                personToUpdate.Rating = dataModel.Rating;
                personToUpdate.Email = dataModel.Email;
                personToUpdate.ImageUrl = dataModel.ImageUrl;

                context.SaveChanges();
            }
        }
    }
}
