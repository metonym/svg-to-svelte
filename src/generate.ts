import * as fs from "fs";
import * as path from "path";
import { toModuleName } from "./utils";
import { toSvelte } from "./to-svelte";
import { performance } from "perf_hooks";
import { format } from "prettier";

export function cleanDir(folder: string) {
  const dir = path.join(process.cwd(), folder);

  fs.rmdirSync(dir, { recursive: true });
  fs.mkdirSync(dir);
}

export function generate(
  filePath: string,
  folder: string,
  options: Options = {}
) {
  let moduleName = toModuleName(path.basename(filePath));

  if (options.onModuleName) {
    moduleName = options.onModuleName(moduleName);
  }

  const moduleFolder = path.join(process.cwd(), folder, moduleName);

  fs.mkdirSync(moduleFolder);

  const source = fs.readFileSync(filePath).toString();

  fs.writeFileSync(
    path.join(moduleFolder, `${moduleName}.svelte`),
    toSvelte(source).template
  );

  fs.writeFileSync(
    path.join(moduleFolder, "index.js"),
    format(
      `import ${moduleName} from "./${moduleName}.svelte"; export { ${moduleName} }; export default ${moduleName};`,
      { parser: "babel" }
    )
  );

  return {
    moduleName,
    rootExport: `export { ${moduleName} } from "./${moduleName}";`,
  };
}

interface Options {
  clean?: boolean;
  onModuleName?: (moduleName: string) => string;
}

export function generateFromFolder(
  source_folder: string,
  folder: string = "lib",
  options: Options = {}
) {
  if (options.clean) {
    cleanDir(folder);
  }

  const start = performance.now();
  const moduleNames: string[] = [];

  const imports = fs
    .readdirSync(path.join(process.cwd(), source_folder))
    .filter((file) => file.endsWith(".svg"))
    .map((file) => {
      const { moduleName, rootExport } = generate(
        path.join(process.cwd(), source_folder, file),
        folder,
        options
      );

      moduleNames.push(moduleName);

      return rootExport;
    });

  fs.writeFileSync(
    path.join(process.cwd(), folder, "index.js"),
    format(imports.join(""), { parser: "babel" })
  );

  process.stdout.write(
    `⚡ Converted ${imports.length} SVG files in ${(
      (performance.now() - start) /
      1000
    ).toFixed(2)}s.` + "\n"
  );

  return { moduleNames };
}
