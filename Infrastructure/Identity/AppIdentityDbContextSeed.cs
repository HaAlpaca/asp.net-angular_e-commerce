using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;


namespace Infrastructure.Identity
{
    public class AddIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            if (!await roleManager.RoleExistsAsync(AppRole.Manager))
                await roleManager.CreateAsync(new IdentityRole(AppRole.Manager));
            if (!await roleManager.RoleExistsAsync(AppRole.Customer))
                await roleManager.CreateAsync(new IdentityRole(AppRole.Customer));
                
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    PhoneNumber = "00001111",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Street = "10 Vo Nguyen Giap",
                        City = "Ha Noi",
                        ZipCode = "00000",
                        Country = "VietNam"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, AppRole.Manager);
            }
        }
    }
}