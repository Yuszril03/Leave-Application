using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : BaseController<Department, DepartmentRepository, int>
    {
        private readonly DepartmentRepository departmentRepository;
        public DepartmentController(DepartmentRepository repository) : base(repository)
        {
            this.departmentRepository = repository;
        }
    }
}
