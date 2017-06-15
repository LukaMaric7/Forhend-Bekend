using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Range(0,5)]
        public int? Grade { get; set; }

        public string Text { get; set; }

        public Accommodation Accommodation { get; set; }
        
        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }

        public AppUser User { get; set; }
        

        [ForeignKey("User")]
        public int UserId { get; set; }
    }
}