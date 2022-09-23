let { ipcRenderer } = require("electron")

let currentcluster = document.querySelector("#currentcluster");
document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    let clusterName = await ipcRenderer.invoke("runcommand", `kubectl config current-context`);
    currentcluster.textContent = clusterName;
    currentcluster.value = clusterName
});

let form = document.querySelector("form")
let input = document.querySelector("input")
let responses = document.querySelector("#responses")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  let line = input.value
  input.value = ""
  let responseText = await ipcRenderer.invoke("console", line)
  let response = document.createElement("div")
  response.textContent = responseText
  responses.appendChild(response)
})

let button = document.querySelector("#ACRPull");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  /* 
  Troubleshoot ACR connection issue on specific AKS node.
  Tutorial here: https://github.com/andyzhangx/demo/tree/master/aks/canipull
  Step 1: kubectl apply -f https://raw.githubusercontent.com/andyzhangx/demo/master/aks/canipull/canipull.yaml
  Step 2: kubectl logs pod/canipull
  Step 3: Success or Failure in the output
  */
  let stdOut = ""

// let kubectlDNSApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f https://raw.githubusercontent.com/andyzhangx/demo/master/aks/canipull/canipull.yaml`);
  let kubectlDNSApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f ./aks-explorer/resources/canipull.yaml`);
  stdOut += kubectlDNSApply + "\n";
  if (kubectlDNSApply) {
    let kubectlDNSLogs = await ipcRenderer.invoke("runcommand", `kubectl logs pod/canipull`);
    stdOut += kubectlDNSLogs;
  }

  let response = document.createElement("div");
  response.textContent = stdOut
  responses.appendChild(response);

  //commandWrapper("kubectl cluster-info");
})

let btDNSCheck = document.querySelector("#DNSCheck");

btDNSCheck.addEventListener("click", async (e) => {
  e.preventDefault();
  let stdOut = ""

  let kubectlDNSApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml`);

  stdOut += kubectlDNSApply + "\n";
  if (kubectlDNSApply) {
    let kubectldnsUtilPod = await ipcRenderer.invoke("runcommand", `kubectl get pods dnsutils`);
    stdOut += kubectldnsUtilPod;
  }

  stdOut += kubectlDNSApply + "\n";
  if (kubectlDNSApply) {
    let kubectlDNSutilExec = await ipcRenderer.invoke("runcommand", `kubectl exec -i -t dnsutils -- nslookup kubernetes.default`);
    stdOut += kubectlDNSutilExec;
  }

  stdOut += kubectlDNSApply + "\n";
  if (kubectlDNSApply) {
    let kubectlDNSutilResolv = await ipcRenderer.invoke("runcommand", `kubectl exec -ti dnsutils -- cat /etc/resolv.conf`);
    stdOut += kubectlDNSutilResolv;
  }

  let response = document.createElement("div");
  response.textContent = stdOut
  responses.appendChild(response);

  //commandWrapper("kubectl cluster-info");
})

let btSecurityCheck = document.querySelector("#BenchCheck");

btSecurityCheck.addEventListener("click", async (e) => {
  e.preventDefault();
  /* 
  Security benchmarking from Aqua Security
  Tutorial here: https://github.com/aquasecurity/kube-bench
  Step 1: kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
  Step 2: kubectl logs -l "app=kube-bench" --tail -1
  Step 3: Success or Failure in the output
  */
  let stdOut = ""

  let kubectlBenchApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml`);
  stdOut += kubectlBenchApply + "\n";
  if (kubectlBenchApply) {
    let kubectlBenchlogs = await ipcRenderer.invoke("runcommand", `kubectl logs -l "app=kube-bench" --tail -1`);
    stdOut += kubectlBenchlogs;
  }

  let response = document.createElement("div");
  response.textContent = stdOut
  responses.appendChild(response);

  //commandWrapper("kubectl cluster-info");
})

let btMetricsCheck = document.querySelector("#MetricsCheck");

btMetricsCheck.addEventListener("click", async (e) => {
  e.preventDefault();
  /*
    kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes | jq
  */

  let stdOut = ""
  let kubectlMetricsApply = await ipcRenderer.invoke("runcommand", `kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes | jq`);
  stdOut += kubectlMetricsApply + "\n";
  let response = document.createElement("div");
  response.textContent = stdOut
  responses.appendChild(response);

})

let btcrictlcheck = document.querySelector("#CRICTLCheck");

btcrictlcheck.addEventListener("click", async (e) => {
  e.preventDefault();
  /* 
  Troubleshoot containers with crictl.
  Tutorial here: https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/
  Step 1: kubectl apply -f ./aks-explorer/resources/crictlcommands.yaml
  Step 2: kubectl logs -l app=crictldebug --tail -1
  Step 3: Success or Failure in the output
  */
  let stdOut = ""

// let kubectlDNSApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f https://raw.githubusercontent.com/andyzhangx/demo/master/aks/canipull/canipull.yaml`);
  let kubectlcrictlApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f ./aks-explorer/resources/crictlcommands.yaml`);
  stdOut += kubectlcrictlApply + "\n";
  if (kubectlcrictlApply) {
    let kubectlcrictlSLogs = await ipcRenderer.invoke("runcommand", `kubectl logs -l app=crictldebug --tail -1`);
    stdOut += kubectlcrictlSLogs;
  }

  let response = document.createElement("div");
  response.textContent = stdOut
  responses.appendChild(response);

  //commandWrapper("kubectl cluster-info");
})