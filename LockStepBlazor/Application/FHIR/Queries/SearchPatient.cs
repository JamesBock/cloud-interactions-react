using Hl7.Fhir.Model;
using LockStepBlazor.Application.Interfaces;
using MediatR;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;
using System;
using System.Collections.Generic;


namespace LockStepBlazor.Application.Fhir.Queries
{
    public class SearchPatient
    {
        public class Query : IRequest<Model>
        {
            public int LimitTo { get; set; }
            public string FirstName { get; set; }
            // public string LastName { get; set; }
        }

        public class Model : ICachePatientBundle
        {
            public Bundle Bundle { get; set; }
            public PatientListModel Payload { get; set; }
        
        }

        public interface IHandler : IRequestHandler<Query, Model>
        {

        }
    }
}