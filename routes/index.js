import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import removeLeadingSlash from '../src/js/modules/removeLeadingSlashes.js';
import sortArrayOfObjects from '../src/js/modules/sortArrayOfObjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getRequestPaths = (req) => {
    return {
        project: removeLeadingSlash(req.url.split('?')[0].replace('projects/', '')),
        appURL: process.env.URL,
        reqUrlFull: (req.protocol + '://' + req.get('host') + req.originalUrl).replace('http://stefanbohacek.com/', 'https://stefanbohacek.com/data/')
    };
}

const router = express.Router();

router.all('/', (req, res) => {
    const projectDirs = fs.readdirSync('projects');
    let projects = [];
    let projectList = [];

    projectDirs.forEach((project) => {
        if (fs.lstatSync(`projects/${ project }`).isDirectory()){
            let configFilePath = `${ __dirname }/../projects/${ project }/config.json`;

            if (fs.existsSync(configFilePath)){
                projectList.push(`projects/${ project }`);
            } else {
                const projectSubfolders = fs.readdirSync(`projects/${ project }`);
                projectList = projectList.concat(projectSubfolders.map((subfolder) => {
                    if (fs.lstatSync(`projects/${ project }/${ subfolder }`).isDirectory()){
                      return `projects/${ project }/${ subfolder }`;
                  } else {
                      return null;
                  }
              }));
            }
        }
    });

    projects = projectList.map((project) => {
        const configFilePath = `${ __dirname  }/../${ project }/config.json`;
        let config, configJSON = {};

        if (fs.existsSync(configFilePath)){
            config = fs.readFileSync(configFilePath, 'utf8');
            configJSON = JSON.parse(config);
        }

        return {
            path: project,
            title: configJSON.title,
            draft: configJSON.draft,
            description: configJSON.description,
            publish_date: configJSON.publish_date,
        }
    });

    projects = projects.filter((project) => {
        return !project.draft && project.title && project.title !== 'Project title' && project.description;
    });

    projects = sortArrayOfObjects(projects, 'publish_date', true);

    const projectPaths = getRequestPaths(req);

    if (req.query.format && req.query.format.toLowerCase() === 'json'){
        res.json(projects);
    } else {
        res.render('../views/home.handlebars', {
            title: process.env.PROJECT_NAME,
            description: process.env.PROJECT_DESCRIPTION,
            sc_project: process.env.SC_PROJECT,
            sc_security: process.env.SC_SECURITY,
            appURL: projectPaths.appURL,
            projects: projects,
            criticalCss: fs.readFileSync(`${ __dirname  }/../public/css/critical.min.css`, 'utf8'),
            timestamp: Date.now()
        });
    }

});

router.all('/projects/*', (req, res, next) => {
    const projectPaths = getRequestPaths(req);

    if (projectPaths.project.indexOf('images') > -1 || projectPaths.project.indexOf('data') > -1){
        res.sendFile(path.resolve(`projects/${ projectPaths.project }`));
    } else {
        fs.access(`./projects/${ projectPaths.project }`, (error) => {
            if (error) {
                console.log('error', error);
                return next();
            } else {
                const configFilePath = `${ __dirname  }/../projects/${ projectPaths.project }/config.json`;
                let config, configJSON = {};

                if (fs.existsSync(configFilePath)){
                    config = fs.readFileSync(configFilePath, 'utf8');
                    configJSON = JSON.parse(config);
                }

                let projectDataObject = {
                    title: configJSON.title,
                    description: configJSON.description,
                    criticalCss: fs.readFileSync(`${ __dirname  }/../public/css/critical.min.css`, 'utf8'),
                    project: projectPaths.project,
                    dependencies: fs.readFileSync(`${ __dirname  }/../projects/${projectPaths.project}/dependencies.html`, 'utf8'),
                    projectURLencoded: encodeURI(`${projectPaths.appURL}projects/${projectPaths.project}` ),
                    sc_project: process.env.SC_PROJECT,
                    sc_security: process.env.SC_SECURITY,
                    appURL: projectPaths.appURL,
                    reqUrlFull: projectPaths.reqUrlFull,
                    timestamp: Date.now()
                };

                if (configJSON.data && configJSON.data.length){
                    configJSON.data.forEach(data => {
                        const dataPath = data.split('/');
                        const fileName = dataPath[dataPath.length - 1].split('.')[0].replace(/-/g, '_');
                        const fileExtension = dataPath[dataPath.length - 1].split('.').slice(-1);

                        let fileData = fs.readFileSync(`${ __dirname  }/../public/data/${data}`, 'utf8');

                        if (fileExtension == 'json'){
                            fileData = JSON.parse(fileData);
                        }

                        console.log(fileName);
                        projectDataObject[`data_${fileName}`] = fileData;
                    });
                }

                res.render(`${ __dirname  }/../projects/${ projectPaths.project }/content.handlebars`, projectDataObject);
            }
        });
    }
});

export default router;