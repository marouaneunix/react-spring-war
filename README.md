# PCC App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Spring initializr](https://start.spring.io/).


## Requirements
For building and running the application you need:

- JDK 11
- [Maven 3](https://maven.apache.org)
- Postgres database

## Project Structure
> Folder structure options and naming conventions for software projects

### A typical top-level directory layout

    .
    ├── docker                   # docker-compose file for development mode
    ├── frontend                 # React frontend source files
    ├── src                      # Backend Source files 
    ├── target                   # Compliled files
    └── README.md
## Running the application locally
1. Run database containers 
```shell
docker-compose up -d`
```
2. Run backend
```shell
./mvn spring-boot:run
```
3. Run frontend app
```shell
npm install
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deploying the application to Tomcat
1. Edit the file `.env.prod` with the base url. Example
```shell
REACT_APP_API_URL=http://poc-add-dev/pocscheduler-0.0.1-SNAPSHOT/
```
2. Generate the war package
```
./mvn clean package -D frontend.env=prod
```

## SonarQube

Run SonarQube with docker
```shell
docker run -d --name sonarqube -p 9000:9000 sonarqube
```

Add the following plugin to pom.xml file
```
<plugin>
    <groupId>org.sonarsource.scanner.maven</groupId>
    <artifactId>sonar-maven-plugin</artifactId>
    <version>3.9.1.2184</version>
</plugin>
```

Run the following command
```
mvn sonar:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=generated-token
```

If you want to add code coverage to sonarQube

1.  Add jacoco plugin to the project [link](https://www.baeldung.com/sonarqube-jacoco-code-coverage)
2. run test + sonarQube

