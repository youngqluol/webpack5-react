import React from 'react';

type ReportParams = {
  url?: string;
  search?: Record<string, any>;
  onSuccess?: () => void;
  onError?: () => void;
};

const noop = () => {};

const REPORT_URL = 'report';

function report(params: ReportParams) {
  if (!params.search) return;
  const { url = REPORT_URL, search = {}, onSuccess, onError } = params;

  const srcUrl = `${url}${genSearch(search)}`;

  const img = new Image();
  img.onload = onSuccess ?? noop;
  img.onerror = onError ?? noop;
  img.src = srcUrl;
}

function genSearch(data: Record<string, any>, prefix = true): string {
  const searchSet = [];
  // eslint-disable-next-line guard-for-in
  for (const key in data) {
    const value = data[key];
    searchSet.push(`${key}=${isDef(value) ? encodeURIComponent(value) : ''}`);
  }
  let result = searchSet.join('&');
  if (result && prefix) return `?${result}`;
  return result;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

export { report };
