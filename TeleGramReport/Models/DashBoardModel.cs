﻿using Newtonsoft.Json.Linq;
using System;

namespace TeleGramReport.Models
{
    public class DashBoardModel
    {
        public double Value { get; set; }
        public double EARN { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public DashBoardModel()
        {
           
        }
    }
}
