using System;
using System.Collections.Generic;

namespace ReactTypescriptBP.Models
{

    public record PatientListModel
    {
        public PatientListModel(List<PatientModel> patients, string firstLink, string lastLink, string nextLink, string previousLink)
        {
            Patients = patients ?? throw new ArgumentNullException(nameof(patients));
            FirstLink = firstLink ?? throw new ArgumentNullException(nameof(firstLink));
            LastLink = lastLink ?? throw new ArgumentNullException(nameof(lastLink));
            NextLink = nextLink ?? throw new ArgumentNullException(nameof(nextLink));
            PreviousLink = previousLink ?? throw new ArgumentNullException(nameof(previousLink));
        }

        public List<PatientModel> Patients { get; set; }
        public string FirstLink { get; set; }
        public string LastLink { get; set; }
        public string NextLink { get; set; }
        public string PreviousLink { get; set; }

    }
}
