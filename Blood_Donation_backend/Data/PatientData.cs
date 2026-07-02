using Microsoft.Data.SqlClient;
using System.Data;
using Blood_Donation_Project.Model;

namespace Blood_Donation_Project.PatientModel
{
    public class PatientData
    {
        string connection = "Data Source=DESKTOP-LIP24RF\\SQLEXPRESS02;Initial Catalog=Blood_DonationDB;Integrated Security=True;TrustServerCertificate=True";

        // get by id

        public Patient GetPatientById(int id)
        {
            if (id <= 0)
                return null;

            Patient patient = null;

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = "SELECT * FROM Patients WHERE PatientId = @id";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    patient = new Patient
                    {
                        PatientId = Convert.ToInt32(reader["PatientId"]),
                        FullName = reader["FullName"].ToString(),
                        BloodType = reader["BloodType"].ToString(),
                        Phone = reader["Phone"].ToString()
                    };
                }
            }

            return patient;
        }

        // GET ALL
        public List<Patient> GetPatients()
        {
            List<Patient> list = new List<Patient>();

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlDataAdapter da = new SqlDataAdapter("select * from Patients", con);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow r in dt.Rows)
                {
                    list.Add(new Patient
                    {
                        PatientId = Convert.ToInt32(r["PatientId"]),
                        FullName = r["FullName"].ToString(),
                        BloodType = r["BloodType"].ToString(),
                        Phone = r["Phone"].ToString()
                    });
                }
            }

            return list;
        }

        // INSERT WITH VALIDATION
        public string InsertPatient(Patient p)
        {
            if (p == null)
                return "Invalid data";

            if (string.IsNullOrWhiteSpace(p.FullName))
                return "Full Name is required";

            if (string.IsNullOrWhiteSpace(p.BloodType))
                return "Blood Type is required";

            if (string.IsNullOrWhiteSpace(p.Phone))
                return "Phone is required";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"insert into Patients (FullName,BloodType,Phone)
                                 values (@name,@blood,@phone)";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@name", p.FullName);
                cmd.Parameters.AddWithValue("@blood", p.BloodType);
                cmd.Parameters.AddWithValue("@phone", p.Phone);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return "Patient inserted successfully";
        }

        // UPDATE WITH VALIDATION
        public string UpdatePatient(Patient p)
        {
            if (p == null)
                return "Invalid data";

            if (p.PatientId <= 0)
                return "Invalid ID";

            if (string.IsNullOrWhiteSpace(p.FullName))
                return "Full Name is required";

            if (string.IsNullOrWhiteSpace(p.BloodType))
                return "Blood Type is required";

            if (string.IsNullOrWhiteSpace(p.Phone))
                return "Phone is required";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"update Patients
                                 set FullName=@name,
                                     BloodType=@blood,
                                     Phone=@phone
                                 where PatientId=@id";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@id", p.PatientId);
                cmd.Parameters.AddWithValue("@name", p.FullName);
                cmd.Parameters.AddWithValue("@blood", p.BloodType);
                cmd.Parameters.AddWithValue("@phone", p.Phone);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Patient updated successfully" : "Patient not found";
            }
        }

        // DELETE
        public string DeletePatient(int id)
        {
            if (id <= 0)
                return "Invalid ID";

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("delete from Patients where PatientId=@id", con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Patient deleted successfully" : "Patient not found";
            }
        }
    }
}