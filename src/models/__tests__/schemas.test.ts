import { describe, expect, it } from 'vitest';
import { websiteDomainSchema } from '../schemas';

describe('websiteDomainSchema', () => {
  it.each([
    ['meetpete.com', 'meetpete.com'],
    ['www.meetpete.co.uk', 'www.meetpete.co.uk'],
    ['https://Example.com/services?from=scan', 'example.com'],
    ['http://sub-domain.example.org/', 'sub-domain.example.org'],
  ])('normalises %s to %s', (input, expected) => {
    expect(websiteDomainSchema.parse(input)).toBe(expected);
  });

  it.each([
    'anything',
    'not a domain',
    'hello@example.com',
    'https://example',
    'ftp://example.com',
    'https://example..com',
    'https://-example.com',
    'https://example.c',
  ])('rejects %s', (input) => {
    expect(websiteDomainSchema.safeParse(input).success).toBe(false);
  });
});
