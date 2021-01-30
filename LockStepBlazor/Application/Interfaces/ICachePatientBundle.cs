using Hl7.Fhir.Model;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;

namespace LockStepBlazor.Application.Interfaces
{
    public interface ICachePatientBundle
    {
        public Bundle Bundle { get; set; }
        public PatientListModel Payload { get; set; }
    }
}