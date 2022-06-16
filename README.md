
curl -X POST http://localhost/api/auth/login -d '{"code": "e98db8423a0ea2b28bd6a471f7194837afd567b57d653258133ac68383991d05"}' -H "Content-Type: application/json"

curl http://localhost/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTUwODY0MTEsImV4cCI6MTY1NTY5MTIxMX0.C59mV4CmKADQ8-44C_NKCsSzMjgeFY9Qk95vQIK-zRY"

curl -F grant_type=authorization_code \
-F client_id=1ffda2d97b6d47baa64a2b36a2646c3195cec1861aa719e2ec6d878a3b653d4b \
-F client_secret=26bcdcefd0872d2a65139e9c3056b16ff87d09019499cfe28894f541355068cb \
-F code=253fdbb6cfdbb3ccbb7df2ea1f7bcdd7b03b402419fc3c8c45c7edbc030fcaba \
-F redirect_uri=http://localhost/login \
-X POST https://api.intra.42.fr/oauth/token

curl -H "Authorization: Bearer b776b67bff03934f7e7fc11e459b4a401547130b73ec4da93e7825913bd33439" https://api.intra.42.fr/v2/me