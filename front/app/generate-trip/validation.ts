import { z } from 'zod'

const generateTripValidation = z.object({
  city: z.string().nonempty(),
})

export default generateTripValidation
