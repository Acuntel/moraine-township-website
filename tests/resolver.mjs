/**
 * Lets `node --test` load the site's own TypeScript modules unchanged.
 *
 * Node 26 strips types by itself, so no compiler or bundler is needed, but its
 * ESM resolver still wants three things the site's imports do not write: the
 * `@/…` alias from tsconfig, a file extension on every relative import, and an
 * explicit attribute on JSON. This hook supplies all three, so the tests import
 * exactly the files that ship rather than a compiled copy that could drift.
 *
 * Loaded with `--import ./tests/resolver.mjs`. See package.json.
 */
import { registerHooks } from 'node:module'
import { statSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve as resolvePath } from 'node:path'

const ROOT = resolvePath(fileURLToPath(import.meta.url), '..', '..')
const EXTENSIONS = ['.ts', '.tsx', '.mjs', '.js', '.json']

function isFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

/**
 * Find the real file behind a specifier written without an extension.
 * The directory check matters: `@/content` names a folder that exists, and
 * handing Node the folder itself fails with an unhelpful EISDIR.
 */
function withExtension(absolute) {
  if (isFile(absolute)) return absolute
  for (const ext of EXTENSIONS) {
    if (isFile(absolute + ext)) return absolute + ext
  }
  for (const ext of EXTENSIONS) {
    const index = resolvePath(absolute, `index${ext}`)
    if (isFile(index)) return index
  }
  return null
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    let absolute = null

    if (specifier.startsWith('@/')) {
      absolute = resolvePath(ROOT, specifier.slice(2))
    } else if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
      absolute = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)
    }

    if (absolute) {
      const found = withExtension(absolute)
      if (found) {
        return {
          url: pathToFileURL(found).href,
          shortCircuit: true,
          // The site imports lib/documents.json the way a bundler allows.
          // Node requires the attribute to be stated.
          importAttributes: found.endsWith('.json')
            ? { ...context.importAttributes, type: 'json' }
            : context.importAttributes,
        }
      }
    }

    try {
      return nextResolve(specifier, context)
    } catch (error) {
      // `next/server` and `next/headers` are plain files at the package root
      // rather than declared subpath exports, so Node's resolver wants the
      // extension that the framework's own docs tell you to leave off.
      if (error?.code === 'ERR_MODULE_NOT_FOUND' && !/\.[a-z]+$/.test(specifier)) {
        return nextResolve(`${specifier}.js`, context)
      }
      throw error
    }
  },
})
