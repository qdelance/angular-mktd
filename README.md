# MKTD Angular2 exercise

This is my work on Angular2 workshop done during a meetup

Samples here https://github.com/monkeytechdays/mktd-2-exercices

Mostly redoing stuff

External API call on http://ilaborie.org:9010/api/

As we have CORS protection, we need to use a local proxy.

Done with : 

npm i -S http-proxy-middleware

and defining a bs-config.js file at the root of the project, see https://github.com/chimurai/http-proxy-middleware

http://localhost:3000 => http://ilaborie.org:9010/api

as stated with npm run start : 

[...]
[1] [HPM] Proxy created: /api  ->  http://ilaborie.org:9010/api
[...]

Init quizz
http://ilaborie.org:9010/api/quizz?userName=XXX
