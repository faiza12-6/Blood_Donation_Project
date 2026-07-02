using Microsoft.Data.SqlClient;
using System.Data;
using Blood_Donation_Project.Model;

namespace Blood_Donation_Project.UserModel
{
    public class UserData
    {

        
        string connection = "Data Source=DESKTOP-LIP24RF\\SQLEXPRESS02;Initial Catalog=Blood_DonationDB;Integrated Security=True;TrustServerCertificate=True";
        public List<Users> GetUsers()
        {
            List<Users> Users = new List<Users>();

            using (SqlConnection cnn = new SqlConnection(connection))
            {
                string query = "SELECT * FROM Users";

                SqlDataAdapter da = new SqlDataAdapter(query, cnn);

                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow dr in dt.Rows)
                {
                    Users.Add(new Users
                    {
                        UserName = dr["UserName"].ToString(),
                        Password = dr["Password"].ToString(),
                    });
                }
            }

            return Users;
        }
    }
}