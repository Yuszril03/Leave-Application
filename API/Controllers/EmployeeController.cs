using API.Base;
using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net;

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

        [HttpPost("Auth")]
        public ActionResult Auth(LoginVM loginVM)
        {
            var result = employeeRepository.Auth(loginVM, _config);
            if (result.Token == null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Register")]
        public ActionResult Register(RegisterVM registerVM)
        {
            var result = employeeRepository.Register(registerVM);
            if (result.Result <= 1)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetEmployees")]
        public ActionResult GetEmployees()
        {
            var get = employeeRepository.GetEmployees();
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }
    }
}
