import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'

import { Illustration, subject } from './Illustration'

it('picks 이/가 by the final consonant', () => {
  expect(subject('마그네슘')).toBe('마그네슘이')
  expect(subject('비타민C')).toBe('비타민C가')
  expect(subject('아연')).toBe('아연이')
  expect(subject('셀레늄')).toBe('셀레늄이')
  expect(subject('타우린')).toBe('타우린이')
  expect(subject('프로폴리스')).toBe('프로폴리스가')
})

it('renders nothing until the image exists', () => {
  expect(renderToStaticMarkup(<Illustration caption="x" photo="nutrient-none-foods" />)).toBe('')
})
