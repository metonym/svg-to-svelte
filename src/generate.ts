import * as fs from "fs";
import * as path from "path";
import { toModuleName } from "./utils";
import { toSvelte } from "./to-svelte";
import { performance } from "perf_hooks";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export async function cleanDir(folder: string) {
  const dir = path.join(process.cwd(), folder);

  await rmdir(dir, { recursive: true });
  await mkdir(dir);
}

interface Options {
  clean?: boolean;
  onModuleName?: (moduleName: string) => string;
}

export async function generateFromFolder(
  source_folder: string,
  folder: string = "lib",
  options: Options = {}
) {
  if (options.clean) {
    cleanDir(folder);
  }

  const start = performance.now();
  const moduleNames: string[] = [];
  const imports: string[] = [];
  const files = await readdir(path.join(process.cwd(), source_folder));

  files
    .filter((file) => file.endsWith(".svg"))
    .forEach(async (file) => {
      const filePath = path.join(process.cwd(), source_folder, file);

      let moduleName = toModuleName(path.basename(filePath));

      if (options.onModuleName) {
        moduleName = options.onModuleName(moduleName);
      }

      const moduleFolder = path.join(process.cwd(), folder, moduleName);

      await mkdir(moduleFolder);

      const source = await readFile(filePath, "utf-8");

      await writeFile(
        path.join(moduleFolder, `${moduleName}.svelte`),
        toSvelte(source).template
      );
      await writeFile(
        path.join(moduleFolder, "index.js"),
        `import ${moduleName} from "./${moduleName}.svelte";\nexport { ${moduleName} };\nexport default ${moduleName};`
      );

      moduleNames.push(moduleName);
      imports.push(`export { ${moduleName} } from "./${moduleName}";`);
    });

  await writeFile(
    path.join(process.cwd(), folder, "index.js"),
    imports.join("\n")
  );

  process.stdout.write(
    `⚡ Converted ${imports.length} SVG files in ${(
      (performance.now() - start) /
      1000
    ).toFixed(2)}s.` + "\n"
  );

  return { moduleNames };
}
