BFF_URL=https://api.us.apiconnect.ibmcloud.com/mssace-dev/sb/
{{ with secret "generic/project/horizon-ci/horizon-webapp/ibmid/dev" }}
{{- range $k, $v := .Data }}{{- $k }}={{ $v }}
{{ end -}}{{ end -}}
{{ with secret "generic/project/horizon-ci/default/ibmid/user/sso.test.preprod" }}
{{- range $k, $v := .Data }}{{- $k }}={{ $v }}
{{ end -}}{{ end -}}
