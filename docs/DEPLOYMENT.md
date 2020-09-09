# Deployment
This document describes steps required by the developer in order to release a new web application, based on recent *horizon-webapp* deployment

## Kubernetes
The web application is running in Kubernetes clusters, container orchestration platform supported by IBM Cloud.
There are two clusters:

* [havyn-dev](https://havyn-dev.us-south.containers.mybluemix.net) - development cluster which serves as staging environment
* [havyn-prod](https://havyn-prod.us-south.containers.mybluemix.net) - production cluster where we release production-ready application

Clusters are shared by all of our applications, including microservices, backends-for-frontends (BFF) and web applications.
Developers are not expected to deploy applications to clusters manually, this process is automated using [Travis](https://travis.ibm.com/mss-transformation/) and integrated with our [GitHub](https://github.ibm.com/mss-transformation).

## Developer
In order to get a deploy to a specific cluster, a developer has to:
* **havyn-dev** - merge his branch to ***dev*** in git
* **havyn-prod** - merge ***dev*** branch to ***master*** and create a release tag using `git tag v1.0.0` where the version should be incremented following [semantic versioning](https://semver.org/) convention. 

****Important note***: only a designated *release manager* is permitted to create git tags and merge to *master*.*

## Automation
The deployment process is automated using Travis CI and configured using  a `.travis.yml`  file stored at the project root.

### Setup

Travis has no built-in support for Kubernetes + Helm deployments, so we have to install our deploy dependencies and configure the environment:


```yml
before_deploy:  
- source ./travis/setup_travis_env.sh #
- ./travis/install_deploy_deps.sh  
- source ./travis/configure_cluster.sh  
- bx cr build -t registry.ng.bluemix.net/mssace/horizon-webapp:$BUILD_NUMBER .
```


We have four scripts which prepare the environment and build a Docker image:
* **setup_travis_env.sh** - sets up environment variables like *CLUSTER_NAME*, *CLUSTER_NAME*, *SPACE* used later in the process
* **install_deploy_deps.sh** - installs deploy dependencies like *Bluemix CLI*, *kubectl*, *helm*
* **configure_cluster.sh** - logs into IBM Cloud using Bluemix CLI tool and exports Kubernetes configuration as an environment variable used later during deploy
* **bx cr build -t registry:build_number .** - builds a Docker image of our application in IBM Cloud Container Registry using Dockerfile


### Deploy
Since there are two clusters to which we deploy based on different conditions, we have two different deploy providers set up:

```yml
deploy:  
 - provider: script  
    skip_cleanup: true  
    script: ./travis/kube_deploy.sh  
    on:
        branch: dev  
  - provider: script  
    skip_cleanup: true  
    script: ./travis/kube_deploy.sh  
    on:
        tags: true
  ```
You can see that these deployments are almost identical.
We set it up this way to make it clear when we deploy, which in this case is either:
* `dev` branch release to `havyn-dev`

* `tag` tagged release to `havyn-prod`


Tags are created from the *master* branch only.

### Helm charts
Our `kube_deploy.sh` script uses [Helm](https://helm.sh/)  to describe application deployment and contains information about different specifics of our environment, like:
* requested resources (memory or CPU)
* environment variables used within our application (like *PORT* or *BFF_URL*)
* registry URL where our Docker image is stored

`kube_deploy.sh` script lints our charts and upgrades the deployment of the application in Kubernetes cluster automatically.

# Custom domain

`horizon-webapp` should be accessible via the internet using custom domains:
* **havyn-dev** - https://dev-center.sec.ibm.com/

* **havyn-prod** - https://center.sec.ibm.com/


Infrastructure team maintaining ***.sec.ibm.com** domain has set up a CNAME DNS record that maps *dev-center* and *center* subdomains to our cluster external domains.
## Access the Kubernetes Cluster
Follow these steps in order to log into IBM Cloud and gain access to the cluster:
This process uses different variables that you can specify yourself or set as environment variables in your shell:

- *BLUEMIX_API_KEY* - your API key generated on [IBM Cloud](https://console.bluemix.net/iam/#/apikeys)
- *ORG* - ***mssace***
- *SPACE* - ***dev*** or ***prod***
- *CLUSTER_NAME* - either ***havyn-dev*** or ***havyn-prod***

1. Download [IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html#getting-started)
2. Download [Kubernetes CLI](https://kubernetes.io/docs/user-guide/prereqs/)
3. Log in using BX CLI, where:

```bash
$ bx login -a api.ng.bluemix.net -apikey $BLUEMIX_API_KEY -o $ORG -s $SPACE
```
4. Get cluster configuration, where:

```bash
$ bx cs cluster-config $CLUSTER_NAME
```
5. The previous action outputs a command which you can execute in your shell in order to export Kubernetes configuration:
```bash
$ export KUBECONFIG=<path-to-file>/kube-config-dal10-havyn-prod.yml
```

After following these steps you should be able to use ***kubectl*** CLI in context of a specific Kubernetes cluster.

## Set up Ingress
After center.sec.ibm.com resolves to our cluster IP successfully, we need to tell it to map this request to our web application. This can be done using Ingress controller responsible for routing the requests.

In order to set this up, follow these steps:
1. Look up available ingress controllers
```bash
$ kubectl get ing
NAME            HOSTS                                                             ADDRESS        PORTS     AGE
havyn-ingress   havyn-prod.us-south.containers.mybluemix.net   169.60.15.54   80, 443   91d
```
2.  Edit the configuration in your terminal:
```bash
$ kubectl edit ing havyn-ingress
```
This command will open vim editor via SSH where you can edit ingress configuration.
In order to add a mapping from center.sec.ibm.com to [havyn-prod](http://havyn-prod.us-south.containers.mybluemix.net), you need to add these lines in spec/rules:
```yml
  - host: center.sec.ibm.com
    http:
      paths:
      - backend:
          serviceName: horizon-webapp
          servicePort: 3000
        path: /
```
This will configure Ingress in such a way that it will route requests from center.sec.ibm.com to our `horizon-webapp` which is served on port 3000.


### Additional documentation
Relevant documentation for setting up a custom domain in IBM Cloud / Kubernetes

* [Bluemix docs](https://console.bluemix.net/docs/containers/cs_ingress.html#ingress) - exposing apps with Ingress
* [Kubernetes docs](https://kubernetes.io/docs/concepts/services-networking/ingress/#updating-an-ingress) - updating an Ingress controller


## HTTPS
Our application is using ***https*** protocol to enforce transport layer security, which is also required by IBM ID in order to secure sensitive information provided by users during the login process.

After setting up a custom domain using Ingress, our application should be accessible using https, but the browser would display warnings SSL certificate mismatch.
(application is being served from ***sec.ibm.com*** while the certificarte used was issued for ***bluemix.net***)

### Create a Kube Secret
Assuming you aleady have a wildcard certificate ****.key*** and ****.crt*** files, you can create a Kubernetes secret by using **kubectl**:
```bash
$ kubectl create secret tls <secret-name> --key=<key-file> --cert=<crt-file>
```

### Use the secret in Ingress
1. Edit the Ingress configuration:
(opens vim where you can edit the *YAML* configuration file directly on the server)
```bash
$ kubectl edit ing havyn-ingress
```
2. Add a ***hosts*** section under *tls*:
```yml
  tls:
  - hosts:
    - center.sec.ibm.com
    secretName: <secret-name>
```
Please note that you need to specify one hosts entry per secretName - [relevent issue](https://github.com/kubernetes/kubernetes/issues/37518).

3. Check if the configuration has been saved successfully:
```bash
$ kubectl describe ing havyn-ingress
```
This should provide you a summary of your Ingress controller, wherein the *Events* section you should see a log indicating success:
```
Events:
  Type    Reason   Age   From                                                             Message
  ----    ------   ----  ----                                                             -------
  Normal  Success  21m   public-pkpc2  Successfully applied ingress resource.
  ```


