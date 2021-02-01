using Hl7.Fhir.Model;
using LockStepBlazor.Data.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Hl7.Fhir.Rest;
using LockStepBlazor.Application.Interfaces;
using LockStepBlazor.Application.Fhir.Queries;
using LockStepBlazor.Application.Extensions;
using LockStepBlazor.Application;
using LockStepBlazor.Application.DrugInteractions;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Services;
using Task = System.Threading.Tasks.Task;

namespace ServerTests
{
    public class MockPatientDataService : IPatientDataService
    {
        private readonly ILogger<PatientDataService> logger;
        private readonly IMediator mediator;

        public IGetFhirMedications.Model MedDTOs { get; set; }

        public MockPatientDataService()
        {
          
        }

        public async Task<IGetFhirMedications.Model> GetMedicationRequestsAsync(string id)
        {

            return MedDTOs;


        }

        public async Task<GetRxCuiListAPI.Model> GetRxCuisAsync(List<MedicationConceptDTO> requests)
        {
            return await mediator.Send(new GetRxCuiListAPI.Query()
            {
                Requests = requests
            }).ConfigureAwait(false);

        }

        /// <summary>
        /// Using an extension method in the body of this method to delegate the creation of the Query to the extension method. Really unsure if this is beneficial
        /// </summary>
        /// <param name="medDtos"></param>
        /// <returns></returns>
        public async Task<IGetDrugInteractions.Model> GetDrugInteractionListAsync(List<string> medDtos)
        {
            return await mediator.GetDrugInteractions(medDtos).ConfigureAwait(false);
        }
        public async Task<ParseInteractions.Model> ParseInteractionsAsync(string jstring, List<MedicationConceptDTO> meds)
        {
            return await mediator.Send(new ParseInteractions.Query()
            {
                Jstring = jstring,
                Meds = meds
            }).ConfigureAwait(false);

        }

        //public async IAsyncEnumerable<DrugInteraction> GetDrugInteractionList(IEnumerable<string> drugs)
        //{
        //    var apiBase = new Uri("https://rxnav.nlm.nih.gov/REST/interaction/");
        //    var restClient = new HttpClient() { BaseAddress = apiBase };

        //}

        public async Task<GetPatient.Model> GetPatientAsync(string id)
        {
            return await mediator.Send(new GetPatient.Query()
            {
                PatientId = id
            }).ConfigureAwait(false);

        }
        public async Task<SearchPatient.Model> GetPatientListAsync(string firstName, string lastName)
        {
            return await mediator.Send(new SearchPatient.Query()
            {
                FirstName = firstName
                // LastName = lastName
            }).ConfigureAwait(false);
        }


    }
}
