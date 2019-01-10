# Deploy to GAE - aka. Google Application Engine

The deploy of this app is meant to be driven by a cloudbuild trigger configured in Google Cloud requiring no effort on the part of the developer. However,  it is a good practice for troubleshooting or initial development to run the cloudbuild locally first.

## Running a cloudbuild locally
Follow the [cloudbuild-local installation instructions](https://cloud.google.com/cloud-build/docs/build-debug-locally) in order to get your gcloud sdk, docker, and local build env working.

Run the following from the root of the project and the `cloudbuild-local` tool will execute the cloudbuild and deploy the application.

``` 
cloud-build-local --config=deploy/cloudbuild.yaml --dryrun=false --substitutions=_ENV=integration,_PROMOTE=--promote .