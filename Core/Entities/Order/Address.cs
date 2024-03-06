using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Address : BaseEntity
    {
        public Address()
        {
        }

        public Address(String firstName, string LastName, string City, string street, string zipCode)
        {
            this.FirstName = firstName;
            this.LastName = LastName;
            this.Street = street;
            this.ZipCode = zipCode;
            this.City = City;
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
    }
}