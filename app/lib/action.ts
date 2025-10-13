'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

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

export async function createProduct(formData: FormData) {
  // TODO: FINNISH THIS FUNCTION
}