'use strict'

import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import dbConnection from './config/db/connection'
import typeDefs from './services/graphql/todo.schema'
import resolvers from './services/graphql/todo.resolvers'

const server = new ApolloServer({ typeDefs, resolvers: resolvers() })
const app: express.Application = express()

// Perform db connection
dbConnection(app)

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ type: 'application/graphql' }))

server.applyMiddleware({ app })

export default app
