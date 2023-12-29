//function override_monospace_fonts(node) {
//  const override_fonts = ['monospace', 'Consolas', 'Menlo', 'Monaco', 'Courier', 'Source Code', 'Mono']
//  const generic_family_names = ['serif', 'sans-serif', 'cursive', 'fantasy', 'system-ui']
//  const target_tags = ['pre', 'code', 'kdb', 'div']
//
//  node.querySelectorAll(target_tags.join(', ')).forEach(elem => {
//    const elem_font_family = getComputedStyle(elem).fontFamily
//    const contains_non_monospace_generic_family_name = generic_family_names.some(exclude_font => elem_font_family.includes(exclude_font))
//    const contains_overridable_font = override_fonts.some(override_font => elem_font_family.includes(override_font))
//
//    if (contains_overridable_font && !contains_non_monospace_generic_family_name) {
//      elem.style.setProperty('font-family', 'Noto Mono', 'important')
//      elem.style.setProperty('font-feature-settings', '"liga" on, "calt" on', 'important')
//    }
//  })
//}

function override_generic_fonts(node) {
  const override_fonts = ['Arial', 'Roboto', 'Helvetica', 'Serif', 'Sans-Serif', 'Inter']
  const target_tags = ['pre', 'span', 'kdb', 'div', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5']

  node.querySelectorAll(target_tags.join(', ')).forEach(elem => {
    const elem_font_family = getComputedStyle(elem).fontFamily
    const contains_overridable_font = override_fonts.some(override_font => elem_font_family.includes(override_font))

    if (contains_overridable_font) {
      elem.style.setProperty('font-family', 'Verdana', 'important')
//      elem.style.setProperty('font-feature-settings', '"liga" off', 'important')
    }
  })
}

// Override fonts in already loaded DOM tree
override_generic_fonts(document.documentElement)

let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => override_generic_fonts(mutation.target))
})

// Subscribe to any DOM mutations, to override fonts on dynamically generated nodes
observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true })
