namespace Leave_Application.Models
{
    public class Employees
    {
        public string NIK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? ManagerId { get; set; }
        public string DepartmentName { get; set; }
        public int LeaveQuota { get; set; }
        public int LeaveStatus { get; set; }
    }
}
