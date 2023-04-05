import { Category } from '@prisma/client';

export const TransformedCategories = {
  [Category.CAMERA]: 'Camera',
  [Category.LENS]: 'Lens',
  [Category.ACCESSORY]: 'Accessory',
  [Category.BAG]: 'Bag',
};
