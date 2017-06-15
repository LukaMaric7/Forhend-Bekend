using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservation
    {
        public int Id { get; set; }
        public Room Room { get; set; }
        
        [ForeignKey("Room")]
        public int RoomId { get; set; }

        public bool Canceled { get; set; }

        public AppUser User { get; set; }
        
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        [Timestamp]
        public byte[] TimeStamp { get; set; }

    }
}