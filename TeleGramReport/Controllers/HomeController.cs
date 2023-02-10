using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

		public IActionResult Dashboard()
		{
			return View();
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
		public async Task<JsonResult> GetCT1(double gr, string type)
		{
			
			var re = await _dp.QueryAsync<dynamic>("telegram..NumbyType", commandType: System.Data.CommandType.StoredProcedure, new
			{
				Type = type,
				GroupID = gr,
				
			});

			return Json(re);
		}
		public async Task<JsonResult> Getfilter()
		{

			var result = await _dp.QueryAsync<dynamic>("telegram..GetFilter",commandType: System.Data.CommandType.StoredProcedure);	
			return Json(result);
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
