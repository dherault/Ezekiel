#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')

const fetch = require('node-fetch')
const { getIntrospectionQuery } = require('graphql')
const { getIntrospectedSchema, minifyIntrospectionQuery } = require('@urql/introspection')

const { developmentPort } = require('../src/configuration')

const url = `http://localhost:${developmentPort}`

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({
      descriptions: false,
    }),
  }),
})
.then(result => result.json())
.then(({ data }) => {
  const minified = minifyIntrospectionQuery(getIntrospectedSchema(data))

  fs.writeFileSync('../../front/src/graphql-schema.json', JSON.stringify(minified, null, 2))
})
