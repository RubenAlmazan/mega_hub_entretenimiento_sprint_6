FROM mrc.microsoft.com/dotnet/aspnet:8.0 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mrc.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /src
COPY ["./base_mega_api.csproj", "./"]
RUN dotnet restore "./base_mega_api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./base_mega_api.csproj" -c Release -o /app/build

FROM build as publish 
RUN dotnet publish "./base_mega_api.csproj" -c Release -o /app/build

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "base_mega_api.dll" ]






 