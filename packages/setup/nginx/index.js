#!/usr/bin/env node
const commander = require("commander");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const program = new commander.Command();

function compileAndCall(templateAbsolutePath, templateOptions = {}) {
  const templateContents = fs.readFileSync(templateAbsolutePath, "utf-8");
  const template = handlebars.compile(templateContents);

  return template(templateOptions);
}

program
  .name("project-setup-app-server")
  .description("Setup web app files in Docker container running Nginx")
  .requiredOption("--http-server-name <name>", "Server name to use for nginx config")
  .requiredOption("--output-dir <dir>", "Directory where output files will be placed")
  .action((command) => {
    const options = command.opts();
    const configTemplateFilePath = path.join(__dirname, "templates/default.conf.hbs");
    const entrypointTemplateFilePath = path.join(__dirname, "templates/entrypoint.sh.hbs");

    const nginxConfig = compileAndCall(configTemplateFilePath, {
      httpServerName: options.httpServerName,
    });

    const entrypoint = compileAndCall(entrypointTemplateFilePath);

    const outputDir = path.join(process.cwd(), options.outputDir);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "default.conf.template"), nginxConfig, "utf-8");
    fs.writeFileSync(path.join(outputDir, "entrypoint.sh"), entrypoint, "utf-8");
  });

program.parse(process.argv);
