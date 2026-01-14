import { factory, CommentType } from '~src/comments/comment'

export const REMOVE_STUB_THROW = factory`
Remove this placeholder throw statement. It is dead code.
`('javascript.general.remove_stub_throw', CommentType.Actionable)
