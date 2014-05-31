Fixr
====

Fix your heroku apps.

This is a simple heroku app which restarts your heroku apps.

Most effectual way to fix a heroku app is to restart it :)


## Install

1. Download Fixr from GitHub.

		git clone https://github.com/sl2/fixr.git

2. Create an app in heroku.

		cd fixr
		heroku apps:create [APP NAME]

3. Set id and password for basic authentication.

		heroku config:add BASIC_AUTH_USER=
		heroku config:add BASIC_AUTH_PASS=

4. Set e-mail and api_key for heroku platform api.

		heroku config:add EMAIL= // your e-mail for heroku
		heroku config:add API_KEY= // your heroku api_key

5. Deploy Fixr to heroku.

		git push heroku master

6. Open Fixr in your browser.

		heroku open



