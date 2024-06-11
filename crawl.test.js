import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";


test('normalize https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('normalize http://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize http://blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('normalize https://blog.boot.dev/path?query=123#fragment', () => {
    expect(normalizeURL('https://blog.boot.dev/path?query=123#fragment')).toBe('blog.boot.dev/path');
});

test('normalize https://blog.boot.dev:8080/path/', () => {
    expect(normalizeURL('https://blog.boot.dev:8080/path/')).toBe('blog.boot.dev/path');
});

test('normalize HttpS://blog.boot.dev/path/', () => {
    expect(normalizeURL('HttpS://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize https://BlOg.BooT.Dev/path/', () => {
    expect(normalizeURL('https://BlOg.BooT.Dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize https://blog.boot.dev//path/', () => {
    expect(normalizeURL('https://blog.boot.dev//path/')).toBe('blog.boot.dev/path');
});

test('normalize   https://blog.boot.dev/path/   ', () => {
    expect(normalizeURL('  https://blog.boot.dev/path/  ')).toBe('blog.boot.dev/path');
});
