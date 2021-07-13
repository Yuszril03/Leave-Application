using System;
using System.Collections.Generic;
using System.Linq;
namespace API.ViewModel
{
    public class RegisterVM
    {
        public string NIK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? ManagerId { get; set; }
        public int DepartmentId { get; set; }
        public string Password { get; set; }
        public int LeaveQuota { get; set; }
        public int LeaveStatus { get; set; }
    }
}
