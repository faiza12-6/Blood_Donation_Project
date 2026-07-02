using Blood_Donation_Project.DonationModel;
using Microsoft.AspNetCore.Mvc;

namespace Blood_Donation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationController : ControllerBase
    {
        DonationData data = new DonationData();

        // get by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            var result = data.GetDonationById(id);

            if (result == null)
                return NotFound("Donation not found");

            return Ok(result);
        }

        // GET ALL
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(data.GetDonations());
        }

     


        // INSERT
        [HttpPost]
        public IActionResult Insert(Donation d)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (d.DonorId <= 0)
                return BadRequest("Invalid Donor ID");

            if (d.PatientId <= 0)
                return BadRequest("Invalid Patient ID");

            return Ok(data.InsertDonation(d));
        }

        // UPDATE
        [HttpPut]
        public IActionResult Update(Donation d)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (d.DonationId <= 0)
                return BadRequest("Invalid ID");

            return Ok(data.UpdateDonation(d));
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest("Invalid ID");

            return Ok(data.DeleteDonation(id));
        }
    }
}