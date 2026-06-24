import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { localizeInternalHref } from './localize-internal-href';

describe('localizeInternalHref', () => {
  it('prefixes clean internal paths with the active locale', () => {
    assert.equal(localizeInternalHref('/solutions', 'ar'), '/ar/solutions');
    assert.equal(localizeInternalHref('solutions', 'en'), '/en/solutions');
    assert.equal(
      localizeInternalHref('/contact#demo', 'ar'),
      '/ar/contact#demo',
    );
    assert.equal(localizeInternalHref('/', 'ar'), '/ar');
  });

  it('preserves non-route links and already localized paths', () => {
    assert.equal(localizeInternalHref('/en/contact', 'ar'), '/en/contact');
    assert.equal(
      localizeInternalHref('https://example.com', 'ar'),
      'https://example.com',
    );
    assert.equal(
      localizeInternalHref('mailto:test@example.com', 'ar'),
      'mailto:test@example.com',
    );
    assert.equal(localizeInternalHref('tel:+123', 'ar'), 'tel:+123');
    assert.equal(localizeInternalHref('#section', 'ar'), '#section');
    assert.equal(localizeInternalHref('?tab=pricing', 'ar'), '?tab=pricing');
  });
});
