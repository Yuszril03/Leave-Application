using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leave_Application.ViewModel
{
    public class LeaveEmployeeVM
    {
        public int NoLeave { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }
        public string Attachment { get; set; }
        public Status Status { get; set; }
        public string nik { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentName { get; set; }
        public string LeaveName { get; set; }
        public string LeaveType { get; set; }
    }
}
