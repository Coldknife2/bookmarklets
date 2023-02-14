const fs = require('fs');
const path = require('path');
const { minify } = require("terser");

const terserOptions = {
    module: true
};

// https://gist.github.com/victorsollozzo/4134793 with some modifications
function recursiveFindByExtension(base, files, result) {
    files = files || fs.readdirSync(base)
    result = result || [];

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recursiveFindByExtension(newbase, fs.readdirSync(newbase), result);
            }
            else {
                result.push([newbase, file]);
            }
        }
    )
    return result;
}

async function main()
{
    let bookmarkletsPath = path.join(__dirname, "bookmarklets");
    const filesToTreat = recursiveFindByExtension(bookmarkletsPath);

    let bookmarklets = [];

    await filesToTreat.forEach(async([filePath, fileName]) => {
        let content = fs.readFileSync(filePath, "utf-8");
        let compressedContent = (await minify(content, terserOptions)).code;
        let bookmarkletContent = `javascript:(function(){${encodeURI(compressedContent)}})()`;
        let htmlContent = `<p><a href=${bookmarkletContent}>${fileName}</a></p>`;
        bookmarklets.push(htmlContent);
    });

    console.log("bookmarklets", bookmarklets)

    let outputPath = path.resolve(bookmarkletsPath, "../../output");
    let htmlOutputPath = path.resolve(outputPath, "index.html");
    let contentToWrite = bookmarklets.join("\n");
    
    let templatePath = path.join(__dirname, "template.html");
    let templateContent = fs.readFileSync(templatePath, "utf-8");
    let replacedContent = templateContent.replace("{BOOKMARKLETS}", contentToWrite);

    if (!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath);
    }
    
    fs.writeFileSync(htmlOutputPath, replacedContent, () => {} );
}

main();
