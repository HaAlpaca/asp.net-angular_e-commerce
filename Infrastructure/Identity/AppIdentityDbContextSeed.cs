using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AddIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Admin",
                    Email = "dangminhhaworkspace@gmail.com",
                    UserName = "dangminhhaworkspace@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Street = "10 Vo Nguyen Giap",
                        City = "Ha Noi",
                        ZipCode = "000000"
                    }
                };
                await userManager.CreateAsync(user, "pa$$w0rd");
            }
        }
    }
}