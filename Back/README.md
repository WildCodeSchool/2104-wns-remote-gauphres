```shell
curl localhost:5000/graphql \
  -F operations='{ "query": "mutation ($file: Upload!) { singleUpload(file: $file) { id } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=/home/benoit/Images/T081ACFLZ-U01P80L036K-41cd47c7e621-512.jpeg
```

```shell
curl 'http://localhost:5000/graphql'
-H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json'
-H 'Accept: application/json' -H 'Connection: keep-alive'
-H 'DNT: 1' -H 'Origin: http://localhost:5000' --data-binary '{"query":"mutation {\n  uploadPicture(file: {\n    \n  })\n  {\n    extension\n  }\n}"}' --compressed
```
