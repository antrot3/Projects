using Sonar.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sonar.Web.Mappers
{
    public class PersonMapper
    {
        public static PersonVM Map(Model.Person person)
        {
            return new PersonVM()
            {
                Id = person.Id,
                Username = person.Username,
                Email = person.Email,
                FirstName = person.FirstName,
                LastName = person.LastName,
                BirthDate = person.BirthDate,
                Rating = person.Rating,
                ImageUrl = person.ImageUrl
            };
        }

        public static Model.Person Map(PersonVM person)
        {
            return new Model.Person()
            {
                Id = person.Id,
                Username = person.Username,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Email = person.Email,
                BirthDate = person.BirthDate,
                Password = person.Password,
                Rating = person.Rating,
                PersonTypeID = int.Parse(person.PersonTypeId),
                ImageUrl = person.ImageUrl
                //PersonType=person.PersonType
            };
        }
    }
}