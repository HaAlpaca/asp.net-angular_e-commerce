using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> OrderItems, string buyerEmail, string buyerPhone, Address shipToAddress, DeliveryMethod DeliveryMethod, decimal subTotal, string PaymentIntentId)
        {
            this.BuyerEmail = buyerEmail;
            this.BuyerPhone = buyerPhone;
            this.ShipToAddress = shipToAddress;
            this.OrderItems = OrderItems;
            this.DeliveryMethod = DeliveryMethod;
            this.SubTotal = subTotal;
            this.PaymentIntentId = PaymentIntentId;
        }
        public string BuyerEmail { get; set; }
        public string BuyerPhone { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public Address ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal SubTotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }
        public decimal GetTotal()
        {
            return SubTotal + DeliveryMethod.Price;
        }
    }
}