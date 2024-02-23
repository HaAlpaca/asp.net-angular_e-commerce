using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Infrastructure.Identity;
namespace API.Extensions
{
    public static class IdentityServiceExtentions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppIdentityDbContext>(otp =>
            {
                otp.UseSqlite(config.GetConnectionString("IdentityConnection"));
            });
            services.AddIdentityCore<AppUser>(otp =>
            {
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication();
            services.AddAuthorization();

            return services;
        }
    }
}