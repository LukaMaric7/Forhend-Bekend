using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Timers;
using BookingApp.Models;

namespace BookingApp.Hubs
{
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
        private static Timer t = new Timer();
        private static BAContext db = new BAContext();

        public void AddToGroup(int id, string role)
        {
            if (role.Equals("Admin"))
            {
                Groups.Add(Context.ConnectionId, "Admins");
                
                Notify_NotApprovedAccommodation(Context.ConnectionId);
            }
            else if(role.Equals("Manager"))
            {
                Groups.Add(Context.ConnectionId, id.ToString());
            }
        }

        public static void Notify_NewAccommodationAdded(int id)
        {
            hubContext.Clients.Group("Admins").newAddommodationAddedNotification(id);
        }

        public static void Notify_NotApprovedAccommodation(string connectionId)
        {
            int notApproved = db.Accommodations.Where(o => o.Approved.Equals(false)).Count();
            if (!connectionId.Equals(""))
            {
                hubContext.Clients.Client(connectionId).notApprovedAccommodationNotification(notApproved);
            }
            else
            {
                hubContext.Clients.Group("Admins").notApprovedAccommodationNotification(notApproved);
            }
        }

        public static void Notify_AccommodationApproved(string userId, int accommodationId)
        {
            hubContext.Clients.Group(userId).accommodationApproved(accommodationId);
        }

        public void GetTime()
        {
            Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }

        public void TimeServerUpdates()
        {
            t.Interval = 1000;
            t.Start();
            t.Elapsed += OnTimedEvent;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void StopTimeServerUpdates()
        {
            t.Stop();
        }

        public override Task OnConnected()
        {
            //Ako vam treba pojedinacni User
            //var identityName = Context.User.Identity.Name;

           

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Add(Context.ConnectionId, "Admins");
            //}

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Groups.Remove(Context.ConnectionId, "Admins");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Remove(Context.ConnectionId, "Admins");
            //}

            return base.OnDisconnected(stopCalled);
        }
    }
}