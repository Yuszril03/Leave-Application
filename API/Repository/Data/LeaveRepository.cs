using API.Context;
using API.Models;

namespace API.Repository.Data
{
    public class LeaveRepository : GeneralRepository<MyContext, Leave, int>
    {
        public readonly MyContext myContext;
        public LeaveRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
