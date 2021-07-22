using API.Base;
using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;
        public AccountController(AccountRepository repository) : base(repository)
        {
            this.accountRepository = repository;
        }

        [HttpPut("UpdateRoles")]
        public ActionResult UpdateRoles(UpdateRoleVM updateRoleVM)
        {
            var update = accountRepository.UpdateRoles(updateRoleVM);
            if (update > 0)
            {
                return Ok(new { status = HttpStatusCode.OK, result = update, message = "Success!" });
            }
            else
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, result = update, message = "Fail to Update!" });
            }
        }

        [HttpPut("ResetPassword")]
        public ActionResult ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            var response = accountRepository.ResetPassword(resetPasswordVM);
            if (response > 0)
            {
                var get = Ok(new { status = HttpStatusCode.OK, result = response, message = "Reset Password Success" });
                return get;
            }
            else
            {
                var get = BadRequest(new { status = HttpStatusCode.BadRequest, result = response, message = "Fail to Send Mail" });
                return get;
            }
        }

        [HttpPut("ResetLeave")]
        public ActionResult ResetLeave(ResetLeaveVM resetLeaveVM)
        {
            var response = accountRepository.ResetLeave(resetLeaveVM);
            if (response > 0)
            {
                var get = Ok(new { status = HttpStatusCode.OK, result = response, message = "Reset Leave Success" });
                return get;
            }
            else
            {
                var get = BadRequest(new { status = HttpStatusCode.BadRequest, result = response, message = "Fail" });
                return get;
            }
        }
    }
}
