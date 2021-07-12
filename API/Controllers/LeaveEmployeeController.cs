using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveEmployeeController : BaseController<LeaveEmployee, LeaveEmployeeRepository, int>
    {
        LeaveEmployeeRepository leaveEmployeeRepository;

        public LeaveEmployeeController(LeaveEmployeeRepository leaveEmployeeRepository) : base(leaveEmployeeRepository)
        {
            this.leaveEmployeeRepository = leaveEmployeeRepository;
        }
    }
}
