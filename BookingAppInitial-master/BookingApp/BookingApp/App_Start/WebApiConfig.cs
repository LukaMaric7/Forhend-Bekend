using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using BookingApp.Models;

namespace BookingApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Accommodation>("OData");
            builder.EntitySet<AccommodationType>("AccommodationTypes");
            builder.EntitySet<Comment>("Comments");
            builder.EntitySet<Place>("Places");
            builder.EntitySet<Room>("Rooms");
            builder.EntitySet<AppUser>("AppUsers");
            builder.EntitySet<Region>("Regions");
            builder.EntitySet<RoomReservation>("RoomReservations");
            builder.EntitySet<Country>("Countries");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
			
			var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
			
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
			
			config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
    }
}
