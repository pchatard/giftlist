# Giftlist API

## Node Tasks

TODO

## Containerization

Please ensure to have build the code before running following steps.

### Image build

Run `podman build -f Dockerfile -t giftlist_api` (works also with docker command).

### Image run

Run `podman run --env-file .env -e DB_CERT="/certs/root.crt" -p <PORT_TO_ACCESS>:<API_PORT> -v ./src/config/certs:/certs -d giftlist_api` (works also with docker command).

To run successfully this image, be sure to have a filled `.env` file and CockroachDB cert in `src/config/certs/root.crt`.

API is accessible on `http://localhost:<PORT_TO_ACCESS>` and SwaggerUI on "/docs" endpoint.
