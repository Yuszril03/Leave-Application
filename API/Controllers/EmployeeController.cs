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

        [HttpPost("CheckPassword")]
        public ActionResult CheckPassword(ChangePassword changePassword)
        {
            var result = employeeRepository.CheckPassword(changePassword);
            if (result == 0)
            {
                return BadRequest(result);
            }
            return Ok(result);

        }

        [HttpPost("UpdatePassword")]
        public ActionResult UpdatePassword(UpdatePassword updatePassword)
        {
            var result = employeeRepository.UpdatePassword(updatePassword);
            if (result == 0)
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

        [HttpGet("GetAllLeaveEmployee/{nik}")]
        public ActionResult GetAllLeaveEmployee(string nik)
        {
            var get = employeeRepository.GetAllLeaveEmployee(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }

        [HttpGet("GetOneLeaveEmployee/{id}")]
        public ActionResult GetOneLeaveEmployee(int id)
        {
            var get = employeeRepository.GetOneLeaveEmployee(id);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }

        [HttpGet("CheckLeave/{nik}")]
        public ActionResult CheckLeave(string nik)
        {
            var get = employeeRepository.CheckLeave(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }

        [HttpGet("GetEmployeesEachManager/{nik}")]
        public ActionResult GetEmployeesEachManager(string nik)
        {
            var get = employeeRepository.GetEmployeesEachManager(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }
        [HttpGet("GetOneEmployeesEachManager/{nik}")]
        public ActionResult GetOneEmployeesEachManager(string nik)
        {
            var get = employeeRepository.GetOneEmployeesEachManager(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }
        [HttpGet("GetAccountLEaveEmployee/{nik}")]
        public ActionResult GetAccountLEaveEmployee(string nik)
        {
            var get = employeeRepository.GetAccountLEaveEmployee(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }

        [HttpGet("GetDataStatusLeave/{nik}")]
        public ActionResult GetDataStatusLeave(string nik)
        {
            var get = employeeRepository.GetDataStatusLeave(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }

        [HttpGet("GetDataYearLeave/{nik}")]
        public ActionResult GetDataYearLeave(string nik)
        {
            var get = employeeRepository.GetDataYearLeave(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
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
        [Authorize(Roles = "Admin, Employee")]
        [HttpGet("GetEmployees/{nik}")]
        public ActionResult GetEmployees(string nik)
        {
            var get = employeeRepository.GetEmployees(nik);
            if (get != null)
            {
                return Ok(get);
            }
            return BadRequest(get);
        }
    }
}
