using API.Models;
using Leave_Application.Base;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Mvc;

namespace Leave_Application.Controllers
{
    //[Authorize(Roles ="Employee, Manager")]
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public IActionResult Index()
        {
            return View();
        }
       

       
    }
}
