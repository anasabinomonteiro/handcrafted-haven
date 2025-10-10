'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';
import { AuthError } from 'next-auth';


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
});
 
const CreateProduct = FormSchema;

export type State = {
  errors?: {
    userId?: string[];
    productPrice?: string[];
    productName?: string[];
    productDescription?: string[];
    categoryId?: string[];
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
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  const { userId, productPrice, productName, productDescription, categoryId  } = validatedFields.data;
  console.log(userId)
  console.log(productDescription)
  console.log(productName)
  console.log(productPrice)
  console.log(categoryId)
  try {
    await sql`
    INSERT INTO products (name, description, price, user_id, category_id)
    VALUES (${productName}, ${productDescription}, ${productPrice}, ${userId}, ${categoryId})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const UpdateProduct = FormSchema;
export async function updateProduct(id: string, formData: FormData)  {
  const { userId, productPrice, productName, productDescription, categoryId  } = UpdateProduct.parse({
      userId: formData.get('user_id'),
      productPrice: formData.get('product_price'),
      categoryId: formData.get('category_id'),
      productName: formData.get('product_name'),
      productDescription: formData.get('product_description'),
  });
  
  console.log(userId)
  console.log(productDescription)
  console.log(productName)
  console.log(productPrice)
  console.log(categoryId)
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