using System.Threading.Tasks;
using MediatR;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Infrastructure;
using System.Collections.Generic;
using ReactTypescriptBP.Models;
using Hl7.Fhir.Rest;
using Hl7.Fhir.Model;

namespace LockStepBlazor.Data.Services
{
    public class PatientService : ServiceBase, IPatientService
    {
        private readonly IMediator mediator;

        public PatientListModel PatientList { get; set; }

        public PatientService(IMediator mediator)
        {
            this.mediator = mediator;
            PatientList =
                new PatientListModel(
                    new List<PatientModel>()
                    {
                        new PatientModel("0", "No Results Found", "")
                    }
                , "", "", "", "", 0);

        }

        public async virtual Task<ICachePatientBundle> SearchAsync(int limitTo, string firstName = null)
        {
            ICachePatientBundle patientBundle;
            patientBundle = await mediator.Send(new SearchPatient.Query()
            {
                LimitTo = limitTo,
                FirstName = firstName
            });
            if (patientBundle.Payload.Patients.Count == 0)
            {
                patientBundle = new SearchPatient.Model()
                {/*Bundle = new Bundle(),*/ Payload = PatientList };
                return patientBundle;
            }
            else
                return patientBundle;

        }
        public async Task<GetPatient.Model> GetAsync(string id)
        {

            return await mediator.Send(new GetPatient.Query()
            {
                PatientId = id
            }).ConfigureAwait(false);

        }

        public async Task<ICachePatientBundle> NavigateBundleAsync(Bundle bundle, PageDirection nav)
        {
            ICachePatientBundle patientBundle;
            patientBundle = await mediator.Send(new NavigateBundle.Query()
            {
                Bundle = bundle,
                Nav = PageDirection.Next
            }).ConfigureAwait(false);
            return patientBundle;
        }
        // if (!string.IsNullOrEmpty(term))
        // {
        //     term = term.ToLower();
        //     term = term.Trim();


        //     var queryNames = new SearchParams()
        //             .Where($"given={term}")
        //             .Where($"last={term}")
        //             .LimitTo(50);
        //     var searchCall = await client.SearchAsync<Patient>(queryNames);


        //     List<Patient> patients = new List<Patient>();
        //     while (searchCall != null)
        //     {
        //         foreach (var e in searchCall.Entry)
        //         {
        //             Patient p = (Patient)e.Resource;
        //             patients.Add(p);
        //         }
        //         searchCall = client.Continue(searchCall, PageDirection.Next);
        //     }
        //     return patients;
        // }

    }
}