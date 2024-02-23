using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public String DisplayName { get; set; }
        public Address Address { get; set; }
    }

}