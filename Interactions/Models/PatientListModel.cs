using System;
using System.Collections.Generic;

namespace ReactTypescriptBP.Models
{

    public record PatientListModel
    {
        public PatientListModel(List<PatientModel> patients, string firstLink, string lastLink, string nextLink, string previousLink, int total)
        {
            Patients = patients ?? new List<PatientModel>();
            FirstLink = firstLink ?? "";
            LastLink = lastLink ?? "";
            NextLink = nextLink ?? "";
            PreviousLink = previousLink ?? "";
            Total = total;
        }
        public PatientListModel()
        {
            
        }

        public List<PatientModel> Patients { get; set; }
        public string FirstLink { get; set; }
        public string LastLink { get; set; }
        public string NextLink { get; set; }
        public string PreviousLink { get; set; }
        public int Total { get; set; }

    }
}
