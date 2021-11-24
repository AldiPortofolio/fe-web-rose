# ROSE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Server
server prod: 10.10.43.10
## cara deploy production


1. build code terlebih dahulu --> ng-build --prod
2. rename /dist/secpage ke /dist/rose
3. compress folder rose jadi rose.zip
4. up rose.zip ke 10.10.43.10
5. copy file rose.zip ke /opt/tomcat/webapps
6. unzip rose.zip

## silahkan akses rose web di
https://rose.ottopay.id:9293/rose/#/