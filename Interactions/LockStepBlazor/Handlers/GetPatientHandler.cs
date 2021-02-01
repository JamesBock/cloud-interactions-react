using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Hl7.Fhir.Rest;
using Hl7.Fhir.Model;
using LockStepBlazor.Data.Models;
using LockStepBlazor.Application;

namespace LockStepBlazor.Handlers
{
    public class GetPatientHandler : GetPatient.IHandler
    {
        private readonly FhirClient client;

        public GetPatientHandler(FhirClient client)
        {
            this.client = client;
            
        }
    
        public async Task<GetPatient.Model> Handle(GetPatient.Query request, CancellationToken cancellationToken)
        {
            var qResult = await client.ReadAsync<Patient>($"Patient/{request.PatientId}");
           
            //Create map from FHIR Patient to your Patient.
            //Decided to see what it would be like if my Patient type inheirited FHIRs. 
            var modelPatient = new LockStepPatient()
            {
                FhirPatient = qResult,
                LastName = qResult.Name[0].Family,
            };
            modelPatient.GivenNames.AddRange(qResult.Name.SelectMany(n => n.GivenElement.Select(nm => nm.Value)));
            modelPatient.DateOfBirth = qResult.BirthDateElement.ToDateTimeOffset();
            return new GetPatient.Model() { QueriedPatient = modelPatient };
        }

    }
}
