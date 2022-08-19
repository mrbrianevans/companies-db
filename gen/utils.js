import prettier from "prettier";

export const prettyTs = (code, wide) => prettier.format(code, {
    semi: false,
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'none',
    printWidth: wide ? 120 : undefined
})


// this doesn't perfectly handle multiple capitals, such as APIKey or UKEstablishments, which should be api-key etc
export const kebabCase = (str) => str.replaceAll(/([A-Z]*)([A-Z])([a-z]*)/g, (all) => '-' + all.toLowerCase() + '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/(^-)|(-$)/g, '')

export function camelCase(input) {
    return input.trim().replaceAll(/[^a-zA-Z](\w)([^a-zA-Z]*)/g, (all, letter, rest) => {
        return letter.toUpperCase() + rest
    })
}
