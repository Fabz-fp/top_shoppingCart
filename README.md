# React Shopping Cart

A responsive shopping cart application built with React as part of The Odin Project React curriculum.

## Live Demo

[Live Demo](https://top-shoppingcartffp.netlify.app)

## Features

- Browse products fetched from the Fake Store API
- View featured products on the home page
- Add products to the cart with a chosen quantity
- Increase and decrease cart item quantities
- Remove products from the cart
- View individual item prices and subtotals
- View the total cost of the cart
- Live cart item count in the navigation
- Read More / Read Less product descriptions
- Responsive layout for desktop and mobile
- Loading and error states when fetching products

## Technologies

- React
- Vite
- React Router
- React Context
- `useReducer`
- React Testing Library
- Vitest
- CSS
- Fake Store API
- pnpm

## Getting Started

Clone the repository and install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Create production build:

```bash
pnpm run build
```

The project includes unit and integration tests:

```bash
pnpm exec vitest --run
```