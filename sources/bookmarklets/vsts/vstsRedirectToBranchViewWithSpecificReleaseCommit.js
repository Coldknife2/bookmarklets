// This script is meant to be executed on a vsts build page with the format VSTS/project/_build/results?buildId=XXXXXXX&view=results

let vstsReleasesGetCommitsIds =
    [...document.getElementsByClassName("scroll-hidden flex-row flex-baseline bolt-link subtle")]
        .map(e => [e.innerText, e.href])

if (vstsReleasesGetCommitsIds.length == 0) {
    alert("Ce script est censé s'exécuter sur une url du style : _build/results?buildId=XXXXXXX&view=results")
} else {
    let index = vstsReleasesGetCommitsIds
        .findIndex((text, url) => /release/.test(text));

    let commitId = vstsReleasesGetCommitsIds[index + 1][0];
    let destinationUrl = vstsReleasesGetCommitsIds[index][1] + "&_a=history#:~:text=" + commitId;

    navigator.clipboard.writeText(destinationUrl).then(
        () => {
            alert("Je vous redirige vers " + destinationUrl + " et j'ai aussi copié l'adresse dans le presse-papier, il vous faudra coller de nouveau l'url pour tomber sur le bon commit")
            document.location.href = destinationUrl;
        },
        () => {
            alert("Copie raté dans le presse-papier, un souci avec le script ?")
        }
    );
}