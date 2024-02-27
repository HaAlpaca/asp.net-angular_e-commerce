using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;


namespace Infrastructure.Identity
{
    public class AddIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Street = "10 Vo Nguyen Giap",
                        City = "Ha Noi",
                        ZipCode = "00000"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}