using System;

namespace ReactTypescriptBP.Models
{

    public class PatientModel
    {
        public PatientModel(string id, string first, string last)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
            First = first ?? throw new ArgumentNullException(nameof(first));
            Last = last ?? throw new ArgumentNullException(nameof(last));
        }

        public string Id { get; private set; }
        public string First { get; private set; }
        public string Last { get; private set; }

    }
}