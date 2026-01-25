import { faker } from '@faker-js/faker';

export function generateFakeProducts(count = 20, seed = 42) {
  faker.seed(seed);

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    in_stock: true,
    is_eco_friendly: faker.datatype.boolean(),
    is_location_offer: faker.datatype.boolean(),
    is_rental: faker.datatype.boolean(),
    category: {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department()),
    },
    brand: {
      id: faker.string.uuid(),
      name: faker.company.name(),
    },
    product_image: {
      id: faker.string.uuid(),
      by_name: faker.person.fullName(),
      by_url: faker.image.url(),
      file_name: `${faker.string.alpha(8)}.avif`,
      source_name: 'Unsplash',
      source_url: faker.internet.url(),
      title: faker.commerce.productName(),
    },
    co2_rating: 'D',
  }));
}
