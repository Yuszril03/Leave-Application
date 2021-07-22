using API.Context;
using API.Models;
using System.Collections;

namespace API.Repository.Data
{
    public class LeaveEmployeeRepository : GeneralRepository<MyContext, LeaveEmployee, int>
    {
        public readonly MyContext myContext;
        public LeaveEmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

              
    }
}
