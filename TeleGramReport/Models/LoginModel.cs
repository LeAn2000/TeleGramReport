using System;

namespace TeleGramReport.Models
{
	public class LoginModel
	{
		public string username { get; set; }
		public string password { get; set; }

		public LoginModel(string username, string password)
		{
			this.username = username;
			this.password = password;
		}



	}
	public class MytokenModel
	{
		public string username { get; set; }
		public string token { get; set; }
		public DateTime expiredtime { get; set; }

		public MytokenModel(string username, string token, DateTime expiredtime)
		{
			this.username = username;
			this.token = token;
			this.expiredtime = expiredtime;
		}
	}

	public class InsertGiftModel
	{
		public string Location { get; set; }
		public string Type { get; set; }
		public string Num  { get; set; }

		public InsertGiftModel(string location, string type, string num)
		{
			Location = location;
			Type = type;
			Num = num;
		}

		public InsertGiftModel()
		{
		}
	}
}
