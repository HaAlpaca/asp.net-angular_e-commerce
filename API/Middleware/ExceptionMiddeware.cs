using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddeware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddeware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddeware(RequestDelegate next,ILogger<ExceptionMiddeware> logger,
        IHostEnvironment env)
        {
            this._next = next;
            this._logger = logger;
            this._env = env;
        }
        public async Task InvokeAsync(HttpContext context) {
            try {
                await _next(context);
            } 
            catch (Exception ex) {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = _env.IsDevelopment() 
                    ? new ApiException((int)HttpStatusCode.InternalServerError,ex.Message,ex.StackTrace.ToString()) 
                    : new ApiException((int)HttpStatusCode.InternalServerError);
                
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response,options); 
                await context.Response.WriteAsync(json);
            }
        }
    }
}