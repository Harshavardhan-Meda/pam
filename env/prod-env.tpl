BFF_URL=https://api.us.apiconnect.ibmcloud.com/mssace-prod/xftm/
{{ with secret "generic/project/horizon-ci/horizon-webapp/ibmid/prod" }}
{{- range $k, $v := .Data }}{{- $k }}={{ $v }}
{{ end -}}{{ end -}}
{{ with secret "generic/project/horizon-ci/default/ibmid/user/ssotestuser900" }}
{{- range $k, $v := .Data }}{{- $k }}={{ $v }}
{{ end -}}{{ end -}}
