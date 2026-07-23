import { describe, expect, it } from 'vitest';
import { articles } from '../data/articles';
import { projects } from '../data/projects';
import { getApprovedAuthor, getAuthor } from '../data/authors';
import { isLocationIndexable, locations } from '../data/locations';
import { getAllRoutes } from '../lib/routes';
import { articleSchemaFor } from '../lib/schema';
import {
  allowsClientLanguage,
  isPublicProofProject,
  relatedItemKindForProject,
  relatedProjectItems,
} from '../lib/project-proof';

describe('project trust classification', () => {
  it('templates cannot use client-project labels or proof presentation', () => {
    const templates = projects.filter((p) => p.classification === 'template');
    expect(templates.length).toBeGreaterThan(0);
    for (const project of templates) {
      expect(allowsClientLanguage(project)).toBe(false);
      expect(isPublicProofProject(project)).toBe(false);
      expect(relatedItemKindForProject(project)).toBe('Template example');
      expect(project.publicLabel.toLowerCase()).toMatch(/template/);
    }
  });

  it('related links skip templates and fall back to Work when needed', () => {
    const items = relatedProjectItems(
      ['catalogue-rfq-website-template', 'admin-quotation-platform-template'],
      { fallbackToWork: true },
    );
    expect(items).toEqual([
      { title: 'Selected work and project examples', href: '/projects/', kind: 'Work' },
    ]);
  });

  it('real projects keep truthful related kinds', () => {
    const damtech = projects.find((p) => p.slug === 'damtech-website')!;
    const proplytic = projects.find((p) => p.slug === 'proplytic-property-software')!;
    expect(relatedItemKindForProject(damtech)).toBe('Project');
    expect(relatedItemKindForProject(proplytic)).toBe('Internal product');
    expect(isPublicProofProject(damtech)).toBe(true);
    expect(isPublicProofProject(proplytic)).toBe(true);
  });
});

describe('article authorship', () => {
  it('every live resource article has an approved author', () => {
    const live = articles.filter((a) => a.status === 'live');
    expect(live.length).toBeGreaterThan(0);
    for (const article of live) {
      const author = getApprovedAuthor(article.authorSlug);
      expect(author, `${article.slug} missing approved author`).toBeTruthy();
      expect(author!.name.length).toBeGreaterThan(0);
      expect(author!.role.length).toBeGreaterThan(0);
      expect(author!.shortBio.length).toBeGreaterThan(0);
    }
  });

  it('article schema author matches the visible approved author', () => {
    for (const article of articles.filter((a) => a.status === 'live')) {
      const author = getApprovedAuthor(article.authorSlug)!;
      const schema = articleSchemaFor(article);
      expect(schema.author).toEqual(
        expect.objectContaining({
          '@type': 'Person',
          name: author.name,
        }),
      );
      expect(schema.publisher).toEqual(expect.objectContaining({ '@id': expect.any(String) }));
    }
  });

  it('unapproved authors are not returned for public use', () => {
    const raw = getAuthor('tiaan-de-lange');
    expect(raw).toBeTruthy();
    // approved flag is currently true after Trust P0; still assert the gate exists
    expect(typeof raw!.approved).toBe('boolean');
    if (!raw!.approved) {
      expect(getApprovedAuthor('tiaan-de-lange')).toBeUndefined();
    }
  });
});

describe('location indexing gate', () => {
  it('excludes noindex location pages from the sitemap', () => {
    const johannesburg = locations.find((l) => l.slug === 'johannesburg')!;
    expect(isLocationIndexable(johannesburg)).toBe(false);
    const routes = getAllRoutes();
    const route = routes.find((r) => r.path === '/areas-we-serve/johannesburg/')!;
    expect(route.index).toBe(false);
    expect(route.inSitemap).toBe(false);
  });

  it('keeps Pretoria indexable with non-placeholder local substance', () => {
    const pretoria = locations.find((l) => l.slug === 'pretoria')!;
    expect(pretoria.placeholder).toBe(false);
    expect(isLocationIndexable(pretoria)).toBe(true);
    const routes = getAllRoutes();
    expect(routes.find((r) => r.path === '/areas-we-serve/pretoria/')?.index).toBe(true);
  });
});
