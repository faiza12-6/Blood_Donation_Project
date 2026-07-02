using Blood_Donation_Project.DonorModel;
using Blood_Donation_Project.Model;
using Microsoft.AspNetCore.Mvc;

namespace Blood_Donation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        DonorData data = new DonorData();

        // get by id

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            var result = data.GetDonorById(id);

            if (result == null)
                return NotFound("Donor not found");

            return Ok(result);
        }

        // GET ALL
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(data.GetDonors());
        }

       

        // INSERT
        [HttpPost]
        public IActionResult Insert(Donor d)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(d.FullName))
                return BadRequest("Full Name is required");

            return Ok(data.InsertDonor(d));
        }

        // UPDATE
        [HttpPut]
        public IActionResult Update(Donor d)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (d.DonorId <= 0)
                return BadRequest("Invalid ID");

            return Ok(data.UpdateDonor(d));
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest("Invalid ID");

            return Ok(data.DeleteDonor(id));
        }
    }
}