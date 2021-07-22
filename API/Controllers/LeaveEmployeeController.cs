using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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

        [HttpGet("GetLeaveEmployees/{id}")]
        public ActionResult GetLeaveEmployees(int id)
        {
            var get = leaveEmployeeRepository.GetLeaveEmployee(id);
            if (get != null)
            {
                return Ok(get);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = get, message = "Data tidak tersedia" });
            }
        }
    }
}
