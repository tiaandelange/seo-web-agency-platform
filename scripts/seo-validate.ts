/**
 * SEO validator CLI — run with `npm run validate:seo`.
 * Shared engine: lib/validate.ts (also exercised by tests/validation.test.ts).
 * Exits 1 on errors so it can gate CI/builds.
 */
import { runAllValidations } from '../lib/validate';
import { getAllRoutes } from '../lib/routes';

function main(): void {
  const report = runAllValidations();
  const routes = getAllRoutes();
  const indexable = routes.filter((r) => r.index).length;

  console.log('SEO validation report');
  console.log('=====================');
  console.log(`Routes: ${routes.length} total, ${indexable} indexable, ${routes.length - indexable} noindex`);
  console.log('');

  if (report.warnings.length > 0) {
    console.log(`Warnings (${report.warnings.length}):`);
    for (const w of report.warnings) console.log(`  ⚠ ${w}`);
    console.log('');
  }

  if (report.errors.length > 0) {
    console.log(`Errors (${report.errors.length}):`);
    for (const e of report.errors) console.log(`  ✖ ${e}`);
    console.log('');
    console.log('FAILED — fix the errors above before shipping.');
    process.exit(1);
  }

  console.log('PASSED — no errors.');
}

main();
