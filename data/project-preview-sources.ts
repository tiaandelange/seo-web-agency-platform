export type ProjectPreviewId = 'damtech' | 'proplytic' | 'wedding';

export type ProjectPreviewSource = {
  id: ProjectPreviewId;
  projectName: string;
  repositoryFullName: string | null;
  /** Dev-only relative folder name under the local GitHub directory — never rendered. */
  localSourceFolder?: string;
  sourceBranch: string;
  sourceCommit: string;
  sourceRoute: string;
  sourceFiles: string[];
  assetFiles: string[];
  importedAt: string;
  adaptationNotes: string[];
};

/**
 * Development provenance only — not rendered in public HTML.
 * Do not put absolute Windows paths in public page content.
 */
export const projectPreviewSources: ProjectPreviewSource[] = [
  {
    id: 'damtech',
    projectName: 'Damtech website',
    repositoryFullName: null,
    localSourceFolder: 'Damtech-Website',
    sourceBranch: 'main',
    sourceCommit: 'a96ab2ea7eb16b21629144fb05e7b1fda97d5d50',
    sourceRoute: '/',
    sourceFiles: [
      'components/Header.tsx',
      'components/HomeHero.tsx',
      'app/globals.css',
      'components/projects/project-preview/damtech/damtech-source-markup.ts',
      'components/projects/project-preview/damtech/damtech-homepage-frame.tsx',
      'components/projects/project-preview/damtech/damtech-preview.css',
      'components/projects/project-preview/damtech/damtech-preview.tsx',
    ],
    assetFiles: ['public/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp'],
    importedAt: '2026-07-23',
    adaptationNotes: [
      'Header and hero HTML extracted from local Damtech-Website Next.js SSR (commit a96ab2ea).',
      'Styles extracted from local turbopack CSS chunk and scoped under .damtechPreviewRoot.',
      'Hero image copied from Damtech-Website/public/images into public/project-previews/damtech/.',
      'Header position changed from fixed to absolute for preview containment.',
      'Links, buttons and tel/mailto actions neutralised; preview is aria-hidden and inert.',
      'Trust chips retained as part of the source hero; sections below the hero excluded.',
      'Desktop/mobile compositions forced via [data-preview-mode] because media queries use the browser viewport.',
    ],
  },
  {
    id: 'proplytic',
    projectName: 'Proplytic marketing site',
    repositoryFullName: null,
    localSourceFolder: 'PropertyGuy',
    sourceBranch: 'main',
    sourceCommit: 'ab25f63ecb0b944232e0137cce4fc8bdc5a00cbf',
    sourceRoute: '/',
    sourceFiles: [
      'frontend/src/components/home/marketing/HomeMarketingHero.tsx',
      'frontend/src/styles/global.css',
      'components/projects/project-preview/proplytic/proplytic-source-markup.ts',
      'components/projects/project-preview/proplytic/proplytic-homepage-frame.tsx',
      'components/projects/project-preview/proplytic/proplytic-preview.css',
      'components/projects/project-preview/proplytic/proplytic-preview.tsx',
    ],
    assetFiles: [
      'public/project-previews/proplytic/proplytic_logo_600x200_nobg_light.png',
      'public/project-previews/proplytic/proplytic_logo_600x200_nobg.png',
      'public/project-previews/proplytic/proplytic_icon_500x500.png',
    ],
    importedAt: '2026-07-23',
    adaptationNotes: [
      'Local PropertyGuy worktree was dirty (financialMetrics.ts) and 12 commits behind origin; used local HEAD ab25f63 without reset/stash.',
      'Preview markup/styles align with HomeMarketingHero + marketing header (Proplytic branding).',
      'No Supabase, auth, or live property APIs — dashboard sample data is static demonstration content.',
      'Links and controls neutralised; preview is aria-hidden and inert.',
      'Desktop two-column hero forced in desktop mode; mobile copy/dashboard variants in mobile mode.',
      'Uniform scale via ProjectPreviewViewport prevents card-width reflow compression.',
    ],
  },
  {
    id: 'wedding',
    projectName: 'Wedding website',
    repositoryFullName: null,
    localSourceFolder: 'Wedding_site',
    sourceBranch: 'main',
    sourceCommit: '359ad704df4c8c74058c416857d6ce3211af017b',
    sourceRoute: '/',
    sourceFiles: [
      'index.html',
      'styles.css',
      'components/projects/project-preview/wedding/wedding-preview.tsx',
      'components/projects/project-preview/wedding/wedding-preview.css',
    ],
    assetFiles: [
      'public/project-previews/wedding/hero-1.webp',
      'public/project-previews/wedding/mobile-hero-1.webp',
    ],
    importedAt: '2026-07-23',
    adaptationNotes: [
      'Header and hero rebuilt from Wedding_site index.html + styles.css (commit 359ad704).',
      'Navigation links converted to inert spans; mobile menu stays closed in preview.',
      'Desktop uses hero-1.webp; mobile mode uses mobile-hero-1.webp and source mobile nav treatment.',
      'RSVP and all sections below the hero excluded.',
      'Pauline Signature approximated via next/font Allura for portfolio preview.',
    ],
  },
];

export function previewSourceById(id: ProjectPreviewId): ProjectPreviewSource {
  const source = projectPreviewSources.find((entry) => entry.id === id);
  if (!source) throw new Error(`Unknown preview source: ${id}`);
  return source;
}
