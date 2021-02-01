using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Hl7.Fhir.Rest;
using Hl7.Fhir.Model;
using LockStepBlazor.Data.Models;
using LockStepBlazor.Application;
using LockStepBlazor.Application.DrugInteractions;
using System.Collections.Generic;
using LockStepBlazor.Data.Services;

namespace LockStepBlazor.Handlers
{
    public class ParseInteractionsHandler : ParseInteractions.IHandler
    {

        public ParseInteractionsHandler()
        {
        }

        public async Task<ParseInteractions.Model> Handle(ParseInteractions.Query request, CancellationToken cancellationToken)
        {
            var interactions = new List<MedicationInteractionPair>();

            await foreach (var drug in DrugInteractionParserAsync.ParseDrugInteractionsAsync(request.Jstring))
                {    
                    request.Meds.Where(r => r.RxCui == drug.MedicationPair.Item1.RxCui)
                                            .Select(z => (drug.MedicationPair.Item1.DisplayName = z.Text,
                                           drug.MedicationPair.Item1.TimeOrdered = z.TimeOrdered,
                                           drug.MedicationPair.Item1.Prescriber = z.Prescriber,
                                           drug.MedicationPair.Item1.FhirType = z.FhirType,
                                           drug.MedicationPair.Item1.ResourceId = z.ResourceId)).ToList();
                    request.Meds.Where(r => r.RxCui == drug.MedicationPair.Item2.RxCui)
                                            .Select(z => (drug.MedicationPair.Item2.DisplayName = z.Text,
                                           drug.MedicationPair.Item2.TimeOrdered = z.TimeOrdered,
                                           drug.MedicationPair.Item2.Prescriber = z.Prescriber,
                                           drug.MedicationPair.Item2.FhirType = z.FhirType,
                                           drug.MedicationPair.Item2.ResourceId = z.ResourceId)).ToList();
                    interactions.Add(drug);
                }

            return new ParseInteractions.Model() { Interactions = interactions };
        }

    }
}
