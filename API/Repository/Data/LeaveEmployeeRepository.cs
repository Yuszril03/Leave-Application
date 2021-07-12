using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class LeaveEmployeeRepository : GeneralRepository<MyContext, LeaveEmployee, int>
    {
        public readonly MyContext myContext1;
        public LeaveEmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext1 = myContext;
        }
    }
}
