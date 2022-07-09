import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Setup requests interception using the given handlers.
export const server = setupWorker(...handlers)
