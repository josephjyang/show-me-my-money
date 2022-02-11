FROM node:12 AS build-stage

WORKDIR /frontend-react
COPY frontend-react/. .

ENV REACT_APP_BASE_URL=https://show-me-my-money.herokuapp.com/

RUN npm install
RUN npm run build

FROM python:3.9

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY backend-flask/ .
COPY --from=build-stage /frontend-react/build/* app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

CMD gunicorn --worker-class eventlet -w 1 app:app