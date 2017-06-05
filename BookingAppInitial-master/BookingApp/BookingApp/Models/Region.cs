using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Region
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        public Country Country { get; set; }

        [Required]
        [ForeignKey("Country")]
        public int CountryId { get; set; }

        public List<Place> Places { get; set; }
    }
}