import { dirname } from "path";
import { fileURLToPath } from "url";
import moduleAlias from "module-alias";

const __dirname = dirname(fileURLToPath(import.meta.url));

moduleAlias.addAliases({
  "@": dirname(__dirname),
});

export default moduleAlias;
