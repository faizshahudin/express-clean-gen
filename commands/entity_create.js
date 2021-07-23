const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const templateDir = path.resolve(__dirname + '/../assets');
const srcDir = rootDir + '/src'
const entitiesDir = rootDir + "/src/entities";

module.exports = function(dirName, rl) {
    let entityDir = path.resolve(entitiesDir, dirName);

    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir);
    }

    if (!fs.existsSync(entitiesDir)) {
        fs.mkdirSync(entitiesDir);
    }



    if (!fs.existsSync(entityDir)) {
        generateEntityModule(entityDir,dirName);
        console.log('Entity module created: ', entityDir)
        rl.close();
    } else {
        console.log("entity dir exists.");
        rl.question(
            "Do you want to delete entity directory? (y/n)",
            function (yesNo) {
                if (yesNo === "y") {
                    fs.rmdirSync(entityDir, { recursive: true });

                    generateEntityModule(entityDir,dirName);
                    console.log('Entity module created: ', entityDir)
                    rl.close();
                } else {
                    rl.close();
                }
            }
        );
    }
}

function generateEntityModule(entityDir,dirName) {
    fs.mkdirSync(entityDir);

    let entity_template = fs.readFileSync(
        path.resolve(templateDir, "entity_template.js")
    );

    let entity_index_template = fs.readFileSync(
        path.resolve(templateDir, "entity_index_template.js")
    );

    let entity_spec_template = fs.readFileSync(
        path.resolve(templateDir, "entity_spec_template.js")
    );

    fs.writeFileSync(path.resolve(entityDir, dirName + ".ts"), entity_template);
    fs.writeFileSync(path.resolve(entityDir, "index.ts"), entity_index_template);
    fs.writeFileSync(
        path.resolve(entityDir, dirName + ".spec.ts"),
        entity_spec_template
    );
}