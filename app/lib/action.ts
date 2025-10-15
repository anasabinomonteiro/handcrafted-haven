'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import {  z } from 'zod';
import { AuthError } from 'next-auth';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
const fileSizeLimit = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_WIDTH = 1920;
const MAX_IMAGE_HEIGHT = 1080;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});
const FormSchema = z.object({
  userId: z.string({message: 'Please log in and try again.',}),
  categoryId: z.string({
    message: 'Please select a category.',
  }),
  productPrice: z.coerce
    .number()
    .gt(0, {message: 'Please enter an amount greater than or equal to 0.',
    }),
  productName: z.string({
    message: 'Please type in the name of the product',
  }),
  productDescription: z.string({
    message: 'Please type in the description of the product',
  }),
  productImage: z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ].includes(file.type),
    { message: "Invalid image file type" }
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 2MB",
  })
  
})
 
const CreateProduct = FormSchema;

export type State = {
  errors?: {
    userId?: string[];
    productPrice?: string[];
    productName?: string[];
    productDescription?: string[];
    categoryId?: string[];
    productImage?: string[];
  };
  message?: string | null;
};

export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard');
}


export async function updateRole(formData: FormData) {
 const formDataValue: FormDataEntryValue | null = formData.get('id')
  let parameterValue: string | number | boolean | null;
  
  if (formDataValue !== null) {
    parameterValue = String(formDataValue)
    try {
    await sql`UPDATE users SET role = 'seller' WHERE id = ${parameterValue}`;
    //return "Successful"
  } catch (error) {
    console.error('Error creating seller profile:', error);
    //NextResponse.json({ error }, { status: 500 });
  }
    revalidatePath('/dashboard');
    redirect('/')
  } 
}

export async function createProduct(prevState: State, formData: FormData)  {
  const validatedFields = CreateProduct.safeParse({
      userId: formData.get('user_id'),
      productPrice: formData.get('product_price'),
      categoryId: formData.get('category_id'),
      productName: formData.get('product_name'),
      productDescription: formData.get('product_description'),
      productImage: formData.get('product_image'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  const { userId, productPrice, productName, productDescription, categoryId, productImage  } = validatedFields.data;
  try {
    const buffer = Buffer.from(await productImage.arrayBuffer());
    const filename = productImage.name.replaceAll(" ", "_");
    await writeFile(path.join(process.cwd(), "public/images/products/" + filename), buffer);
    const url =  `/images/products/${filename}`;
  
  // const arrayBuffer = await productImage.arrayBuffer();
  //   const buffer = Buffer.from(arrayBuffer);

  //   const result = await new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload_stream({}, (error, uploadResult) => {
  //       if (error) {
  //         reject(error);
  //       }
  //       resolve(uploadResult);
  //     }).end(buffer);
  //   });
  //   const url = (result as any).secure_url
      await sql`
    INSERT INTO products (name, description, price, user_id, category_id, image_url)
    VALUES (${productName}, ${productDescription}, ${productPrice}, ${userId}, ${categoryId}, ${url})
  `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const UpdateProduct = FormSchema.omit({productImage: true});
export async function updateProduct(id: string, formData: FormData)  {
  const { userId, productPrice, productName, productDescription, categoryId  } = UpdateProduct.parse({
      userId: formData.get('user_id'),
      productPrice: formData.get('product_price'),
      categoryId: formData.get('category_id'),
      productName: formData.get('product_name'),
      productDescription: formData.get('product_description'),
  });
  try {
    await sql`
    UPDATE products
    SET user_id = ${userId}, price = ${productPrice}, name = ${productName}, description = ${productDescription}, category_id = ${categoryId}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function createReview(review_text: string, rating: number, userId: string, productId: string) {
  if (Number.isNaN(rating) || !review_text || !userId || !productId) {
    return {
      errors: {
        rating: Number.isNaN(rating) ? 'Rating is required' : undefined,
        reviewText: !review_text ? 'Review text is required' : undefined,
        userId: !userId ? 'User ID is required' : undefined,
        productId: !productId ? 'Product ID is required' : undefined,
      },
      message: 'Missing Fields. Failed to Create Review.',
    };
  }

  try {
    await sql`
      INSERT INTO reviews (rating, review_text, user_id, product_id)
      VALUES (${rating}, ${review_text}, ${userId}, ${productId})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Review.',
    };
  }

  revalidatePath(`/product/${productId}`);
  redirect(`/product/${productId}`);
}