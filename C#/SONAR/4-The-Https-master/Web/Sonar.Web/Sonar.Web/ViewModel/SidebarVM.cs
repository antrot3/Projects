using System.Collections.Generic;
using Sonar.ViewModels;
using Sonar.Web.Model;

namespace Sonar.Web.ViewModel
{
    public class SidebarVM
    {
        public PersonVM User;
        public IEnumerable<PersonVM> Friends;
        public IEnumerable<EventVM> Events;
    }
}