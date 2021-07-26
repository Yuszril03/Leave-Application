using API.Models;
using Leave_Application.Base;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Mvc;

namespace Leave_Application.Controllers.Data
{
    public class LeaveEmployeeController : BaseController<LeaveEmployee, LeaveEmployeeRepository, int>
    {
        private LeaveEmployeeRepository leaveEmployeeRepository;

        public LeaveEmployeeController(LeaveEmployeeRepository leaveEmployeeRepository) : base(leaveEmployeeRepository)
        {
            this.leaveEmployeeRepository = leaveEmployeeRepository;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
