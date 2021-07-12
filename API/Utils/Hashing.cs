namespace API.Utils
{
    public class Hashing
    {
        internal static string GetSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }
        internal static string Hash(string pass)
        {
            return BCrypt.Net.BCrypt.HashPassword(pass, GetSalt());
        }
        internal static bool Validate(string pass, string hashPass)
        {
            return BCrypt.Net.BCrypt.Verify(pass, hashPass);
        }
    }
}
