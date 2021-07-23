---
sidebar_position: 1
---

# Introduction

The Kanvas SDK library provides access to the Kanvas API from JavaScript related applications.

## Requirements

Node 10+.

## Installation

```bash
npm install @kanvas/js-sdk
```

## Usage

The SDK needs to be configured with your application key and your API base url.

```js
import KanvasSDK from '@kanvas/js-sdk';

const client = new KanvasSDK({
  appKey: 'e90d5f51-d9e2-4c5e-9183-8313e30c6da3',
  baseUrl: 'https://api.domain.com/v2'
});

client.users.getById(1).then((response) => {
  // do something
});
```