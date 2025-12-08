import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

function loadDotenv(envFilePath) {
  if (!existsSync(envFilePath)) {
    return {}
  }
  const file = readFileSync(envFilePath, { encoding: 'utf8' })
  const parsed = dotenv.parse(file)
  return parsed
}

function generateEnvironmentTsContent(vars) {
  const entries = Object.entries(vars)
  const inner = entries.map(([key, value]) => `    "${key}": ${JSON.stringify(value)}`).join(',\n')
  return [
    'export const environment = {',
    '  production: false,',
    '  env: {',
    inner,
    '  }',
    '}',
    '',
  ].join('\n')
}

function main() {
  const projectRoot = process.cwd()
  const envPath = path.resolve(projectRoot, '.env')
  const outDir = path.resolve(projectRoot, 'src/environments')
  const outFile = path.resolve(outDir, 'environment.development.ts')

  const envVars = loadDotenv(envPath)
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
  }

  const content = generateEnvironmentTsContent(envVars)
  writeFileSync(outFile, content, { encoding: 'utf8' })
  console.log(
    `Wrote ${path.relative(projectRoot, outFile)} from .env (${Object.keys(envVars).length} vars)`,
  )
}

main()
