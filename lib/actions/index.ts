"use server"
import {  scrapeAmazonProducts} from "../scrape";
import { connectToDB } from "../mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utlis";
import Product from "@/models/product.model";
import { revalidatePath } from "next/cache";
import { User } from "@/types";
import { redis } from "../../app/config/ratelimit";
import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { ObjectId } from "mongodb";


const ratelimit = new Ratelimit({ 
  redis: redis, 
  limiter: Ratelimit.fixedWindow(3, '60s'), 
});
export async function scrapeAndStoreProducts(producturl: string) {

  if (!producturl) return null;
  try {
      await connectToDB();
      // const scrapedProduct = await scrapeAmazonProducts(producturl);
      const url = new URL(producturl);
        const hostname = url.hostname;

        let scrapedProduct;

        if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
            console.log("amazon")
            scrapedProduct = await scrapeAmazonProducts(producturl);
        } else if (hostname.includes('flipkart.com') || hostname.includes('flipkart.') || hostname.endsWith('flipkart')) {
          console.log("flipkart")
          return null;
        } else {
            // Handle unsupported URLs or other cases
            return null;
        }

      if (!scrapedProduct) return null;

      let product = scrapedProduct;

      const existingProduct = await Product.findOne({ url: scrapedProduct.url });

      if (existingProduct) {
          const updatedPriceHistory: any = [
              ...existingProduct.priceHistory,
              { price: scrapedProduct.currentPrice }
          ];

          product = {
              ...scrapedProduct,
              priceHistory: updatedPriceHistory,
              lowestPrice: getLowestPrice(updatedPriceHistory),
              highestPrice: getHighestPrice(updatedPriceHistory),
              averagePrice: getAveragePrice(updatedPriceHistory),
          };
      }

      const newProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          product,
          { upsert: true, new: true }
      );
      const redirectUrl = newProduct._id.toString();
      revalidatePath(`/products/${redirectUrl}`);
      revalidatePath("/", "layout");

      return { redirectUrl }; 
  } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`);
  }
}


export async function getProductById(productId: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId }).lean();

    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    throw new Error(`Failed to get product by ID: ${error.message}`);
  }
}

export async function getAllProducts() {
  try {
    await connectToDB();
    const products = await Product.find().lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    console.error('Error getting products:', error);
    return [];
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    await connectToDB();

    // const currentProduct = await Product.findById(productId);

    // if(!currentProduct) return null;

    // const similarProducts = await Product.find({
    //   _id: { $ne: productId },
    // }).limit(6);

    // return similarProducts;
    const randomProducts = await Product.aggregate([
      { 
        $match: { _id: { $ne: new ObjectId(productId) } } 
      },
      { 
        $sample: { size: 20 } 
      }
    ]);

    return JSON.parse(JSON.stringify(randomProducts));
  } catch (error) {
    console.log(error);
    return [];
  }
}

