{
{{- with secret "generic/project/horizon-ci/default/ibmid/user/sso.test.preprod" }}
  "USERNAME": "{{ .Data.USERNAME }}",
  "PASSWORD": "{{ .Data.PASSWORD }}",
{{- end -}}
{{- with secret "generic/project/horizon-ci/horizon-webapp/ibmid/dev" }}
  "IBM_ID_CLIENT_ID": "{{ .Data.IBM_ID_CLIENT_ID }}",
  "ISSUER": "{{ .Data.ISSUER }}"
{{- end }}
}
