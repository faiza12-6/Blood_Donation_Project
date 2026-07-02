using System.ComponentModel.DataAnnotations;

namespace Blood_Donation_Project.DonationModel
{
    public class Donation
    {
        public int DonationId { get; set; }

        [Required(ErrorMessage = "Donor ID is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Donor ID must be a valid positive number")]
        public int DonorId { get; set; }

        [Required(ErrorMessage = "Patient ID is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be a valid positive number")]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Donation Date is required")]
        public DateTime DonationDate { get; set; }
    }
}
