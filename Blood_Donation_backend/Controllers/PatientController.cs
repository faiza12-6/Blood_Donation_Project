using Microsoft.AspNetCore.Mvc;
using Blood_Donation_Project.PatientModel;
using Blood_Donation_Project.Model;

namespace Blood_Donation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        PatientData data = new PatientData();

        // get by id

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            var result = data.GetPatientById(id);

            if (result == null)
                return NotFound("Patient not found");

            return Ok(result);
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetPatients()
        {
            return Ok(data.GetPatients());
        }

        
        // INSERT
        [HttpPost]
        public IActionResult Insert(Patient p)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(p.FullName))
                return BadRequest("Full Name is required");

            return Ok(data.InsertPatient(p));
        }

        // UPDATE
        [HttpPut]
        public IActionResult Update(Patient p)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (p.PatientId <= 0)
                return BadRequest("Invalid ID");

            return Ok(data.UpdatePatient(p));
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest("Invalid ID");

            return Ok(data.DeletePatient(id));
        }
    }
}