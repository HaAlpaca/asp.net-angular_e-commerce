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
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindUserByClaimPrincipleWithAddress(User);
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
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
            return BadRequest("Problem when updating address");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(400));
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
    }
}
