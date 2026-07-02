using Blood_Donation_Project.Model;
using Blood_Donation_Project.UserModel;
using Microsoft.AspNetCore.Mvc;

namespace Blood_Donation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserData data = new UserData();

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(data.GetUsers());
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] Users login)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = data.GetUsers()
                .FirstOrDefault(u =>
                    u.UserName == login.UserName &&
                    u.Password == login.Password
                );

            if (user == null)
                return Unauthorized("Invalid username or password");

            return Ok(user);
        }
    }
}