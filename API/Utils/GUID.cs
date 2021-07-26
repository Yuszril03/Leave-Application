using System;

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
