import { CurrentUser } from 'src/lib/auth'

describe('mockCurrentUser with strict: true in tsconfig', () => {
  it('demonstrates that mockCurrentUser(null) does not type-check', () => {
    // This doesn't type-check even though getCurrentUser is typed to allow null
    mockCurrentUser(null)

    // Neither does this
    const user = null
    mockCurrentUser(user)
  })

  it('demonstrates that mockCurrentUser with a properly typed object literal does not type-check', () => {
    // Argument of type '{ id: number; roles: string[]; }' is not assignable to parameter of type 'CurrentUser'.
    // Object literal may only specify known properties, and 'id' does not exist in type 'CurrentUser'.ts(2345)
    mockCurrentUser({ id: 42, roles: ['test'] })
  })

  it('demonstrates that mockCurrentUser with a pre-declared const type-checks', () => {
    // This type-checks
    const user1: CurrentUser = { id: 42, roles: ['test'] }
    mockCurrentUser(user1)

    // And so does this, even without the type annotation
    const user2 = { id: 42, roles: ['test'] }
    mockCurrentUser(user2)
  })
})
