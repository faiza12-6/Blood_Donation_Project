using System.Data;
using Blood_Donation_Project.Model;
using Microsoft.Data.SqlClient;

namespace Blood_Donation_Project.DonorModel
{
    public class DonorData
    {
        string connection = "Data Source=DESKTOP-LIP24RF\\SQLEXPRESS02;Initial Catalog=Blood_DonationDB;Integrated Security=True;TrustServerCertificate=True";


        // get by id
        public Donor GetDonorById(int id)
        {
            Donor donor = null;

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = "select * from Donors where DonorId=@id";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    donor = new Donor
                    {
                        DonorId = Convert.ToInt32(reader["DonorId"]),
                        FullName = reader["FullName"].ToString(),
                        BloodType = reader["BloodType"].ToString(),
                        Phone = reader["Phone"].ToString()
                    };
                }
            }

            return donor;
        }

        // GET ALL DONORS
        public List<Donor> GetDonors()
        {
            List<Donor> list = new List<Donor>();

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlDataAdapter da = new SqlDataAdapter("select * from Donors", con);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow r in dt.Rows)
                {
                    list.Add(new Donor
                    {
                        DonorId = Convert.ToInt32(r["DonorId"]),
                        FullName = r["FullName"].ToString(),
                        BloodType = r["BloodType"].ToString(),
                        Phone = r["Phone"].ToString()
                    });
                }
            }

            return list;
        }


        // INSERT WITH VALIDATION
        public string InsertDonor(Donor d)
        {
            if (d == null)
                return "Invalid data";

            if (string.IsNullOrWhiteSpace(d.FullName))
                return "Full Name is required";

            if (string.IsNullOrWhiteSpace(d.BloodType))
                return "Blood Type is required";

            if (string.IsNullOrWhiteSpace(d.Phone))
                return "Phone is required";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"insert into Donors (FullName,BloodType,Phone)
                                 values (@name,@blood,@phone)";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@name", d.FullName);
                cmd.Parameters.AddWithValue("@blood", d.BloodType);
                cmd.Parameters.AddWithValue("@phone", d.Phone);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return "Donor inserted successfully";
        }

        // UPDATE WITH VALIDATION
        public string UpdateDonor(Donor d)
        {
            if (d == null)
                return "Invalid data";

            if (d.DonorId <= 0)
                return "Invalid ID";

            if (string.IsNullOrWhiteSpace(d.FullName))
                return "Full Name is required";

            if (string.IsNullOrWhiteSpace(d.BloodType))
                return "Blood Type is required";

            if (string.IsNullOrWhiteSpace(d.Phone))
                return "Phone is required";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"update Donors
                                 set FullName=@name,
                                     BloodType=@blood,
                                     Phone=@phone
                                 where DonorId=@id";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@id", d.DonorId);
                cmd.Parameters.AddWithValue("@name", d.FullName);
                cmd.Parameters.AddWithValue("@blood", d.BloodType);
                cmd.Parameters.AddWithValue("@phone", d.Phone);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Donor updated successfully" : "Donor not found";
            }
        }

        // DELETE WITH VALIDATION
        public string DeleteDonor(int id)
        {
            if (id <= 0)
                return "Invalid ID";

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("delete from Donors where DonorId=@id", con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Donor deleted successfully" : "Donor not found";
            }
        }
    }
}