import { AIProvider } from '@/providers/ai-provider'
import { TripRepository } from '@/repositories/trip-repository/trip-repository'
import chalk from 'chalk'
import { Request, Response } from 'express'
import { z } from 'zod'

export class GenerateTripUseCase {
  public readonly inputSchema = z.object({
    city: z.string(),
  })

  constructor(
    private readonly aiProvider: AIProvider,
    private readonly tripRepository: TripRepository,
  ) {
    this.aiProvider = aiProvider
  }

  async execute(req: Request, res: Response) {
    const body = req.body as z.infer<
      typeof GenerateTripUseCase.prototype.inputSchema
    >
    const ai = this.aiProvider.createGemini15Flash()
    const outputSchema = z.object({
      locals: z.array(
        z.object({
          name: z.string(),
          description: z.string({
            description: `
              Descrição do local.
              - Informações sobre a história, atrações, curiosidades, etc.
            `,
          }),
          address: z.string(),
          openingHours: z.string({
            description: 'Horário de funcionamento do local',
          }),
          tags: z
            .array(
              z.enum([
                'Natureza 🌳',
                'Cultura 🎨',
                'História 🏛️',
                'Gastronomia 🍽️',
                'Esportes ⚽',
                'Compras 🛍️',
                'Arquitetura 🏢',
                'Praias 🏖️',
                'Montanhas 🏔️',
                'Museus 🏛️',
                'Parques 🌲',
                'Igrejas ⛪',
                'Monumentos 🗿',
                'Teatros 🎭',
                'Bares 🍻',
                'Restaurantes 🍴',
                'Cafés ☕',
                'Pubs 🍺',
                'Baladas 🎉',
                'Lojas 🛒',
                'Mercados 🛒',
                'Feiras 🎪',
                'Shoppings 🏬',
                'Lojas de rua 🏪',
                'Lojas de grife 👗',
              ]),
            )
            .min(1)
            .max(4),
          price: z.enum(
            ['Gratuito', 'Barato', 'Moderado', 'Caro'],
            z.string({
              description: 'Preço do local',
            }),
          ),
          googleLink: z.string({
            description: 'Link do google pesquisando o nome do local',
          }),
        }),
      ),
      city: z.string({
        description: `Nome da cidade, estado - país.`,
      }),
      description: z.string({
        description: `Descrição da cidade.`,
      }),
    })
    try {
      const data = await ai.generate({
        prompt: `Gere um itinerário de viagem para o lugar escolhido. ${body.city}. Ordene por popularidade`,
        output: {
          format: 'json',
          schema: outputSchema,
        },
      })
      const output = data.message?.output
      console.log(
        chalk.magenta(
          'Generated trip for city:',
          output?.city,
          'with data:',
          JSON.stringify(output, null, 2),
        ),
      )
      console.log('req.user', req.user)
      if (output && req.user) {
        await this.tripRepository.createTrip({
          city: output.city,
          description: output.description,
          userId: req.user.id,
          locals: output.locals.map((local) => ({
            name: local.name,
            description: local.description,
            address: local.address,
            openingHours: local.openingHours,
            tags: local.tags,
            price: local.price,
            googleLink: local.googleLink,
          })),
        })
      }
      res.send(output)
    } catch (error) {
      console.log(chalk.red('Error:', error))
      res.status(400).send(error)
    }
  }
}
