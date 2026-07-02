using System.Data;
using Blood_Donation_Project.DonationModel;
using Microsoft.Data.SqlClient;

namespace Blood_Donation_Project.DonationModel
{
    public class DonationData
    {
        string connection = "Data Source=DESKTOP-LIP24RF\\SQLEXPRESS02;Initial Catalog=Blood_DonationDB;Integrated Security=True;TrustServerCertificate=True";

        // get by id
        public Donation GetDonationById(int id)
        {
            Donation d = null;

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = "select * from Donations where DonationId=@id";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    d = new Donation
                    {
                        DonationId = Convert.ToInt32(reader["DonationId"]),
                        DonorId = Convert.ToInt32(reader["DonorId"]),
                        PatientId = Convert.ToInt32(reader["PatientId"]),
                        DonationDate = Convert.ToDateTime(reader["DonationDate"])
                    };
                }
            }

            return d;
        }

        // GET ALL

        public List<Donation> GetDonations()
        {
            List<Donation> list = new List<Donation>();

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlDataAdapter da = new SqlDataAdapter("select * from Donations", con);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow r in dt.Rows)
                {
                    list.Add(new Donation
                    {
                        DonationId = Convert.ToInt32(r["DonationId"]),
                        DonorId = Convert.ToInt32(r["DonorId"]),
                        PatientId = Convert.ToInt32(r["PatientId"]),
                        DonationDate = Convert.ToDateTime(r["DonationDate"])
                    });
                }
            }

            return list;
        }




        // INSERT WITH VALIDATION
        public string InsertDonation(Donation d)
        {
            if (d == null)
                return "Invalid data";

            if (d.DonorId <= 0)
                return "Invalid Donor ID";

            if (d.PatientId <= 0)
                return "Invalid Patient ID";

            if (d.DonationDate == default)
                return "Donation Date is required";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"insert into Donations (DonorId,PatientId,DonationDate)
                                 values (@donor,@patient,@date)";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@donor", d.DonorId);
                cmd.Parameters.AddWithValue("@patient", d.PatientId);
                cmd.Parameters.AddWithValue("@date", d.DonationDate);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return "Donation inserted successfully";
        }

        // UPDATE
        public string UpdateDonation(Donation d)
        {
            if (d == null)
                return "Invalid data";

            if (d.DonationId <= 0)
                return "Invalid ID";

            using (SqlConnection con = new SqlConnection(connection))
            {
                string query = @"update Donations
                                 set DonorId=@donor,
                                     PatientId=@patient,
                                     DonationDate=@date
                                 where DonationId=@id";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@id", d.DonationId);
                cmd.Parameters.AddWithValue("@donor", d.DonorId);
                cmd.Parameters.AddWithValue("@patient", d.PatientId);
                cmd.Parameters.AddWithValue("@date", d.DonationDate);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Donation updated successfully" : "Donation not found";
            }
        }

        // DELETE
        public string DeleteDonation(int id)
        {
            if (id <= 0)
                return "Invalid ID";

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("delete from Donations where DonationId=@id", con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                int rows = cmd.ExecuteNonQuery();

                return rows > 0 ? "Donation deleted successfully" : "Donation not found";
            }
        }
    }
}