using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TeleGramReport.Models;
using TeleGramReport.Services;

namespace TeleGramReport.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
		private readonly DapperContext _dp;


		public HomeController(ILogger<HomeController> logger, DapperContext dp)
		{
			_logger = logger;
			_dp = dp;

		}






		public async Task<IActionResult> Index()
		{
			//Adduser(new LoginModel("tony", "12345"));
			var token = Get("token");
			if (string.IsNullOrEmpty(token))
				return View();

			var res = await CheckToken(token);
			if (res > 0)
			{

				return RedirectToAction("Dashboard");

			}
			return View();

		}


		public IActionResult DashBoard()
		{
			return View();
		}


		[HttpPost]
		public async Task<IActionResult> Login(string username, string password)
		{

			var acc = new LoginModel(username, password);
			var check = await LoginAccess(acc);
			if (check > 0)
			{
				var token = Ultis.GenerateToken();
				var session = new MytokenModel(username, token, DateTime.Now.AddHours(5));
				Addsession(session);
				Set("username", username, null);
				Set("token", token, null);
				ViewBag.logfail = "";
				return RedirectToAction("Dashboard");
			}
			ViewBag.logfail = "* Tài khoản hoặc mặt khẩu chưa đúng";
			return View("Index");

		}

		[HttpPost]
		public async Task<JsonResult> InsertGift(string num1,
			string num2,
			string num3,
			string num4,
			string num5,
			string num6,
			string num7,
			string num8,
			string num9,
			string num10,
			string num11,
			string num12,
			string num13,
			string num14,
			string num15,
			string num16,
			string num17,
			string num18,
			string num19,
			string num20,
			string num21,
			string num22,
			string num23,
			string num24,
			string num25,
			string num26,
			string num27
			)
		{
			var listnum = new List<string>();
			listnum.Add(num1);
			listnum.Add(num2);
			listnum.Add(num3);
			listnum.Add(num4);
			listnum.Add(num5);
			listnum.Add(num6);
			listnum.Add(num7);
			listnum.Add(num8);
			listnum.Add(num9);
			listnum.Add(num10);
			listnum.Add(num11);
			listnum.Add(num12);
			listnum.Add(num13);
			listnum.Add(num14);
			listnum.Add(num15);
			listnum.Add(num16);
			listnum.Add(num17);
			listnum.Add(num18);
			listnum.Add(num19);
			listnum.Add(num20);
			listnum.Add(num21);
			listnum.Add(num22);
			listnum.Add(num23);
			listnum.Add(num24);
			listnum.Add(num25);
			listnum.Add(num26);
			listnum.Add(num27);

			foreach (var x in listnum)
			{
				if (string.IsNullOrEmpty(x))
					return Json("Bạn chưa điền tất cả các ô");
			}

			List<InsertGiftModel> list = new List<InsertGiftModel>();
			for (int i = 0; i<27;i++)
			{
				var model = new InsertGiftModel();
				if (i == 0)
				{
					model = new InsertGiftModel("", "d", listnum[i]);
					
				}
				else

					model = new InsertGiftModel("", "", listnum[i]);
				list.Add(model);
			}

			string json = JsonConvert.SerializeObject(list);
			try
			{
				await Insert(json, "telegram..InsertGift");
				return Json("Cập nhật thành công");

			}
			catch {
				return Json("Cập nhật Thất bại");

			}

		}

		[HttpPost]
		public async Task<string> InsertQuota(string json, string sp)
		{
			try
			{
				await Insert(json, sp);
				return "Cập nhật thành công";
			}
			catch(Exception e)
			{
				return e.Message;
			}
			
		}

		[HttpPost]
		public async Task<string> AddSalaryByGroup( string gr,string json)
		{
			try
			{
				var re = await _dp.QueryAsync<dynamic>("telegram..AddSalaryByGroup", commandType: System.Data.CommandType.StoredProcedure, new
				{
					GroupID = gr,
					Json = json
				});
				return "Cập nhật thành công";
			}
			catch (Exception e)
			{
				return e.Message;
			}

		}

		public async Task<JsonResult> QuotaReport(string gr)
		{
			var re = await _dp.QueryAsync<dynamic>("telegram..QuotaReport", commandType: System.Data.CommandType.StoredProcedure, new
			{
				GroupID = gr
			});

			return Json(re);
		}

		public async Task<JsonResult> HHReport(string gr)
		{
			var re = await _dp.QueryAsync<dynamic>("telegram..ListSalaryByGroup", commandType: System.Data.CommandType.StoredProcedure, new
			{
				GroupID = gr
			});

			return Json(re);
		}
		public async Task Insert(string json, string spname)
		{

			var re = await _dp.QueryAsync<dynamic>(spname, commandType: System.Data.CommandType.StoredProcedure, new
			{
				Json = json
			});
		}
	

		public async Task<JsonResult> GetTH(double gr, string date)
		{

			var re = await _dp.QueryAsync<dynamic>("telegram..SalarybyGroup", commandType: System.Data.CommandType.StoredProcedure, new
			{
				GroupID = gr,
				Date = date
			});

			return Json(re);
		}
		public async Task<JsonResult> GetCT(double gr, string date)
		{

			var re = await _dp.QueryAsync<dynamic>("telegram..SalarybyGroupDetail", commandType: System.Data.CommandType.StoredProcedure, new
			{
				GroupID = gr,
				Date = date
			});

			return Json(re);
		}
		public async Task<JsonResult> GetCT1(double gr, string type, string Date, int flag)
		{

			var re = await _dp.QueryAsync<dynamic>("telegram..NumbyType", commandType: System.Data.CommandType.StoredProcedure, new
			{
				Type = type,
				GroupID = gr,
				Date=Date,
				flag = flag
			});

			return Json(re);
		}
		public async Task<JsonResult> Getfilter()
		{

			var result = await _dp.QueryAsync<dynamic>("telegram..GetFilter", commandType: System.Data.CommandType.StoredProcedure);
			return Json(result);
		}
		
		public async Task<JsonResult> GiftReport(string location, string Date)
		{
			var re = await _dp.QueryAsync<dynamic>("telegram..GiftReport", commandType: System.Data.CommandType.StoredProcedure, new
			{
				location = location,
				Date = Date
			}); ;

			return Json(re);
		}

		public string Get(string key)
		{
			return Request.Cookies[key];
		}

		public void Set(string key, string value, int? expireTime)
		{
			CookieOptions option = new CookieOptions();
			if (expireTime.HasValue)
				option.Expires = DateTime.Now.AddHours(expireTime.Value);
			else
				option.Expires = DateTime.Now.AddHours(12);
			Response.Cookies.Append(key, value, option);
		}

		public void Remove(string key)
		{
			Response.Cookies.Delete(key);
		}

		public void Adduser(LoginModel a)
		{
			var pass = Ultis.Encrypt(a.password);
			var result = _dp.QueryAsync<dynamic>("telegram..AddUser", commandType: System.Data.CommandType.StoredProcedure, new
			{
				username = a.username,
				password = pass
			});
		}

		public async Task<int> LoginAccess(LoginModel a)
		{
			var pass = Ultis.Encrypt(a.password);
			var result = await _dp.FirstOrDefaultAsync<int>("telegram..LoginAcc", new
			{
				username = a.username,
				password = pass
			}, commandType: System.Data.CommandType.StoredProcedure);
			return result;
		}

		public void Addsession(MytokenModel a)
		{

			var result = _dp.QueryAsync<dynamic>("telegram..LoginSession", commandType: System.Data.CommandType.StoredProcedure, new
			{
				username = a.username,
				token = a.token,
				expiredtime = a.expiredtime
			});
		}
		public async Task<int> CheckToken(string token)
		{

			var result = await _dp.FirstOrDefaultAsync<int>("telegram..CheckToken", new
			{
				token = token
			}, commandType: System.Data.CommandType.StoredProcedure);
			return result;
		}


	}
}
