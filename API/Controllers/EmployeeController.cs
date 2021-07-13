using API.Base;
using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        private IConfiguration _config;

        public EmployeeController(EmployeeRepository employeeRepository, IConfiguration configuration) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
            _config = configuration;
        }
        [HttpPost("/API/Employee/Auth")]
        public ActionResult Auth(LoginVM loginVM)
        {
            var result = employeeRepository.Auth(loginVM, _config);
            if (result.Token == null)
            {
                return BadRequest(result);
            }
            return Ok(result);

        }
    }
}
