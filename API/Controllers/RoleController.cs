using API.Base;
using API.Models;
using API.Repository.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseController<Role, RoleRepository, int>
    {
        private readonly RoleRepository roleRepository;

        public RoleController(RoleRepository roleRepository) : base(roleRepository)
        {
            this.roleRepository = roleRepository;
        }
    }
}
