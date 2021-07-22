using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Utils
{
    public class GUID
    {
        internal static string NewGUID()
        {
            Guid guid = Guid.NewGuid();
            return guid.ToString();
        }
    }
}
