using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Identity
{
    public class Address
    {
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Street { get; set; }
        public String City { get; set; }
        public String ZipCode { get; set; }
        [Required]
        public String AppUserId { get; set; }
        public AppUser AppUser { get; set; }

    }
}