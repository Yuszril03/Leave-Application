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
    public class LeaveController : BaseController<Leave, LeaveRepository, int>
    {
        private LeaveRepository leaveRepository;

        public LeaveController(LeaveRepository leaveRepository) : base(leaveRepository)
        {
            this.leaveRepository = leaveRepository;
        }
    }
}
