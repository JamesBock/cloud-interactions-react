using System;
using Hl7.Fhir.Rest;
using LockStepBlazor.Application.DrugInteractions;
using LockStepBlazor.Application.Fhir.Queries;
using LockStepBlazor.Application.Interfaces;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Services;
using LockStepBlazor.Handlers;
using LockStepBlazor.Shared;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ReactTypescriptBP.Extensions;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Services;
using Serilog;
using Serilog.Context;

namespace ReactTypescriptBP
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Configuration.GetSection("AppSettings").Bind(AppSettings.Default);

            services.AddLogging(loggingBuilder =>
                loggingBuilder.AddSerilog(dispose: true));

            services.AddControllersWithViews(opts =>
            {
                opts.Filters.Add<SerilogMvcLoggingAttribute>();
            });

            services.AddNodeServicesWithHttps(Configuration);

#pragma warning disable CS0618 // Type or member is obsolete
            services.AddSpaPrerenderer();
#pragma warning restore CS0618 // Type or member is obsolete

            // Add your own services here.
            services.AddScoped<AccountService>();
            services.AddScoped<PersonService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddSingleton<IRequestHandler<IGetFhirMedications.Query, IGetFhirMedications.Model>, GetFhirR4MedicationsAPIHandler>();
            //services.AddSingleton<IRequestHandler<GetRxCuiListAPI.Query, GetRxCuiListAPI.Model>, GetRxCuiListAPIHandler>();//w/o interface, this only is needed with the MOck and crashes the app if using the API

            //This registration is still needed also to register the correct Handler to the PatientDateService.
            services.AddSingleton<IGetFhirMedications, GetFhirMedicationsAPI>();
            //services.AddMediatR(typeof(GetFhirMedicationsJSONHandler));//This did not fix it.
            services.AddSingleton<FhirClient, GoogleFhirClient>(c => new GoogleFhirClient(Constants.GOOGLE_FHIR_STICHED_URI) { Settings = new FhirClientSettings() { PreferredFormat = ResourceFormat.Json } });

            services.AddHttpClient<IRequestHandler<GetRxCuiListAPI.Query, GetRxCuiListAPI.Model>, GetRxCuiListAPIHandler>("RXCUI", client =>
            { client.BaseAddress = new Uri(Constants.RXCUI_API_URI); });

            services.AddSingleton<IGetDrugInteractions, GetDrugInteractionsAPI>();//these two must match implementations
            services.AddHttpClient<IRequestHandler<IGetDrugInteractions.Query, IGetDrugInteractions.Model>, GetDrugInteractionsAPIHandler>("Interactions", client =>
            { client.BaseAddress = new Uri(Constants.NLM_INTERACTION_API_URI); });//Could make this a base class and have all handlers inheirt? cannot be abstract, virtual seem to explicitly implement the base class and not the inheiriting class
            //services.AddControllers();//NEW
            //services.AddHostedService<RxCuisNotificationDispatcher>();//NEW
            //services.AddMediatR(typeof(GetMedicationRequestsHandler).GetTypeInfo().Assembly);//this is not needed now that all Handlers are in the Blazor Assembly
            services.AddRazorPages();
            services.AddServerSideBlazor().AddCircuitOptions(o => { o.DetailedErrors = true; });
            services.AddMediatR(typeof(Startup));
            services.AddSingleton<IDrugInteractionParser, DrugInteractionParser>();
            // services.AddSingleton<IDrugInteractionParserAsync, DrugInteractionParserAsync>();
            //services.AddSingleton(Channel.CreateUnbounded<string>());
            services.AddSingleton<IPatientDataService, PatientDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            // Adds an IP address to your log's context.
            app.Use(async (context, next) =>
            {
                using (LogContext.PushProperty("IPAddress", context.Connection.RemoteIpAddress))
                {
                    await next.Invoke();
                }
            });

            // Build your own authorization system or use Identity.
            app.Use(async (context, next) =>
            {
                var accountService = (AccountService)context.RequestServices.GetService(typeof(AccountService));
                var verifyResult = accountService.Verify(context);
                if (!verifyResult.HasErrors)
                {
                    context.Items.Add(Constants.HttpContextServiceUserItemKey, verifyResult.Value);
                }
                await next.Invoke();
                // Do logging or other work that doesn't write to the Response.
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
#pragma warning disable CS0618 // Type or member is obsolete
                // WebpackDevMiddleware.UseWebpackDevMiddleware(app, new WebpackDevMiddlewareOptions
                // {
                //     HotModuleReplacement = true,
                //     ReactHotModuleReplacement = true
                // });
#pragma warning restore CS0618 // Type or member is obsolete
            }
            else
            {
                app.UseExceptionHandler("/Main/Error");
                app.UseHsts();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Write streamlined request completion events, instead of the more verbose ones from the framework.
            // To use the default framework request logging instead, remove this line and set the "Microsoft"
            // level in appsettings.json to "Information".
            app.UseSerilogRequestLogging();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Main}/{action=Index}/{id?}");

                endpoints.MapFallbackToController("Index", "Main");
            });

            app.UseHttpsRedirection();
        }
    }
}