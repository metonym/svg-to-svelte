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

type ModuleNames = string[];

export async function generateFromFolder(
  source_folder: string,
  folder: string = "lib",
  options: {
    clean?: boolean;
    onModuleName?: (moduleName: string) => string;
  } = {}
) {
  if (options.clean !== false) {
    await cleanDir(folder);
  }

  const start = performance.now();
  const moduleNames: string[] = [];
  const imports: string[] = [];
  const files = await readdir(path.join(process.cwd(), source_folder));
  const generatedFiles = new Set<string>();

  files
    .filter((file) => file.endsWith(".svg"))
    .forEach(async (file) => {
      const filePath = path.join(process.cwd(), source_folder, file);

      let moduleName = toModuleName(path.basename(filePath));

      if (generatedFiles.has(moduleName)) {
        process.stdout.write(`"${moduleName}" already exists.\n`);
        return;
      }

      try {
        const source = fs.readFileSync(filePath, "utf-8");
        const template = toSvelte(source).template;

        generatedFiles.add(moduleName);

        if (options.onModuleName) {
          moduleName = options.onModuleName(moduleName);
        }

        moduleNames.push(moduleName);
        imports.push(`export { ${moduleName} } from "./${moduleName}";`);

        const moduleFolder = path.join(process.cwd(), folder, moduleName);

        fs.mkdirSync(moduleFolder);
        fs.writeFileSync(
          path.join(moduleFolder, "index.js"),
          `import ${moduleName} from "./${moduleName}.svelte";\nexport { ${moduleName} };\nexport default ${moduleName};`
        );
        fs.writeFileSync(
          path.join(moduleFolder, `${moduleName}.svelte`),
          template
        );
      } catch (e) {
        process.stdout.write(
          `Failed to generate "${moduleName}." Omitting...\n`
        );
      }
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

export async function generateIndex(opts: {
  title?: string;
  pkgName: string;
  pkgVersion: string;
  moduleNames: ModuleNames;
  outputFile?: string;
  libraryFolder?: string;
}) {
  const moduleNames = opts.moduleNames || [];
  const index = `# ${opts.title || "Icon Index"}\n
> ${moduleNames.length} icons from ${opts.pkgName}@${opts.pkgVersion}.\n
## Usage\n
\`\`\`html
<script>
  import Icon from "${opts.pkgName}/${
    opts.libraryFolder || "lib"
  }/{ModuleName}";
</script>

<Icon />
\`\`\`\n
## Icons by \`ModuleName\`\n
${moduleNames.map((name) => `- ${name}`).join("\n")}\n`;

  if (opts.outputFile !== undefined) {
    await writeFile(opts.outputFile, index);
  }

  return { index };
}
