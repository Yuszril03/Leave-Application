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

        [HttpPost("Register")]
        public ActionResult Register(RegisterVM registerVM)
        {
            var result = employeeRepository.Register(registerVM);
            if (result > 1)
            {
                var get = Ok(new { status = HttpStatusCode.OK, result = result, message = "Berhasil di Registrasi" });
                return get;
            }
            else if (result == 1)
            {
                var get = BadRequest(new { status = HttpStatusCode.BadRequest, result = result, message = "Email sudah digunakan" });
                return get;
            }
            else
            {
                var get = BadRequest(new { status = HttpStatusCode.BadRequest, result = result, message = "NIK sudah digunakan" });
                return get;
            }
        }
        [Authorize(Roles = "Admin, Employee")]
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
