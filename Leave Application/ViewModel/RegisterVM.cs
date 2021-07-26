using System;

namespace Leave_Application.ViewModel
{
    public class RegisterVM
    {
        public string NIK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public String Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? ManagerId { get; set; }
        public string departmentName { get; set; }
        public int LeaveQuota { get; set; }
        public int LeaveStatus { get; set; }
    }
}
