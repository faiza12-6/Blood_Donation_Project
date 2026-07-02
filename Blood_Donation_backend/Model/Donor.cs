using System.ComponentModel.DataAnnotations;

namespace Blood_Donation_Project.Model
{
    public class Donor
    {
        public int DonorId { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Full Name must be between 2 and 100 characters")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Blood Type is required")]
        [RegularExpression("^(A|B|AB|O)[+-]$", ErrorMessage = "Blood Type must be one of A+, A-, B+, B-, AB+, AB-, O+, O-")]
        public string BloodType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone is required")]
        [Phone(ErrorMessage = "Invalid phone number format")]
        public string Phone { get; set; } = string.Empty;
    }
}
