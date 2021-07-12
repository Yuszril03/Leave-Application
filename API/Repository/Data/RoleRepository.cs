using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class RoleRepository : GeneralRepository<MyContext, Role, int>
    {
        public readonly MyContext myContext1;
        public RoleRepository(MyContext myContext) : base(myContext)
        {
            this.myContext1 = myContext;
        }
    }
}
