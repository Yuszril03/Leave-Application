using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class AccountRepository : GeneralRepository<MyContext, Account, string>
    {
        public readonly MyContext myContext1;
        public AccountRepository(MyContext myContext) : base(myContext)
        {
            this.myContext1 = myContext;
        }
    }
}
