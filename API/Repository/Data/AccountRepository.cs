using API.Context;
using API.Models;
using API.Utils;
using API.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace API.Repository.Data
{
    public class AccountRepository : GeneralRepository<MyContext, Account, string>
    {
        public readonly MyContext myContext;
        public AccountRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public int UpdateRoles(UpdateRoleVM updateRoleVM)
        {
            if (updateRoleVM.NIK != "")
            {
                var account = myContext.Accounts.Where(e => e.NIK == updateRoleVM.NIK).Include(p => p.Roles).FirstOrDefault<Account>();
                var manager = myContext.Roles.Single(r => r.RoleId == 2);
                var admin = myContext.Roles.Single(r => r.RoleId == 3);

                var rolesToRemoveManager = account.Roles.FirstOrDefault(r => r.RoleId == 2);
                if (rolesToRemoveManager != null)
                {
                    var rolesToRemove = account.Roles.Single(x => x.RoleId == 2);
                    account.Roles.Remove(rolesToRemove);
                }

                var rolesToRemoveAdmin = account.Roles.FirstOrDefault(r => r.RoleId == 3);
                if (rolesToRemoveAdmin != null)
                {
                    var rolesToRemove = account.Roles.Single(x => x.RoleId == 3);
                    account.Roles.Remove(rolesToRemove);
                }

                switch (updateRoleVM.Condition)
                {
                    case 1:
                        account.Roles.Add(manager);
                        break;
                    case 2:
                        account.Roles.Add(admin);
                        break;
                    case 3:
                        account.Roles.Add(manager);
                        account.Roles.Add(admin);
                        break;
                    default:
                        break;
                }
                return myContext.SaveChanges();
            }
            return 0;
        }

        public int ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            var find = myContext.Employees
                .Where(e => e.Email == resetPasswordVM.email).FirstOrDefault<Employee>();
            if (find != null)
            {
                string guid = GUID.NewGUID();

                Account account = new Account
                {
                    NIK = find.Account.NIK,
                    Password = Hashing.Hash(guid),
                    LeaveQuota = find.Account.LeaveQuota,
                    LeaveStatus = find.Account.LeaveStatus
                };

                Mailing.SendPasswordMail(resetPasswordVM.email, guid, find.FirstName);
                return Update(account, account.NIK);
            }
            else
            {
                return 0;
            }
        }

        public int ResetLeave(ResetLeaveVM resetLeaveVM)
        {
            var accounts = from ac in myContext.Accounts select ac;
            foreach (var acc in accounts)
            {
                acc.LeaveQuota += resetLeaveVM.LeaveQuota;
            }
            return myContext.SaveChanges();
        }
    }
}
