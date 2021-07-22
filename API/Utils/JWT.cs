using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Utils
{
    public class JWT
    {
        private IConfiguration _config;
        public JWT(IConfiguration config)
        {
            _config = config;
        }
        public string GetJWT(string nik, List<string> role, string name)
        {
           
            var claims = new List<Claim>();
            string roles = string.Join(",", role);
            claims.Add(new Claim("Name",name));
            claims.Add(new Claim("NIK", nik));

            foreach (var item in role)
            {
                claims.Add(new Claim("role", item));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
