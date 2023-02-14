// This script is meant to be executed on a vsts build page with the format VSTS/project/_build/results?buildId=XXXXXXX&view=results

let vstsReleasesGetCommitsIds =
    [...document.getElementsByClassName("scroll-hidden flex-row flex-baseline bolt-link subtle")]
        .map(e => e.innerText)
        .reduce((acc, v, i, arr) => /release/.test(v) ? [...acc, `${arr[i - 1]} : ${v} : $[arr[i+1]]`] : acc, []);

if (vstsReleasesGetCommitsIds.length == 0) {
    alert("Ce script est censé s'exécuter sur une url du style : _build/results?buildId=XXXXXXX&view=results")
} else {
    navigator.clipboard.writeText(vstsReleasesGetCommitsIds);
    alert("Commits et releases correspondantes copiées");
}