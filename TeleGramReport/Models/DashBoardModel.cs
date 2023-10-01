using Newtonsoft.Json.Linq;

namespace TeleGramReport.Models
{
    public class DashBoardModel
    {
        public double Value { get; set; }
        public double EARN { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public DashBoardModel()
        {
           
        }
    }
}
