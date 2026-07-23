import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(rel: string): string {
  return readFileSync(join(root, rel), 'utf8');
}

describe('structure & theme audit fixes', () => {
  it('promotes listing card titles to h2 with text-card-title', () => {
    const cards = read('components/cards.tsx');
    expect(cards).toContain('<h2 className="text-card-title text-ink">');
    expect(cards).not.toMatch(/<h3 className="text-base font-semibold text-ink">/);
  });

  it('keeps contact process label off heading elements', () => {
    const panel = read('components/contact/contact-route-panel.tsx');
    expect(panel).toContain('<p className="text-label text-muted">What happens next</p>');
    expect(panel).not.toMatch(/<h3[^>]*>What happens next<\/h3>/);
  });

  it('formalises article section title token', () => {
    const css = read('app/globals.css');
    expect(css).toContain('--text-section-title-article');
    expect(css).toContain('.text-section-title-article');
    expect(css).toContain('--width-form');
  });

  it('uses a single editorial display role on the home hero', () => {
    const hero = read('components/home/home-hero.tsx');
    expect(hero).toContain('<header className="home-hero');
    expect(hero).toContain('text-display-editorial home-hero-title');
    expect(hero).not.toContain('text-display-marketing home-hero-title');
  });

  it('avoids an extra nav landmark on the services hub architecture', () => {
    const arch = read('components/services/capability-architecture.tsx');
    expect(arch).not.toMatch(/<nav[^>]*aria-label="All services"/);
    expect(arch).toContain('All services');
  });
});
