// Define the links for each member
const memberPages = {
    ohad: "http://www.cs.bgu.ac.il/~ben-shahar/",
    yaniv: "https://www.linkedin.com/in/yaniv-ohayon/",
    michael: "https://www.linkedin.com/in/michael-lellouch-72a615b2/",
    gur: "https://www.linkedin.com/in/gur-elkin/",
    ofir: "https://www.linkedin.com/in/ofir-itzhak-shahar/",
    alex: "https://www.linkedin.com/in/alex-lazarovich/",
    brahan: "https://www.linkedin.com/in/brahan-wassan/",
    dan: "https://www.linkedin.com/in/dan-zlotnikov-397794153/",
    tal: "https://www.linkedin.com/in/talalfi/",
    nadav: "https://www.linkedin.com/in/nadav-alali-698407206/",
    elad: "https://www.linkedin.com/in/elad-amar/",
    ilan: "https://www.linkedin.com/in/ilan-git/",
    rotem: "https://www.linkedin.com/in/rotemmairon/",
    peleg: "https://www.linkedin.com/in/peleg-harel-91357a164/",
    ben: "https://www.linkedin.com/in/ben-vardi-760432108/",
    efrat: "https://www.linkedin.com/in/efrattaig/",
    ehud: "https://www.linkedin.com/in/ehud-barnea/",
    shir: "https://www.linkedin.com/in/shirgur/",
    gal: "https://www.linkedin.com/in/gal-nir-cohen-phd-506350a7/",
    ilan_kadar: "https://www.linkedin.com/in/ilan-kadar-b57ba511b/",
    alik: "https://www.linkedin.com/in/alik-mokeichev-aa117a6/",
    yair: "https://www.linkedin.com/in/yair-adato-4936b236/",
    boaz: "http://www.boazarad.com/",
    dolev: "https://www.linkedin.com/in/dolev-pomeranz-b3b56b3/",
    guy: "https://www.linkedin.com/in/guybenyosef/",
    rami: "https://www.linkedin.com/in/rami-ben-ari-40106b6/",
    liana: "https://www.linkedin.com/in/liana-diesendruck-5725b44/",
    hadassa: "https://www.linkedin.com/in/hadassa-daltrophe-0477a383/",
    maor: "https://www.linkedin.com/in/maor-mishkin/",
    moran: "https://www.linkedin.com/in/moran-hirsh-aba84ab/",
    noa_gur: "https://www.linkedin.com/in/noa-gur-8ab9b033b/",
    hila_ben_simchone: "https://www.linkedin.com/in/hila-ben-simchone-086a1b317/",
    roi_lifshitz: "https://www.linkedin.com/in/roi-lifshitz-0ab37a330/"
};

// Function to set links for each member
function setMemberPages() {
    for (const memberId in memberPages) {
        const link = memberPages[memberId];
        const imgLink = document.getElementById(`${memberId}-page`);
        const nameLink = document.getElementById(`${memberId}-name-page`);
        
        if (imgLink && nameLink) {
            imgLink.href = link;
            nameLink.href = link;
        } else {
            // If the member is not found in memberLinks, link to the referring page
            const referringPage = "/pages/members.html";
            if (imgLink){
                imgLink.href = referringPage;
                nameLink.href = referringPage;
            }
        }
    }
}

// Run the function to set the links
setMemberPages();
