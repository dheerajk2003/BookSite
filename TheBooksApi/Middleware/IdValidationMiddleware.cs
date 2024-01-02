using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TheBooksApi.Models;

namespace TheBooksApi.Middleware
{
    public class IdValidationMiddleware
    {
        public readonly RequestDelegate _next;

        public IdValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if(context.Request.Headers.TryGetValue("tokenId", out var headerValues))
            {
                
                string idFromHeader = headerValues.ToString();

                if(IsValid(idFromHeader, context))
                {
                    await _next(context);
                }
                else
                {
                    context.Response.StatusCode = 400; // Bad Request
                    await context.Response.WriteAsync("Invalid User");
                }
            }
            else
            {
                // Header not found
                context.Response.StatusCode = 400; // Bad Request
                await context.Response.WriteAsync("Please login");
            }
        }

        private bool IsValid(string id,HttpContext Context)
        {
            BooksContext dbContext = Context.RequestServices.GetService<BooksContext>();
            var result = dbContext.Registration.Where(e => e.Id.ToString() == id);

            if (result.Count() > 0)
            {
                return true;
            }
            return false;
        }

    }
    public static class IdValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseIdValidationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<IdValidationMiddleware>();
        }
    }
}
