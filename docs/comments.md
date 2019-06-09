# 📝 Comments

Comments are the output analyzers directly give to the respective parties:

- `refer_to_mentor`: at the moment of writing, the consensus is that comments
  will be passed to the mentor;
- `approve_with_comment`: the comments will be passed to the student;
- `disapprove_with_comment`: the comments will be passed to the student;
- `approve_as_optimal`: no comments are passed to _anyone_.

## Using the Comment Factory

The `~src/comments/comment.ts` file exposes a `factory` that is a layered
factory methods, in order to be able to output all different types of comments.
The main reason this exists, is that there is currently no _exact definition_ of
the output. The way this is implemented allows you to write the comments as you
wish, and when the definition is solidified, requires no change to the source
comments.

Pass a templated string to the `factory` as well as a list of template tag names
which will be necessary to output the comment (see the contents of this example
for more information):

```javascript
const MY_COMMENT_FACTORY = factory<'foo' | 'bar'>`
Write your comment here. You can use ${'foo'} anywhere to defined a place
where 'foo' will be replaced in the final output. Make sure you add the type to
the factory<type> so you get auto-completion and validation when using your
factory.

${'bar'} is another named argument. You can use ${'foo'} and ${'bar'} more than
once. Each time they will be replaced.
`('javascript.this.is.the.website-copy.template.name`)
```

If you _must_ you can also use **positional arguments**. In general, they are
discouraged, because it requires a lot of 🔫 shotgun 🔪 surgery if you change
something, but sometimes they do make sense:

```javascript
const USING_POSITIONALS = factory<'named'>`
You can also use positional ${0} arguments ${1}. Or even combine it with
${`named`} arguments. However, TypeScript will not warn you if you forget to
pass a positional argument, yet.
`('javascript.another.website-copy.template.name')
```

## Using your templated comment

The `factory` function is invoked with the `template` identifier, which will
link your comment with the `website-copy`. We have the actual template in these
files, so you can _instantly_ see what will be outputted without having to check
`website-copy`. Once the comment is on the `website-copy` repository, you may
choose to summarise it inside the `factory` template (and mark it as maintained
by `website-copy`).

The result is a function (`USING_POSITIONALS` and `MY_COMMENT_FACTORY` above)
that takes the expected replacement values as arguments:

```javascript
MY_COMMENT_FACTORY()
// => Comment({ ... })
// No variables, nothing is interpolated, nothing is assigned to "params"

MY_COMMENT_FACTORY({
  foo: 'value for foo',
  bar: 'value for bar'
})
// => Comment({ ... })
// Replaced `foo` and `bar` in the message, assigns them to "params"

USING_POSITIONALS(
  ['pos-1', 'pos-2']
  { named: 'value for named' }
)
// => Comment({ ... })
// Replaced `named`, 0 and 1 in the message, assigns them to "params"

USING_POSITIONALS('pos-1', 'pos-2')

// => Comment({ ... })
// Replaced 0 and 1 in the message, assigns them to "params". `named` is not
// replaced. At the moment you can only use ...positional if there are no named
// parameters
```

## Writing comments

As an analyzer maintainer, you don't need to be a great writer. Write the sample
comment here, and make sure the **intent** is clear. The `website-copy` team
will help you help them write the comment in the educational format we try to
use on Exercism.

At the moment of writing this guide, there is no clear path from this repository
to the `website-copy`, but the guide will be updated once there is.
