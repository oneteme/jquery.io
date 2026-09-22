# JavaQuery

JavaQuery is a Java framework that simplifies database querying.

Instead of manually writing the SQL structure needed to retrieve data, you describe **what data you want and what you want to do with it**, and JQuery handles the query construction.

> **You say what you want. JQuery handles the query.**

## Important: JQuery is not jQuery

JQuery is **not** [jQuery](https://jquery.com/), the JavaScript library.

- **jQuery** is a JavaScript library used mainly for web development.
- **JQuery** is a Java framework for working with database queries.

The two projects are completely unrelated.

## The main idea

With JQuery, you can describe database operations directly on your columns.

For example:

```scss
price.avg
```

means that you want the average price.

```scss
orderDate.year
```

means that you want the year from the order date.

```scss
price.pow(2)
```

means that you want to raise the price to the power of 2.

You describe the operation, and JQuery handles the SQL required to perform it.

## Why JQuery?

SQL can become complicated when a query requires more than a simple `SELECT`.

A single requirement can involve:

- `SELECT`
- `WHERE`
- `GROUP BY`
- `HAVING`
- `JOIN`
- subqueries
- CTEs
- window functions
- aggregations
- date functions
- calculations

JQuery provides an abstraction over this SQL structure.

This means you can focus on the **data requirement** instead of manually building every part of the SQL query.

## Simple example

Suppose you have a `PRODUCTS_TABLE` containing:

```sql
PRODUCT_ID
PRODUCT_NAME
CATEGORY_ID
UNIT
PRICE
```

To retrieve the product name and price:

```scss
name,price
```

To calculate the average price:

```scss
price.avg
```

To filter products by price:

```scss
price.gt=20
```

The framework uses these operations to construct the corresponding database query.

# Query operations

JQuery supports many common database operations.

### Aggregations

```scss
price.avg
price.count
price.sum
price.min
price.max
```

### Mathematical operations

```scss
price.abs
price.ceil
price.floor
price.round
price.sqrt
price.pow(2)
```

### Date operations

```scss
orderDate.year
orderDate.month
orderDate.day
orderDate.week
```

### String operations

```scss
unit.replace(bottles,bags)
name.ilike=chai
```

### Window functions

```scss
rank
rowNumber
denseRank
```

These operations can require additional SQL structures such as `OVER`, `PARTITION BY`, or CTEs. JQuery handles the query structure needed for the operation.

## Joins

JQuery also supports relationships between tables.

For example, the demo database contains:

```sql
CUSTOMERS_TABLE
ORDERS_TABLE
EMPLOYEES_TABLE
SHIPPERS_TABLE
PRODUCTS_TABLE
CATEGORIES_TABLE
SUPPLIERS_TABLE
ORDERS_DETAILS_TABLE
```

These tables can be connected using joins.

JQuery supports common join types such as:

- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN`
- multiple joins
- self joins

This allows you to work with related data without manually constructing the complete SQL join structure.

### Other functions (Made by JARVIS)

```scss
orderDate.semester
orderDate.quarter
orderDate.yearSemester
orderDate.yearQuarter
orderDate.yearMonth
orderDate.monthDay
orderDate.yearWeek
```

# Complex queries

One of the main benefits of JQuery appears when a query becomes complicated.

For example, a requirement such as:

> Rank products by price within each category.

can involve:

- a ranking function
- a window
- partitioning
- ordering
- potentially additional query structure

With JQuery, the user describes the operation they need, while the framework handles the SQL structure required to execute it.

The same principle applies to aggregations, filtering, joins, CTEs, and subqueries.

## For developers

JQuery is useful for Java developers who want to work with database queries without manually constructing large SQL statements.

It can help keep query definitions concise while still allowing complex database operations.

Instead of focusing on:

```text
How do I write all the SQL?
```

you can focus on:

```text
What data do I need?
What should I calculate?
How should I filter it?
How are the tables related?
```

## For non-SQL users

JQuery can also be useful when the person defining a query understands the data but does not necessarily know SQL.

For example:

```text
Show the average product price.
```

can be represented by:

```scss
price.avg
```

Or:

```text
Show products ranked by price.
```

can be represented by:

```scss
rank.over(partition(cat_id).order(price.desc))
```

This makes it possible for applications to build interfaces where users describe or select the data they need without having to manually write SQL.

## JQuery as an abstraction layer

JQuery sits between the application and the database.

```scss
What you want
      ↓
JQuery
      ↓
SQL
      ↓
Database
```

The important part is that the user does not have to manually manage every SQL detail.

JQuery takes the higher-level query definition and builds the database query required to execute it.

## The philosophy

JQuery is built around a simple concept:

**Describe the data you want, not the SQL required to obtain it.**

You choose the columns and operations you need.

JQuery handles the query structure.

## In short

JQuery helps you:

- describe database queries using concise operations
- work with columns directly
- perform calculations and aggregations
- filter and transform data
- work with dates and strings
- use joins
- use window functions
- work with CTEs and subqueries
- avoid manually constructing complex SQL where JQuery can handle it

The goal is simple:

# You say what you want. JQuery handles the query.