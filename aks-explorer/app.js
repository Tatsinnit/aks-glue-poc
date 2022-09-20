let { ipcRenderer } = require("electron")

let currentcluster = document.querySelector("#currentcluster");
document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    let clusterName = await ipcRenderer.invoke("runcommand", `kubectl config current-context | cut -d '@' -f2`);
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

let button = document.querySelector("#toolButton");

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

  let kubectlDNSApply = await ipcRenderer.invoke("runcommand", `kubectl apply -f https://raw.githubusercontent.com/andyzhangx/demo/master/aks/canipull/canipull.yaml`);
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


