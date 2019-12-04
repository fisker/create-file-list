# create-file-list

[![gzip size](http://img.badgesize.io/https://unpkg.com/create-file-list/dist/create-file-list.min.mjs?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/create-file-list/dist/)
[![downloads](https://img.shields.io/npm/dm/create-file-list.svg?style=flat-square)](https://www.npmtrends.com/create-file-list)
[![module formats: umd, cjs, and es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/create-file-list/dist/)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/create-file-list/badge)](https://www.jsdelivr.com/package/npm/create-file-list)

[![Build Status](https://img.shields.io/travis/fisker/create-file-list.svg?style=flat-square)](https://travis-ci.org/fisker/create-file-list)
[![Code Coverage](https://img.shields.io/codecov/c/github/fisker/create-file-list.svg?style=flat-square)](https://codecov.io/github/fisker/create-file-list)
[![MIT License](https://img.shields.io/npm/l/create-file-list.svg?style=flat-square)](https://github.com/fisker/create-file-list/blob/master/license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> create FileList

## Install

```sh
yarn add create-file-list
```

## Usage

```html
<script type="module">
  import createFileList from 'https://unpkg.com/create-file-list?module'

  createFileList(file1, [file2], file3)
</script>

<!-- legacy browsers -->
<script nomodule src="https://unpkg.com/create-file-list"></script>
<script nomodule>
  createFileList(file1, [file2], file3)
</script>
```

## API

createFileList([value1[, value2[, ...[, valueN]]]])

### valueN

File or Array&lt;File&gt;
