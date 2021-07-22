using API.Models;
using Leave_Application.Base;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leave_Application.Controllers.Data
{
    public class LeaveController : BaseController<Leave, LeaveRepository, int>
    {
        private readonly LeaveRepository leaveRepository;

        public LeaveController(LeaveRepository leaveRepository) : base(leaveRepository)
        {
            this.leaveRepository = leaveRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
