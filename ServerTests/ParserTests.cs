using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using LockStepBlazor.Data.Services;
using Xunit;
using LockStepBlazor.Data.Models;
using System.Linq;
using System.Threading.Tasks;
// using System.Linq.Async;

namespace ServerTests
{
    public class ParserTests
    {
        List<string> rxCUIs => new List<string>() { "310964", "1113397", "1247756", "313992", "104895", "330765", "608930", "141962", "1161682", "800405" };
        //InteractionClient _client => new InteractionClient();
        StreamReader reader = new StreamReader(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"TestJsonText\MultiDrugString.txt"));
        [Fact]
        public void SeverityTest()
        {
            //var interactions = _client.GetInteractionList(rxCUIs);

            // var reader = new StreamReader(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"TestJsonText\MultiDrugString.txt"));
            var jstring = reader.ReadToEnd();
            var interactions = DrugInteractionParserAsync.ParseDrugInteractionsAsync(jstring);


            //Test for JAMIA interaction inclusion. All DrugBank interactions have "N/A" as severity
            Assert.True(interactions.ToListAsync().GetAwaiter().GetResult()
                            .SelectMany(x => x.DrugInteractionDetails
                                        .Select(o => o.Severity))
                                        .Any(s => s == "high"));
        }
        [Fact]
        public void FirstInteractionTest()
        {
            //var interactions = _client.GetInteractionList(rxCUIs);

            // var reader = new StreamReader(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"TestJsonText\MultiDrugString.txt"));
            var jstring = reader.ReadToEnd();
            var interactions = DrugInteractionParserAsync.ParseDrugInteractionsAsync(jstring);


            //Test for JAMIA interaction inclusion. All DrugBank interactions have "N/A" as severity
            Assert.Equal("Fentanyl 0.6 MG Oral Lozenge", interactions.ToListAsync().GetAwaiter().GetResult()
                            .First().MedicationPair.Item1.DisplayName);

        }


    }
}
