/**
 * Scope source-site CSS under a preview root class without breaking @-rules.
 * Converts :root/html/body to the preview root; recurses into @media/@layer/@supports.
 */

export function scopeSelectorList(selector, rootClass) {
  return selector
    .split(',')
    .map((part) => {
      const piece = part.trim();
      if (!piece) return part;
      if (piece === 'html' || piece === 'body' || piece === ':root') return `.${rootClass}`;
      if (piece.startsWith(`.${rootClass}`)) return piece;
      return `.${rootClass} ${piece}`;
    })
    .join(', ');
}

export function stripPreviewFontFaces(css) {
  let result = '';
  let i = 0;

  while (i < css.length) {
    if (css.slice(i, i + 10) === '@font-face') {
      while (i < css.length && css[i] !== '{') i += 1;
      if (i >= css.length) break;
      i += 1;
      let depth = 1;
      while (i < css.length && depth > 0) {
        if (css[i] === '{') depth += 1;
        else if (css[i] === '}') depth -= 1;
        i += 1;
      }
      continue;
    }
    result += css[i];
    i += 1;
  }

  return result;
}

export function repairScopedCss(css, rootClass) {
  return css
    .replace(new RegExp(`\\.${rootClass} @layer`, 'g'), '@layer')
    .replace(new RegExp(`@\\.${rootClass} media`, 'g'), '@media')
    .replace(new RegExp(`@\\.${rootClass} supports`, 'g'), '@supports');
}

export function scopeCss(css, rootClass) {
  let result = '';
  let i = 0;

  while (i < css.length) {
    if (css[i] === '@') {
      const atStart = i;
      let j = i + 1;
      while (j < css.length && css[j] !== '{' && css[j] !== ';') j += 1;

      if (j < css.length && css[j] === ';') {
        result += css.slice(atStart, j + 1);
        i = j + 1;
        continue;
      }

      while (i < css.length && css[i] !== '{') i += 1;
      if (i >= css.length) {
        result += css.slice(atStart);
        break;
      }
      const atHead = css.slice(atStart, i).trim();
      i += 1;
      const innerStart = i;
      let depth = 1;
      while (i < css.length && depth > 0) {
        if (css[i] === '{') depth += 1;
        else if (css[i] === '}') depth -= 1;
        i += 1;
      }
      const inner = css.slice(innerStart, i - 1);

      if (/^@keyframes\b/.test(atHead)) {
        const name = atHead.replace(/^@keyframes\s+/, '').trim();
        result += `@keyframes ${rootClass}__${name}{${inner}}`;
      } else if (/^@(media|layer|supports)\b/.test(atHead)) {
        result += `${atHead}{${scopeCss(inner, rootClass)}}`;
      } else {
        result += `${atHead}{${inner}}`;
      }
      continue;
    }

    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) {
      result += css.slice(i);
      break;
    }

    const selector = css.slice(i, braceIdx);
    i = braceIdx + 1;
    let depth = 1;
    const bodyStart = i;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth += 1;
      else if (css[i] === '}') depth -= 1;
      i += 1;
    }
    const body = css.slice(bodyStart, i - 1);
    result += `${scopeSelectorList(selector, rootClass)}{${body}}`;
  }

  return repairScopedCss(
    result.replace(new RegExp(`\\.${rootClass}\\s+\\.${rootClass}`, 'g'), `.${rootClass}`),
    rootClass,
  );
}
