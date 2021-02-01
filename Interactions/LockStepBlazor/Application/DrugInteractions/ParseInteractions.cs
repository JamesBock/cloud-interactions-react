using LockStepBlazor.Application.Interfaces;
using LockStepBlazor.Data.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LockStepBlazor.Application.DrugInteractions
{
    public class ParseInteractions
    {
        public class Query : IRequest<Model>
        {         
            public string Jstring { get; set; }
            public List<MedicationConceptDTO> Meds { get; set; }
        }

        /// <summary>
        /// From the API
        /// </summary>
        public class Model
        {
            public List<MedicationInteractionPair> Interactions { get; set; }
        }

        public interface IHandler : IRequestHandler<Query, Model>
        {

        }

    }
}
