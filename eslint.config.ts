import antfu from '@antfu/eslint-config'
import autoImportConfig from './.eslintrc-auto-import.json' assert { type: 'json' }
// import tailwind from 'eslint-plugin-tailwindcss'
export default antfu({}, { languageOptions: autoImportConfig })
