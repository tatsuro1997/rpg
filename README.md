## Overview

人生の豊かさは過去の経験によって大きく変わるという『[DIE WITH ZERO](https://amzn.asia/d/0TnGUgI)』からの着想。
人生の経験値を可視化し、成長や豊かな人生促進に寄与することが開発者の意図である。

## Getting Started

First, create node_modules:

```bash
npm i
```

Second, set up server:

```bash
make up
```

Third, run the development server:

```bash
make bash
```

use next server:

```bash
npm run dev
```

prisma setup:

```bash
npx prisma migrate dev --name init
```

check prisma studio:

```bash
npx prisma studio
```

visit: [http://localhost:5555](http://localhost:555)

## Stack

| Stack | Version |
| ---- | ---- |
| Next.js / TypeScript | 14.2.3 / 5 |
| [Chart.js](https://github.com/chartjs/Chart.js) | 4.4.3 |
