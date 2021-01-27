using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace ReactTypescriptBP
{
    public class Program
    {
        public static string EnvironmentName =>
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

        public static Action<IConfigurationBuilder> BuildConfiguration =
            builder => builder
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

        public static int Main(string[] args)
        {
            Console.WriteLine("Starting ReactTypescriptBP...");

            var builder = new ConfigurationBuilder();
            BuildConfiguration(builder);

            Log.Logger =
                new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Build())
                .CreateLogger();

            try
            {
                var hostBuilder = CreateHostBuilder(args, builder);

                var host = hostBuilder.Build();

                host.Run();

                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly.");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args, IConfigurationBuilder configurationBuilder)
        {
            var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
            var url = $"http://0.0.0.0:{port}";

            return Host.CreateDefaultBuilder(args)
              .ConfigureWebHostDefaults(webBuilder =>
              {
                  webBuilder
                  .UseKestrel()
                  .ConfigureKestrel(serverOptions =>
                  {
                        // Set properties and call methods on options.
                    })
                  .UseConfiguration(
                      configurationBuilder
                      .AddJsonFile("hosting.json", optional: true, reloadOnChange: true)
                      .AddJsonFile($"hosting.{EnvironmentName}.json", optional: true)
                      .Build()
                  )
                  .UseStartup<Startup>();
              })
                .UseSerilog()
               ;
        }
    }
}