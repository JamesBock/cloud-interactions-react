using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Hl7.Fhir.Rest;
using Hl7.Fhir.Model;
using System.Collections.Generic;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Models;
using ReactTypescriptBP.Infrastructure;

namespace LockStepBlazor.Handlers
{
    public class NavigateBundleHandler : NavigateBundle.IHandler
    {
        private readonly FhirClient client;

        public NavigateBundleHandler(FhirClient client)
        {
            this.client = client;

        }

        public async Task<NavigateBundle.Model> Handle(NavigateBundle.Query request, CancellationToken cancellationToken)
        {
            //var prayer = client.Operation(new Uri(request.Bundle), "continue");
            var bundle = client.Continue(request.Bundle, request.Nav);
            var patients = new PatientListModel(
           new List<PatientModel>(),
          bundle.FirstLink?.ToString() != null ? bundle.FirstLink.ToString() : "",
            bundle.LastLink?.ToString() != null ? bundle.LastLink.ToString() : "",
            bundle.NextLink?.ToString() != null ? bundle.NextLink.ToString() : "",
            bundle.PreviousLink?.ToString() != null ? bundle.PreviousLink.ToString() : "",
           bundle.Total ?? 0);

            foreach (var e in bundle.Entry)
            {
                Hl7.Fhir.Model.Patient p = (Hl7.Fhir.Model.Patient)e.Resource;
                patients.Patients.Add(
                    new PatientModel(
                    p.Id, string.Join(" ", p.Name.FirstOrDefault()
                    .Given), string.Join(" ", p.Name.FirstOrDefault().Family)));


            }


            return new NavigateBundle.Model() { Bundle = bundle, Payload = patients };



        }


    }

}

