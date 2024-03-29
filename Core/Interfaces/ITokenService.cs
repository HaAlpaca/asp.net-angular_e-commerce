using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user,IList<string> roles);

    }
}