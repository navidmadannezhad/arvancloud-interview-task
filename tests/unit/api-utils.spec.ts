import { test, expect } from '@playwright/test';
import { DEFAULT_PAGINATION } from '@/src/configs/constants';
import { getParametrizedUrl } from '@/src/utils/api-utils';

test.describe('getParametrizedUrl', () => {
  test('returns the base url when params are empty', () => {
    expect(getParametrizedUrl('/api/posts/tags', {})).toBe('/api/posts/tags');
  });

  test('adds pagination query params', () => {
    expect(
      getParametrizedUrl('/api/posts/user/1', { page: 2, pageSize: 5 }),
    ).toBe('/api/posts/user/1?limit=5&skip=5');
  });

  test('uses default page size for skip when pageSize is omitted', () => {
    expect(getParametrizedUrl('/api/posts/user/1', { page: 3 })).toBe(
      `/api/posts/user/1?skip=${(3 - 1) * DEFAULT_PAGINATION.pageSize}`,
    );
  });

  test('merges existing query params and adds extra filters', () => {
    expect(
      getParametrizedUrl('/api/posts/tags?sortBy=name', {
        page: 1,
        pageSize: 10,
        search: 'react',
      }),
    ).toBe('/api/posts/tags?sortBy=name&limit=10&skip=0&search=react');
  });

  test('ignores null and undefined extra params', () => {
    expect(
      getParametrizedUrl('/api/posts/tags', {
        search: 'react',
        tag: null,
        category: undefined,
      }),
    ).toBe('/api/posts/tags?search=react');
  });
});
