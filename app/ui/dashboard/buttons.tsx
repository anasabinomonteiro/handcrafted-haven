import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '../../lib/action';
import styles from "@ui/dashboard/dashboard.module.css"

export function CreateProduct() {
  return (
    <Link
      className={styles.createLink}
      href="/dashboard/products/create"
    >
      <span>Upload Product</span>
      <PlusIcon className={styles.createIcon} />
    </Link>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      className={styles.updateLink}
      href={`/dashboard/products/${id}/edit`}
    >
      <span>Update Product</span>
      <PencilIcon className={styles.updateIcon} />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <>
      <form action={deleteProductWithId} >
        <button className={styles.deleteButton} type="submit" >
        <span>Delete</span>
        <TrashIcon className={styles.deleteIcon} />
      </button>
      </form>
    </>
  );
}
