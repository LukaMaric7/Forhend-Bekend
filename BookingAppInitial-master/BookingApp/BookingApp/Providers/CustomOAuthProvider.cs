using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BookingApp.Models;

namespace BookingApp.Providers
{
    public class CustomOAuthProvider : Microsoft.Owin.Security.OAuth.OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            var allowedOrigin = "*";

            BAContext baContext = new BAContext();

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
            context.OwinContext.Response.Headers.Add("Access-Control-Expose-Headers", new[] { "Role", "Id" });

            ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            BAIdentityUser user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.!!!!");
                return;
            }

            var userRole = user.Roles.First().RoleId;
            var role = baContext.Roles.FirstOrDefault(r => r.Id == userRole);

            if (role.Name.Equals("Admin"))
            {
                context.OwinContext.Response.Headers.Add("Role", new[] { "Admin" });
            }
            else if (role.Name.Equals("Manager"))
            {
                context.OwinContext.Response.Headers.Add("Role", new[] { "Manager" });
            }
            else
            {
                context.OwinContext.Response.Headers.Add("Role", new[] { "AppUser" });
            }
            context.OwinContext.Response.Headers.Add("Id", new[] { user.appUserId.ToString() } );

            //if (!user.EmailConfirmed)
            //{
            //    context.SetError("invalid_grant", "AppUser did not confirm email.");
            //    return;
            //}

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");

            var ticket = new AuthenticationTicket(oAuthIdentity, null);

            context.Validated(ticket);

        }
    }
}