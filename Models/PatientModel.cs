using System;

namespace ReactTypescriptBP.Models
{

    public class PatientModel
    {
        public PatientModel(string id, string firstName, string lastName)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
            FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
            LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
        }

        public string Id { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }

    }
}