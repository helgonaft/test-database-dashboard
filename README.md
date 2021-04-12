# TestDatabaseDashboard

## Implementation Notes

Used technologies: Angular 8, NgRx 8, Bootstrap 4, SCSS.
Spent time: about 19h
To run the app: npm i and ng serve

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Functional Requirements

The dashboard offers following functionality:

- Add two hardcoded users:
  - `Administrator:` Can manage the database and is allowed to add/remove/start/stop clusters to the database. The Administrator can also start/stop the database itself.
    - Username:`Admin`
    - Password:`Admin123!`
- `User:` Can only view the database and clusters.

  - Username:`User`
  - Password:`User123!`

- `Administrator` and `User` can get a quick overview of the db and all clusters (main and worker clusters). The data are obtained from the API as defined in the swagger API definition. Data are loaded once during page load from the REST endpoint. All changes only affect the local state and are lost on refresh.

- `Administrator` can start or stop a clusters (main or worker). The status should change immediately and should be stored locally only (lost on reload). Please consider the following dependencies between the database and the clusters:

  - `Stop DB` ---> Stop all clusters and DB
  - `Stop main cluster` ---> Stop all clusters and DB
  - `Stop worker cluster` ---> affects only the cluster itself
  - `Start DB` ---> Start main cluster and DB
  - `Start main cluster` ---> Start main cluster and DB
  - `Start worker cluster` ---> affects only the cluster itself
  - If the database/main cluster is stopped, no worker cluster can be added(!) or started.

- `Administrator` can add new worker cluster: He must select an instance type from a predefined list (like m5.2xlarge,...). The new worker cluster will be available with status "running" immediately after creation (only if the main cluster/datatabase is running).

- `Administrator` and `User` can login to the protected dashboard. Please note the limitations of the User role. No real authentication is necessary. Username/Password can be hardcoded in the UI.

- Users can logout and are redirected to login
