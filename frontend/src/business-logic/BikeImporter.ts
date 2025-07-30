import { doc, setDoc } from "firebase/firestore";
import Papa from "papaparse";
import { db } from "../config/firebase";
import type { Category } from "./types/Category";
import type { Product } from "./types/Product";
import type { RawCSVRow } from "./types/RawCSVRow";
import type { Variant } from "./types/Variant";

export const parseCSV = (csvText: string): RawCSVRow[] => {
  const result = Papa.parse<RawCSVRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data;
};

export const transformData = (rows: RawCSVRow[]) => {
  const products: Product[] = [];
  const variants: Variant[] = [];
  const categories = new Map<string, number>();

  let productId = 1;
  let variantId = 1;
  let categoryId = 1;

  for (const row of rows) {
    const categoryParts = row.category.split(" > ");
    let parentId: number | null = null;
    let finalCategoryId: number | null = null;

    for (const part of categoryParts) {
      const key: string = `${parentId ?? "root"}_${part}`;
      if (!categories.has(key)) {
        categories.set(key, categoryId++);
      }
      finalCategoryId = categories.get(key)!;
      parentId = finalCategoryId;
    }

    const newProduct: Product = {
      id: productId,
      name: row.product_name,
      brand: row.brand,
      category_id: finalCategoryId!,
      description: row.description ?? "",
    };

    const newVariant: Variant = {
      id: variantId,
      product_id: productId,
      barcode: row.barcode,
      price: parseFloat(row.price),
      stock: parseInt(row.stock, 10),
      size: row.size,
      color: row.color,
    };

    products.push(newProduct);
    variants.push(newVariant);
    productId++;
    variantId++;
  }

  const categoriesList: Category[] = Array.from(categories.entries()).map(
    ([key, id]) => {
      const underscoreIndex = key.indexOf("_");
      const parentKey = key.substring(0, underscoreIndex); // "root" ou "1"
      const name = key.substring(underscoreIndex + 1); // "Casque", "Route", etc.

      let parentId: number | null = null;

      // Si ce n’est pas root, on doit trouver la clé parent (ex: "root_Accessoires" → id: 1)
      if (parentKey !== "root") {
        // Rechercher dans la map la valeur dont la clé commence par parentKey + "_" (la clé complète du parent)
        const parentEntry = Array.from(categories.entries()).find(
          ([k, v]) => v.toString() === parentKey
        );
        if (parentEntry) {
          parentId = parentEntry[1]; // c’est l’id du parent
        }
      }

      return {
        id,
        name,
        parent_id: parentId,
      };
    }
  );

  return { products, variants, categories: categoriesList };
};

export const uploadToFirebase = async (data: {
  products: Product[];
  variants: Variant[];
  categories: Category[];
}) => {
  const { products, variants, categories } = data;

  for (const product of products) {
    console.log("id", product.id.toString(), product);
    await setDoc(doc(db, "products", product.id.toString()), product);
  }

  for (const variant of variants) {
    await setDoc(doc(db, "variants", variant.id.toString()), variant);
  }

  for (const category of categories) {
    await setDoc(doc(db, "categories", category.id.toString()), category);
  }
};
