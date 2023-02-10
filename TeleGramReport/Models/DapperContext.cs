using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace TeleGramReport.Models
{
    public class DapperContext
    {
        private readonly string _connectionString;

        public DapperContext(string connectionString)
        {
            _connectionString = connectionString;
          
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
        public async Task<T> FirstOrDefaultAsync<T>(string sp, object parms, CommandType commandType)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            return await db.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
        }

        public async Task<dynamic> QueryAsync<T>(string sp, CommandType commandType, object parms=null)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            var result = await db.QueryAsync<T>(sp, parms, commandType: commandType);
            return result.ToList();
        }
    }

}
