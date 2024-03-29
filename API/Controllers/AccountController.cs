using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)

        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._tokenService = tokenService;
            this._mapper = mapper;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindUserByClaimPrincipleWithAddress(User);
            IList<string> roles = await _userManager.GetRolesAsync(user);
            Console.WriteLine(roles);
            return new UserDto
            {
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Token = _tokenService.CreateToken(user, roles),
                DisplayName = user.DisplayName

            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimPrincipleWithAddress(User);
            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimPrincipleWithAddress(HttpContext.User);
            user.Address = _mapper.Map<AddressDto, Address>(address);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));
            return BadRequest("Problem while updating address");
        }

        // login - Register
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            IList<string> roles = await _userManager.GetRolesAsync(user);
            if (user == null) return Unauthorized(new ApiResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Token = _tokenService.CreateToken(user, roles)
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] {
                    "Email address is in use"
                }
                });
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            await _userManager.AddToRoleAsync(user, AppRole.Customer);
            IList<string> roles = await _userManager.GetRolesAsync(user);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(400));
            return new UserDto
            {
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Token = _tokenService.CreateToken(user, roles),
                DisplayName = user.DisplayName
            };
        }
    }
}
