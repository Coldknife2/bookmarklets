// This script is meant to be executed on a vsts build page with the format VSTS/project/_build/results?buildId=XXXXXXX&view=results

let vstsReleasesGetCommitsIds =
    [...document.getElementsByClassName("scroll-hidden flex-row flex-baseline bolt-link subtle")]
        .map(e => e.innerText)
let index = vstsReleasesGetCommitsIds
    .findIndex(e => /release/.test(e));

if (vstsReleasesGetCommitsIds.length == 0) {
    alert("Ce script est censé s'exécuter sur une url du style : _build/results?buildId=XXXXXXX&view=results")
} else {
    navigator.clipboard.writeText(vstsReleasesGetCommitsIds[index + 1]);
    alert("Premier commit correspondant à une release/ copié");
}