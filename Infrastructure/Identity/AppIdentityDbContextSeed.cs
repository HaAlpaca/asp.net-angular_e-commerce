using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;


namespace Infrastructure.Identity
{
    public class AddIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager,RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(AppUserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(AppUserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(AppUserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(AppUserRoles.User));
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    PhoneNumber ="00001111",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Street = "10 Vo Nguyen Giap",
                        City = "Ha Noi",
<<<<<<< HEAD
                        ZipCode = "00000",
                        Country = "VietNam"
                    }
=======
                        Zipcode = "00000"
                    },
                    PhoneNumber = "00000011111"
>>>>>>> 56be5c0079da89868659433533840628f06e4b83
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, AppUserRoles.User);
            }
        }
    }
}